import React, {Component} from 'react';
import Node from './Node.js';
import Draggable from './Draggable.js';
import DemoMap from './Images/background.png';
import data from "../Media/media.json";
import './Node.css';
import '../App.css';
import { render } from '@testing-library/react';

export default function DijkstraPath(){


        //to implement incoming data, this for now is hardcoded
        this.state={
            problem: {
                start: {adj_id: [A], distance: [3]},
                A: {adj_id:[B], distance: [5]},
                B: {adj_id: [C, D], distance: [6, 4]},
                C: {adj_id: [finish], distance: [3]},
                D: {adj_id: [], distance: []},
                finish: {adj_id: [], distance: []}
        
                //example:
                // start: {A: 5, B: 2},
                // A: {C: 4, D: 2},
                // B: {A: 8, D: 7},
                // C: {D: 6, finish: 3},
                // D: {finish: 1},
                // finish: {}
            },

            maximised_nodes: {
                start: {adj_id: [A], distance: [Number.MAX_VALUE]},
                A: {adj_id:[B], distance: [Number.MAX_VALUE]},
                B: {adj_id: [C, D], distance: [Number.MAX_VALUE, Number.MAX_VALUE]},
                C: {adj_id: [finish], distance: [Number.MAX_VALUE]},
                D: {adj_id: [], distance: []},
                finish: {adj_id: [], distance: []}
            },

            settled_nodes_id: [],
            unsettled_nodes_id: []
        }

    const dijkstra = () =>{
        this.setState({
            unsettled_nodes_id: [this.state.problem.start]
        });

        while(this.state.unsettled_nodes_id.length != 0)
        {

        }
    }

    const getLowestNode = () =>{
        let LowestDistancedNode = []
    }

    // render(){
    //     return(
    //         <div></div>
    //     );
    // }   
}