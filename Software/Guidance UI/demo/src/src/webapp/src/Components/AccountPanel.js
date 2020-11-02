import React, {Component} from 'react';
import 'C:/Users/Gebruiker/Desktop/Engineering/demo/src/src/webapp/src/App.css';

class AccountPanel extends Component {

    constructor(props) {
        super(props);

        this.state = {
            Name: "Albert",
            NameInput: "Albert"
        }
    }

    handleInputChange = (e) => {
        this.setState({
            NameInput: e.target.value
        })
    }

    handleInputSubmit = (e) => {
        if(e.keyCode === 13) {
            e.preventDefault()
            this.setState({
                Name: this.state.NameInput
            })
        }
    }


    render() {
        return (
            <div id="accountPanel" className="settingsPanel">
                <p className="settingsHeader">Account</p>
                <div className="divider"/>
                <div className="accountObject">
                    <p className="settingName">{this.state.NameInput}</p>
                    <input onKeyDown={this.handleInputSubmit} onChange={this.handleInputChange} className="ssidInput" value={"Name"}/>
                </div>
                <div className="accountObject">
                    <img alt="" className="accountObjectPP" src={require('./Images/pf.png')}/>
                    <input className="ssidInput" value={"Image link"}/>
                </div>
            </div>
        );
    }
}

export default AccountPanel;
