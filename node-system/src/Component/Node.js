import React, {Component} from 'react';
import Waypoint from './Images/waypoint.png';
import './Node.css';

export default class Node extends Component {
    constructor(prop) {
        super(prop);
        this.state = {
            connectedNodes: [],
            nodeData: this.props.data
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
        return (
            <div className={this.getStyle()}>
                <img className='nodeImg' src= {Waypoint} alt=''/>
            </div>

        )
    }
}