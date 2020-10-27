import React, {Component} from 'react';
import Node from './Node.js';
import Draggable from './Draggable.js';
import './Node.css';

export default class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nodeList: [],
            nodeId: 0
        }
        this.newNode = this.newNode.bind(this);
    }

    newNode() {
        const item = this.state.nodeList;
        const id = this.state.nodeId;
        item.push({id})
        this.setState({nodeList: item})
        this.setState({nodeId: id + 1})
        console.log(this.state.nodeList)
    }

    render() {
        return(    
            <div>
                <button onClick={this.newNode}>new Node</button>
                {this.state.nodeList.map((item, key) => {
                    return (
                        <Draggable key={key}><Node key={key}/></Draggable>
                    );
                })}
            </div>
        );
    }


}