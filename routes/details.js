import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/home';
import Details from '../screens/details';

const screens = {
    Home:{
        screen: Home
    },
    Details:{
        screen: Details
    }
}

const DetailsStack = createNativeStackNavigator(screens);