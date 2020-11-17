import React, {Component} from 'react';
import Waypoint from './Images/waypoint.png';
import Start from './Images/startingPoint.png';
import End from './Images/endPoint.png';
import './Node.css';

export default class Node extends Component {
    constructor(prop) {
        super(prop);
        this.state = {
            //NodesPlaceholder is to transfer hardcoded data from Test.js but it may work when implementing it properly?
            connectedNodes: this.props.connectNodesPlaceholder,
            connectedNodesDistance: this.props.connectNodesDistance,
            nodeData: this.props.data,
            nodeType: this.props.type,
        };
    }
    //setting the crouwd circles
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
                    <img className='nodeImg' src= {Start} alt=''/>
                    {/* The p tag is purely for testing if the connectedNodes carried over from Test.js */}
                    {/* <p>{this.state.connectedNodes}</p> */}
                </div>
            )
        }
        else if (this.state.nodeType === "end")
        {
            return (
                <div>
                    <img className='nodeImg' src= {End} alt=''/>
                {/* <p>{this.state.connectedNodes}</p> */}

                </div>
            )
        }
        return (
            <div className={this.getStyle()}>
                <img className='nodeImg' src= {Waypoint} alt=''/>
                {/* <p>{this.state.connectedNodes}</p> */}

            </div>

        )
    }
}