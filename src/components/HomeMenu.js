import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons"; 
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../screens/Home"; 
import NewPost from "../screens/NewPost"; 
import Profile from "../screens/Profile";
import Comments from "../screens/Comments"; 

const Tab = createBottomTabNavigator(); 
const Stack = createNativeStackNavigator(); 

function HomeStack() {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Comments" component={Comments} /> 
        </Stack.Navigator>
    ); 
}

function HomeMenu() {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="HomeStack"
                component={HomeStack}
                options={{
                    title: "Home", 
                    tabBarIcon: () => <FontAwesome name="home" size={24} color="#6F4E37" /> 
                }}
            />
            <Tab.Screen
                name="NewPost"
                component={NewPost}
                options={{
                    tabBarIcon: () => <FontAwesome name="plus-square" size={24} color="#6F4E37" /> 
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: () => <FontAwesome name="user" size={24} color="#6F4E37" /> 
                }}
            />

        </Tab.Navigator>
    ); 
}

export default HomeMenu; 