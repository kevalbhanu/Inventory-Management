import React, { useEffect, useState } from 'react'

export default function MyOrders() {
    const [orders,setOrders]=useState("");

    const getOrders = async ()=>{
        const userId = JSON.parse(localStorage.getItem('user'))._id;

        const response = await fetch(`http://localhost:5000/api/orders/user/${userId}`, {
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
  return (
    <div className='orders-container'>
    <h1>Orders List</h1>
    {orders.length > 0 ? (
      orders.map((order, index) => (
        <ul key={order._id} className='order-item'>
          <li>Order Number: {index + 1}</li>
          <li>Order ID: {order._id}</li>
          {order.products.map((product, productIndex) => (
            <div key={productIndex} className='product-details'>
              <li>Product Name: {product.productId.name}</li>
              <li>Quantity: {product.quantity}</li>
            </div>
          ))}
          <li className='total-amount'>Total Amount: {order.totalAmount}</li>
          <li className='status'>Status: {order.status}</li>
        </ul>
      ))
    ) : (
      <p>No orders available</p>
    )}
  </div>

  )
}
