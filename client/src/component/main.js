/* eslint-disable jsx-a11y/anchor-has-content */
 // import React, { useState } from 'react';
import './main.css';

function Main(props) {
    const addToCart = (product) => { 
    const cartItems = props.cart.slice()  
    let itemInCart = false
    
    cartItems.forEach(item => {
        if(item.id === product.id){
            itemInCart = true
        }
    }); 
    if(!itemInCart)   {
         product = {...product}
        props.setCart([...props.cart, product]) 
    }
          
     }

    const listItems = 
    props.loading? <div>loading....</div> :
    props.error? <div>{props.error}</div> :
    props.products.map((product, idx) => (
        <div key ={idx} className="items">
        <div className="imgTooltip">
        <img src={product.img} alt=""/>
        <div className="tooltipTxt">
            <h2>Price</h2>
        <span>{product.price}</span>
        </div>
    </div>
    <div>
       
     <h3>{product.name} <span className="dropdown">
                                <span className="dropdown-toggle btntog" data-toggle="dropdown"><i className="fa fa-info-circle" aria-hidden="true"></i></span>
                                <ul className="dropdown-menu">
                                <h4> {product.name}</h4>
                                <li><b>Price:{product.price} </b></li>
                                <li><b>Color:</b> {product.color}</li>
                                <li><b>Description:</b> {product.description} </li>
                                </ul>
                                </span>
                                </h3>
        
    </div>
    <button className="btn2" value={props.products.id} onClick={() => addToCart(product)}>ADD TO CART</button>
    </div>
   
   )) ;
  
   
            return (
                <div>
                    <div id="mainContainer">
                        <div id="main">
                            <h1>THE E-MILLENIAL STORE</h1>
                                <img src="Images/heroImage.png" alt=""/>
                            </div>
                            <div>
                            <button className="btn1"><a href="#products"> SHOP NOW </a></button>
                            </div>
                    </div>
                       <div id="about">
                            <p>E-Millenial Store is an hypothetical online stroe for 
                                gadgets we believe every 'Millenial' or 'Gen-Z' should have today.
                            We've got mobile phones, laptops. smartwatches and other gadgets. 
                            Explore all our gadgets and choose the ones that suit you.
                            </p>
                    </div>

                    <div id="shop">
                        <h2>OUR GADGETS</h2>
                       
                        <div id='products'>
                            {listItems}
                            
                        </div> 
                    </div>
                </div>
                
        )

}
export default Main