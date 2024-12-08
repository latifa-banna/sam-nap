import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Navigate } from 'react-router-dom';
import './cssDashbord/createCategory.css'
const CategoryComponent = () => {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [user, setUser] = useState(null);
  const udata = localStorage.getItem('user')
  const odata = JSON.parse(udata)
  const [isLoggedIn, setIsLoggedIn] = useState(udata !== null);


  const changeHandler = (e) => {
    setImage(e.target.files[0]);
  };
  const CreateCategory = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("image", image);
    

    await axios
      .post("http://127.0.0.1:8000/api/categories", formData)
      .then(({ data }) => {
        alert("category created successfully")
        navigate("/dashboard");
      })
      .catch(({ response }) => {
        if (response.status === 422) {
          console.log(response.data.errors);
        } else {
          console.log(response.data.message);
        }
      });
  };
  useEffect(() => {
    if (udata !== null) {
      setUser(odata.user);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [udata]);

 

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="container-createCategory">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-12 col-md-8">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">Create Category</h3>
              <hr />
              <div className="form-wrapper">
                <form onSubmit={CreateCategory}>
                  <div className="mb-3"></div>
                  <div className="mb-3">
                    <label className="form-label">name</label>
                    <input
                      type="text" required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">description</label>
                    <textarea
                      type="text"
                      className="form-control" required
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Image  </label>
                    <input type="file" className="form-control" required

                      onChange={changeHandler}
                    />
                  </div>

                  <div className="mb-3">
                    <button type="submit" className="btn btn-save mb-3"> submit</button>
                  </div>

                </form>



              </div>


            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default CategoryComponent;


