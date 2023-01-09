import {useState, useEffect} from 'react';
import axios from 'axios';


const Cart = () => {

    const [order, setOrder] = useState([]);
    const baseURL = 'https://gunnicornskateboards.herokuapp.com/api';

    const getOrder = () => {
        // How do I find the id beforehand to pull in for the url?
        axios.get(baseURL + '/order/<int:pk>')
        .then((res) => {
            setOrder(res.data)
        })
    }

    useEffect(()=>{
        getOrder()
        },[])

    return (
        <div className='card'>
            {order.map((product) => {
                return(            
                    <div className='cardbody'>
                        <h3 className='cardname'>{product.name}</h3>
                        <img className='img' src={product.image} />
                        <p className='description'>{product.description}</p>
                        <p className='price'>${product.price}</p>
                        {/* add the plus/minus box here */}
                    </div>
                )
            })}
        </div>
        )
    }

export default Cart;