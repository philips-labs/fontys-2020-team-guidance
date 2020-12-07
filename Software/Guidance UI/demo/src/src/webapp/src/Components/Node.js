import React, {Component} from 'react';
import Waypoint from './Images/waypoint.png';
import Start from './Images/startingPoint.png';
import End from './Images/endPoint.png';
import Stair from './Images/stairs.png';

export default class Node extends Component {
    constructor(prop) {
        super(prop);
        this.state = {
            connectedNodes: [],
            nodeId: this.props.nodeId,
            nodeData: this.props.data,
            nodeType: this.props.type,
        };
    }
    //setting the crowd circles
    getStyle() {
        let connections;
        let data = this.state.nodeData;

        let nodeConnections = data.map((conn) => {
            if(conn.id === this.props.nodeId) {
                connections = conn.connections
            }
            return connections
        })

        if(connections < 5) {
            return 'nodeSmallCircle'
        }
        else if(connections >= 5 && connections < 10){
            return 'nodeMedCircle'
        }
        else if(connections >= 10) {
            return 'nodeBigCircle'
        }
        else return ''
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
                </div>
            )
        }
        return (
            <div>
                <img className='nodeImg' src={Waypoint} alt=''/>
                <p>{this.state.nodeId}</p>
            </div>
        )
    }
}