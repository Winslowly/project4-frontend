import { useContext } from 'react'
import { UserInfoContext } from '../context/UserInfoContext';
import axios from 'axios';


const CART_URL = 'https://gunnicornskateboards.herokuapp.com/api/order'
//I guess I need to create another context file for the product which means 2 files since there are 2 product types, hooray

//I'm removing the {product} argument in hopes the error will go away while I set this up
const AddToCart = () => {
    const { userData } = useContext(UserInfoContext);
      axios.post(CART_URL + userData.id, {
        customer: userData.id,
        // boards: product.id,

        //here's also why splitting product in 2 makes things tricky: I'll likely need to move this now in to each specialized product component 
        
        // goods: product.id
      })
    
      //idk does this need to do anything else? become unclickable?
  }

  export default AddToCart