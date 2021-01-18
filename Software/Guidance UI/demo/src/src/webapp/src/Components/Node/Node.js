import React, {Component} from 'react';
import Waypoint from '../Images/waypoint.png';
import Start from '../Images/startingPoint.png';
import End from '../Images/endPoint.png';
import Stair from '../Images/stairs.png';

export default class Node extends Component {
    constructor(prop) {
        super(prop);
        this.state = {
            connectedNodes: [],
            nodeData: this.props.data,
            nodeType: this.props.type,
        };
    }
    // rendering nodes with heat circles
    render() {
        if (this.state.nodeType === "start")
        {
            return (
                <div>
                    <img className='nodeImg' src={Start} alt=''/>
                </div>
            )
        }
        else if (this.state.nodeType === "end")
        {
            return (
                <div>
                    <img className='nodeImg' src={End} alt=''/>
                </div>
            )
        }
        else if (this.state.nodeType === "stairs")
        {
            return (
                <div>
                    <img className='nodeImg' src={Stair} alt=''/>
                    <p className={"nodeTxt"}>{this.props.nodeId}</p>
                </div>
            )
        }
        return (
            <div>
                <img className='nodeImg' src={Waypoint} alt=''/>
                <p className={"nodeTxt"}>{this.props.nodeId}</p>
            </div>
        )
    }
}