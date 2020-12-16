import React, {Component} from 'react';
import '../../App.css';
import AuthService from "../../services/auth.service";
import {Link} from "react-router-dom";

class AccountPanel extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: '',
            isLoaded: false
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
        if(e.keyCode === "13") {
            e.preventDefault()
            this.setState({
                Name: this.state.NameInput
            })
        }
    }

    componentDidMount() {
        if (!this.state.isLoaded) {
            const user = AuthService.getCurrentUser();
            this.setState({
                user: user,
                isLoaded: true
            })
        }
    }


    render() {
        return (
            <div id="accountPanel" className="settingsPanel">
                <p data-testid={"setting-header"} className="settingsHeader">Account</p>
                <div className="divider"/>
                <div className="accountObject">
                    <p data-testid={"setting-name"} className="settingName">{this.state.NameInput}</p>
                    <input data-testid={"setting-input"} onKeyDown={this.handleInputSubmit} onChange={this.handleInputChange} className="ssidInput" value={"Name"} readOnly={true}/>
                </div>
                <div className="accountObject">
                    <img alt="" className="accountObjectPP" src={require('../Images/pf.png')}/>
                    <input className="ssidInput" defaultValue={"Image link"} readOnly={true}/>
                </div>
                <div className="accountObject">
                    <p data-testid={"setting-name"} className="settingName">{this.state.NameInput}</p>
                    <Link to={"/Login"}
                        onClick={AuthService.logout}
                    >
                        Log out
                    </Link>
                </div>
            </div>
        );
    }
}

export default AccountPanel;
