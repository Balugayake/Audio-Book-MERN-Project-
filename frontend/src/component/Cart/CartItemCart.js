import React from 'react'
import {Link} from "react-router-dom"
import "./CartItemCart.css"

const CartItemCart = ({item,deleteCartItems}) => {
    return (
        <div className='cartItemCard'>
            <img src={item.image} alt="balu"/>
          
                <Link className="name" to={`/product/${item.product}`}>{item.name}</Link>
                <span>{`Price : ₹${item.price}(Free)`}</span>
                <p onClick={()=>deleteCartItems(item.product)}>Remove</p>
        </div>
    )
}

export default CartItemCart
