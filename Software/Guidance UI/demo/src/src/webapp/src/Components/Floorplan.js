import React, {Component} from 'react';
import 'C:/Users/Gebruiker/Desktop/Engineering/demo/src/src/webapp/src/App.css';

class Floorplan extends Component {

    render() {
        return (
            <img alt="" className="img" id="floorplan-container-image" draggable="false" src={require('../Components/Images/testa.png')}/>
        );
    }
}

export default Floorplan;
