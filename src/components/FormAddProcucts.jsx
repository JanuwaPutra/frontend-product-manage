import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FormAddProducts = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const saveProducts = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/products", {
        name: name,
        price: price,
      });
      navigate("/products");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="columns is-centered">
        <div className="column is-4">
          <div className="box">
            <h1 className="title has-text-centered">Add New Product</h1>
            <h2 className="subtitle has-text-centered">Fill in the details below</h2>

            {msg && (
              <div className="notification is-danger is-light">
                <button className="delete" onClick={() => setMsg("")}></button>
                {msg}
              </div>
            )}

            <form onSubmit={saveProducts}>
              <div className="field">
                <label className="label">Product Name</label>
                <div className="control has-icons-left">
                  <input
                    type="text"
                    className="input is-rounded"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter product name"
                    required
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-box"></i>
                  </span>
                </div>
              </div>

              <div className="field">
                <label className="label">Price</label>
                <div className="control has-icons-left">
                  <input
                    type="number"
                    className="input is-rounded"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Enter product price"
                    required
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-dollar-sign"></i>
                  </span>
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <button type="submit" className="button is-success is-fullwidth is-rounded">
                    Save Product
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormAddProducts;
