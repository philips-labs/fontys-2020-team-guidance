import React, {Component} from 'react';
import 'C:/Users/Gebruiker/Desktop/Engineering/demo/src/src/webapp/src/App.css';

class DesktopMenu extends Component {

    render() {
        return (
            <div className="desktopMenu">
                <img alt="" className="desktopAccountIcon" src={require('./Images/pf.png')}/>
                <img alt="" className="desktopSettings" src={require('./Images/gear.png')}/>
            </div>
        );
    }
}

export default DesktopMenu;
