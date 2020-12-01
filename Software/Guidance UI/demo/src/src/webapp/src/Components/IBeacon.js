import React, {Component} from 'react';
import IBeacon from './Images/iBeacon.png';

export default class Node extends Component {
    constructor(prop) {
        super(prop);
        this.state = {
        };
    }

    // rendering nodes with heat circles
    render() {
        return (
            <div>
                <img className='nodeImg' src= {IBeacon} alt=''/>
                <p>{this.state.nodeId}</p>
            </div>
        )
    }
}