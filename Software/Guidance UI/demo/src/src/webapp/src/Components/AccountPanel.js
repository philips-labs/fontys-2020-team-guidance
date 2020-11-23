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

    //Change bound input state value onchange
    handleInputChange = (e) => {
        this.setState({
            NameInput: e.target.value
        })
    }

    //Change bound state value to input value on enter press
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
                    <input onKeyDown={this.handleInputSubmit} onChange={this.handleInputChange} className="ssidInput" value={"Name"} readOnly={true}/>
                </div>
                <div className="accountObject">
                    <img alt="" className="accountObjectPP" src={require('./Images/pf.png')}/>
                    <input className="ssidInput" defaultValue={"Image link"} readOnly={true}/>
                </div>
            </div>
        );
    }
}

export default AccountPanel;