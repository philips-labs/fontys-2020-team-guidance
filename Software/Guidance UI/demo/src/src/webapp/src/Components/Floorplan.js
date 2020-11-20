import React, {Component} from 'react';
import 'C:/Users/Gebruiker/Desktop/Engineering/demo/src/src/webapp/src/App.css';

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
        this._dragging = this._dragging.bind(this);
        this._dragEnd = this._dragEnd.bind(this);
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

    _dragging(e) {
        if(this.state.dragging && e.screenX !== 0) {
            let left;
            let top;

            if(e.screenX) {
                left = e.screenX - this.state.diffX; //New Mouse x - Mouse x on Image
                top = e.screenY - this.state.diffY; //New Mouse y - Mouse y on Image
            }
            else if(e.touches[0]) {
                left = e.touches[0].clientX - this.state.diffX; //New Touch x - Touch x on Image
                top = e.touches[0].clientY - this.state.diffY; //New Touch y - Touch y on Image
            }

            this.setState({
                styles: {
                    left: left, //Style left
                    top: top //Style top
                }
            });
        }
    }

    _dragEnd() {
        this.setState({
            dragging: false
        })
    }

    _scroll(e) {
        const floorplan = document.getElementById("floorplan-container-image");

        if(e.deltaY > 0 && this.state.scroll < 4.5) { //Max scale 450%
            floorplan.style.transform = "scale("+ (this.state.scroll += 0.1) +")"; //Scale up 10%
        }
        else if(this.state.scroll > 0.5) { //Min scale 50%
            floorplan.style.transform = "scale("+ (this.state.scroll -= 0.1) +")"; //Scale down 10%
        }
    }

    render() {
        return (
            <img alt=""
                 className="img"
                 id="floorplan-container-image"
                 draggable="false"
                 style={this.state.styles}
                 onMouseDown={this._dragStart}
                 onMouseMove={this._dragging}
                 onMouseUp={this._dragEnd}
                 onTouchStart={this._dragStart}
                 onTouchMove={this._dragging}
                 onTouchEnd={this._dragEnd}
                 onWheel={this._scroll}
                 onClick={this.onload}
            />
        );
    }
}

export default Floorplan;
