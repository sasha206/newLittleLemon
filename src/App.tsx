import { RouterProvider } from "react-router-dom";
import { router } from './router/routes';
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
    <div className="App">
      <RouterProvider router={router} />
    </div>
    </AuthProvider>
  );
}

export default App;
