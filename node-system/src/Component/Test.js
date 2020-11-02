import React, {Component} from 'react';
import Node from './Node.js';
import Draggable from './Draggable.js';
import DemoMap from './Images/background.png';
import data from "../Media/media.json";
import './Node.css';
import '../App.css';

export default class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nodeList: [],
            nodeId: 0,
            nodeData: data,
            x: 0,
            y: 0
        }
        this.newNode = this.newNode.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    newNode = () => {
            const item = this.state.nodeList;
            const id = this.state.nodeId;
            const x = 0;
            const y = 0;
            item.push({id, x, y});
            this.setState({nodeList: item});
            this.setState({nodeId: id + 1})
    }


    onSave = (id, childX, childY) =>{
        this.setState({x: childX, y: childY})

        const item = this.state.nodeList;
        const x = this.state.x;
        const y = this.state.y;
        item[id] = {id, x, y};
    }

    render() {
        return(    
            <div className={'App'}>

                <div className={'Heatmap'}>
                    <img src={DemoMap} alt={"demo map"} />
                </div>

                <div>
                    <button onClick={this.newNode}>new Node</button>
                    {/*<button onClick={this.onSave}>save</button>*/}
                    {this.state.nodeList.map((item, key) => {
                        return (
                            <Draggable parentCallback={this.onSave} id={key} key={key}>
                                <Node key={key} data={this.state.nodeData} nodeId={key}/>
                            </Draggable>
                        );
                    })}
                </div>


            </div>
        );
    }


}