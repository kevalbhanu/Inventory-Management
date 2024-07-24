import React from 'react'
import { useState,useEffect } from 'react';
import '../AllOrders.css'

export default function AllOrders() {
    const [orders,setOrders]=useState('');

    const getOrders = async ()=>{

        const response = await fetch(`http://localhost:5000/api/orders/vendor`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
              },
    });
    const data = await response.json();
    console.log(data.orders);
    setOrders(data.orders);
}
useEffect(()=>{
    getOrders();
},[]);

const changeStatus = async (orderid)=>{
    const response = await fetch(`http://localhost:5000/api/orders/status/${orderid}`, {
        method: 'PATCH',
        body:JSON.stringify({status : "delivered"}),
        headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
            'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        console.log(data);
        alert('Order Delivered')
        getOrders();
    }
    return (
      <div className="orders-container">
        <h1>Orders List</h1>
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <div key={order._id} className="order-item">
              <div className="order-header">
                <span className="order-number">Order Number: {index + 1}</span>
                <span className="order-id">Order ID: {order._id}</span>
              </div>
              <div className="order-products">
                {order.products.map((product, productIndex) => (
                  <div key={productIndex} className="product-details">
                    <span className="product-name">Product Name: {product.productId ? product.productId.name : 'No name available'}</span>
                    <span className="product-quantity">Quantity: {product.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="order-footer">
                <span className="total-amount">Total Amount: {order.totalAmount}</span>
                <span className="status" status={order.status}>Status: {order.status}</span>
                {order.status === 'pending' && (
                  <button className="status-button" onClick={() => changeStatus(order._id)}>
                    Delivered
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="no-orders">No orders available</p>
        )}
      </div>
    );
}
