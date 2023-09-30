// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { Outlet } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      {/* <Header /> */}

      <Outlet />

      {/* <Footer /> */}
    </>
  );
}

export default App;
