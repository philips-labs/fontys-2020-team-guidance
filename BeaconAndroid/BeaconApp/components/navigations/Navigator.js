import Login from '../Login';
import Register from'../Register'
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import ForgotPassword from "../ForgotPassword";
const stackNavigatorOptions = {
    headerShown: false
}

const AppNavigator = createStackNavigator({
    Login: {screen: Login},
    Register: {screen: Register},
    ForgotPassword: {screen: ForgotPassword},

}, {
        defaultNavigationOptions : stackNavigatorOptions
    }
);

export default createAppContainer(AppNavigator)
