import React, {Component} from 'react';
import Node from './Node.js';
import Draggable from './Draggable.js';
import DemoMap from './Images/background.png';
import data from "../Media/media.json";
import './Node.css';
import '../App.css';
import { render } from '@testing-library/react';

export default class DijkstraPath extends Component{

    constructor(path_props){
    //to implement incoming data, this for now is hardcoded
    super(path_props);
        this.state = {
            //Object array explanation: 
            //<current node id>: {adj_id:[<list of adjacent nodes' IDs>], distance:[<distance to said adj nodes' IDs>], distance_src: <distance to source>}

            //HOW TO TAKE DATA FROM PROBLEM STATE:
            //calling problem[0].distance[0] for instance directly does not work. You have to give a parameter the value of problem[0]
            //then call that parameter with .distance_adj[0]
            //EXAMPLE: let sourceDistance = this.state.problem[0]
            // console.log(sourceDistance[0].adj_id[0])
                problem: [
                    {0: {adj_id: [1], distance_adj: [3] , distance_src:0, type: "start", shortest_path: []}},
                    {1: {adj_id:[2], distance_adj: [5] , distance_src:Number.MAX_VALUE, type: "intermediary", shortest_path: []}},
                    {2: {adj_id: [3, 4], distance_adj: [6, 4] , distance_src:Number.MAX_VALUE, type: "intermediary", shortest_path: []}},
                    {3: {adj_id: [5], distance_adj: [3] , distance_src:Number.MAX_VALUE, type: "intermediary", shortest_path: []}},
                    {4: {adj_id: [], distance_adj: [] , distance_src:Number.MAX_VALUE, type: "intermediary", shortest_path: []}},
                    {5: {adj_id: [], distance_adj: [] , distance_src:Number.MAX_VALUE, type: "end", shortest_path: []}}
                ],

                // solution: [
                //     {0: {adj_id: [1], distance_adj: [3] , distance_src:0, type: "start"}},
                //     {1: {adj_id:[0,2], distance_adj: [3,5] , distance_src:Number.MAX_VALUE, type: "normal"}},
                //     {2: {adj_id: [1, 3, 4], distance_adj: [5, 6, 4] , distance_src:Number.MAX_VALUE, type: "normal"}},
                //     {3: {adj_id: [5], distance_adj: [3] , distance_src:Number.MAX_VALUE, type: "normal"}},
                //     {4: {adj_id: [2], distance_adj: [4] , distance_src:Number.MAX_VALUE, type: "normal"}},
                //     {5: {adj_id: [3], distance_adj: [3] , distance_src:Number.MAX_VALUE, type: "end"}}
                // ],

                //arrays to keep the unsettled and settled nodes in check
                //unsettled - has not had their value checked
                //settled - has had their value checked and counted in the final path function
                settled_nodes: [],
                unsettled_nodes: [],
                solution: []
        }
        this.dijkstra = this.dijkstra.bind(this);
        this.getLowestDistanceNode = this.getLowestDistanceNode.bind(this);
        this.calculateMinimumDistance = this.calculateMinimumDistance.bind(this);
    }

    componentDidMount() { console.log("Mounted!"); }

    dijkstra = function(){
        //add the start node to the list of unsettled nodes
        let unsettled_replacement = this.state.unsettled_nodes
        unsettled_replacement.push(this.state.problem[0])
        this.setState(({unsettled_nodes}) => ({
            unsettled_nodes: unsettled_replacement
        }))
        console.log(this.state.unsettled_nodes)

        //function continues until the unsettled_nodes list is empty, but it adds more in it in the while itself so
        //in reality, the loop should end once all the nodes have been explored
        while(this.state.unsettled_nodes.length !== 0)
        {
            //gets lowest cost node in the unresolved nodes
            let currentNode = this.getLowestDistanceNode()
            
            console.log(currentNode)

            //replace unsettled array in state while removing the current node
            let replacementArray = this.state.unsettled_nodes
            let index = replacementArray.indexOf(currentNode);
            replacementArray.splice(index, 1)
            console.log(this.state.unsettled_nodes)
            this.setState(({unsettled_nodes}) => ({
                unsettled_nodes: replacementArray
            }))
            console.log(this.state.unsettled_nodes)

            //go through all connected nodes of the current node in a loop
            let currentNode_adj_distance = new Array(currentNode[0].distance_adj)
            for(let i=0;i<currentNode_adj_distance.length;i++)
            {
                //creates an Object from the given node with data of just 1 node, then sends it to the calculateMinimumDistance method
                let test_object = new Object(currentNode)
                // let adjacent_distance = currentNode[0].distance_adj[i]
                // let adjacent_id = currentNode[0].adj_id[i]
                // let source_distance = currentNode[0].distance_src
                // let adj_node = {adj_id: adjacent_id, distance_adj: adjacent_distance , distance_src: source_distance, type: "intermediary", shortest_path: []}
                let adj_node = test_object //check - either an array now or later
                console.log(adj_node)


                //calculateMinumumDistance adds the given node to settled nodes if it's not in there yet
                if(!this.state.settled_nodes.includes(adj_node))
                {
                    this.calculateMinimumDistance(adj_node)
                    let replacementArray1 = this.state.settled_nodes
                    replacementArray1.push(adj_node)
                    this.setState(({settled_nodes}) => ({
                        settled_nodes: replacementArray1
                    }))
                    console.log(adj_node)
                }
            }
        }
    }

    //calculates the distance a node for evaluation to the source/start
    calculateMinimumDistance = function(eval_node){
        //source = start node, used to compare distance from it to the eval_node
        let source = this.state.problem[0] //perhaps access node before the current eval_node? 
        console.log(this.state.problem[0])
        let sourceDistance = source[0].distance_src
        console.log(sourceDistance)

        //compares distance of source (current node's predecessor) to the given distance to the end, by default at int_max
        if(sourceDistance + eval_node[0].distance_adj[0] < eval_node.distance_src)
        {
            eval_node.distance_src = sourceDistance+ eval_node.distance_adj[0]
        }
        let shortestPath = source[0].shortest_path

        //adds shortest path list for the current node and pushes to the main array
        shortestPath.push(this.state.problem[0])
        eval_node.shortest_path = shortestPath;
        let replacementArray = this.state.problem
        let index = replacementArray.indexOf(eval_node)
        replacementArray.splice(index, 1, eval_node)
        this.setState(({problem}) => ({
            problem: replacementArray
        }))
    }

    //finds the node at the lowest value of the unsettled nodes
    getLowestDistanceNode = () =>{
        let lowestDistanceNode = []
        let lowestDistance = Number.MAX_VALUE

        console.log(this.state.unsettled_nodes)
        
        for(let i=0;i< this.state.unsettled_nodes.length; i++)
        {
            let node = this.state.unsettled_nodes[i]
            console.log(node)
            // console.log(this.state.unsettled_nodes.indexOf(node)) - checking for nodes in the array
            let node_test = Object.values(node)
            console.log(node_test[0].distance_src) //keep in mind - src or adj
            // let distances = new Array(node_test[0].distance_adj)
            // console.log(distances)
            let node_adj = new Array(node_test[0].distance_src)
            console.log(node_adj)
                if(node_adj < lowestDistance)
                {
                    lowestDistance = node_test.distance_src
                    lowestDistanceNode = node_test
                    console.log(lowestDistanceNode)
                }
        }
        return lowestDistanceNode
    }
}