import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Alert,
} from "react-native";
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useForm, Controller } from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";
import { RadioButton } from "react-native-paper";
import { useSession } from "../../../../contexts/sessionContext";
import { useAddAgent, useEditAgent } from "../../../../Hooks/mutations";
import { ScrollView } from "react-native-gesture-handler";
import backIcon from "../../../../../assets/svg/backArrow.svg";
import { useNavigation } from "expo-router";
import { Image } from "expo-image";
import { useRoute } from "@react-navigation/native";
import { useAgent } from "../../../../Hooks/useQuery";

const AgentAction = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
    setValue,
  } = useForm();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [status, setStatus] = useState(true);
  const { user } = useSession()
  const navigation = useNavigation();   
  const route = useRoute();
  const agentId = route.params?.agentId;
  const {
    mutate: addAgentMutate,
    isLoading: addAgentLoading,
    error: addAgentError,
    isSuccess: addAgentSuccess,
    data: addAgentData,
    isError: isAddAgentError,
  } = useAddAgent();

  const {
    data: agentData,
    isLoading: isLoadingAgent,
    isError: isErrorAgent,
    error: errorAgent,
    refetch: refetchAgent,
  } = useAgent(agentId);

  const {
    mutate: editAgentMutate,
    isLoading: editAgentLoading,
    error: editAgentError,
    isSuccess: editAgentSuccess,
    data: editAgentData,
    isError: isEditAgentError,
  } = useEditAgent();

  useEffect(() => {
    if (agentData?.data?.data) {
      setStatus(agentData?.data?.data.active);
      setValue("name", agentData?.data?.data.name);
      setValue("email", agentData?.data?.data.email);
      setValue("phone", agentData?.data?.data.phone);
      setValue("pump", agentData?.data?.data.pump?._id);
      

    }
  }, [agentData]);

  const onSubmit = (data) => {
  
   if(agentId){
    const payload = {
        ...data,
        active: status,
        type: "field",
        salesAgent: user.data._id,
        id: agentId
      }
    editAgentMutate(payload);
   }
   else{
    const payload = {
        ...data,
        active: status,
        type: "field",
        salesAgent: user.data._id,
      }
   addAgentMutate(payload);
   }
  };

  useEffect(() => {
    if (isAddAgentError) {
      Alert.alert("Error", addAgentError?.response?.data?.message);
    }
  }, [isAddAgentError]);
  useEffect(() => {
    if (addAgentSuccess) {
      Alert.alert("Success", addAgentData?.message);
      resetForm();
    }
  }, [addAgentSuccess]);

  useEffect(() => {
    if (isEditAgentError) {
      Alert.alert("Error", editAgentError?.response?.data?.message);
    }
  }, [isEditAgentError]);
  useEffect(() => {
    if (editAgentSuccess) {
      Alert.alert("Success", editAgentData?.message);
      resetForm();
    }
  }, [editAgentSuccess]);

  const resetForm = () => {
    setStatus(true);
    reset()
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView contentContainerStyle={styles.container}>
      <View style={{ display: "flex", flexDirection: "row", paddingTop: 20, paddingHorizontal: 10, alignItems: "center" }}>
       <TouchableOpacity onPress={() => { navigation.goBack(); resetForm(); } }>
       <Image
            source={backIcon}
            width={20}
            height={15}
            style={{  cursor: "pointer", padding: 5 }}
          />
      </TouchableOpacity> 
      <Text style={styles.header}>Add Field Agent</Text>
      </View>
        <View style={styles.innerContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Name</Text>
            <Controller
              control={control}
              render={({ field }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Enter your name"
                  onChangeText={field.onChange}
                  value={field.value}
                />
              )}
              name="name"
              rules={{ required: "Name is required" }}
              defaultValue=""
            />
            {errors?.name && (
              <Text style={styles.error}>{errors.name.message}</Text>
            )}
          </View>

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
                  keyboardType="email-address"
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
            <Text style={styles.label}>Phone</Text>
            <Controller
              control={control}
              render={({ field }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Enter your phone"
                  onChangeText={field.onChange}
                  value={field.value}
                  keyboardType="phone-pad"
                />
              )}
              name="phone"
              rules={{ required: "Phone number is required" }}
              defaultValue=""
            />
            {errors?.phone && (
              <Text style={styles.error}>{errors.phone.message}</Text>
            )}
          </View>
{!agentId &&
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
}
          <View style={styles.radioGroup}>
            <Text style={styles.radioLabel}>Active Status:</Text>
            <View style={{width : "100%", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
            <View style={styles.radioButton}>
              <RadioButton
                value="active"
                status={status === true  ? "checked" : "unchecked"}
                onPress={() => setStatus(true)}
                color="green"
              />
              <Text>Active</Text>
            </View>
            <View style={styles.radioButton}>
              <RadioButton
                value="inactive"
                status={status === false? "checked" : "unchecked"}
                onPress={() => setStatus(false)}
                color="red"
              />
              <Text>Inactive</Text>
            </View>
          </View>
          </View>

          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={{...styles.submitButtonText,backgroundColor: addAgentLoading ? "lightgray" : "#007bff"}}>{addAgentLoading ? "Saving..." : "Save"}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  container: {
    backgroundColor: '#f5f5f5',
  },
  header: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    // marginBottom: 20,
    color: '#333',
  },
  innerContainer: {
    padding: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
    color: "#333",
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
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
    backgroundColor: "#fff",
  },passwordInput   : {
    flex: 1,
    width: "80%", 
    height: 40,
    backgroundColor: "#fff",
  },
  radioGroup: {
    marginBottom: 20,
  },
  radioLabel: {
    marginBottom: 10,
    fontWeight: "bold",
    color: "#333",
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    width: "50%",
  },
  submitButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default AgentAction;
