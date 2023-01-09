import axios from 'axios';
import React from 'react';
import {useState, useEffect} from 'react';



function Boards() {

    const [product, setProduct] = useState([]);

    const url = 'https://gunnicornskateboards.herokuapp.com/api';

        useEffect(()=>{
        axios.get(url + '/boards')
            .then((response)=>{
                setProduct(response.data);
            })
        },[])

    // const getAllProducts = () => {
    //     axios.get('$(url)products')
    // }


    return (
        <div className='card'>
            {product.map((board) => {
                return(            
                    <div className='cardbody'>
                        <h3 className='cardname'>{board.name}</h3>
                        <img className='img' src={board.image} />
                        <p className='description'>{board.description}</p>
                        <p className='price'>${board.price}</p>
                        {/* <button onClick={<addButton/>}></button> */}
                    </div>
                )
            })}
        </div>
        )
    }

export default Boards;