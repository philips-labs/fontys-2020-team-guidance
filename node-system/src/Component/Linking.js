import React, {Component} from 'react'

export default class Linking extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            inputs: [],
            nodeList: this.props.nodeList,
            count: 0,
            selectedNode: "",
            distance: 0,
        };
    }

    render() {
        return (
            <div className={"linkMenu"}>
                <h2>Node Linker</h2>
                <input placeholder="ID node" onChange={this.handleSelector}></input>

                <div id="dynamicInput">
                       {this.state.inputs.map((item) => <input key={item.id} id={item.id} placeholder={"Connected Node"} onChange={this.handleOnChange}/>)}
                </div>
                <p onClick={() => this.appendInput()}>+</p>
                <button onClick={this.saveLinks}>Save</button>
            </div>
        );
    }

    appendInput() {
        var result = this.state.inputs;
        var id = this.state.inputs.length;
        var value = "";
        if (this.state.inputs.length === 0) {
            id = 0;
        }
        result.push({id, value});
        this.setState({input: result});
    }
    
    handleSelector = (e) => {
        this.setState({selectedNode: e.target.value});
    }

    handleOnChange = (e) => {
        var list = this.state.inputs;
        list[e.target.id].value = e.target.value;
        console.log(list);
    }

    saveLinks = () => {
        const newArr1 = this.state.nodeList;
        newArr1.forEach (element => {
            if (element.nodeConnections === undefined)
            {
                element.nodeConnections = [];
            }
        })

        const selNode = this.state.selectedNode;

        try {
        this.state.inputs.forEach(element => {
            var value = element.value;
            var distance = this.calculateDistance(selNode, value)
            newArr1[selNode].nodeConnections.push({value, distance});
        })

        this.state.inputs.forEach(element => {
            var value = element.value;
            var distance = this.calculateDistance(selNode, value)
            newArr1[value].nodeConnections.push({selNode, distance});
        })

        this.setState({nodeList: newArr1})

        } catch {}
        console.log(this.state.nodeList);
    }

    calculateDistance = (nodeOne, nodeTwo) => {
        var node1 = this.state.nodeList[nodeOne];
        var node2 = this.state.nodeList[nodeTwo];
        var xDiff = node1.x - node2.x;
        var yDiff = node1.y - node2.y;

        if (xDiff < 0) {
            xDiff = xDiff * -1;
        }
        if (yDiff < 0) {
            yDiff = yDiff * -1;
        }
        var distance = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
        return distance;
    }
}
