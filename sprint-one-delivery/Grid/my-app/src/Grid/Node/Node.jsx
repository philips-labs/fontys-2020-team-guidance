import React, {Component} from 'react';
import './Node.css';

class Node extends Component {
    constructor(props) {
        super(props);
        this.state = {obj: "nothing",colorId: "0"};
    
        // This binding is necessary to make `this` work in the callback
        this.setColor = this.setColor.bind(this);
      }
    
      setColor(e) {
          if (this.state.colorId === "0")
          {
            this.setState({obj: "wall",colorId: "1"});
          }
          else if (this.state.colorId === "1")
          {
            this.setState({obj: "startingpoint",colorId: "2"});
          }
          else if (this.state.colorId === "2")
          {
            this.setState({obj: "endpoint",colorId: "3"});
          }
          else{
            this.setState({obj: "nothing",colorId: "0"});
          }
        }

    render() {
        let id = this.state.colorId;
        let obj = this.state.obj;
        console.log(id);
        console.log(obj);
        return (
        <div className={obj + " node"} id={id} onClick={this.setColor.bind(this)}></div>
        );
    }
}
export default Node;
