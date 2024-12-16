import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import PageNotFound from "./components/pages/PageNotFound";
// import Purchase from "./components/pages/Purchase";
import Checkout from "./components/pages/Checkout";
import Success from "./components/pages/Success";
import Cancel from "./components/pages/Cancel";
import PurchaseDomainDetail from "./components/pages/PurchaseDomainDetail";
import PurchasedCustomerDetails from "./components/pages/PurchasedCustomerDetails";
import Contact from "./components/pages/Contact";
import CSVFile from "./components/pages/CSVFile";

const RouteSection = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      {/* <Route path="/purchase" element={<Purchase />} /> */}
      <Route path="/purchase-detail" element={<PurchaseDomainDetail />} />
      <Route path="/purchase-customer-detail" element={<PurchasedCustomerDetails/>} />
      <Route path="/csv-generator" element={<CSVFile />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/success" element={<Success />} />
      <Route path="/cancel" element={<Cancel />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <RouteSection />
    </BrowserRouter>
  );
}

export default App;
