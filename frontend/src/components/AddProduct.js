import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AddProduct() {
    const navigate = useNavigate();
    const [name,setName]= useState('');
    const [price,setPrice]= useState(0);
    const [description,setDescription]= useState('');
    const [category,setCategory]= useState('');
    const [quantity,setQuantity]= useState('');

    const addProduct = async ()=>{
        let result = await fetch('http://localhost:5000/api/products/add-product',{
            method: 'post',
            body: JSON.stringify({name,price,description,category,quantity}),
            headers: {
                'Content-Type': 'application/json',
                 Authorization:`Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        let data = result.json();
        alert("Item added Successfully",data)
        navigate('/');
    }
  return (
    <div className='product-container'>
        <h1>Add Product</h1>
        <input type="text" value={name} placeholder='Product Name' onChange={(e)=> setName(e.target.value)} />
        <input type="text" value={category} placeholder='Product Category' onChange={(e)=> setCategory(e.target.value)} />
        <input type="text" value={quantity} placeholder='Product Quantity' onChange={(e)=> setQuantity(e.target.value)} />
        <input type="text" value={price} placeholder='Product Price' onChange={(e)=> setPrice(e.target.value)} />
        <input type="text" value={description} placeholder='Product Description' onChange={(e)=> setDescription(e.target.value)} />
        <button onClick={addProduct}>Add Product</button>
    </div>
  )
}
