import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import * as SecureStore from 'expo-secure-store'
import api from "./api";

export default function SplashScreen() {


  useEffect(() => {
    checkToken()
  }, []);

  const checkToken = async()=>{
    const token = await SecureStore.getItemAsync("token")

    if (!token) return setTimeout(() => {
        router.replace('/login')
      }, 3000);

    try{
      await api.get('/auth/verify');
      setTimeout(() => {
        router.replace('/(tabs)/home')
      }, 3000);
    } catch {
      await SecureStore.deleteItemAsync("token")
      setTimeout(() => {
        router.replace('/login')
      }, 3000);
    }
  }

  return (
    <LinearGradient
      colors={["#020617", "#0B1120"]}
      style={styles.container}
    >
      <View style={styles.iconContainer}>
        <Ionicons name="flash" size={42} color="#fff" />
      </View>

      <Text style={styles.title}>InsightFlow</Text>

      <Text style={styles.subtitle}>
        Data Analytics Platform
      </Text>

      <Text style={styles.aiText}>
        Powered by AI Intelligence
      </Text>

    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#020617"
  },

  iconContainer: {
    width: 90,
    height: 90,
    borderRadius: 24,
    backgroundColor: "#7C5CFF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 25
  },

  title: {
    fontSize: 34,
    fontWeight: "700",
    color: "#E5E7EB",
    marginBottom: 6
  },

  subtitle: {
    color: "#9CA3AF",
    fontSize: 15
  },

  aiText: {
    color: "#6B7280",
    fontSize: 13,
    marginBottom: 40
  },

  loader: {
    width: 120,
    height: 6,
    backgroundColor: "#1F2937",
    borderRadius: 10,
    overflow: "hidden"
  },

  loaderFill: {
    width: 40,
    height: "100%",
    backgroundColor: "#7C5CFF",
    borderRadius: 10
  }
});