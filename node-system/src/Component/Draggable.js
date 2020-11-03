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
  
      translateX: 0,
      translateY: 0,
  
      lastTranslateX: 0,
      lastTranslateY: 0
    };
  }


  componentWillUnmount() {
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);
  }

  handleMouseDown = ({ clientX, clientY }) => {
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);

    if (this.props.onDragStart) {
      this.props.onDragStart();
    }

    this.setState({
      originalX: clientX,
      originalY: clientY,
      isDragging: true
    });
  };

  handleMouseMove = ({ clientX, clientY }) => {
    const { isDragging } = this.state;
    const { onDrag } = this.props;

    if (!isDragging) {
      return;
    }

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

  handleMouseUp = () => {
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);

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

  onTrigger = () => {
    this.props.parentCallback(this.state.id, this.state.translateX, this.state.translateY, this.state.type);
}

  render() {
    const { children } = this.props;
    const { translateX, translateY, isDragging } = this.state;

    return (
      <Container
        onMouseDown={this.handleMouseDown}
        onClick={this.onTrigger}
        x={translateX}
        y={translateY}
        isDragging={isDragging}
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