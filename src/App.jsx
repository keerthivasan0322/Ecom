import {useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import {Box, Grid} from '@mui/material'
import ReactStars from "react-rating-stars-component"
import axios from 'axios'
function App() {
  const [value, setValue] = useState([])
  const [title, setTitle] = useState()
  function getProduct() {
    axios.get("https://fakestoreapi.com/products").then((data)=>{
    console.log("data", data.data)
    setValue(data.data)
  }).catch((err) => {
        console.log(err)
  })
  }

  useEffect(()=>{
      getProduct()
  }, [])
  
  function submitProduct(event) {
    event.preventDefault();
    console.log("data")
    var data = {
      "title":title,
      "price": 13.5,
      "Description": "lorem ispum set"
    }
    axios.post("https://fakestoreapi.com/products", data).then((data)=>{
      console.log(data)
    }).catch((error) => {
        console.log(error)
    })
  }

  return (
    <>
      <form onSubmit={(event) => submitProduct(event)}>
        <input type="text" placeholder='title' onChange={(e)=>setTitle(e.target.value)}></input>
        <button type='submit'>Submit</button>
      </form>
      <Box>
        <Grid container columnGap={2} rowGap={3}>
          {value.map((data, index) => (
          <Grid  key={index} xs={11} sm={6} md={4} lg={3}>
            <div className='product-contain'>
              <img className='product-img' src={data.image} alt={data.title} />
              <div className='p-10'>
                <h2>{data.title}</h2>
              </div>
              <div className='d-flex justify-content-between'>
                <span>{data.price}</span>
                <span>
                  <ReactStars edit={false} value={3.5} isHalf={true}></ReactStars>
                </span>
              </div>
            </div>
          </Grid>
          ))}
        </Grid>
      </Box>
    </>
  )
}

export default App
