import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const FormEditProducts = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getProductsById = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/products/${id}`);
        setName(response.data.name);
        setPrice(response.data.price);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getProductsById();
  }, [id]);

  const updateProducts = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/products/${id}`, {
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
      <h1 className='title has-text-centered'>Products</h1>
      <h2 className='subtitle has-text-centered'>Edit Products</h2>
      <div className="box">
        <form onSubmit={updateProducts}>
          {msg && (
            <div className="notification is-danger is-light">
              <button className="delete" onClick={() => setMsg("")}></button>
              {msg}
            </div>
          )}
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input
                type="text"
                className="input is-rounded"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Product Name"
                required
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Price</label>
            <div className="control">
              <input
                type="number"
                className="input is-rounded"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price"
                required
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button type="submit" className="button is-success is-fullwidth is-rounded">
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormEditProducts;
