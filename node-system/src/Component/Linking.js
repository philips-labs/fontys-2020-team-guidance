import React, {Component} from 'react'

export default class Linking extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            inputs: [],
            nodeList: this.props.nodeList,
            count: 0,
            selectedNode: "",
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
        console.log(this.state.nodeList);
        var test = []
        try {
        this.state.inputs.forEach(element => {
            var value = element.value;
            test.push(value);
        })
        const newArr1 = this.state.nodeList;
        newArr1[this.state.selectedNode].nodeConnections = test;
        test.forEach(element => {
            newArr1[element].nodeConnections = this.state.selectedNode;
        })
        this.setState({nodeList: newArr1})
        } catch {
            
        }
        console.log(this.state.nodeList);
    }
}
