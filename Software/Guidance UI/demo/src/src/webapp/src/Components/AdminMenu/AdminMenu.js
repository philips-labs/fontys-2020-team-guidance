import React, {Component} from 'react';
import '../../App.css';
import {Redirect} from "react-router";
import {Link} from "react-router-dom";

class AdminMenu extends Component {

    constructor(props) {
        super(props);

        this.state = {
            superAdmin: false,
            logIn: false,
            floorplans: {},
            deleting: false,
            SSID: '',
            currentFile: null
        }
    }

    componentDidMount() {
        this.enterKey();
    }

    enterKey() {
        const key = prompt("Please enter your admin key", "Admin key");

        if(key && key.length > 0) {
            fetch("/api/floorplan/checkKey/" + key)
                .then(data => data.text())
                .then(res => {
                    if(res === "404") {
                        document.getElementById("LoginText").innerHTML = "Wrong password try again";
                        this.enterKey();
                    }
                    else {
                        this.setState({SSID: res});
                        fetch("/api/floorplan/getFloorplansBySSID/" + res)
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

    fileInputOnchange = (e) => {
        const reader = new FileReader();

        const file = e.target.files[0];
        reader.readAsDataURL(file);

        reader.onload = this.onLoad(reader);
    }

    onLoad(reader) {
        return () => {
            let result = reader.result;
            const ssid = this.state.SSID;
            const name = prompt("Please enter the name of the image", "Name");
            const width = parseInt(prompt("Please enter the width of the floorplan in real life in metres", "Only give a number"));
            var image = new Image();
            image.src = reader.result;
            image.onload = this.uploadImage(result, ssid, name, width, image);
        }
    }

    uploadImage(result, ssid, name, width, image) {
        return () => {
            let scale = image.width / width;
            if(Number.isInteger(width)) {
                if(name && name.length > 0) {
                    fetch("/api/floorplan/createFloorplan", {
                        method: 'post',
                        headers: {
                            'Accept': 'application/json, text/plain',
                            'Content-Type': 'application/json;charset=UTF-8'
                        },
                        body: JSON.stringify({
                            ssid: ssid,
                            name: name,
                            image: result,
                            width: width,
                            scale: scale
                        })

                    })
                        .then(floorplans => floorplans.json())
                        .then(res => {
                            this.setState({floorplans: res})
                        })
                }
            }
            else {
                alert("Please only fill in the number of the real width in metres");
            }
        }
    }

    openSelect = (e) => {
        if(this.state.deleting) {
            e.target.style.color = 'red';

            document.getElementsByName("SelectButton").forEach(function (ele, idx) {
                ele.style.visibility = 'hidden';
            })

            this.setState({deleting: false});
        }
        else {
            e.target.style.color = 'gray';

            document.getElementsByName("SelectButton").forEach(function (ele, idx) {
                ele.style.visibility = 'visible';
            })

            this.setState({deleting: false});
        }
    }

    deleteFloorplanObjects = (e) => {
        if(window.confirm("Are you sure you want to delete " + e.target.id + "?")) {
        fetch("/api/floorplan/deleteFloorplan/" + e.target.id, {
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

    editFloorplan = () => {
        return <Redirect to={"/404"}/>
    }

    render() {
        if(this.state.logIn) {
            return (
                <div className={"AdminMenu"}>
                    <div className={"CategoryTitle"}>
                        <h className={"PageCategory"}>{this.state.SSID}</h>
                        <h data-testid={"adminmenu-add"} onClick={this.openFileDialog} className={"PageCategoryButton green"}>+</h>
                        <h data-testid={"adminmenu-remove"}onClick={this.openSelect} className={"PageCategoryButton red"}>-</h>
                    </div>
                    <div className={"Divider"}/>
                    <div className={"FloorplanList"}>
                        {
                            this.state.floorplans.map((item, key) => {
                                return  <div key={key} className={"FloorplanObject"}>
                                            <img className={"FloorplanListImage"} src={item.image} alt={""}/><br/>
                                            <h className={"FloorplanTitle"}>{item.name}</h>
                                            <h className={"FloorplanTitle"}><Link to={`/editfloorplan/${item.ssid}/${item.name}`}><img onClick={this.editFloorplan} id={item.width} className={"editIcon"} src={"https://img.pngio.com/free-high-quality-edit-icon-3589-free-icons-and-png-backgrounds-edit-icon-png-1024_1024.png"} alt={" "}/></Link></h>
                                            <h name={"SelectButton"} onClick={this.deleteFloorplanObjects} id={item.name} className={"FloorplanDeleteButton"}>-</h>
                                        </div>
                            })
                        }
                    </div>

                    <input onChange={this.fileInputOnchange} className={"FileInput"} id="file-input" type="file" name="name" accept="image/*" />
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
