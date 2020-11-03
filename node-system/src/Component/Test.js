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
            y: 0,
        }
        this.newNode = this.newNode.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    newNode = (e) => {
            const item = this.state.nodeList;
            const id = this.state.nodeId;
            const x = 0;
            const y = 0;
            let type = "waypoint";
            if (e.target.value === "start")
            {
                type = e.target.value;
            }
            else if (e.target.value === "end")
            {
                type = e.target.value;
            }

            item.push({id, x, y, type});
            this.setState({nodeList: item});
            this.setState({nodeId: id + 1})
    }


    onSave = (id, childX, childY, type) => {
        this.setState({x: childX, y: childY})

        const item = this.state.nodeList;
        const x = this.state.x;
        const y = this.state.y;
        item[id] = {id, x, y, type};
    }

    checkStart = () => {
        let exists = false;
        for (let i = 0; i < this.state.nodeList.length; i++)
        {
            console.log(this.state.nodeList)
            if (this.state.nodeList[i].type === "start")
            {
                exists = true;
                break;
            }
            else {
                exists = false;
            }
        }
        if (exists === false) {
            return (<button onClick={this.newNode} value="start">Add Start Point</button>)
        }
        else {
            return null;
        }
    }

    checkEnd = () => {
        let exists = false;
        for (let i = 0; i < this.state.nodeList.length; i++)
        {
            if (this.state.nodeList[i].type === "end")
            {
                exists = true;
                break;
            }
            else {
                exists = false;
            }
        }
        if (exists === false) {
            return (<button onClick={this.newNode} value="end">Add End Point</button>)
        }
        else {
            return null;
        }
    }

    render() {
        return(    
            <div className={'App'}>

                <div className={'Heatmap'}>
                    <img src={DemoMap} alt={"demo map"} />
                </div>

                <div>
                    <button onClick={this.newNode}>New Node</button>
                    <this.checkStart/>
                    <this.checkEnd/>
                    {this.checkEnd}
                    {/*<button onClick={this.onSave}>save</button>*/}
                    {this.state.nodeList.map((item, key) => {
                        return (
                            <Draggable parentCallback={this.onSave} id={key} type={item.type} key={key}>
                                <Node key={key} type={item.type} data={this.state.nodeData} nodeId={key}/>
                            </Draggable>
                        );
                    })}
                </div>
            </div>
        );
    }
}