import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "./pages/home";
import { Passwords } from "./pages/passwords";
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export function Routes() {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="home"
                component={Home}
                options={{
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarStyle: {
                        height: 70,
                    },
                    tabBarIconStyle: {
                        marginTop: 10,
                    },
                    tabBarIcon: ({ focused, size, color }) => {
                        const iconName = focused ? 'home' : 'home-outline';
                        return (<Ionicons name={iconName} size={size} color={color} />);
                    },
                }}
            />
            <Tab.Screen
                name="passwords"
                component={Passwords}
                options={{
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarStyle: {
                        height: 70,
                    },
                    tabBarIconStyle: {
                        marginTop: 10,
                    },
                    tabBarIcon: ({ focused, size, color }) => {
                        const iconName = focused ? 'lock-closed' : 'lock-closed-outline';
                        return (<Ionicons name={iconName} size={size} color={color} />);
                    },
                }}
            />
        </Tab.Navigator>

    )
}