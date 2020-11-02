import React, {Component} from 'react';
import Node from './Node.js';
import Draggable from './Draggable.js';
import './Node.css';

export default class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nodeList: [],
            nodeId: 0,
            x: 0,
            y: 0
        } 
    }

    newNode = () => {
        if(this.state.nodeList.length === 0)
        {
            const item = this.state.nodeList;
            const id = 0; 
            const x = 0;
            const y = 0;
            item.push({id, x, y});
            this.setState({nodeList: item});
        }
        
        else {
            const item = this.state.nodeList;
            const id = this.state.nodeId; 
            const x = 0;
            const y = 0;
            item.push({id, x, y});
            this.setState({nodeList: item});
            this.setState({nodeId: id + 1})
            console.log("count " + this.state.nodeId);
        }
    }


    onSave = (id, childX, childY) =>{
        this.setState({x: childX, y: childY})

        const item = this.state.nodeList;
        const x = this.state.x;
        const y = this.state.y;
        item[id] = {id, x, y};
        console.log(this.state.nodeList);
    }

    render() {
        return(    
            <div>
                <button onClick={this.newNode}>new Node</button>
                <button onClick={this.onSave}>save</button>
                {this.state.nodeList.map((item, key) => {
                    return (
                        <Draggable parentCallback={this.onSave} id={this.state.nodeId} key={key}><Node id={this.state.nodeId} key={key}/></Draggable>
                    );
                })}
            </div>
        );
    }


}