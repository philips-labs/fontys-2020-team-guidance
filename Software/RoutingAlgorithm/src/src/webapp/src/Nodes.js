import React, {Component} from 'react';

class AdminMenu extends Component {

    constructor(props) {
        super(props);

        this.state = {
            nodeLocations: [
                [200, 200],
                [400, 200],
                [600, 200],
                [400, 400],
                [400, 600],
                [400, 800],
                [200, 800],
                [600, 800]
            ],
            startNode: 0,
            endNode: 0,
            nodeConnections: [
                [1],
                [0, 2, 3],
                [1],
                [1, 4],
                [3, 5],
                [4, 6, 7],
                [5],
                [5]
            ]
        }
    }

    clearNodeColors = () => {
        for(let i = 0; i < this.state.nodeLocations.length; i++) {
            document.getElementById(i).style.color = "red";
        }
    }

    findPath = () => {
        this.clearNodeColors();

        let tempNodeConnections = [
            [1],
            [0, 2, 3],
            [1],
            [1, 4],
            [3, 5],
            [4, 6, 7],
            [5],
            [5]
        ];
        let found = false;
        let foundRoute = [];

        let currentNode = this.state.startNode;

        while(!found) {
            let nextNode;
            if(tempNodeConnections[currentNode].length > 0) {nextNode = tempNodeConnections[currentNode][0]}

            console.log(currentNode + " > " + nextNode);

            console.log("Before: " + tempNodeConnections[nextNode]);

            if(tempNodeConnections[nextNode][0] === currentNode && tempNodeConnections[nextNode].length > 1) {
                tempNodeConnections[nextNode] = tempNodeConnections[nextNode].slice(1);
            }

                if(nextNode === this.state.endNode) {
                let route = this.state.startNode;
                let addedRoute = route;
                document.getElementById(addedRoute).style.color = "darkgreen";

                while(parseInt(tempNodeConnections[addedRoute]) !== this.state.endNode) {
                    addedRoute = tempNodeConnections[addedRoute][0];
                    route += ", " + addedRoute;
                    document.getElementById(addedRoute).style.color = "lime";
                }

                addedRoute = tempNodeConnections[addedRoute][0];
                document.getElementById(addedRoute).style.color = "lightgreen";
                route += ", " + addedRoute;
                console.log("Route: " + route);

                break;
            }

            console.log("After: " + tempNodeConnections[nextNode]);

            currentNode = nextNode;
            if(currentNode === this.state.endNode) break;
        }
    }

    handleStartNode = (e) => {
        console.log(e.target.value);

        let nmbr;

        if(e.target.value.length > 0) {
            nmbr = parseInt(e.target.value);
        }

        this.setState({
            startNode: nmbr
        })
    }

    handleEndNode = (e) => {
        console.log(e.target.value);

        let nmbr;

        if(e.target.value.length > 0) {
            nmbr = parseInt(e.target.value);
        }

        this.setState({
            endNode: nmbr
        })
    }

    render() {
        return (
            <div id={"nodeContainer"} className={"AdminMenu"}>
            {
                this.state.nodeLocations.map((item, key) => {
                    return <div style={{position: "absolute", left: item[0], top: item[1], color: "red"}} id={key}><img style={{width: "1vw", filter: "invert(40%)"}} src={"https://cdn.onlinewebfonts.com/svg/img_558580.png"}/>{key}</div>
                })
            }
            <input style={{backgroundColor: "transparent", border: "1px solid #4f4f4f", color: "#878787", fontSize: "1.2vw", textAlign: "center"}} onChange={this.handleStartNode} value={this.state.startNode}/>
            <input style={{backgroundColor: "transparent", border: "1px solid #4f4f4f", color: "#878787", fontSize: "1.2vw", textAlign: "center"}} onChange={this.handleEndNode} value={this.state.endNode}/>
            <button style={{backgroundColor: "transparent", border: "1px solid #4f4f4f", color: "#878787", fontSize: "1.2vw", textAlign: "center"}} onClick={this.findPath}>Find Route</button>
            </div>
        );
    }
}

export default AdminMenu;
