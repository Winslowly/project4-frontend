import axios from 'axios';
import React from 'react';
import {useState, useEffect} from 'react';



function Softgoods() {

    const [product, setProduct] = useState([]);

    const url = 'https://gunnicornskateboards.herokuapp.com/api';

        useEffect(()=>{
        axios.get(url + '/goods')
            .then((response)=>{
                setProduct(response.data);
            })
        },[])

    // const getAllProducts = () => {
    //     axios.get('$(url)products')
    // }


    return (
        <div className='card'>
            {product.map((softgoods) => {
                return(            
                    <div className='cardbody'>
                        <h3 className='cardname'>{softgoods.name}</h3>
                        <img className='img' src={softgoods.image} />
                        <p className='description'>{softgoods.description}</p>
                        <p className='price'>${softgoods.price}</p>
                    </div>
                )
            })}
        </div>
        )
    }

export default Softgoods;