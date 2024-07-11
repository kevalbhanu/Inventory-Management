import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const authRole = JSON.parse(localStorage.getItem("user")).role;
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch(
      "http://localhost:5000/api/products/get-productList",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      }
    );
    result = await result.json();
    setProducts(result);
  };
  const deleteProduct = async (id) => {
    let result = await fetch(`http://localhost:5000/api/products/delete-product/${id}`, {
      method: "delete",
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    console.log(result);
    if (result) {
      alert("Product Deleted");
      getProducts();
    }
  };
  const searchHandler = async (e) => {
    let key = e.target.value;
    if (key) {
      let result = await fetch(
        `http://localhost:5000/api/products/search-product/${key}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      );
      result = await result.json();
      if (result) {
        setProducts(result);
      }
    } else {
      getProducts();
    }
  };
  return (
    <div className="products-list">
      <h1>Product List</h1>
      <input
        type="text"
        placeholder="Search Product"
        onChange={searchHandler}
      />
      <ul>
        <li>S .No</li>
        <li>Id</li>
        <li>Name</li>
        <li>Price </li>
        <li>Category</li>
        <li>Quentity</li>
        {authRole === "vendor" && <li>Actions</li>}
      </ul>
      {products.length > 0 ? (
        products.map((item, index) => (
          <ul key={item._id}>
            <li>{index + 1}</li>
            <li>{item._id}</li>
            <li>{item.name}</li>
            <li>{item.price}</li>
            <li>{item.category}</li>
            <li>{item.quantity}</li>
            {authRole === "vendor" && (
              <li>
                <button onClick={() => deleteProduct(item._id)}>Delete</button>
                <Link
                to={`/product/update/${item._id}`}>Update</Link>
              </li>
            )}
          </ul>
        ))
      ) : (
        <h1>No Product Found </h1>
      )}
    </div>
  );
}
