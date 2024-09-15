import { Image } from "expo-image";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView, Platform , Keyboard,
  Alert
} from "react-native";
import logo from "../../../assets/svg/login_logo.svg";
import { useForm, Controller } from "react-hook-form";
import { useLogin } from "../../Hooks/mutations";
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Ionicons } from "@expo/vector-icons";

const LoginScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const { mutate: login, isLoading, error: loginError } = useLogin();
  const [loginLoading, setLoginLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const onSubmit = async (data) => {
    setLoginLoading(true);
    try {
      await login({
        email: data.email,
        password: data.password,
      });
    } catch (error) {
      setErrorMessage("Login failed. Please try again.");
      setError("login", {
        type: "manual",
        message: "Login failed. Please try again.",
      });
    } finally {
      setLoginLoading(false);
    }
  };

  useEffect(() => {
    if (loginError) {
      Alert.alert("Error", loginError?.response?.data?.message);
    }
  }, [loginError]);

  return (
    <View style={styles.container}>
    <KeyboardAvoidingView
    style={styles.container}
    behavior={Platform.OS === "ios" ? "padding" : "height"}
  >
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
      </View>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <Controller
            control={control}
            render={({ field }) => (
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                onChangeText={field.onChange}
                value={field.value}
              />
            )}
            name="email"
            rules={{ required: "Email is required" }}
            defaultValue=""
          />
          {errors?.email && (
            <Text style={styles.error}>{errors.email.message}</Text>
          )}
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <Controller
              control={control}
              render={({ field }) => (
                <View style={styles.passwordContainer}>
                  <View style={{width: "100%"}}>
                    <TextInput
                      style={styles.passwordInput}
                      placeholder="Enter your password"
                      secureTextEntry={!isPasswordVisible}
                      onChangeText={field.onChange}
                      value={field.value}
                    />
                  </View>
                  <TouchableOpacity
                    onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                    style={{width: "20%"}}
                  >
                    <Ionicons
                      name={isPasswordVisible ? "eye" : "eye-off"}
                      size={24}
                      color="gray"
                    />
                  </TouchableOpacity>
                </View>
              )}
              name="password"
              rules={{ required: "Password is required" }}
              defaultValue=""
            />
          {errors?.password && (
            <Text style={styles.error}>{errors.password.message}</Text>
          )}
        </View>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleSubmit(onSubmit)}
          disabled={isLoading || loginLoading}
        >
          <Text style={styles.loginButtonText}>
            {isLoading || loginLoading ? "Logging in..." : "Login"}
          </Text>
        </TouchableOpacity>

      </View>
      </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingVertical: "30%",
    backgroundColor: "#007bff",
  },
  logo: {
    width: 300,
    height: 150,
    objectFit: "contain",
  },
  formContainer: {
    width: "80%",
    alignSelf: "center",
    marginTop: 50,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
    color: "#333333",
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderColor: "#cccccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  loginButton: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
  },
  loginButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  error: {
    color: "red",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingRight:35,
    height: 40,
  },
  passwordInput   : {
    flex: 1,
    width: "80%", 
    height: 40,
    // backgroundColor: "#fff",
  },
});

export default LoginScreen;
