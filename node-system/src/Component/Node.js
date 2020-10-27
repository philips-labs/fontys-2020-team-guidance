import React, {Component} from 'react';
import Waypoint from './waypoint.png';
import './Node.css';

export default class Node extends Component {
    constructor(prop) {
        super(prop);
        this.state = {};
    }

    render() {
        return (<img className= 'nodeImg' src= {Waypoint} alt=''></img>)
    }
}