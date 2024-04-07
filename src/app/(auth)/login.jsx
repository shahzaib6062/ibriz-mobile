import { Image } from "expo-image";
import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import logo from "../../../assets/svg/login_logo.svg";
import { useForm, Controller } from "react-hook-form";
import { useLogin } from "../../Hooks/mutations";
import axios from "axios";
const LoginScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const { mutate: login, isLoading, error: loginError } = useLogin();

  const onSubmit = async (data) => {
    try {
      await login({
        email: data.email,
        password: data.password,
      });
    } catch (error) {
      setError("login", {
        type: "manual",
        message: "Login failed. Please try again.",
      });
    }
  };

  return (
    <View style={styles.container}>
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
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                onChangeText={field.onChange}
                value={field.value}
                secureTextEntry
              />
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
          disabled={isLoading}
        >
          <Text style={styles.loginButtonText}>
            {isLoading ? "Logging in..." : "Login"}
          </Text>
        </TouchableOpacity>
        {errors.login && (
          <Text style={styles.error}>{errors.login.message}</Text>
        )}
      </View>
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
    width: 200,
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
});

export default LoginScreen;