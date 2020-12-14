import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/test/";

const getPublicContent = () => {
    return fetch(API_URL + "all")
        .then( (res) => {
            return res.text()
        }).then(steps => {
            return steps
        })
};



const getUserBoard = () => {
    return fetch(API_URL + "user", {headers: authHeader()})
        .then( (res) => {
            return res.text()
        }).then(steps => {
            return steps
        })
};

const getModeratorBoard = () => {
    return fetch(API_URL + "mod", { headers: authHeader() })
        .then( (res) => {
            return res.text()
        }).then(steps => {
            return steps
        })
};

const getAdminBoard = () => {
    return fetch(API_URL + "admin", { headers: authHeader() })
        .then( (res) => {
            return res.text()
        }).then(steps => {
            return steps
        })
};

export default {
    getPublicContent,
    getUserBoard,
    getModeratorBoard,
    getAdminBoard,
};
