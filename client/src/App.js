import React,{ useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import {BrowserRouter, Route, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Header from './component/Header';
import Main from './component/main';
import Footer from './component/Footer';
import Signin from './component/signin';
import Register from './component/register';
import Product from './component/product';
import GetOtp from './component/getOtp';
import {listProduct} from './action/productAction'
import Otp from './component/otp';
import EmailVerifyOtp from './component/email';
import ForgetPsw from './component/forgetpassword';
import ChangePsw from './component/changePws';
function App() {
  const productList = useSelector(state => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();
  const [code, setCode] = useState('');
const [symbol, setSymbol] = useState('');
const [rate, setRate] = useState('');

 useEffect( () => {
    dispatch(listProduct());
    
          var location = {
            method: 'GET',
            url: 'https://find-any-ip-address-or-domain-location-world-wide.p.rapidapi.com/iplocation',
            params: {apikey: '873dbe322aea47f89dcf729dcc8f60e8'},
            headers: {
              'x-rapidapi-host': 'find-any-ip-address-or-domain-location-world-wide.p.rapidapi.com',
              'x-rapidapi-key': 'c28e834d4dmsh21fa770f728e707p1bf5dbjsn2973696e28a8'
            }
          };

          const locate = (async () =>{ 
            await axios.request(location).then(function (response) {
            setCode(response.data.currencyCode)
            console.log(code);
            setSymbol(response.data.currencySymbol);
            console.log(symbol);
        }).catch(function (error) {
              console.error(error);
          })
         });
        locate();

        var currency = {
            method: 'GET',
            url: 'https://currency-exchange.p.rapidapi.com/exchange',
            params: {from: 'USD', to: `${code}`, q: '1'},
            headers: {
              'x-rapidapi-host': 'currency-exchange.p.rapidapi.com',
              'x-rapidapi-key': 'c28e834d4dmsh21fa770f728e707p1bf5dbjsn2973696e28a8'
            }
          };
           
        const curr = () =>{

         axios.request(currency).then(function (response) {
            setRate(response.data)
            console.log(rate)
          }).catch(function (error) {
            console.error(error);
          });
         }
        curr();
        return () => {
    
        };
      }, []);


  const [ cart, setCart] = useState([]); 
  return (
    <BrowserRouter>
    <div className="App">
          <Header items={cart}
        setCart={setCart}
        rate={rate} 
        symbol={symbol}
        code={code}
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
            <Main products={products}
             rate={rate} 
             symbol={symbol}
             code={code}
             loading={loading} 
             error={error}
           cart={cart}
            setCart={setCart}
            />
          </Route>
          
          
          </Switch>
          <Footer />
    </div>
    </BrowserRouter>
    
  );
}
export default App;
