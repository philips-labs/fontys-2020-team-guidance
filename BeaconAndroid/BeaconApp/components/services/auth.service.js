import axios from 'axios'
import LocalStorage from '@react-native-async-storage/async-storage';

const API_URL = "http://10.0.2.2:8085/api/auth/"

const register = (username, email, password) => {
    return axios.post(API_URL + "signup", {
        username,
        email,
        password
    })
}

const login = (username, password) => {
    return axios
        .post(API_URL + "signin", {
            username,
            password
        })
        .then((response) => {
            if(response.data.accessToken) {
                LocalStorage.setItem("user", JSON.stringify(response.data))
            }

            return response.data
        })
}

const logout = async (key) => {
    try {
        await LocalStorage.removeItem(key)
    } catch(error) {
        console.log(error)
    }
}

const getCurrentUser = async () => {
    try {
        const user = await LocalStorage.getItem("user")
        return user
    } catch(error) {
        console.log(error)
    }
}

export default {
    register,
    login,
    logout,
    getCurrentUser,
};
