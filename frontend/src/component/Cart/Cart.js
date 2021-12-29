import React, { Fragment } from 'react'
import "./Cart.css"
import CardItemCard from "./CartItemCart.js"
import { useSelector, useDispatch } from "react-redux";
import {removeItemsFromCart } from "../../actions/cartAction";
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Link } from "react-router-dom";

const Cart = () => {
const dispatch=useDispatch();
const {cartItems} = useSelector((state)=>state.cart);

const deleteCartItems=(id)=>{
    dispatch(removeItemsFromCart(id));
}


    return (
     <Fragment>
         {cartItems.length === 0 ? (
              <div className="emptyCart">
              <RemoveShoppingCartIcon />
    
              <Typography>No Books in Your Favorite</Typography>
              <Link to="/products">View Books</Link>
            </div>
         ) :  (  <Fragment>
            <div className="cardPage">
                <div className="cardHeader">
                    <p>All Favorite Book's</p>
                </div>
                <div className="cartContainer">
                {cartItems &&
                 cartItems.map((item)=>(                  
                    <CardItemCard item={item} deleteCartItems={deleteCartItems}/>
                   
                ))}
                 </div>
                </div>
        </Fragment>
         )}
     </Fragment>
    )
}

export default Cart;
