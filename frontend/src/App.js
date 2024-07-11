import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Signup from './components/Signup';
import Login from './components/Login';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import UpdateProduct from './components/UpdateProduct';
import CreateOrder from './components/CreateOrder';
import MyOrders from './components/MyOrders';
import AllOrders from './components/AllOrders';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<ProductList/>} />
          <Route path="/product/add" element={<AddProduct/>}/>
          <Route path="/product/update/:id" element={<UpdateProduct/>}/>
          <Route path="/product/delete/:id" element={<h1>Delete Product</h1>}/>
          <Route path="/order/create" element={<CreateOrder/>}/>
          <Route path="/vendor/order" element={<AllOrders/>}/>
          <Route path="/users/order" element={<MyOrders/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/logout" element={<h1>Logout</h1>}/>
        </Routes>
      </Router>
      <Footer/>
    </div>
  );
}

export default App;
