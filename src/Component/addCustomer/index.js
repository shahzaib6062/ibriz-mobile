import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal, Alert, ScrollView } from "react-native";
import DropDownPicker from "react-native-element-dropdown"; 
import { useAddClient } from "../../Hooks/mutations";

const orderStatuses = [
  { id: "pending", label: "Pending", color: "red" },
  { id: "processing", label: "Processing", color: "blue" },
  { id: "completed", label: "Completed", color: "purple" },
  { id: "cancelled", label: "Cancelled", color: "red" },
];

const AddClientModal = ({ visible, onCancel, onSuccess, agentsData, pumpsData }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedPump, setSelectedPump] = useState(null);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(orderStatuses[0].id);

  const {
    mutate: addClientMutate,
    isLoading: addClientLoading,
    error: addClientError,
    isSuccess: addClientSuccess,
    data: addClientData,
    isError: isAddClientError,
  } = useAddClient();

  useEffect(() => {
    if (addClientSuccess) {
      Alert.alert("Success", addClientData?.message);
      onSuccess();
      onCancel();
      resetForm();
    }
  }, [addClientSuccess]);

  useEffect(() => {
    if (isAddClientError) {
      Alert.alert("Error", addClientError?.response?.data?.message);
    }
  }, [isAddClientError]);

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setSelectedPump(null);
    setSelectedAgent(null);
    setSelectedStatus(orderStatuses[0].id);
  };

  const onFinish = () => {
    if (!name || !email || !phone || !selectedPump || !selectedAgent) {
      Alert.alert("Validation Error", "Please fill in all required fields.");
      return;
    }
    
    const values = {
      name,
      email,
      phone,
      attachedPump: selectedPump,
      attachedAgent: selectedAgent,
      orderStatus: selectedStatus,
      clientLocation: [73.44, 23.123], // Example location
    };

    addClientMutate(values);
    onSuccess();
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={{ flex: 1, justifyContent: "center", padding: 20, backgroundColor: 'rgba(0,0,0,0.7)' }}>
        <View style={{ backgroundColor: "white", padding: 20, borderRadius: 15 }}>
          <ScrollView>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' }}>Add New Customer</Text>
            
            <Text style={{ fontSize: 16 }}>Name</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Enter Client Name"
              style={{ borderBottomWidth: 1, marginBottom: 15, padding: 8, borderRadius: 5, fontSize: 16 }}
            />
            
            <Text style={{ fontSize: 16 }}>Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Enter Email Address"
              style={{ borderBottomWidth: 1, marginBottom: 15, padding: 8, borderRadius: 5, fontSize: 16 }}
              keyboardType="email-address"
            />
            
            <Text style={{ fontSize: 16 }}>Phone</Text>
            <TextInput
              value={phone}
              onChangeText={setPhone}
              placeholder="Enter Phone Number"
              style={{ borderBottomWidth: 1, marginBottom: 15, padding: 8, borderRadius: 5, fontSize: 16 }}
              keyboardType="phone-pad"
            />
            
            <Text style={{ fontSize: 16 }}>Attached Pump</Text>
            <DropDownPicker
              data={pumpsData?.data?.map((pump) => ({ label: pump.serialNumber, value: pump._id }))}
              value={selectedPump}
              onChange={(item) => setSelectedPump(item.value)}
              placeholder="Select Pump"
              style={{ marginBottom: 15 }}
              containerStyle={{ padding: 8, borderRadius: 5, borderColor: "#ccc" }}
              dropDownStyle={{ borderColor: "#ccc" }}
            />
            
            <Text style={{ fontSize: 16 }}>Attached Agent</Text>
            <DropDownPicker
              data={agentsData?.data?.map((agent) => ({ label: agent.name, value: agent._id }))}
              value={selectedAgent}
              onChange={(item) => setSelectedAgent(item.value)}
              placeholder="Select Agent"
              style={{ marginBottom: 15 }}
              containerStyle={{ padding: 8, borderRadius: 5, borderColor: "#ccc" }}
              dropDownStyle={{ borderColor: "#ccc" }}
            />
            
            <Text style={{ fontSize: 16, marginBottom: 10 }}>Order Status</Text>
            <DropDownPicker
              data={orderStatuses.map((status) => ({ label: status.label, value: status.id }))}
              value={selectedStatus}
              onChange={(item) => setSelectedStatus(item.value)}
              placeholder="Select Status"
              style={{ marginBottom: 15 }}
              containerStyle={{ padding: 8, borderRadius: 5, borderColor: "#ccc" }}
              dropDownStyle={{ borderColor: "#ccc" }}
            />

            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 30 }}>
              <TouchableOpacity
                onPress={onCancel}
                style={{ padding: 12, backgroundColor: "gray", borderRadius: 10 }}
              >
                <Text style={{ color: "white", fontSize: 16 }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={onFinish}
                style={{ padding: 12, backgroundColor: addClientLoading ? "lightgray" : "blue", borderRadius: 10 }}
                disabled={addClientLoading}
              >
                <Text style={{ color: "white", fontSize: 16 }}>Create Customer</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default AddClientModal;


