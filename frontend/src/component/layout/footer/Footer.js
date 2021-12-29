import React from 'react';
import playStore from '../../../images/playstore.png';
import appStore from '../../../images/Appstore.png';
import './Footer.css'

const Footer = () => {
    return (
        <footer>
            <div className="leftFooter">
            <h4>DOWNLOAD OUR APP</h4>
            <p> Download App for Android And IOS Mobile Phone</p>
            <img src={playStore} alt="playStore" />
            <img src={appStore} alt="appStore" />
            </div>
            <div className="midFooter">
                <h1>AUDIOBOOK'S</h1>
                <p>High Quality is our First Priority</p>
                <p>Copyrights 2021 &copy; MeBaluGayake </p>
            </div>
            <div className="rightFooter"> 
            <h4>Follow Us</h4>
            <a href="https://www.facebook.com/balu.gayake.7">FaceBook</a>
            <a href="https://www.instagram.com/balu_666254/">Instagram</a>
            <a href="https://www.linkedin.com/in/balu-gayake-b73a21197/">linkedin</a>
            </div>
        </footer>
    )
}

export default  Footer;
