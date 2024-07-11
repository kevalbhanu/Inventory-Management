import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateOrder() {
  const navigate = useNavigate();
  const userId = JSON.parse(localStorage.getItem("user"))._id;
  const [products, setProducts] = useState([{ productId: "", quantity: 0 }]);
  const [productDetails, setProductDetails] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);
  const status = ("pending");

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        let response = await fetch(
          "http://localhost:5000/api/products/get-productList",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${JSON.parse(
                localStorage.getItem("token")
              )}`,
            },
          }
        );
        response =await response.json();
        const details = response.reduce((acc, product) => {
          acc[product._id] = product;
          return acc;
        }, {});
        setProductDetails(details);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, []);

  useEffect(() => {
    calculateTotalAmount();
  }, [products]);

  const handleProductChange = (index, event) => {
    const values = [...products];
    values[index][event.target.name] = event.target.value;
    setProducts(values);
  };

  const handleAddProduct = () => {
    setProducts([...products, { productId: "", quantity: 0 }]);
  };

  const handleRemoveProduct = (index) => {
    const values = [...products];
    values.splice(index, 1);
    setProducts(values);
  };
  const calculateTotalAmount = () => {
    const total = products.reduce((sum, item) => {
      const product = productDetails[item.productId];
      if (product) {
        return sum + product.price * item.quantity;
      }
      return sum;
    }, 0);
    setTotalAmount(total);
  };

  const handleSubmit = async () => {
    const orderData = {
      userid:userId,
      products,
      totalAmount,
      status,
    };
    try {
        console.log(orderData)
      const response = await fetch("http://localhost:5000/api/orders/create", {
        method: "POST",
        body: JSON.stringify(orderData),
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data)
      alert(data.message);
      navigate('/users/order')
    } catch (error) {
      alert(`Error: ${error.response.data.message}`);
    }
  };
  return (
    <div className="create-order-container">
      <h1>Create Order</h1>
      <input type="text" value={userId} readOnly />
      {products.map((product, index) => (
        <div key={index}>
          <label>Product ID:</label>
          <input
            type="text"
            name="productId"
            value={product.productId}
            onChange={(e) => handleProductChange(index, e)}
            required
          />
          <label>Quantity:</label>
          <input
            type="number"
            name="quantity"
            value={product.quantity}
            onChange={(e) => handleProductChange(index, e)}
            required
          />
          <button type="button" onClick={() => handleRemoveProduct(index)}>
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={handleAddProduct}>
        Add Product
      </button>
      <input type="number" value={totalAmount} readOnly />
      <input type="text" value={status} placeholder="Status" readOnly />
      <button onClick={handleSubmit}>Create Order</button>
    </div>
  );
}
