import React from 'react'
import { useState,useEffect } from 'react';

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
    <div className='orders-container'>
    <h1>Orders List</h1>
    {orders.length > 0 ? (
      orders.map((order, index) => (
        <ul key={order._id} className='order-item'>
          <li className='order-number'>Order Number: {index + 1}</li>
          <li className='oreder-id'>Order ID: {order._id}</li>
          {order.products.map((product, productIndex) => (
            <div key={productIndex} className='product-details'>
              <li>Product Name: {product.productId.name}</li>
              <li>Quantity: {product.quantity}</li>
            </div>
          ))}
          <li className='total-amount'>Total Amount: {order.totalAmount}</li>
          <li className='status'>Status: {order.status}</li>
          {order.status === 'pending' && (
              <button className="status-button" onClick={()=>changeStatus(order._id)}>
                Delivered
              </button>
            )}
        </ul>
      )
    )
    ) : (
      <p>No orders available</p>
    )}
  </div>
  )
}
