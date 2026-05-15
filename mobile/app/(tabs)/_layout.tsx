import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#2563eb",
      }}
    >
      <Tabs.Screen
        name="postagens"
        options={{
            title: "Postagens",
            tabBarIcon: ({ color, size }) => (
                <Ionicons
                    name="home-outline"
                    color={color}
                    size={size}
                />
            ),
        }}
      />
    </Tabs>
  );
}