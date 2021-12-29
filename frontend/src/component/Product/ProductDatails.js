import React, { Fragment,useEffect,useState} from 'react';
import Carousel from "react-material-ui-carousel";
import {useDispatch,useSelector} from 'react-redux';
import {getProductDetails,clearErrors, newReview} from "../../actions/productAction"
import "./ProductDatails.css";
import ReviewCard from "./ReviewCard.js";
import Loader from "../layout/Loader/Loader";
import {useAlert} from "react-alert";
import ReactAudioPlayer from 'react-audio-player';
import MetaData from "../layout/MetaData";
import { addItemsToCart } from "../../actions/cartAction";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";

const ProductDatails = ({match}) => {
const dispatch = useDispatch();
const alert = useAlert();

const {product,loading,error} = useSelector(
  (state)=> 
  state.productDetails);
  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  
  const addToCartHandler = () => {
    dispatch(addItemsToCart(match.params.id));
    alert.success("Book Added To favorite");
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", match.params.id);

    dispatch(newReview(myForm));

    setOpen(false);
  };

useEffect(() => {
  if(error){
    alert.error(error);
    dispatch(clearErrors());
  }
  if (reviewError) {
    alert.error(reviewError);
    dispatch(clearErrors());
  }

  if (success) {
    alert.success("Review Submitted Successfully");
    dispatch({ type: NEW_REVIEW_RESET });
  }

  dispatch(getProductDetails(match.params.id));
}, [dispatch,match.params.id,error,alert, reviewError, success]);




    return (
    <>
    {loading ? (<Loader/>) : (
        <Fragment>
           <MetaData title={`${product.name} -- AUDIOBOOK`} />
        <div className="ProductDetails">
            <div>
              <Carousel>
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={item.url}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>
            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>BooksId # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <Rating {...options} />
                <span className="detailsBlock-2-span">
                  {" "}
                  ({product.numOfReviews} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`₹${product.price}(free)`}</h1>
                <div className="detailsBlock-3-1">
                
                <div className="detailsBlock-3-1-1">
                 </div>{" "}
                 <button onClick={addToCartHandler} >Add to favorite</button>
                  </div>
                  <ReactAudioPlayer
                    controls
                    src={product.Audio}>
                  </ReactAudioPlayer>
              </div>
              <div className="detailsBlock-4">
                    Description: <p>{product.description}</p>
              </div>
              <button onClick={submitReviewToggle} className='submitReview'>Submit Review</button>
              </div>
        </div>

        <h3 className="reviewsHeading">REVIEWS</h3>

        <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>

        {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
          
    </Fragment>
    )}
    <div>

    
    </div>
    </>
    )
}

export default ProductDatails
