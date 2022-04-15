import React from 'react'
import classes from './Footer.module.css';
const Footer = (props) => {

    const {modal, previousPageURL, goPrev, nextPageURL, goNext} = props
    
    return (
            <footer className={classes.NavButtons}>
                <div>
                    {!modal && 
                    <button id="pre" className={classes.Previous}
                    style={previousPageURL? {visibility:'visible'}: {visibility: 'hidden'}}
                    onClick = {goPrev}>
                        Previous
                    </button>}
                </div>
                <div>
                    {!modal && 
                    <button id="next" className={classes.Next}
                    style={nextPageURL? {visibility:'visible'}: {visibility: 'hidden'}} 
                    onClick = {goNext}>
                        Next
                    </button>}   
                </div>
            </footer>  
    )
}
export default Footer;
