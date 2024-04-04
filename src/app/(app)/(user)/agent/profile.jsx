import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import CustomerProfileCard from "../../../../Component/CustomerProfileCard";
import HarvestDataCard from "../../../../Component/HarvestDataCard";

const Profile = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [pumpStatus, setPumpStatus] = useState("");
  const [harvestData, setHarvestData] = useState("");

  // Sample data for the harvestData
  const initialHarvestData = [
    { label: "Harvest Time", value: "8:00 AM" },
    { label: "Harvest Data", value: "April 12, 2022" },
    { label: "Pump Status", value: "Active" },
    { label: "Location", value: "123 Street, City, Country" },
  ];

  const [allHarvestData, setAllHarvestData] = useState([initialHarvestData]);

  const handleAddVisit = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleAddVisitData = () => {
    const newVisitData = [
      { label: "Harvest Time", value: harvestData },
      { label: "Harvest Data", value: pumpStatus },
      { label: "Pump Status", value: pumpStatus },
      { label: "Location", value: "123 Street, City, Country" },
    ];
    setAllHarvestData([...allHarvestData, newVisitData]);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <CustomerProfileCard
        avatar="avatar_url"
        name="John Doe"
        type="Regular Customer"
        phone="+123 456 7890"
        email="example@email.com"
        address="123 Street, City, Country"
      />
      <View style={styles.header}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>Visits</Text>
        </View>
        <View style={styles.pill}>
          <Text style={styles.pillText}>25</Text>
        </View>
      </View>
      {/* Render HarvestDataCard for each set of data */}
      <ScrollView>
        {allHarvestData.map((data, index) => (
          <HarvestDataCard key={index} data={data} />
        ))}
      </ScrollView>
      {/* Button to add a visit */}
      <TouchableOpacity style={styles.addButton} onPress={handleAddVisit}>
        <Text style={styles.addButtonText}>Add a visit</Text>
      </TouchableOpacity>
      {/* Modal for adding new visit data */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Visit Details</Text>
            <TextInput
              style={styles.input}
              placeholder="Pump Status"
              value={pumpStatus}
              onChangeText={setPumpStatus}
            />
            <TextInput
              style={styles.input}
              placeholder="Harvest Data/Time"
              value={harvestData}
              onChangeText={setHarvestData}
            />
            <TouchableOpacity
              style={styles.addButton}
              onPress={handleAddVisitData}
            >
              <Text style={styles.addButtonText}>Add Visit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginLeft: 15,
  },
  headerTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  pill: {
    backgroundColor: "#3498db",
    paddingHorizontal: 12,
    paddingTop: 3,
    borderRadius: 15,
    marginLeft: 10,
  },
  pillText: {
    color: "#fff",
    fontSize: 12,
  },
  addButton: {
    backgroundColor: "#3498db",
    paddingVertical: 10,
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 20,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: "100%",
  },
  closeButton: {
    backgroundColor: "#e74c3c",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Profile;
