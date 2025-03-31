import { NavLink, useNavigate } from "react-router-dom"; // Import useNavigate
import styled from "styled-components";
import { signOut, fetchAuthSession } from "aws-amplify/auth";
import { Button } from "antd";
import { useEffect, useState } from "react";
// Import icons
import {
  MdDashboard,
  MdRestaurantMenu,
  MdListAlt,
  MdSettings,
  MdLogout,
  MdMenu,      // Icon for menu open
  MdClose      // Icon for menu close
} from "react-icons/md";

// --- Styled Components (with improvements) ---

// Overlay Div: Controls background dimming and click-outside-to-close
const DivNav = styled.div<{ $isOpen: boolean }>` // Use transient prop $isOpen
  position: fixed;
  z-index: 999; // Lower than toggle button
  visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
  opacity: ${props => props.$isOpen ? 1 : 0};
  transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), visibility 0s ${props => props.$isOpen ? '0s' : '0.4s'} linear; // Delay visibility change
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;

  @media (max-width: 768px) {
    background-color: transparent; // No dark overlay on mobile per original design
  }
`;

// Sidebar Navigation Panel
const Sidebar = styled.nav<{ $isOpen: boolean }>` // Use transient prop $isOpen
  position: fixed; // Keep it fixed
  top: 0;
  left: 0;
  height: 100%;
  width: 250px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 30px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  transform: translateX(${props => props.$isOpen ? '0' : '-100%'}); // Control slide with prop
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1000; // Above overlay

  @media (max-width: 768px) {
    width: auto;
    min-width: 220px; // Adjusted min-width
    max-width: 85%;
    height: auto;
    max-height: calc(100vh - 100px); // Max height relative to viewport
    overflow-y: auto; // Allow scrolling if content exceeds height
    position: fixed;
    top: 70px; // Position below the toggle button/header
    right: 20px;
    left: auto;
    border-radius: 16px;
    padding: 20px;
    transform: translateX(${props => props.$isOpen ? '0' : '120%'}); // Slide from right
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  }
`;

// List container for nav items
const UlStyled = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px; // Add spacing between items
`;

// Individual Navigation Item
const NavItem = styled.li`
  width: 100%;
`;

// Styled NavLink with Icon support and enhanced active state
const LinkStyled = styled(NavLink)`
  color: #333333;
  text-decoration: none;
  padding: 12px 16px;
  display: flex; // Use flex for icon alignment
  align-items: center; // Vertically center icon and text
  gap: 12px; // Space between icon and text
  border-radius: 12px;
  font-family: 'Karla', sans-serif;
  font-weight: 500;
  font-size: 16px; // Slightly larger base font size
  transition: all 0.3s ease;
  width: 100%;

  svg { // Icon styling
    font-size: 1.3em; // Adjust icon size
    flex-shrink: 0; // Prevent icon from shrinking
    transition: color 0.3s ease;
  }

  &:hover {
    background-color: #f5f5f5;
    color: #000; // Darken text slightly on hover
    transform: translateX(4px);
  }

  // Active state styling - more distinct
  &.active {
    background-color: #495e57; // Keep brand color
    color: white;
    font-weight: 700; // Bolder font weight
    box-shadow: 0 3px 6px rgba(73, 94, 87, 0.3); // Softer shadow with brand color hint

    svg {
      color: white; // Ensure icon matches text color
    }

    &:hover {
       background-color: #3e524b; // Slightly darker active hover
       transform: translateX(0); // No translate on active hover
    }
  }

  @media (max-width: 768px) {
    padding: 10px 14px;
    font-size: 15px; // Adjust mobile font size
    gap: 10px;
     svg { font-size: 1.2em; }
  }
`;

// Custom Button for Logout
const LogoutButton = styled(Button)`
  background-color: #f4ce14; // Little Lemon Yellow
  border: none;
  color: #333; // Dark text for contrast on yellow
  font-size: 16px;
  font-weight: 600;
  padding: 10px 20px;
  height: auto;
  border-radius: 12px;
  width: 100%;
  margin-top: 25px; // More space before logout
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center; // Center icon and text
  gap: 10px;

  svg {
    font-size: 1.2em;
  }

  &:hover {
    background-color: #e0b70d; // Darker yellow on hover
    color: #000;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
    background-color: #c9a40b; // Even darker on click
  }

  @media (max-width: 768px) {
    margin-top: 15px;
    padding: 9px 18px;
    font-size: 14px;
  }
`;

// Toggle Button (using react-icons)
const ToggleButton = styled.button<{ $isOpen: boolean }>` // Use transient prop $isOpen
  visibility: visible;
  opacity: 1;
  position: fixed;
  top: 15px; // Adjusted position
  right: 20px;
  z-index: 1100; // Highest z-index
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 10px; // Slightly smaller padding
  border-radius: 50%;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  border: 2px solid #1b1b1b; // Default border
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px; // Fixed size
  height: 48px; // Fixed size

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(73, 94, 87, 0.3); // Use brand color shadow hint
  }

  // Style changes when menu is open
  border-color: ${props => props.$isOpen ? '#f4ce14' : '#1b1b1b'}; // Yellow border when open

  svg {
    font-size: 24px; // Icon size
    color: #333;
    transition: transform 0.3s ease, opacity 0.3s ease;
  }

  // Hide/show icons based on state (optional: add rotation)
  .menu-icon {
      opacity: ${props => props.$isOpen ? 0 : 1};
      transform: ${props => props.$isOpen ? 'rotate(-90deg)' : 'rotate(0)'};
      position: absolute; // Overlap icons for smooth transition
  }
  .close-icon {
      opacity: ${props => props.$isOpen ? 1 : 0};
      transform: ${props => props.$isOpen ? 'rotate(0)' : 'rotate(90deg)'};
      position: absolute; // Overlap icons
  }


  @media (min-width: 769px) {
     // Keep toggle on top right for consistency, or move to top left if preferred
     // Example: Move to top left on desktop
     // left: 20px;
     // right: auto;
  }
