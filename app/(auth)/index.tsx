import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Alert,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { router } from "expo-router";
import { Feather, AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";
import { login } from "@/API/api";

interface FormData {
  email: string;
  password: string;
}

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  // Check authentication on component mount
  // useEffect(() => {
  //   const checkAuthStatus = async () => {
  //     try {
  //       const userData = await AsyncStorage.getItem("userData");
  //       if (userData) {
  //         router.replace("/(tabs)/explore"); // Redirect if logged in
  //       } else {
  //         setIsCheckingAuth(false); // Allow login screen to render
  //       }
  //     } catch (error) {
  //       console.error("Error checking auth status:", error);
  //       setIsCheckingAuth(false);
  //     }
  //   };
  
  //   checkAuthStatus();
  // }, []);
  
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const authenticate = async (formData: FormData) => {
    const { email, password } = formData;

    try {
      const responseData = await login(email, password); // Call login API
      await AsyncStorage.setItem("userData", JSON.stringify(responseData)); // Store user data
      router.replace("/(tabs)/explore"); // Redirect to explore screen
      Alert.alert("Login successful");
    } catch (error: any) {
      console.error("Login error:", error);
      Alert.alert("Error", error.message);
    }
  };

  // if (isCheckingAuth) {
  //   return (
  //     <SafeAreaView style={styles.container}>
  //       <Text style={styles.title}>Checking authentication...</Text>
  //     </SafeAreaView>
  //   );
  // }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#161622" barStyle="light-content" />
      <KeyboardAwareScrollView style={{ marginTop: 150 }}>
        <View style={styles.container}>
          <Text style={styles.title}>Log in to Todo</Text>

          {/* Email Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <Controller
              control={control}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Enter a valid email address",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, errors.email && styles.inputError]}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              )}
              name="email"
            />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email.message}</Text>
            )}
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <Controller
              control={control}
              rules={{ required: "Password is required" }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={styles.passwordContainer}>
                  <TextInput
                    secureTextEntry={!showPassword}
                    style={[
                      styles.input,
                      styles.passwordInput,
                      errors.password && styles.inputError,
                    ]}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity
                    onPress={togglePasswordVisibility}
                    style={styles.iconButton}
                  >
                    {showPassword ? (
                      <AntDesign name="eyeo" size={20} color="#CDCDE0" />
                    ) : (
                      <Feather name="eye-off" size={20} color="#CDCDE0" />
                    )}
                  </TouchableOpacity>
                </View>
              )}
              name="password"
            />
            {errors.password && (
              <Text style={styles.errorText}>{errors.password.message}</Text>
            )}
          </View>

          {/* Login Button */}
          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit(authenticate)}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          {/* Navigation Link */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account?</Text>
            <Link href="/signup" style={styles.link}>
              Signup
            </Link>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      justifyContent: "center",
      backgroundColor: "#161622",
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: "white",
      marginTop: 26,
      textAlign: "center",
    },
    inputContainer: {
      marginTop: 20,
    },
    label: {
      fontSize: 16,
      color: "#CDCDE0",
      marginBottom: 4,
    },
    input: {
      width: "100%",
      height: 50,
      borderColor: "#232533",
      borderWidth: 2,
      borderRadius: 8,
      paddingHorizontal: 12,
      backgroundColor: "#1E1E2D",
      color: "#CDCDE0",
    },
    passwordContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    passwordInput: {
      flex: 1,
    },
    iconButton: {
      paddingHorizontal: 10,
    },
    inputError: {
      borderColor: "#FF5A5F",
    },
    errorText: {
      color: "#FF5A5F",
      fontSize: 12,
      marginTop: 4,
    },
    button: {
      marginTop: 20,
      backgroundColor: "#FF9C01",
      borderRadius: 8,
      alignItems: "center",
      paddingVertical: 12,
    },
    buttonText: {
      color: "#232533",
      fontSize: 16,
      fontWeight: "bold",
    },
    footer: {
      flexDirection: "row",
      justifyContent: "center",
      marginTop: 20,
    },
    footerText: {
      fontSize: 14,
      color: "#CDCDE0",
    },
    link: {
      fontSize: 14,
      fontWeight: "bold",
      color: "#FF9C01",
      marginLeft: 4,
    },
  });
