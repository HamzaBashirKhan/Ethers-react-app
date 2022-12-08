import NavBar from "./component/navbar/NavBar.jsx";
import HomeScreen from "./component/homeScreen/HomeScreen.jsx";

import { ToastContainer } from "react-toastify";
function App() {
  return (
    <>
      <NavBar />
      <HomeScreen />
      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
}

export default App;
