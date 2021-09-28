import React from 'react';
import './footer.css';
function Footer() {
    return (
<div className="footer">
    <div className="aboutUs">
        <div className="companyProduct">
            <ul>
                <h4>Products</h4>
                <li>Apple Watch</li>
                <li>Mac Book</li>
                <li> Samsung Tv</li>
                <li>ipod</li>
            </ul>
        </div>
        <div className="company">
        <ul>
                <h4>Company</h4>
                <li>About us</li>
                <li>Privacy</li>
                <li>Term Of use</li>
                <li></li>
            </ul>
        </div>
        <div className="support">
        <ul>
                <h4>Support</h4>
                <li>Contact Suppot</li>
                <li>FAQ</li>
            </ul>
        </div>
        <div className="contactUs">
        <ul>
                <h4>Socials</h4>
                <li>Facebook</li>
                <li>Twitter</li>
                <li>Telegram</li>
                <li>Chat Us</li>
            </ul>
        </div>
    </div>
    <div id="footer">
    <div id="footLogo">
        <img src="Images/EMS.svg" alt="EMS LOGO"/>
    </div>
    <div id="by">
        <h4>Designed by Tijany</h4>
    </div>
    </div>
    <p>@ 2021 EMS .All rights reserved</p>
    </div>
    )
}

export default Footer