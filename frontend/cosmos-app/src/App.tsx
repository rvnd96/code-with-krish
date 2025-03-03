import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import OrderManagement from "./components/OrderManagement";
import Layout from "./layout/Layout";
import AppRoute from "./routes/AppRoute";
// import './App.css'

function App() {
  return (
    <>
      {/* <BrowserRouter>
        <div>
          <nav>
            <ul>
              <Navigation nav={"Order Management"} url={"/order-management"} />
            </ul>
          </nav>
        </div>
        <Routes>
          <Route path="/order-management" element={<OrderManagement />}></Route>
        </Routes>
      </BrowserRouter> */}
      <AppRoute />
    </>
  );
}

// interface navProps {
//   nav: string;
//   url: string;
// }
// function Navigation({ nav, url }: navProps) {
//   return (
//     <li>
//       <Link to={url}>{nav}</Link>
//     </li>
//   );
// }

export default App;
