import axios from 'axios';
import React from 'react';
import {useState, useEffect} from 'react';



function Softgoods() {

    const [product, setProduct] = useState([]);

    const url = 'https://gunnicornskateboards.herokuapp.com/api/goods';

    const handleDelete = (badGood) => {
        axios.delete(url + `/${badGood.id}`)
        .then((response) => {
            getGud()
        })
      }

     const getGud = () => {
        axios.get(url)
        .then((response)=>{
            setProduct(response.data);
        })
     } 

        useEffect(()=>{
            getGud()
        },[])



    return (
        <div className='card'>
            {product.map((softgoods) => {
                return(            
                    <div className='cardbody'>
                        <h3 className='cardname'>{softgoods.name}</h3>
                        <img className='img' src={softgoods.image} />
                        <p className='description'>{softgoods.description}</p>
                        <p className='price'>${softgoods.price}</p>
                        <button onClick={() => {handleDelete(softgoods)}}>Delete</button>
                    </div>
                )
            })}
        </div>
        )
    }

export default Softgoods;