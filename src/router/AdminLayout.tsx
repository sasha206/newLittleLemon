import { Outlet } from 'react-router-dom';
import Header from '../components/Navbar';
import Footer from '../components/Footer';
import NavBarLogin from '../components/NavbarAdmin';
import { Authenticator } from '@aws-amplify/ui-react';

const AdminLayout = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header />
      <Authenticator>
      <div style={{ display: 'flex', flex: 1 }}>

      <NavBarLogin />
      
      <main style={{flex: 1, padding: '20px', overflowY: 'auto' }}>
        <Outlet />
      </main>
      </div>
                
    </Authenticator>



      <Footer />
    </div>
  );
};

export default AdminLayout;

