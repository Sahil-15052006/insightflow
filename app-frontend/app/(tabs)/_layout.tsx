import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor: "#7C5CFF",
        tabBarInactiveTintColor: "#6B7280",

        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          margin:20,
          height:"auto",
          borderRadius: 20,
          backgroundColor: "#0B1120",
          borderTopWidth: 0,
        },

        tabBarItemStyle: {
          padding:10,
          justifyContent: "center",
          alignItems: "center",
        },

        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
          textAlign: "center",
        },
      }}
    >
      
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="analysis-history"
        options={{
          title: "History",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="time-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}