import React, {Component} from 'react';
import 'C:/Users/Gebruiker/Desktop/Engineering/demo/src/src/webapp/src/App.css';
import Logo from "./Logo";

class AdminMenu extends Component {

    constructor(props) {
        super(props);

        this.state = {
            logIn: false
        }
    }

    enterKey = () => {
        const key = prompt("Please enter your admin key", "Admin key");

        if(key === "abcde1234") {
            this.setState({logIn: true});
        }
        else this.enterKey();
    }

    render() {
        if(this.state.logIn) {
            return (
                <div className={"AdminMenu"}>
                    <h className={"PageCategory"}>FontysWPA</h>
                    <div className={"Divider"}/>
                    <div className={"FloorplanList"}>
                        <div className={"FloorplanObject"}>
                            <img className={"FloorplanListImage"} src={"https://www.vistabluesingerisland.com/wp-content/themes/vistablue/images/floor/b.png"}/>
                            <h className={"FloorplanTitle"}>F1</h>
                        </div>
                        <div className={"FloorplanObject"}>
                            <img className={"FloorplanListImage"} src={"https://www.vistabluesingerisland.com/wp-content/themes/vistablue/images/floor/b.png"}/>
                            <h className={"FloorplanTitle"}>F2</h>
                        </div>
                        <div className={"FloorplanObject"}>
                            <img className={"FloorplanListImage"} src={"https://www.vistabluesingerisland.com/wp-content/themes/vistablue/images/floor/b.png"}/>
                            <h className={"FloorplanTitle"}>F3</h>
                        </div>
                    </div>
                </div>
            );
        }
        else {
            return(
                <div className={"AdminMenu"}>
                    <h className={"AdminLoginTitle"} onLoad={this.enterKey()}>Login</h>
                </div>
            );
        }
    }
}

export default AdminMenu;
