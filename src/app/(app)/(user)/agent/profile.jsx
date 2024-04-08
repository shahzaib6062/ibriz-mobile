import React, { useState, useEffect } from "react";
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
import { useClient, useClientsVisits } from "../../../../Hooks/useQuery";
import moment from "moment";
import "moment-timezone";
import { useNavigation } from "expo-router";
const Profile = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const clientId = route.params?.clientId;
  const [isModalVisible, setModalVisible] = useState(false);
  const { data: clientData, isLoading, error, refetch } = useClient(clientId);
  const {
    data: visitData,
    isLoading: visitLoading,
    error: visitError,
    refetch: visitRefetch,
  } = useClientsVisits(clientId);

  const handleAddVisit = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("/index")}>
        <Text style={styles.backButton}>Back</Text>
      </TouchableOpacity>
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
          <Text style={styles.pillText}>{visitData?.data?.count}</Text>
        </View>
      </View>
      <ScrollView>
        {visitData &&
          visitData.data &&
          Array.isArray(visitData.data.data) &&
          visitData.data.data.map((visit, index) => (
            <HarvestDataCard
              key={index}
              data={[
                {
                  label: "Harvest Time",
                  value: moment(visit?.harvestDateTime)
                    .tz(moment.tz.guess())
                    .format("HH:mm A"),
                },
                {
                  label: "Harvest Date",
                  value: moment(visit?.harvestDateTime).format("YYYY-MM-DD"),
                },
                { label: "Location", value: visit?.visitLocation },
                {
                  label: "Pump Status",
                  value: visit.pumpStatus === 1 ? "ON" : "OFF",
                },
              ]}
            />
          ))}
      </ScrollView>
      <TouchableOpacity style={styles.addButton} onPress={handleAddVisit}>
        <Text style={styles.addButtonText}>Add a visit</Text>
      </TouchableOpacity>
      <AddVisitModal
        isVisible={isModalVisible}
        onClose={closeModal}
        clientId={clientId}
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
