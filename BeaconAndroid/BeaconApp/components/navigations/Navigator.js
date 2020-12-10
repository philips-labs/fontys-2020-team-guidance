import Login from '../Login';
import Register from'../Register'
import MainApp from '../MainApp';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
const stackNavigatorOptions = {
    headerShown: false
}

const AppNavigator = createStackNavigator({
    Login: {screen: Login},
    Register: {screen: Register},
    MainApp: {screen: MainApp},

}, {
        defaultNavigationOptions : stackNavigatorOptions
    }
);

export default createAppContainer(AppNavigator)
