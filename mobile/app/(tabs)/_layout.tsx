import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAuth } from "../../src/contexts/AuthContext";

export default function TabsLayout() {
  const { user } = useAuth();
  const isProfessor = user?.nivel === 1;
  
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#2563eb",
        tabBarInactiveTintColor: "#2563eb",
        tabBarShowLabel: true,
      }}
    >
      <Tabs.Screen
        name="postagens"
        options={{
            title: "Postagens",
            tabBarIcon: ({ color, size, focused }) => (
                <Ionicons
                    color={color}
                    size={size}
                    name={focused ? "home" : "home-outline"}
                />
            ),
        }}
      />

      <Tabs.Screen
        name="criar"
        options={{
            title: "Criar",
            href: isProfessor ? "/criar" : null,
            tabBarIcon: ({ color, size, focused }) => (
                <Ionicons
                    color={color}
                    size={size}
                    name={focused ? "add-circle" : "add-circle-outline"}
                />
            ),
        }}
      />

    </Tabs>
  );
}