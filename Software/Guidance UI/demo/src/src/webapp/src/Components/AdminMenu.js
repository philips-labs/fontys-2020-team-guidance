import React, {Component} from 'react';
import 'C:/Users/Gebruiker/Desktop/Engineering/demo/src/src/webapp/src/App.css';
import Logo from "./Logo";

class AdminMenu extends Component {

    constructor(props) {
        super(props);

        this.state = {
            superAdmin: false,
            logIn: false,
            floorplans: {},
            deleting: false,
            SSID: ''
        }
    }

    componentDidMount() {
        this.enterKey();
    }

    enterKey() {
        const key = prompt("Please enter your admin key", "Admin key");

        if(key && key.length > 0) {
            fetch("/books/checkKey/" + key)
                .then(data => data.text())
                .then(res => {
                    if(res === "404") {
                        document.getElementById("LoginText").innerHTML = "Wrong password try again";
                        this.enterKey();
                    }
                    else {
                        this.setState({SSID: res});
                        fetch("/books/getFloorplansBySSID/" + res)
                            .then(floorplans => floorplans.json())
                            .then(res => {
                                this.setState({floorplans: res, logIn: true})
                            })
                    }
                })
        }
    }

    openFileDialog = () => {
        document.getElementById("file-input").click();
    }

    openSelect = (e) => {
        if(this.state.deleting) {
            e.target.style.color = 'red';

            document.getElementsByName("SelectButton").forEach(function (ele, idx) {
                ele.style.visibility = 'hidden';
            })

            this.state.deleting = false;
        }
        else {
            e.target.style.color = 'gray';

            document.getElementsByName("SelectButton").forEach(function (ele, idx) {
                ele.style.visibility = 'visible';
            })

            this.state.deleting = true;
        }
    }

    deleteFloorplanObjects = (e) => {
        if(window.confirm("Are you sure you want to delete " + e.target.id + "?")) {
        fetch("/books/deleteFloorplan/" + e.target.id, {
            method: 'delete'
        })
            .then(floorplans => floorplans.json())
            .then(res => {
                this.setState({floorplans: res})
            })

        }
        else {
            alert("delete canceled");
        }
    }

    render() {
        if(this.state.logIn) {
            return (
                <div className={"AdminMenu"}>
                    <div className={"CategoryTitle"}>
                        <h className={"PageCategory"}>{this.state.SSID}</h>
                        <h onClick={this.openFileDialog} className={"PageCategoryButton green"}>+</h>
                        <h onClick={this.openSelect} className={"PageCategoryButton red"}>-</h>
                    </div>
                    <div className={"Divider"}/>
                    <div className={"FloorplanList"}>
                        {
                            this.state.floorplans.map((item, key) => {
                                return  <div key={key} className={"FloorplanObject"}>
                                            <img className={"FloorplanListImage"} src={item.link}/>
                                            <h className={"FloorplanTitle"}>{item.name}</h>
                                            <h name={"SelectButton"} onClick={this.deleteFloorplanObjects} id={item.name} className={"FloorplanDeleteButton"}>-</h>
                                        </div>
                            })
                        }
                    </div>

                    <input className={"FileInput"} id="file-input" type="file" name="name" accept="image/*" />
                </div>
            );
        }
        else {
            return(
                <div className={"AdminMenu"}>
                    <h id={"LoginText"} className={"AdminLoginTitle"}>Login</h>
                </div>
            );
        }
    }
}

export default AdminMenu;
