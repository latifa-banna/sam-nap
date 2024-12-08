import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Navigate } from 'react-router-dom';
import './cssDashbord/listCategory.css';


export default function ListCategory() {
  const [user, setUser] = useState(null);
  const udata = localStorage.getItem('user');
  const odata = JSON.parse(udata);
  const [isLoggedIn, setIsLoggedIn] = useState(udata !== null);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  useEffect(() => {
    if (udata !== null) {
      setUser(odata.user);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

    fetchCategories();
     //Disable scroll when the component mounts
    document.body.style.overflow = 'hidden';

    // Re-enable scroll when the component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [udata]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/categories");
      setCategories(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCategories = async (id) => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/categories/${id}`
      );
      console.log(response.data.message);
      fetchCategories();
      alert("category deleted successfully")
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const totalPages = Math.ceil(categories.length / itemsPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentCategories = categories.slice(firstIndex, lastIndex);



  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="container-listCategory">
       
      <div className="row">
        <div className="col-12">
         
          <form>
            <label className="form-label">Category</label>
          </form>

          <table className="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Image</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {currentCategories.map((category) => (
                <tr key={category.id}>
                  <td>{category.name}</td>

                  <td>
                    <img
                      width="100px"
                      src={`http://127.0.0.1:8000/storage/images/${category.image}`}
                      alt=""
                    />
                  </td>

                  <td>
                    <Link
                      className="btn btn-success mb-2 "
                      to={`/category/edit/${category.id}`}
                    >
                      Edit
                    </Link>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteCategories(category.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        {/* pagination */}
        
        {categories.length >= 6 && (
  <div className="pagination">
    <button
      className="btn btn-secondary"
      onClick={handlePreviousPage}
      disabled={currentPage === 1}
    >
      Previous
    </button>

    {pageNumbers.map((pageNumber) => (
      <button
        key={pageNumber}
        className={`btn ${pageNumber === currentPage ? 'btn-primary' : 'btn-secondary'}`}
        onClick={() => handlePageChange(pageNumber)}
      >
        {pageNumber}
      </button>
    ))}

    <button
      className="btn btn-secondary"
      onClick={handleNextPage}
      disabled={currentPage === totalPages}
    >
      Next
    </button>
  </div>
)}

          
        </div>
      </div>
    </div>
  );
}
