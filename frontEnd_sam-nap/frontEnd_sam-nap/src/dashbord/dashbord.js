
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from "axios";
import { Link } from "react-router-dom";
import './cssDashbord/listProduct.css'

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [user, setUser] = useState(null);
  const udata = localStorage.getItem('user')
  const odata = JSON.parse(udata)
  const [isLoggedIn, setIsLoggedIn] = useState(udata !== null);

  const [productsPerPage, setProductsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);


  useEffect(() => {
    if (udata !== null) {
      setUser(odata.user);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    fetchProducts();
    fetchCategories();
  
  }, [udata]);

  useEffect(() => {
    setCurrentPage(1); // Reset current page to 1 when selectedCategory changes
  }, [selectedCategory]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/categories");
      setCategories(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProducts = async () => {
    try {
      let url = "http://127.0.0.1:8000/api/products";
      if (selectedCategory) {
        url += `?category_id=${selectedCategory}`;
      }
      const response = await axios.get(url);
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };




  const deleteProduct = async (id) => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/products/${id}`
      );
      console.log(response.data.message);
      fetchProducts();
      alert("product deleted successfully")
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const selectedCategoryProducts = products.filter((product) => {
    if (selectedCategory) {
      return (
        product.category &&
        product.category.id === parseInt(selectedCategory)
      );
    } else {
      return true;
    }
  });


  const totalPages = Math.ceil(selectedCategoryProducts.length / productsPerPage);
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
  // Calculate the indexes of the first and last products to display
  const lastIndex = currentPage * productsPerPage;
  const firstIndex = lastIndex - productsPerPage;

  // Slice the products array to get the current page's products
  const currentProducts = selectedCategoryProducts.slice(firstIndex, lastIndex);




  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container-ListProduct">





      <div >
        <div className="row">
          <div className="col-12">
            <div className='Select'>
              <form>
                <select
                  className="form-select"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">Select all category</option>
                  {categories.map((category) => (
                    <option value={category.id} key={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </form>

            </div>


            {/* -------------------------------------------------------- */}
            {categories == selectedCategory ? true : <div>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Image</th>
                    <th scope="col">Category</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedCategory
                    ? currentProducts.length > 0 ? (
                      currentProducts.map((product) => {
                        if (
                          product.category &&
                          product.category.id === parseInt(selectedCategory)
                        ) {
                          return (
                            <tr key={product.id}>
                              <td>{product.name}</td>
                              <td>{product.description}</td>
                              <td>
                                <img
                                  width="100px"
                                  src={`http://127.0.0.1:8000/storage/images/${product.image}`}
                                  alt={product.name}
                                />
                              </td>
                              <td>{product.category ? product.category.name : "N/A"}</td>
                              <td>
                                <Link
                                  className="btn btn-success mb-2 float-end"
                                  to={`/product/edit/${product.id}`}
                                >
                                  Edit
                                </Link>
                              </td>
                              <td>
                                <button
                                  className="btn btn-danger"
                                  onClick={() => deleteProduct(product.id)}
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          );
                        }
                        return null;
                      })
                    ) : (
                      <tr>
                        <td colSpan={6}>No products found.</td>
                      </tr>
                    )
                    : currentProducts.map((product) => (
                      <tr key={product.id}>
                        <td>{product.name}</td>
                        <td>{product.description}</td>
                        <td>
                          <img
                            width="100px"
                            src={`http://127.0.0.1:8000/storage/images/${product.image}`}
                            alt={product.name}
                          />
                        </td>
                        <td>{product.category ? product.category.name : "N/A"}</td>
                        <td>
                          <Link
                            className="btn btn-success mb-2 "
                            to={`/product/edit/${product.id}`}
                          >
                            Edit
                          </Link>
                        </td>
                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={() => deleteProduct(product.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>


              </table>
             

             
              {/* Pagination */}
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
                    className={`btn ${pageNumber === currentPage ? 'btns' : 'btn-secondary'}`}
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

            </div>



            }








          </div>


        </div>

      </div>
    </div>
  );

};

export default Dashboard;
