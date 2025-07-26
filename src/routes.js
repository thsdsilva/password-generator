import { View } from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Home } from "./pages/home"
import { Passwords } from "./pages/passwords"
import { Ionicons } from "@expo/vector-icons"

const Tab = createBottomTabNavigator()

export function Routes() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIconStyle: {
          marginTop: 5,
        },
      }}
    >
      <Tab.Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ focused, size, color }) => {
            const iconName = focused ? "home" : "home-outline"
            return <Ionicons name={iconName} size={size} color={color} />
          },
        }}
      />
      <Tab.Screen
        name="passwords"
        component={Passwords}
        options={{
          tabBarIcon: ({ focused, size, color }) => {
            const iconName = focused ? "lock-closed" : "lock-closed-outline"
            return <Ionicons name={iconName} size={size} color={color} />
          },
        }}
      />
    </Tab.Navigator>
  )
}
