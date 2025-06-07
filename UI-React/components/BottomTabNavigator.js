import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Ionicons } from "@expo/vector-icons";
import { styles, colors } from "./styles/BottomTabNavigatorStyles";
import SaksimScreen from "./SaksimScreen";
import BilgilerScreen from "./BilgilerScreen";
import AyarlarScreen from "./AyarlarScreen";
import CihazBilgiScreen from "./CihazBilgiScreen";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const icons = {
            Saksım: focused ? "leaf" : "leaf-outline",
            Bilgiler: focused ? "information-circle" : "information-circle-outline",
            Cihaz: focused ? "hardware-chip" : "hardware-chip-outline",
            Ayarlar: focused ? "settings" : "settings-outline",
          };
          return <Ionicons name={icons[route.name]} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.secondary,
        tabBarStyle: styles.tabBar,
        headerShown: false,
      })}
    >
      <Tab.Screen name="Saksım" component={SaksimScreen} />
      <Tab.Screen name="Bilgiler" component={BilgilerScreen} />
      <Tab.Screen name="Cihaz" component={CihazBilgiScreen} />
      <Tab.Screen name="Ayarlar" component={AyarlarScreen} />
    </Tab.Navigator>
  );
}