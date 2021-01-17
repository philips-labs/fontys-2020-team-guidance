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
            <div id="accountPanel" className="settingsPanel accountPanel">
                <p data-testid={"setting-header"} className="settingsHeader">Account</p>
                <div className="divider"/>
                <div className="accountObject">
                    <p data-testid={"setting-name"} className="settingName">{this.state.email}</p>
                    <p className="settingName"><Link to={"/Login"} onClick={AuthService.logout}>Log out</Link></p>
                </div>
            </div>
        );
    }
}

export default AccountPanel;
