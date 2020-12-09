import React, {Component} from 'react';
import './../App.css';
import {Link} from "react-router-dom";

class Logo extends Component {

    render() {
        return (
            <Link to={"/"}><img draggable={"false"} alt="" className="Logo" src={require('./Images/logo.png')}/></Link>
        );
    }
}

export default Logo;