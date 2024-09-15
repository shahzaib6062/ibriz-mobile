import React, { useEffect, useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, ScrollView, Alert, KeyboardAvoidingView, Platform , Keyboard} from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import { RadioButton } from 'react-native-paper';
import { useAddClient, useAgents, usePumpsHistory, useUpdateClient } from '../../../../Hooks/mutations';
import moment from 'moment';
import { useNavigation } from 'expo-router';
import { Image } from "expo-image";
import backIcon from "../../../../../assets/svg/backArrow.svg";
import { useClient } from '../../../../Hooks/useQuery';
import { useRoute } from "@react-navigation/native";
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
const CustomerAction = () => {
  const route = useRoute();
  const clientId = route.params?.clientId;
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedPump, setSelectedPump] = useState(null);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [status, setStatus] = useState('pending');
  const [pumps, setPumps] = useState([]);
  const [agents, setAgents] = useState([]);
  const orderStatuses = [
    { id: 'pending', label: 'Pending', color: 'red' },
    { id: 'processing', label: 'Processing', color: 'blue' },
    { id: 'completed', label: 'Completed', color: 'purple' },
    { id: 'cancelled', label: 'Cancelled', color: 'red' },
  ];


  const { data: clientData, refetch } = useClient(clientId);


  const {
    isPending: isPumpHistoryLoading,
    error: pumpHistoryError,
    data: pumpsData,
    mutate: mutatePumpHistory,
  } = usePumpsHistory();
  const {
    isLoading,
    error,
    data: agentsData,
    mutate: agentsMutate,
  } = useAgents();

  const {
    mutate: addClientMutate,
    isLoading: addClientLoading,
    error: addClientError,
    isSuccess: addClientSuccess,
    data: addClientData,
    isError: isAddClientError,
  } = useAddClient();

  const {
    mutate: updatelientMutate,
    error: updatelientError,
    isSuccess: updatelientSuccess,
    data: updatelientData,
    isError: isupdatelientError,
    isLoading: updatelientLoading,
  } = useUpdateClient();

  useEffect(() => {
    if (clientData?.data?.data) {
      setName(clientData?.data?.data?.name);
      setEmail(clientData?.data?.data?.email);
      setPhone(clientData?.data?.data?.phone);
      setSelectedPump(clientData?.data?.data?.attachedPump?._id);
      setSelectedAgent(clientData?.data?.data?.attachedAgent?._id);
      setStatus(clientData?.data?.data?.orderStatus);
    }
  }, [clientData]);

  useEffect(() => {
    mutatePumpHistory(
      moment().subtract(10, "hours").format("YYYY-MM-DD HH:mm:ss")
    );
    agentsMutate("field");
  }, []);
  useEffect(() => {
    if (isAddClientError) {
      Alert.alert("Error", addClientError?.response?.data?.message);
    }
  }, [isAddClientError]);
  useEffect(() => {
    if (addClientSuccess) {
      Alert.alert("Success", addClientData?.message);
      resetForm();
    }
  }, [addClientSuccess]);
  useEffect(() => {
    if (isupdatelientError) {
      Alert.alert("Error", updatelientError?.response?.data?.message);
    }
  }, [isupdatelientError]);
  useEffect(() => {    
    if (updatelientSuccess) {      
      Alert.alert("Success", updatelientData?.message);      
      resetForm();    
    }  
  },  [updatelientSuccess]);
  


  useEffect(() => {
    if (pumpsData) {
      const pumpOptions = pumpsData?.data?.map((item) => ({
        label: item?.serialNumber,
        value: item?._id,
        id: item?._id,
        key: item?._id
      }));
      setPumps(pumpOptions);
    }
    if(agentsData) {
      const agentOptions = agentsData?.data?.map((item) => ({
        label: item?.name,
        value: item?._id,
        id: item?._id,
        key: item?._id
      }));
      setAgents(agentOptions);
    } 
  }, [pumpsData, agentsData]);

  const handleSave = () => {
    console.log({
      name,
      email,
      phone,
      selectedPump,
      selectedAgent,
      status,
    });

    const values = {
      name,
      email,
      phone,
      attachedPump: selectedPump,
      attachedAgent: selectedAgent,
      orderStatus: status,
      clientLocation: [73.44, 23.123], 
    };

    if(clientId) {
      updatelientMutate({...values, id: clientId});
    } else {
      addClientMutate(values);
    }
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setSelectedPump(null);
    setSelectedAgent(null);
    setStatus("pending");
  };

  return (
    <KeyboardAvoidingView
    style={styles.container}
    behavior={Platform.OS === "ios" ? "padding" : "height"}
  >
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <ScrollView contentContainerStyle={styles.container}>
    <View style={{ display: "flex", flexDirection: "row", paddingTop: 10, paddingBottom: 20, alignItems: "center" }}>
       <TouchableOpacity onPress={() => { navigation.goBack(); resetForm(); } }>
       <Image
            source={backIcon}
            width={20}
            height={15}
            style={{cursor: "pointer", padding: 5 }}
          />
      </TouchableOpacity>
      <Text style={styles.header}>Add Customer</Text>
      </View>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
        style={styles.input}
        keyboardType="phone-pad"
      />

      <ModalSelector
        data={pumps}
        initValue={selectedPump ? pumps.find(pump => pump.value === selectedPump)?.label : "Select Pump"}
        onChange={(option) => {
          setSelectedPump(option.value);
        }}
        style={[styles.selector, { color: "black" }]}
        optionContainerStyle={styles.optionContainer}
        textStyle={{ color: "black" }}
        initValueTextStyle={styles.initValueText} // Add this line
        selectTextStyle={styles.selectText} // Add this line
      />

      <ModalSelector
        data={agents}
        initValue={selectedAgent ? agents.find(agent => agent.value === selectedAgent)?.label : "Select Agent"}
        onChange={(option) => {
          setSelectedAgent(option.value);
        }}
        style={styles.selector}
        optionContainerStyle={styles.optionContainer}
        initValueTextStyle={styles.initValueText} // Add this line
        selectTextStyle={styles.selectText} // Add this line
      />

      <View style={styles.radioGroup}>
        <Text style={styles.radioLabel}>Status:</Text>
        <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap"}}>
        {orderStatuses.map((statusOption) => (
          <View key={statusOption.id} style={styles.radioButton}>
            <RadioButton
              value={statusOption.id}
              status={status === statusOption.id ? 'checked' : 'unchecked'}
              onPress={() => setStatus(statusOption.id)}
              color={statusOption.color}
            />
            <Text>{statusOption.label}</Text>
          </View>
        ))}
        </View>
      </View>

      <TouchableOpacity style={{...styles.saveButton,  backgroundColor: addClientLoading ? "lightgray" : "#007bff"}} onPress={handleSave}           disabled={addClientLoading}>
        <Text style={styles.saveButtonText}>{addClientLoading ? "Saving..." : "Save"}</Text>
      </TouchableOpacity>
    </ScrollView>
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = {
  initValueText: {  
    color: 'black',
    fontWeight: '400',
  },
  selectText: {   
    color: 'black',
    fontWeight: '400',
  },
  container: {
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    // marginBottom: 20,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#fff',
    elevation: 1,
  },
  selector: {
    marginBottom: 15,
    backgroundColor: '#fff',
    color: 'black',
  },
  optionContainer: {
    maxHeight: 200, // Limit the height of the modal to 200px
  },
  radioGroup: {
    marginBottom: 20,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    width: "50%",
  },
  radioLabel: {
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#333',
  },
  saveButton: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 2,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
};

export default CustomerAction;
