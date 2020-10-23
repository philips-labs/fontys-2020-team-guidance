import React, {Component} from 'react';
import 'C:/Users/Gebruiker/Desktop/Engineering/demo/src/src/webapp/src/App.css';

class AccountPanel extends Component {

    render() {
        return (
            <div id="accountPanel" className="settingsPanel">
                <p className="settingsHeader">Account</p>
                <div className="divider"/>
                <div className="accountObject">
                    <img alt="" className="accountObjectPP" src={require('./Images/pf.png')}/>
                        <a className="accountObjectName">Albert</a>
                        <img alt="" className="accountObjectGear" src={require('./Images/gear.png')}/>
                </div>
            </div>
        );
    }
}

export default AccountPanel;
