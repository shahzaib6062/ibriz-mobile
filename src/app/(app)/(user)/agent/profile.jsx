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
import { useRoute } from "@react-navigation/native";
import { useClient } from "../../../../Hooks/useQuery";

const Profile = () => {
  const route = useRoute();
  const clientId = route.params?.clientId;
  const [isModalVisible, setModalVisible] = useState(false);
  const [allHarvestData, setAllHarvestData] = useState([]);

  const { data: clientData, isLoading, error, refetch } = useClient(clientId);
  console.log("🚀 ~ Profile ~ clientData:", clientData.data.data);

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
        name={clientData?.data?.data?.name}
        type="Customer"
        phone="+123 456 7890"
        email={clientData?.data?.data?.email}
        address={clientData?.data?.data?.clientLocation}
      />
      <View style={styles.header}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>Visits</Text>
        </View>
        <View style={styles.pill}>
          <Text style={styles.pillText}>25</Text>
        </View>
      </View>
      <ScrollView>
        {allHarvestData.map((data, index) => (
          <HarvestDataCard key={index} data={data} />
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.addButton} onPress={handleAddVisit}>
        <Text style={styles.addButtonText}>Add a visit</Text>
      </TouchableOpacity>
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
    backgroundColor: "#FFF",
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
