import React, {Component} from 'react';
import Node from './Node.js';
import Draggable from './Draggable.js';
import DemoMap from './Images/background.png';
import data from "../Media/media.json";
import './Node.css';
import '../App.css';
import { render } from '@testing-library/react';

export default class DijkstraPath extends Component{
    
    // constructor(propPath) {
    //     super(propPath);
    //     this.state = {
    //         //NodesPlaceholder is to transfer hardcoded data from Test.js but it may work when implementing it properly?
    //         nodeList: this.props.nodeListId,
    //         connectedNodes: this.props.connectList,
    //         connectedNodesDistance: this.props.distanceList,
            
    //     };
    //     this.lowestCostNode = this.lowestCostNode.bind(this);
    //     this.dijkstra = this.dijkstra.bind(this);
    //     this.dijkstraRef = React.createRef();
    // }

    constructor(propPath){
        super(propPath);
        this.state={
        problem: {
            start: {A: 3},
            A: {B: 5},
            B: {C: 4, D: 6},
            C: {finish: 3},
            D: {},
            finish: {}
    
            //example:
            // start: {A: 5, B: 2},
            // A: {C: 4, D: 2},
            // B: {A: 8, D: 7},
            // C: {D: 6, finish: 3},
            // D: {finish: 1},
            // finish: {}
        }
        }
    }
    

    // componentDidMount() {
    //     this.props.setClick(this.render);
    //  }
    
    //While the pathfinding uses hardcoded data right now, it won't in future naturally, will need to transfer items from the state
    //to the problem
    // const loadProblem = (nodeList, connectedNodes, connectedNodesDistance) =>
    // {
    //     for(let i=0; i<nodeList.length;i++){
            //To transfer data to problem[]
    //     }
    // };

    lowestCostNode = (costs, processed) => {
        return Object.keys(costs).reduce((lowest, node) => {
        if (lowest === null || costs[node] < costs[lowest]) {
            if (!processed.includes(node)) {
            lowest = node;
            }
        }
        return lowest;
        }, null);
    };
    
    // function that returns the minimum cost and path to reach the end
    dijkstra = (graph) => {
    
        // track lowest cost to reach each node
        const costs = Object.assign({finish: Infinity}, graph.start);
    
        // track paths
        const parents = {finish: null};
        for (let child in graph.start) {
        parents[child] = 'start';
        }
    
        // track nodes that have already been processed
        const processed = [];
    
        let node = this.lowestCostNode(costs, processed);
    
        while (node) {
        let cost = costs[node];
        let children = graph[node];
        for (let n in children) {
            let newCost = cost + children[n];
            if (!costs[n] || costs[n] > newCost) {
                costs[n] = newCost;
                parents[n] = node;
              }
        }
        processed.push(node);
        node = this.lowestCostNode(costs, processed);
        }
    
        let optimalPath = ['finish'];
        let parent = parents.finish;
        while (parent) {
        optimalPath.push(parent);
        parent = parents[parent];
        }
        optimalPath.reverse();
    
        const results = {
        distance: costs.finish,
        path: optimalPath
        };
    
        return results;
    };

    startPathfinding = function(){
        console.log(this.dijkstra(this.problem))
        return (<p>{this.dijkstra(this.problem)}</p>);
    }

    render(){
    return( 
        <p>aa</p>
    )
    }
}