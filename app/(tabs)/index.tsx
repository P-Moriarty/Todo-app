import React, { useState, useEffect } from "react";
import { Image, StyleSheet, ActivityIndicator } from "react-native";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { fetchUserData } from "@/API/api";

// Define types for the user data
interface UserData {
  name: string;
  email: string;
  username: string;
}

export default function HomeScreen() {
  const [userData, setUserData] = useState<UserData | null>(null); // Store user data
  const [loading, setLoading] = useState<boolean>(false); // Track loading state
  const [error, setError] = useState<string | null>(null); // Track error state

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true); // Start loading
      setError(null); // Clear previous errors

      try {
        const response = await fetchUserData(); // Pass fetchUserData

        setUserData(response as unknown as UserData); // Set fetched data to state
      } catch (err) {
        setError("Failed to fetch user data"); // Set error message
      } finally {
        setLoading(false); // End loading
      }
    };
  }, []); // Run once on mount

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/Todo.jpg")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        {/* User Data Section */}
        {loading ? (
          <ThemedView style={styles.centered}>
            <ActivityIndicator size="large" color="#0000ff" />
            <ThemedText>Loading user data...</ThemedText>
          </ThemedView>
        ) : error ? (
          <ThemedView style={styles.centered}>
            <ThemedText style={styles.errorText}>{error}</ThemedText>
          </ThemedView>
        ) : userData ? (
          <ThemedView style={styles.userInfoContainer}>
            <ThemedText type="title">Welcome! {userData.name}</ThemedText>
            <HelloWave />
          </ThemedView>
        ) : (
          <ThemedView style={styles.centered}>
            <ThemedText>No user data available</ThemedText>
          </ThemedView>
        )}
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">A to-do list application</ThemedText>
        <ThemedText>Add, edit, and delete tasks.</ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    fontSize: 24,
    marginTop: 100,
    marginBottom: 16,
  },
  stepContainer: {
    gap: 8,
    fontSize: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 108,
  },
  reactLogo: {
    height: 298,
    width: 390,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  userInfoContainer: {
    gap: 8,
    fontSize: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  errorText: {
    color: "red",
    fontSize: 18,
  },
});
