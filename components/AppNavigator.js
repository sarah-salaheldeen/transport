import { createStackNavigator, createAppContainer} from 'react-navigation'
import Map from './Map'


const AppNavigator = createStackNavigator({
    Map: {screen : Map}
})

export default createAppContainer(AppNavigator)