`;


// --- Component Logic ---

const NavBarLogin = () => {
  const [isUsersGroup, setIsUsersGroup] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for menu visibility
  const navigate = useNavigate(); // Hook for navigation on signout

  useEffect(() => {
    checkUserPermissions();
  }, []);

   // Close menu if clicked outside the sidebar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
       // Check if the click is outside the Sidebar and the ToggleButton
       const sidebar = document.getElementById('adminSidebar');
       const toggle = document.getElementById('adminToggle');

       if (
         isMenuOpen &&
         sidebar && !sidebar.contains(event.target as Node) &&
         toggle && !toggle.contains(event.target as Node)
       ) {
         setIsMenuOpen(false);
       }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]); // Re-run effect if isMenuOpen changes


  const checkUserPermissions = async () => {
    setIsLoading(true); // Start loading
    try {
      // Fetch session, potentially forcing refresh if needed for group info
      const session = await fetchAuthSession({ forceRefresh: false }); // Usually false is enough unless groups change often
      // Use optional chaining and nullish coalescing for safer access
      const groups = session.tokens?.accessToken?.payload?.['cognito:groups'] as string[] ?? [];
      // Admin/Editor if *not* only in 'users' group OR if groups array is empty/undefined (implies broader access)
      // Adjust this logic based on your exact Cognito Group setup
      const isAdminOrEditor = groups.length === 0 || !groups.every(g => g === 'users') || groups.length > 1;
      setIsUsersGroup(!isAdminOrEditor); // Set true only if EXCLUSIVELY 'users'
      console.log("User Groups:", groups, "Is Admin/Editor:", isAdminOrEditor); // Debugging
    } catch (error) {
      console.error('Error checking user permissions:', error);
      // Handle error state, maybe redirect to login if session fetch fails
      setIsUsersGroup(true); // Assume non-admin on error? Or handle differently.
    } finally {
      setIsLoading(false); // End loading
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = async () => {
    try {
      await signOut({ global: true });
      // Optional: Clear any local state if necessary
      setIsMenuOpen(false); // Close menu on sign out
      navigate('/'); // Redirect to home or login page after sign out
    } catch (error) {
        console.error('Error signing out: ', error);
    }
  };

  // Function to close menu, useful for NavLink onClick
  const closeMenu = () => {
      setIsMenuOpen(false);
  }

  if (isLoading) {
    // Optional: Render a loading spinner or skeleton
    return null; // Keep it simple: render nothing while loading
  }

  return (
    <>
      {/* Toggle Button */}
      <ToggleButton id="adminToggle" onClick={toggleMenu} $isOpen={isMenuOpen} aria-label={isMenuOpen ? "Close menu" : "Open menu"}>
         <MdMenu className="menu-icon" />
         <MdClose className="close-icon" />
      </ToggleButton>

      {/* Overlay - shown only when menu is open */}
      {/* Render overlay conditionally or control via styled-component prop */}
      <DivNav $isOpen={isMenuOpen} onClick={closeMenu} />

      {/* Sidebar */}
      <Sidebar id="adminSidebar" $isOpen={isMenuOpen}>
        <UlStyled>
          {/* Conditional rendering for Admin/Editor links */}
          {!isUsersGroup ? (
            <>
              <NavItem>
                {/* Use `end` prop for Dashboard if it's the base admin route */}
                <LinkStyled to="/login" onClick={closeMenu} end>
                  <MdDashboard /> Dashboard
                </LinkStyled>
              </NavItem>
              <NavItem>
                <LinkStyled to="/login/editor_menu" onClick={closeMenu}>
                  <MdRestaurantMenu /> Menu Management
                </LinkStyled>
              </NavItem>
              <NavItem>
                <LinkStyled to="/login/admin_panel" onClick={closeMenu}>
                  <MdListAlt /> Managment
                </LinkStyled>
              </NavItem>
              <NavItem>
                <LinkStyled to="/admin/settings" onClick={closeMenu}>
                  <MdSettings /> Settings
                </LinkStyled>
              </NavItem>
            </>
          ) : (
              // Optional: Show a different link or message for 'users' group if they somehow land here
              // <NavItem><LinkStyled to="/user/profile" onClick={closeMenu}><MdPerson /> Profile</LinkStyled></NavItem>
              null // Or render nothing specific for regular users in the admin nav
          )}

          {/* Logout Button - visible to all logged-in users */}
          <NavItem>
            <LogoutButton onClick={handleSignOut}>
              <MdLogout /> Sign out
            </LogoutButton>
          </NavItem>
        </UlStyled>
      </Sidebar>
    </>
  );
};

export default NavBarLogin;