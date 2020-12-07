import React, {Component} from 'react';
import 'C:/Users/Gebruiker/Desktop/Engineering/demo/src/src/webapp/src/App.css';
import {Link} from "react-router-dom";

class Logo extends Component {

    render() {
        return (
            <Link to={"/"}><img draggable={"false"} alt="" className="Logo" src={require('./Images/logo.png')}/></Link>
        );
    }
}

export default Logo;