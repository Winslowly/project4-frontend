import axios from 'axios';
import React from 'react';
import {useState, useEffect, useContext, createContext} from 'react';
import AddToCart from './AddCart';


function Boards() {

    const [product, setProduct] = useState([])


    const url = 'https://gunnicornskateboards.herokuapp.com/api/boards';


    const getBoards= () => {
        axios.get(url)
        .then((response) => {
            setProduct(response.data)
        })
    }
    const handleDelete = (badBoard) => {
        axios.delete(url + `/${badBoard.id}`)
        .then((response) => {
            getBoards()
        })
      }

      useEffect(()=>{
        getBoards()
        },[])


    return (
        <div className='card'>
            <a href={url}>Add A Board</a>
            {product.map((board) => {
                return(            
                    <div className='cardbody'>
                        <h3 className='cardname'>{board.name}</h3>
                        <img className='img' src={board.image} />
                        <p className='description'>{board.description}</p>
                        <p className='price'>${board.price}</p>
                        <button onClick={<AddToCart/>}>Add To Cart</button>
                        <button onClick={() => {handleDelete(board)}}>Delete</button>
                    </div>
                )
            })}
        </div>
        )
    }

export default Boards;

