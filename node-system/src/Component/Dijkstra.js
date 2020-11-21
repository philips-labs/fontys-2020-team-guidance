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
            problem: [
                {0: {adj_id: [1], distance: [3]}},
                {1: {adj_id:[2], distance: [5]}},
                {2: {adj_id: [3, 4], distance: [6, 4]}},
                {3: {adj_id: [5], distance: [3]}},
                {4: {adj_id: [], distance: []}},
                {5: {adj_id: [], distance: []}}
        
                //example:
                // start: {A: 5, B: 2},
                // A: {C: 4, D: 2},
                // B: {A: 8, D: 7},
                // C: {D: 6, finish: 3},
                // D: {finish: 1},
                // finish: {}
            ],

            maximised_nodes: [
                {0: {adj_id: [1], distance: [Number.MAX_VALUE]}},
                {1: {adj_id:[2], distance: [Number.MAX_VALUE]}},
                {2: {adj_id: [3, 4], distance: [Number.MAX_VALUE, Number.MAX_VALUE]}},
                {3: {adj_id: [5], distance: [Number.MAX_VALUE]}},
                {4: {adj_id: [], distance: []}},
                {5: {adj_id: [], distance: []}}
            ],

            settled_nodes: [],
            unsettled_nodes: []
        }

    const dijkstra = () =>{
        this.setState({
            unsettled_nodes: [this.state.problem.start]
        });
    }

    const getLowestNode = () =>{
        let lowestDistanceNode = [];
        let lowestDistance = Number.MAX_VALUE;
        
        for(const node of this.state.unsettled_nodes)
        {
            if(node.distance < lowestDistance)
            {
                lowestDistance = node.distance;
                lowestDistanceNode = node;
            }
        }
        return lowestDistanceNode;
    }

    const calculateMinimumDistance = () =>{
        
    }
}