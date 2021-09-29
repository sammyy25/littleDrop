import React,{useState} from 'react';
import { useSelector } from 'react-redux';
import {  Link} from 'react-router-dom';
import './header.css';
import {PaystackButton} from "react-paystack";
function Header(props) {

    const userSignin = useSelector(state=> state.userSignin)
    const { userInfo} = userSignin;
    const [ isActive, setActive] = useState(false);
    const [ checkoutActive, setCheckoutActive] = useState(false);
    const [ menuActive, setmenuActive] = useState(false);
    const [ qty, setQty] = useState([]);
    const [amountC, setAmount] = useState([]);
    const publicKey = "pk_test_d41b49c9521d97c0652219a53695f7b6e7f52d0e"
    const amount = parseInt(amountC) * 100;
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const openMenu = () =>{
        setmenuActive(true)   
    }
    const closeMenu = () => {
        setmenuActive(false)
    }
  function  handleHide()  {
        setActive(false)   
            }
   function handleShow() {
        addValue(); 
        setActive(true)  
    }
    function  handleCheckHide()  {
        setCheckoutActive(false)     
            }
   function handlCheckShow() {
       if(!userInfo){
        setActive(false);
        window.location.replace('./signin')
       }if(props.items.length === 0){
        window.alert("Cart cannot be empty")
        setActive(false);
       }
       else{
        setActive(false);
        setCheckoutActive(true)   
       } 
    }
   
    const handleQtyDecrement = (item => {
        const cartItems = props.items.slice()
        const index = cartItems.indexOf(item)
        const value = cartItems[index]
        if(value.qty > 1){
            value.qty = value.qty - 1;
             setQty([value.qty])
             value.total = value.qty * value.price
             
        }
        addValue()
    })
    const handleQtyIncrement = (item => {
        const cartItems =props.items.slice()
        const index = cartItems.indexOf(item)
        const value = cartItems[index]
        if(value.qty < 20){
            value.qty = value.qty + 1;
             setQty([value.qty])
             value.total = value.qty * value.price
        }
        addValue()
    })
    const removeFromCart = (item) => {
        const cartItems = props.items.slice() 
        const items =  cartItems.filter((x) => x._id !== item._id);
        props.setCart([...items])
         setAmount(amountC - item.price)
    }  
    const addValue = function(){
        let item = props.items
        var totalAmount = []
        item.forEach(item => {  
            const cartItems =props.items.slice()
        const index = cartItems.indexOf(item)
        let total = cartItems[index].total;
         totalAmount.push(total)
         console.log(totalAmount)
        var sum = 0
        setAmount(cartItems[index].total)
         for(var i = 0; i < totalAmount.length; i++){
                    sum += totalAmount[i]
                    setAmount(sum)
               }
        })
    }
    const refreshPage = () =>{
        window.location.reload();
     }
    const logout = function(){
        if(userInfo){
        localStorage.removeItem('userInfo');
        window.location.replace('/')
        refreshPage()
        }
    }
    
// checkoutHandler
    // const checkoutHandler = () => {
    //     props.history.push("/signin?redirect=shipping")
    // }
    
   const cartItems =  props.items.map((item, idx) => (
    <tbody  key={idx}>
        <tr>
        <td>{idx + 1}</td>
        <td>{item.name}</td>
        <td>{item.price}</td>
        <td><div className="container">
        <button onClick={ () => handleQtyDecrement(item)}>-</button>
        <span>{item.qty}</span>
        <button onClick={() => handleQtyIncrement(item)}>+</button>
        </div></td>
        <td>
        <a href="#re" className="remove" onClick={ () =>  removeFromCart(item)} data-id={item.id}>Remove</a>
        </td>
        </tr>
    </tbody>
    ));
    const cartSummary =  props.items.map((item, idx) => (
        <tbody  key={idx}>
            <tr>
            <td>{idx + 1}</td>
            <td>{item.name}</td>
            <td>{item.price}</td>
            <td>{item.qty}</td>
            <td>{item.total}</td>
            </tr>
        </tbody>
        ));
    
        /**************  PayStack *8************************************/

        const componentProps = {
            email,
            amount,
            metadata: {
              name,
              phone,
            },
            publicKey,
            text: "Pay Now",
            onSuccess: () =>
              alert("Thanks for doing business with us! Come back soon!!"),
            onClose: () => alert("Wait! Don't leave :("),
          }
        
    
    return (<>
        
        <div className="bigScreen" id="header">
        <a href="/">
                <img src="Images/EMS.svg" alt="EMS LOGO" id="logo"/>
                </a>
               
                <div id="nav">
                    <nav>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><a href="#shop">Products</a></li>
                            <li><a href="#about">About</a></li>
                            <li><Link to="/register">Blog</Link></li> 
                            {
                                userInfo ? <div> <Link to="/profile" className="profileName"> {userInfo.name}</Link>
                                <Link to="/" className="logout" onClick={logout}>Logout</Link> </div> : 
                                <div className="dropdown">
                                <span className="dropdown-toggle btntog" data-toggle="dropdown">Account</span>
                                <ul className="dropdown-menu">
                                <li><Link to="/signin" className="login">Signin</Link></li>
                                <li><Link to="/register" className="login">Register</Link></li>
                                </ul>
                                </div>
                            }       
                        </ul>
                    </nav>
                    
                    <div id="cart" 
                    onClick={() => {
                        if(!isActive){
                        handleShow()
                        }else{
                            handleHide()
                        }
                    }}>
                    <span id="cartNum">{props.items.length}</span>
                    <img src="Images/cart.svg" alt="cart"/>
                    </div>
            </div> 
             
        {isActive ? <div id="cartBox">
                    <table>
                        <thead id="head"> 
                        <tr>
                            <th>S/N</th>
                            <th>Item</th>
                            <th>Price</th>
                            <th id="quant">Quantity</th>
                            <th></th>
                        </tr>
                    </thead>
                    {cartItems}
                    </table>

                    <div id="cartAmount">
                    <h2>Total Amount to be paid</h2>
                    <span>{amountC}</span><br/> 
                    <div className="checkbtn">
                    <button onClick={() => handleHide()} ><a  href="#shop">Continue Shopping</a></button>
                    <button onClick={() =>handlCheckShow()}> Go to checkout</button>
                    <button  onClick={handleHide}>Close cart</button>
                    </div>
                </div>
                </div> : null }
                 {/*******************checkout ********************************/}
        { checkoutActive ? <div className="checkout">
                <form action="" className="form">
                        <input type="text" id="name" placeholder="Your Name" required  onChange={(e) => setName(e.target.value)}/><br/>
                        <input type="email" id="email-address" placeholder="Your Email" required onChange={(e) => setEmail(e.target.value)}/><br/>
                        <input type="tel" id="tel" placeholder="Your Phone Number" required onChange={(e) => setPhone(e.target.value)}/><br/>
                    </form>
                    <div id="summary">
                <table>
                <thead id="head"> 
                        <tr>
                            <th>S/N</th>
                            <th>Item</th>
                            <th>Price</th>
                            <th id="quant">Qty</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    {cartSummary}</table>
                    <span>Total Price: {amountC}</span>
                </div> 
                
                    <div className="checkbtn">  
                    <button id="cont">Checkout</button>
                    <PaystackButton {...componentProps} />
                    <button onClick={() =>handleCheckHide()}>Close</button>
                    </div>
                </div>  : null }
                </div>
  {/*****************Header for small screen*****************/}
            <div>
            <div id="header" className="smallScreen">
            <a href="/">
                <img src="Images/EMS.svg" alt="EMS LOGO" id="logo"/>
                </a>
                <div className="headerCont">

                <div>
            {
                  userInfo ? <Link to="/profile" className="profileName"> Welcome {userInfo.name}</Link> : 
                              null
                            } 
                            </div>
                <div id="nav">
                    <div id="cart" 
                    onClick={() => {
                        if(!isActive){
                        handleShow()
                        }else{
                            handleHide()
                        }
                    }}>
                    <span id="cartNum">{props.items.length}</span>
                    <img src="Images/cart.svg" alt="cart"/>
                    </div>
                    <div>
            <button className="sideIcon" onClick={()=>openMenu()}>&#9776;</button>
            </div>
            </div> 
            
            </div>
        {isActive ? <div id="cartBox">
                    <table>
                        <thead id="head"> 
                        <tr>
                            <th>S/N</th>
                            <th>Item</th>
                            <th>Price</th>
                            <th id="quant">Quantity</th>
                            <th></th>
                        </tr>
                    </thead>
                    {cartItems}
                    </table>

                    <div id="cartAmount">
                    <h2>Total Amount to be paid</h2>
                    <span>{amountC}</span><br/> 
                    <div className="checkbtn">
                    <button onClick={() => handleHide()} ><a  href="#shop">Continue Shopping</a></button>
                    <button id="checkout" onClick={() =>handlCheckShow()}> Go to checkout</button>
                    <button  onClick={handleHide}>Close cart</button>
                    </div>
                </div>
                </div> : null }
        { checkoutActive ? <div className="checkout">
                <form action="" className="form">
                        <input type="text" id="name" placeholder="Your Name" required/><br/>
                        <input type="email" id="email-address" placeholder="Your Email" required/><br/>
                        <input type="tel" id="tel" placeholder="Your Phone Number" required/><br/>
                    </form> <br/>
                   
                    <div id="summary">
                <table>
                <thead id="head"> 
                        <tr>
                            <th>S/N</th>
                            <th>Item</th>
                            <th>Price</th>
                            <th id="quant">Qty</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    {cartSummary}</table>
                    <span>Total Price: {amountC}</span>
                </div> 
                    <div className="checkbtn">  
                    <button id="cont">Checkout</button>
                    <button onClick={() =>handleCheckHide()}>Close</button>
                    </div>
                </div>  : null }

    {menuActive ?   <aside className="sideBar">
                    <button className="closeMenuBar" onClick={() => closeMenu()}>x</button>
                    <nav>
                        <ul>
                            <li><Link to="/" onClick={() => closeMenu()}>Home</Link></li>
                            <li><Link to="/main" onClick={() => closeMenu()}>Product</Link></li>
                            <li><a href="#about">About</a></li>
                            <li><a href="#df">Blog</a></li>
                            <li><Link to="/signin" onClick={() => closeMenu()}>Signin</Link></li>
                            <li><Link to="/register" onClick={() => closeMenu()}>Register</Link></li>
                            <li><Link to="/"  onClick={() =>{ logout(); closeMenu()}}>Logout</Link> </li>
                            
                        </ul>
                    </nav>
                    </aside>
                    : null }
            </div>
            
            </div>
           
    </>
    )
}
    

export default Header
