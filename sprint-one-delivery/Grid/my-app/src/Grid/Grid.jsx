import React, { Component } from "react";
import Node from './Node/Node';

import './Grid.css';

export default class Grid  extends Component {

    state = {
        nodes: [],
    }

    componentDidMount() {
        const nodes = [];
        for (let row = 0; row < 80; row++) {
            const currentRow = [];
            for (let col = 0; col < 100; col++) {
                currentRow.push([]);
            }
            nodes.push(currentRow);
        }
        this.setState({nodes})
    }

    render() {
        const {nodes} = this.state;
        console.log(nodes);

        return (
            <div className="Grid">
                {nodes.map((row, rowIdx) => {
                    return <div key={rowIdx} className = "row">
                        {row.map((node, nodeIdx) => <Node key = {nodeIdx}></Node>)}
                    </div>
                })}
            </div>
        );
    }
}
