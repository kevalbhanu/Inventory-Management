import React, { useEffect } from 'react'
import { useState } from 'react'
import {useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export default function UpdateProduct() {
    const [name,setName]= useState('');
    const [price,setPrice]= useState(0);
    const [description,setDescription]= useState('');
    const [category,setCategory]= useState('');
    const [quantity,setQuantity]= useState('');
    const params = useParams();
    const navigate = useNavigate();


    useEffect(()=>{
      getProductDetails();
    },[]);

    const getProductDetails=async ()=>{
      let result = await fetch(`http://localhost:5000/api/products/get-product/${params.id}`,{
        headers:{
          Authorization:`Bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      });
      result = await result.json();
      setName(result.name);
      setPrice(result.price);
      setCategory(result.category);
      setDescription(result.description);
      setQuantity(result.quantity);
    } 

    const updateProduct=async ()=>{
        let result =await fetch(`http://localhost:5000/api/products/update-product/${params.id}`,{
          method:"put",
          body:JSON.stringify({name,price,description,category,quantity}),
          headers:{
            "Content-Type":"application/json",
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
          }
        });
        result = await result.json();
        if(result){
          navigate("/");
          
        }

       
    }
  return (
    <div className='product-container'>
      <h1>Update product</h1>
      <input type="text" value={name} placeholder='Product Name' onChange={(e)=> setName(e.target.value)} />
        <input type="text" value={category} placeholder='Product Category' onChange={(e)=> setCategory(e.target.value)} />
        <input type="text" value={quantity} placeholder='Product Quantity' onChange={(e)=> setQuantity(e.target.value)} />
        <input type="text" value={price} placeholder='Product Price' onChange={(e)=> setPrice(e.target.value)} />
        <input type="text" value={description} placeholder='Product Description' onChange={(e)=> setDescription(e.target.value)} />
      <button onClick={updateProduct}>Update Product</button>
    </div>
  )
}
