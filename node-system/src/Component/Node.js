import React, {Component} from 'react';
import Waypoint from './Images/waypoint.png';
import Start from './Images/startingPoint.png';
import End from './Images/endPoint.png';
import './Node.css';

export default class Node extends Component {
    constructor(prop) {
        super(prop);
        this.state = {
            connectedNodes: [],
            nodeData: this.props.data,
            nodeType: this.props.type,
        };
    }

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

    render() {
        if (this.state.nodeType === "start")
        {
            return (
                <div>
                    <img className='nodeImg' src= {Start} alt=''/>
                </div>
            )
        }
        else if (this.state.nodeType === "end")
        {
            return (
                <div>
                    <img className='nodeImg' src= {End} alt=''/>
                </div>
            )
        }
        return (
            <div className={this.getStyle()}>
                <img className='nodeImg' src= {Waypoint} alt=''/>
            </div>

        )
    }
}