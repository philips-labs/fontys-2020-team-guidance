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
            //<current node id>: {adj_id:[<list of adjacent nodes' IDs>], distance[<distance to said adj nodes' IDs>]}
                problem: [
                    {0: {adj_id: [1], distance: [3]}},
                    {1: {adj_id:[2], distance: [5]}},
                    {2: {adj_id: [3, 4], distance: [6, 4]}},
                    {3: {adj_id: [5], distance: [3]}},
                    {4: {adj_id: [], distance: []}},
                    {5: {adj_id: [], distance: []}}
                ],

                maximised_nodes: [
                    {0: {adj_id: [1], distance: [Number.MAX_VALUE]}},
                    {1: {adj_id:[2], distance: [Number.MAX_VALUE]}},
                    {2: {adj_id: [3, 4], distance: [Number.MAX_VALUE, Number.MAX_VALUE]}},
                    {3: {adj_id: [5], distance: [Number.MAX_VALUE]}},
                    {4: {adj_id: [], distance: []}},
                    {5: {adj_id: [], distance: []}}
                ],
                //should this array be defined more? i.e. add adj_id and distance to it
                settled_nodes: [],
                unsettled_nodes: []
        }
    }

    dijkstra = function(){
        this.setState({
            unsettled_nodes: [this.problem[0]]
        });
        for(let node of this.state.unsettled_nodes)
        {
            
        }
    }

    
    calculateMinimumDistance = function(){
        let sourceDistance = this.state.problem[0]
        sourceDistance((element)=>{
            return element.distance;
        });
        console.log(sourceDistance);
    }

    //finds the node at the lowest value of the unsettled nodes
    getLowestNode = () =>{
        let lowestDistanceNode = [];
        let lowestDistance = Number.MAX_VALUE;
        
        for(let node of this.state.unsettled_nodes)
        {
            if(node.distance < lowestDistance)
            {
                lowestDistance = node.distance;
                lowestDistanceNode = node;
            }
        }
        return lowestDistanceNode;
    }

}