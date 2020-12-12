import React, {Component} from 'react';
import './../App.css';

class Floorplan extends Component {
    constructor(props) {
        super(props);

        this.state = {
            diffX: 0,           //x of Mouse on image
            diffY: 0,           //y of Mouse on image
            dragging: false,    //if mousedown+move
            styles: {},         //style container for image
            scroll: 1           //zoom for image 1=100%
        }

        this._dragStart = this._dragStart.bind(this);
        this._scroll = this._scroll.bind(this);
    }

    _dragStart(e) {
        let screenX;
        let screenY;

        if(e.screenX) {
            screenX = e.screenX; //Mouse x
            screenY = e.screenY; //Mouse y
        }
        else {
            screenX = e.touches[0].clientX; //Touch x
            screenY = e.touches[0].clientY; //Touch y
        }

        this.setState({
            diffX: screenX - e.currentTarget.getBoundingClientRect().left, //Mouse\Touch x - Image x
            diffY: screenY - e.currentTarget.getBoundingClientRect().top, //Mouse\Touch y - Image y
            dragging: true
        })
    }

    _scroll(e) {
        const floorplan = document.getElementById("floorplan-container");

        if(e.deltaY > 0 && this.state.scroll < 4.5) { //Max scale 450%
            floorplan.style.transform = "scale("+ (this.state.scroll += 0.1) +")"; //Scale up 10%
        }
        else if(this.state.scroll > 0.5) { //Min scale 50%
            floorplan.style.transform = "scale("+ (this.state.scroll -= 0.1) +")"; //Scale down 10%
        }
    }

    render() {
        return (
            <div id={"floorplan-container"}>
                <div style={{position: "absolute", left: "1070px", top: "320px", backgroundColor: "#2166cf", padding: "8px", borderRadius: "45px", border: "1px solid white"}}/>
                <img alt=""
                     className="img"
                     id="floorplan-container-image"
                     draggable="false"
                     style={this.state.styles}
                     onMouseDown={this._dragStart}
                     onTouchStart={this._dragStart}
                     onWheel={this._scroll}
                     onClick={this.onload}
                />
            </div>
        );
    }
}

export default Floorplan;
