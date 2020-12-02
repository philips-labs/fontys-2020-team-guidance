import React from 'react';
import styled, { css } from 'styled-components';

export default class Draggable extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      id: this.props.id,
      type: this.props.type,

      isDragging: false,

      originalX: 0,
      originalY: 0,

      translateX: this.props.x,
      translateY: this.props.y,

      lastTranslateX: this.props.x,
      lastTranslateY: this.props.y,

      boundx: this.props.boundx,
      boundy: this.props.boundy,
      width: 0,
      height: 0,
    };
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  // removing listeners
  componentWillUnmount() {
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  // handle mouse events
  handleMouseDown = ({ clientX, clientY }) => {
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);

    if (this.props.onDragStart) {
      this.props.onDragStart();
    }

    // setting mouse coordinates
    this.setState({
      originalX: clientX,
      originalY: clientY,
      isDragging: true
    });
  };

  handleMouseMove = ({ clientX, clientY }) => {
    const {boundx , boundy, height, width} = this.state;
    const { isDragging } = this.state;
    const { onDrag } = this.props;

    if (!isDragging) {
      return;
    }
    if(clientX < (width-boundx)/2 + boundx && clientY < boundy && clientX > (width-boundx)/2 && clientY > 0){
      // calculating coordinate changes
      this.setState(prevState => ({
        translateX: clientX - prevState.originalX + prevState.lastTranslateX,
        translateY: clientY - prevState.originalY + prevState.lastTranslateY
      }), () => {
        if (onDrag) {
          onDrag({
            translateX: this.state.translateX,
            translateY: this.state.translateY
          });
        }
      });
    };
    if (clientX >= (width-boundx)/2 + boundx) {
      this.setState(prevState => ({
        translateX: boundx-20,
        translateY: clientY - prevState.originalY + prevState.lastTranslateY
      }), () => {
        if (onDrag) {
          onDrag({
            translateX: this.state.translateX,
            translateY: this.state.translateY
          });
        }
      });
    };
    if (clientX <= (width-boundx)/2) {
      this.setState(prevState => ({
        translateX: 0-20,
        translateY: clientY - prevState.originalY + prevState.lastTranslateY
      }), () => {
        if (onDrag) {
          onDrag({
            translateX: this.state.translateX,
            translateY: this.state.translateY
          });
        }
      });
    };
    if (clientY >= boundy) {
      this.setState(prevState => ({
        translateX: clientX - prevState.originalX + prevState.lastTranslateX,
        translateY: boundy-40
      }), () => {
        if (onDrag) {
          onDrag({
            translateX: this.state.translateX,
            translateY: this.state.translateY
          });
        }
      });
    };
    if (clientY <= 0) {
      this.setState(prevState => ({
        translateX: clientX - prevState.originalX + prevState.lastTranslateX,
        translateY: 0-40
      }), () => {
        if (onDrag) {
          onDrag({
            translateX: this.state.translateX,
            translateY: this.state.translateY
          });
        }
      });
    };
  };

  handleMouseUp = () => {
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);
    // setting coordinate changes
    this.setState(
        {
          originalX: 0,
          originalY: 0,
          lastTranslateX: this.state.translateX,
          lastTranslateY: this.state.translateY,

          isDragging: false
        },
        () => {
          if (this.props.onDragEnd) {
            this.props.onDragEnd();
          }
        }
    );
  };
  // calling the parent to give data
  onTrigger = (e, transX, transY) => {
    try {this.props.parentCallback(this.state.id, transX, transY, this.state.type);}
    catch {
    }
  }
  // rendering the new location
  render() {
    const { children } = this.props;
    const { translateX, translateY, isDragging } = this.state;

    return (
        <Container
            onMouseDown={this.handleMouseDown}
            onClick={(e) => this.onTrigger(e, translateX, translateY)}
            onMouseUp={(e) => this.onTrigger(e, translateX, translateY)}
            x={translateX}
            y={translateY}
            isDragging={isDragging}
            className = {"node " +  this.state.id}
        >
          {children}
        </Container>
    );
  }
}

const Container = styled.div.attrs(({ x, y}) => ({
  style: {
    transform: `translate(${x}px, ${y}px)`
  }
}))`
  cursor: grab;
  width: 4%;
  position:absolute;
  ${({ isDragging }) =>
    isDragging && css`
    opacity: 0.6;
    cursor: grabbing;
  `};
`;