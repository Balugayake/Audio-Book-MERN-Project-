
import './App.css';
import Header from './component/layout/header/Header.js'
import  {BrowserRouter as Router,Route,Switch} from "react-router-dom"
import WebFont from 'webfontloader';
import React from 'react';
import Footer from './component/layout/footer/Footer.js'
import Home from "./component/Home/Home.js";
import ProductDatails from "./component/Product/ProductDatails.js"
import Products from "./component/Product/Products.js"
import Search from "./component/Product/Search.js"
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/header/UserOptions";
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile.js";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import Cart from "./component/Cart/Cart";
import Dashboard from "./component/Admin/Dashboard.js";
import ProductList from "./component/Admin/ProductList.js";
import NewProduct from "./component/Admin/NewProduct.js";
import UpdateProduct from "./component/Admin/UpdateProduct.js";
import UsersList from "./component/Admin/UsersList.js";
import UpdateUser from "./component/Admin/UpdateUser.js";
import ProductReviews from "./component/Admin/ProductReviews.js";
import Contact from "./component/layout/Contact/Contact.js";
import About from "./component/layout/About/About.js";
import NotFound from "./component/layout/Not Found/NotFound.js";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  React.useEffect(()=>{
    WebFont.load({
      google:{
          families:["Roboto","Droid Sans","Chilanks"],
      },
    });
    store.dispatch(loadUser());
  },[]);
  return (
     <Router>
    <Header />
    {isAuthenticated && <UserOptions user={user} />}
    <Switch>
    <Route exact path='/' component={Home} />
    <Route exact path='/product/:id' component={ProductDatails} />
    <Route exact path='/products' component={Products} />
    <Route  path='/products/:keyword' component={Products} />
    <Route exact path='/search' component={Search} />
    <Route exact path="/contact" component={Contact} />
    <Route exact path="/about" component={About} />
    <Route exact path="/login" component={LoginSignUp} />
    <Route exact path="/Cart" component={Cart} />

    <ProtectedRoute exact path="/account" component={Profile} />
    <ProtectedRoute exact path="/me/update" component={UpdateProfile} />
    <ProtectedRoute
          exact
          path="/password/update"
          component={UpdatePassword}
        />

<Route exact path="/password/forgot" component={ForgotPassword} />

<Route exact path="/password/reset/:token" component={ResetPassword} />

<ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/dashboard"
          component={Dashboard}
        />
<ProtectedRoute
          exact
          path="/admin/products"
          isAdmin={true}
          component={ProductList}
        />
     <ProtectedRoute
          exact
          path="/admin/product"
          isAdmin={true}
          component={NewProduct}
        />
 <ProtectedRoute
          exact
          path="/admin/product/:id"
          isAdmin={true}
          component={UpdateProduct}
        />

<ProtectedRoute
          exact
          path="/admin/users"
          isAdmin={true}
          component={UsersList}
        />
       <ProtectedRoute
          exact
          path="/admin/user/:id"
          isAdmin={true}
          component={UpdateUser}
        />  
     <ProtectedRoute
          exact
          path="/admin/reviews"
          isAdmin={true}
          component={ProductReviews}
        />

<Route
          component={
            window.location.pathname === "/process/payment" ? null : NotFound
          }
          />
    </Switch>
    <Footer />
    </Router>
 ); 
}

export default App;
