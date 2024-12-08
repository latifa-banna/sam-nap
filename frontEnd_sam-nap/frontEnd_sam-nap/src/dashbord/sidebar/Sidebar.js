import {FaBars}from "react-icons/fa";
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import samNap from '../../image/logo1.png';
import { FaProductHunt } from 'react-icons/fa';
import { MdLogout } from 'react-icons/md';
import './Sidebar.css';
import { MdOutlineCategory } from 'react-icons/md';
import { CgPlayListAdd } from 'react-icons/cg';
import { TbLayoutGridAdd } from 'react-icons/tb';

const Sidebar = () => {
  const[isOpen ,setIsOpen] = useState(true);
    const toggle = () => setIsOpen (!isOpen);



  const ClickLogout = () => {
    localStorage.removeItem('user');
  };

  return (
    <nav>
      <div className={isOpen ? 'navigation':' navigation navigation-false'} style={{width: isOpen ? "300px" : "50px"}}>
        <ul>
          <li>
            <Link >
              <span style={{display: isOpen ? "block" : "none",marginTop: isOpen ? '-35px' : ""}}>
                <img src={samNap} alt="Sam-Nap Logo"  className="logo"/>
              </span>
              <span className="title name-company"  style={{display: isOpen ? "block" : "none"}}>
                Sam-Nap
              </span>
                  <span style={{marginLeft: isOpen ? "40px" : "10px"}} className={isOpen ?'bars':'bars bars-false'}>
                       <FaBars onClick={toggle}/>
                   </span>
             </Link>
           </li>
         </ul>
         <ul className="links" >           
         <li className={isOpen ? 'styleLitrue':'styleLifalse'}>
             <Link 
              to="/dashboard" className="link" 
              
            >
              <span className="icons">
                <FaProductHunt />
              </span>
              <span className="title" style={{display: isOpen ? "block" : "none"}}>Product list</span>
            </Link>
          </li>
          <li className={isOpen ? 'styleLitrue':'styleLifalse'}>
            <Link
              to="/category" className="link" 
       
            >
              <span className="icons">
                <MdOutlineCategory />
              </span>
              <span className="title" style={{display: isOpen ? "block" : "none"}}>Category list</span>
            </Link>
          </li>
          <li className={isOpen ? 'styleLitrue':'styleLifalse'}>
            <Link
              to="/product/create" className="link" 
         
            >
              <span className="icons">
                <CgPlayListAdd />
              </span>
              <span className="title" style={{display: isOpen ? "block" : "none"}}>create produit</span>
            </Link>
          </li>
          <li className={isOpen ? 'styleLitrue':'styleLifalse'}>
            <Link
              to="/category/create" className="link"
            
            >
              <span className="icons">
                <TbLayoutGridAdd />
              </span>
              <span className="title" style={{display: isOpen ? "block" : "none"}}>create category</span>
            </Link>
          </li>
          <li className={isOpen ? 'styleLitrue':'styleLifalse'}>
            <Link to="/logout" onClick={ClickLogout} className="link" > 
              <span className="icons">
                <MdLogout />
              </span>
              <span className="title" style={{display: isOpen ? "block" : "none"}}>Logout</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;

