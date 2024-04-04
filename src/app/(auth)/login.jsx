import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SvgUri } from "react-native-svg";
const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = () => {
    // Add your login logic here
    console.log("Logging in with:", username, password);
  };

  const toggleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        {/* <SvgUri
          width="200px"
          height="100px"
          uri={require("../../../assets/svg/IBRIZ_logo.svg")}
        /> */}
        <Text style={styles.loginText}>Log in to your account</Text>
      </View>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Username/Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your username or email"
            onChangeText={(text) => setUsername(text)}
            value={username}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TouchableOpacity style={styles.forgotContainer}>
            <Text style={styles.forgotText}>Reset Password</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
            value={password}
          />
        </View>
        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={toggleRememberMe}
        >
          <View style={[styles.checkbox, rememberMe && styles.checkedBox]} />
          <Text style={styles.checkboxText}>Remember Me</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
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
    paddingHorizontal: 50,
    paddingVertical: "35%",
    backgroundColor: "#007bff",
  },
  logoText: {
    fontSize: 36,
    fontWeight: "bold",
  },
  loginText: {
    fontSize: 24,
    color: "#FFF",
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
  forgotContainer: {
    position: "absolute",
    right: 0,
    top: 0,
    justifyContent: "center",
  },
  forgotText: {
    color: "#007bff",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#333333",
    marginRight: 10,
  },
  checkedBox: {
    backgroundColor: "#007bff",
  },
  checkboxText: {
    color: "#333333",
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
});

export default LoginScreen;
