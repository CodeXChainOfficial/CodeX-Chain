// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./widgets/components/Header";

function App() {
  return (
    <>
      <Header />

      <Outlet />

      {/* <Footer /> */}
    </>
  );
}

export default App;
