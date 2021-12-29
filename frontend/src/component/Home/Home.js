import React, { Fragment ,useEffect} from 'react'
import { CgMouse } from 'react-icons/cg'
import ProductCard from './ProductCard.js'
import './Home.css'
import MetaData from '../layout/MetaData.js'
import {  getProduct,clearErrors } from '../../actions/productAction.js';
import {useDispatch,useSelector} from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from 'react-alert';

const Home = () => {
    const alert=useAlert();
   const dispatch = useDispatch(); 
   const { loading,error,products } =useSelector((state) => state.products);

    useEffect(() => {
        if(error){
            alert.error(error);
           dispatch(clearErrors());
        }
     dispatch(getProduct());
    }, [ dispatch, error,alert])

    return(
        <Fragment>
            {loading ? (
                 <Loader/>
            ):( <Fragment>
        <MetaData title="AudioBook"/>
        <div className="banner">
            <p>Welcome To AudioBook</p>
            <h1>FIND AMAZING BOOKS BELOW</h1>
            <a href="#container">
            <button>Scroll <CgMouse/></button>
            </a>
        </div>
        <h2 className="homeHeading">Featured Books</h2>
        <div className="container" id="container">
        {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
    </Fragment>
    )}
    </Fragment>
    );
    
}

export default Home;

