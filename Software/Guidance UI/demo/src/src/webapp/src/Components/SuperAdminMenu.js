import React, {Component} from 'react';
import 'C:/Users/Gebruiker/Desktop/Engineering/demo/src/src/webapp/src/App.css';
import Logo from "./Logo";

class SuperAdminMenu extends Component {

    constructor(props) {
        super(props);

        this.state = {
            logIn: false,
            adminKeys: {},
            SSID: ''
        }
    }

    componentDidMount() {
        this.enterKey();
    }

    enterKey() {
        const key = prompt("Please enter your admin key", "Admin key");

        fetch("/books/checkSuperAdmin/" + key)
            .then(data => data.json())
            .then(res => {
                if(!res.status) {
                    this.setState({adminKeys: res, logIn: true});
                }
                else {
                    document.getElementById("LoginText").innerHTML = "Wrong password try again";
                    this.enterKey();
                }
            })
    }

    editKey = (e) => {
        let newAdminKey;

        newAdminKey = prompt("Enter new key value", e.target.id);

        if(newAdminKey.length > 0) {

            fetch("/books/editKey/" + e.target.id, {
                method: 'put',
                headers: {
                    'Accept': 'application/json, text/plain',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify({
                    image: newAdminKey
                })

            })
                .then(AdminKeys => AdminKeys.json())
                .then(res => {
                    this.setState({adminKeys: res})
                })
        }

        else {
            alert("Value cant be empty");
        }
    }

    editSSID = (e) => {
        let newSSID;

        newSSID = prompt("Enter new SSID value", e.target.defaultValue);

        if(newSSID && newSSID.length > 0) {

            fetch("/books/editSSID/" + e.target.id, {
                method: 'put',
                headers: {
                    'Accept': 'application/json, text/plain',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify({
                    image: newSSID
                })

            })
                .then(AdminKeys => AdminKeys.json())
                .then(res => {
                    console.log(res);
                    this.setState({adminKeys: res})
                })
        }
        else {
            alert("Value cant be empty");
        }
    }

    deleteKey = (e) => {
        if(window.confirm("Are you sure you want to delete " + e.target.id + "?")) {
            console.log("deleted")
            fetch("/books/deleteKey/" + e.target.id, {
                method: 'delete'

            })
                .then(AdminKeys => AdminKeys.json())
                .then(res => {
                    this.setState({adminKeys: res})
                })
        }
    }

    addKey = () => {
        const AdminKey = document.getElementById("AdminKey");
        const SSID = document.getElementById("SSID");

        if(AdminKey.value.length > 0 && SSID.value.length > 0) {
            fetch("/books/addAdminKey", {
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify({
                    key: AdminKey.value,
                    ssid: SSID.value
                })

            })
                .then(AdminKeys => AdminKeys.json())
                .then(res => {
                    console.log(res);
                    this.setState({adminKeys: res})
                })
        }
    }

    render() {
        if(this.state.logIn) {
            return (
                <div className={"AdminMenu"}>
                    <div className={"newKeyContainer"}>
                        <a className={"NewAdminText"}>Create Adminkey: </a>
                        <input id={"AdminKey"} className={"SuperAdminAddInput"} placeholder={"Admin Key"}/>
                        <input id={"SSID"} className={"SuperAdminAddInput"} placeholder={"SSID"}/>
                        <a onClick={this.addKey} className={"SuperadminAddBtn"}>+</a>
                    </div>
                    <table>
                        <tr>
                            <th>AdminKey</th>
                            <th>SSID</th>
                        </tr>
                        {
                            this.state.adminKeys.map((Item, key) => {
                                return <tr key={key}>
                                           <td>{Item.key} <img onClick={this.editKey} id={Item.key} className={"editIcon"} src={"https://img.pngio.com/free-high-quality-edit-icon-3589-free-icons-and-png-backgrounds-edit-icon-png-1024_1024.png"}/></td>
                                           <td>{Item.ssid} <img onClick={this.editSSID} id={Item.key} defaultValue={Item.ssid} className={"editIcon"} src={"https://img.pngio.com/free-high-quality-edit-icon-3589-free-icons-and-png-backgrounds-edit-icon-png-1024_1024.png"}/></td>
                                           <td onClick={this.deleteKey} className={"red"} id={Item.key}>x</td>
                                       </tr>
                            })
                        }
                    </table>
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

export default SuperAdminMenu;