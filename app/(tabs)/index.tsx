import React, { useState, useEffect } from "react";
import { Image, StyleSheet, ActivityIndicator } from "react-native";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { fetchUserData } from "@/API/api";

// Define types for the user data
interface UserData {
  first_name: string;
  email: string;
  username: string;
}

export default function HomeScreen() {
  const [userData, setUserData] = useState<UserData | null>(null); // Store user data
  const [loading, setLoading] = useState<boolean>(false); // Track loading state
  const [error, setError] = useState<string | null>(null); // Track error state

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetchUserData()
        console.log("Fetched User Data:", response); // Debugging
        setUserData(response); // Store user data
        console.log("User Data:", userData); // Debugging
      } catch (err) {
        setError("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

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
        {userData && loading ? (
          <ThemedView style={styles.centered}>
            <ActivityIndicator size="large" color="#FF9C01" />
          </ThemedView>
        ) : error ? (
          <ThemedView style={styles.centered}>
            <ThemedText style={styles.errorText}>{error}</ThemedText>
          </ThemedView>
        ) : userData ? (
          <ThemedView style={styles.userInfoContainer}>
            <HelloWave />
            <ThemedText type="title">Welcome! {userData.first_name}</ThemedText>
          </ThemedView>
        ) : (
          <ThemedView style={styles.centered}>
          <ActivityIndicator size="large" color="#FF9C01" />
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
    flex: 1,
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
