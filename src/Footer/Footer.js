import React from 'react'
import classes from './Footer.module.css';
const Footer = (props) => {
    return (
            <footer className={classes.NavButtons}>
                <div>
                    {!props.modal && 
                    <button id="pre" className={classes.Previous}
                    style={props.previousPageURL? {visibility:'visible'}: {visibility: 'hidden'}}
                    onClick = {props.goPrev}>
                        Previous
                    </button>}
                </div>
                <div>
                    {!props.modal && 
                    <button id="next" className={classes.Next}
                    style={props.nextPageURL? {visibility:'visible'}: {visibility: 'hidden'}} 
                    onClick = {props.goNext}>
                        Next
                    </button>}   
                </div>
            </footer>  
    )
}
export default Footer;
