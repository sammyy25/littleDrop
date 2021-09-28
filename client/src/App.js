import React,{ useEffect, useState } from 'react';
import './App.css';
import {BrowserRouter, Route, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Header from './component/Header';
import Main from './component/main';
import Footer from './component/Footer';
// import axios from 'axios';
import Signin from './component/signin';
import Register from './component/register';
import Product from './component/product';
import GetOtp from './component/getOtp';
import {listProduct} from './action/productAction'
import Otp from './component/otp';
import EmailVerifyOtp from './component/email';
import ForgetPsw from './component/forgetpassword';
import ChangePsw from './component/changePws';
import { CookiesProvider } from "react-cookie";
function App() {
  // const [products, setProducts] = useState([]);
  const productList = useSelector(state => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();
  useEffect(() => {
    // const fetchData = async () => {
    //   const {data} = await axios.get("/api/products");
    //   setProducts(data);
    // }
    // fetchData()
    dispatch(listProduct());

    return () => {

    };
  }, [dispatch])
  const [ cart, setCart] = useState([]); 
  return (
    <BrowserRouter>
    <CookiesProvider>
    <div className="App">
          <Header items={cart}
        setCart={setCart}
            />
            <Switch>
             {/* < Route path com={() = <Login setState={setState} />}/> */}
            <Route exact path="/signin"  component={Signin} />
            <Route exact path="/otp"  component={Otp} />
            <Route exact path="/email"  component={EmailVerifyOtp} />
            <Route exact path="/getOtp"  component={GetOtp} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/product" component={Product} />
            <Route path="/forgetpassword" component={ForgetPsw} />
            <Route path="/changepws" component={ChangePsw} />
            <Route exact path="/">
            <Main products={products} loading={loading} error={error}
           cart={cart}
            setCart={setCart}
            />
          </Route>
          
          
          </Switch>
          <Footer />
    </div>
    </CookiesProvider>
    </BrowserRouter>
    
  );
}

export default App;
