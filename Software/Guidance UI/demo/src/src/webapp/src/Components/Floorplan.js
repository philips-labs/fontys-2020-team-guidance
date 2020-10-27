import React, {Component} from 'react';
import 'C:/Users/Gebruiker/Desktop/Engineering/demo/src/src/webapp/src/App.css';

class Floorplan extends Component {
    constructor(props) {
        super(props);

        this.state = {
            diffX: 0,
            diffY: 0,
            dragging: false,
            styles: {},
            scroll: 1
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
            screenX = e.screenX;
            screenY = e.screenY;
        }
        else {
            screenX = e.touches[0].clientX;
            screenY = e.touches[0].clientY;
        }

        this.setState({
            diffX: screenX - e.currentTarget.getBoundingClientRect().left,
            diffY: screenY - e.currentTarget.getBoundingClientRect().top,
            dragging: true
        })
    }

    _dragging(e) {
        if(this.state.dragging && e.screenX !== 0) {
            let left;
            let top;

            if(e.screenX) {
                left = e.screenX - this.state.diffX;
                top = e.screenY - this.state.diffY;
            }
            else if(e.touches[0]) {
                left = e.touches[0].clientX - this.state.diffX;
                top = e.touches[0].clientY - this.state.diffY;
            }

            this.setState({
                styles: {
                    left: left,
                    top: top
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

        if(e.deltaY === 100 && this.state.scroll < 1.5) {
            floorplan.style.transform = "scale("+ (this.state.scroll += 0.1) +")";
        }
        else if(this.state.scroll > 0.5) {
            floorplan.style.transform = "scale("+ (this.state.scroll -= 0.1) +")";
        }
    }

    render() {
        return (
            <img alt=""
                 className="img"
                 id="floorplan-container-image"
                 draggable="false"
                 src={require('../Components/Images/testa.png')}
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
