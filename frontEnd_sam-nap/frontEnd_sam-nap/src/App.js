


import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';

import Login from './dashbord/login';
import Dashboard from './dashbord/dashbord';
import CreateProduct from './dashbord/create.component';
import EditProduct from './dashbord/edit.component';

import ListCategory from './dashbord/ListCategory';
import CategoryComponent from './dashbord/CreateCategory';
import EditCategory from './dashbord/EditCategory';
import Home from './Componenets/Home';
import ProductDisplay from './Componenets/ProductDisplay';
import Produit from './Componenets/Produit';
import ContactForm from './Componenets/contacts';
import AllProduct from './Componenets/AllProducts';
import Navbar from './Componenets/navbar';
import Footer from './Componenets/footer';
import Sidebar from './dashbord/sidebar/Sidebar';
import { useNavigate } from 'react-router-dom';// don't remove this
import Logout from './dashbord/Logout';
const App = () => {
  const navigate = useNavigate();
 
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState(null);
  const udata = localStorage.getItem('user')
  const odata = JSON.parse(udata)
  const [isLoggedIn, setIsLoggedIn] = useState(udata !== null);
  useEffect(() => {
    if (udata !== null) {
      setUser(odata.user);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

    fetchCategories();
    
  }, [udata]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/categories');
      setCategories(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
   <div >
    
    {isLoggedIn?<Sidebar />:<Navbar />}
      <Routes>
        <Route path="/login" element={<Login  />} />
        <Route
          path="/dashboard/*"
          element= {<Dashboard  /> }
        />
        <Route
          path="/product/create"
          element={ <CreateProduct /> }
        />
        <Route
          path="/product/edit/:id"
          element={ <EditProduct /> }
        />
    
        <Route
          path="/category"
          element={ <ListCategory />}
        />
        <Route
          path="/category/create"
          element={ <CategoryComponent /> }
        />
        <Route
          path="/category/edit/:id"
          element={ <EditCategory /> }
        />

           {/* Other routes */}
         <Route path="/" element={<Home categories={categories} />} />
         <Route path="/productCatalogue/:id" element={<ProductDisplay />} />
         <Route path="/product/:id" element={<Produit />} />
         <Route path="/contacts" element={<ContactForm />} />
         <Route path="/products" element={<AllProduct />} />
         <Route path="/logout" element={<Logout />} />
       </Routes>
       {isLoggedIn ? <div> </div>: <Footer />}
       
       </div>
     );
   };

   export default App;