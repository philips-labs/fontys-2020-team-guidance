import React, {Component} from 'react';
import 'C:/Users/Gebruiker/Desktop/Engineering/demo/src/src/webapp/src/App.css';

class FloorplanEditPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ssid: this.props.match.params.ssid,
            floorplanid: this.props.match.params.floorplanid,
            image: ''
        }
    }

    componentDidMount() {
        fetch("/books/getFloorplan/" + this.state.ssid + "/" + this.state.floorplanid)
            .then(res => res.json())
            .then(data => this.setState({image: data.image}))
    }

    render() {
        return (
            <div>
                <img src={this.state.image}/>
            </div>
        );
    }
}

export default FloorplanEditPage;
