import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import CustomerProfileCard from "../../../../Component/CustomerProfileCard";
import HarvestDataCard from "../../../../Component/HarvestDataCard";
import AddVisitModal from "../../../../Component/visitModal";

const Profile = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [allHarvestData, setAllHarvestData] = useState([]);

  const handleAddVisit = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleAddVisitData = ({ pumpStatus, harvestData }) => {
    const newVisitData = [
      { label: "Harvest Time", value: harvestData },
      { label: "Harvest Data", value: pumpStatus },
      { label: "Pump Status", value: pumpStatus },
      { label: "Location", value: "123 Street, City, Country" },
    ];
    setAllHarvestData([...allHarvestData, newVisitData]);
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
      <AddVisitModal
        isVisible={isModalVisible}
        onClose={closeModal}
        onAddVisit={handleAddVisitData}
      />
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
});

export default Profile;
