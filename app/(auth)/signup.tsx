import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Controller, useForm } from "react-hook-form";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, router } from "expo-router";
import { Feather, AntDesign } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Toast } from "@ant-design/react-native";
import { signup } from "@/API/api";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const registerUser = async (formData: FormData) => {
    const { email, password, firstName, lastName } = formData; // Extract data from formData
  
    try {
      const responseData = await signup(email, password, firstName, lastName); // Call signup API
      console.log("responseData", responseData);
      alert("Sign-up successful, you can now login");
      
  
      await AsyncStorage.setItem("userData", JSON.stringify(responseData)); // Store user data
      console.log("responseData", responseData);
      // setIsLoading(false);
      Toast.success("Registration Successful", 1);
      Alert.alert("Success", "Account created successfully!");
      router.replace("/(auth)")
    } catch (error: any) {
      Toast.fail(error.message, 1);
    }
  };
  

  const validateInputs = (data: FormData) => {
    if (data.password.length < 6) {
      Alert.alert("Validation Error", "Password must be at least 6 characters long!");
      return false;
    }
    return true;
  };

  const onSubmit = handleSubmit((data) => {
    // console.log('data is saved', data)
    if (validateInputs(data)) {
      registerUser(data);
      // console.log("Form data submitted:", data);
    }
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#161622" barStyle="light-content" />
        <KeyboardAwareScrollView style={{ marginTop: 150 }}>
          <View style={styles.form}>
            <Text style={styles.title}>Sign Up to Todo</Text>

            {/* Username Field */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>First Name</Text>
              <Controller
                control={control}
                rules={{
                  required: "Firstname is required",
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[styles.input, errors.firstName && styles.inputError]}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="firstName"
              />
              {errors.firstName && (
                <Text style={styles.errorText}>{errors.firstName.message}</Text>
              )}
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Last Name</Text>
              <Controller
                control={control}
                rules={{
                  required: "Username is required",
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[styles.input, errors.lastName && styles.inputError]}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="lastName"
              />
              {errors.lastName && (
                <Text style={styles.errorText}>{errors.lastName.message}</Text>
              )}
            </View>

            {/* Email Field */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <Controller
                control={control}
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
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
                  />
                )}
                name="email"
              />
              {errors.email && (
                <Text style={styles.errorText}>{errors.email.message}</Text>
              )}
            </View>

            {/* Password Field */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <Controller
                control={control}
                rules={{
                  required: "Password is required",
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View style={styles.passwordContainer}>
                    <TextInput
                      style={[
                        styles.input,
                        styles.passwordInput,
                        errors.password && styles.inputError,
                      ]}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity onPress={handleTogglePasswordVisibility}>
                      {showPassword ? (
                        <AntDesign name="eyeo" size={24} color="#CDCDE0" />
                      ) : (
                        <Feather name="eye-off" size={24} color="#CDCDE0" />
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

            {/* Submit Button */}
            <TouchableOpacity style={styles.button} onPress={onSubmit}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            {/* Navigation to Login */}
            <View style={styles.loginRedirect}>
              <Text style={styles.redirectText}>Already have an account?</Text>
              <Link href="/(auth)" style={styles.redirectLink}>
                Login
              </Link>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161622",
    padding: 16,
  },
  form: {
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center",
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: "#CDCDE0",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#1E1E2D",
    borderColor: "#232533",
    borderWidth: 2,
    borderRadius: 8,
    height: 48,
    paddingHorizontal: 12,
    color: "#FFF",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  passwordInput: {
    flex: 1,
  },
  inputError: {
    borderColor: "#FF5A5F",
  },
  errorText: {
    color: "#FF5A5F",
    marginTop: 4,
    fontSize: 12,
  },
  button: {
    backgroundColor: "#FF9C01",
    borderRadius: 8,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  buttonText: {
    color: "#232533",
    fontSize: 16,
    fontWeight: "bold",
  },
  loginRedirect: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  redirectText: {
    color: "#CDCDE0",
  },
  redirectLink: {
    color: "#FF9C01",
    marginLeft: 4,
    fontWeight: "bold",
  },
});
