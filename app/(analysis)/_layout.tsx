import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function AnalysisLayout() {
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
        name="dashboard"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="grid-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="visualization"
        options={{
          title: "Charts",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bar-chart-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="insights"
        options={{
          title: "Insights",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bulb-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}