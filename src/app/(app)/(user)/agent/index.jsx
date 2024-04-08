import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import CustomerCard from "../../../../Component/CustomerCard";
import avatar2 from "../../../../../assets/svg/avatar_2.svg";
import { useRoute } from "@react-navigation/native";
import { useClientsOfAgent } from "../../../../Hooks/useQuery";
import { Image } from "expo-image";
import { ScrollView } from "react-native-gesture-handler";

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#FFF",
    flex: 1,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
  titleDesignationText: {
    fontSize: 13,
    marginLeft: 10,
    color: "gray",
    marginTop: 10,
  },
  header: {
    flexDirection: "row",
    marginBottom: 10,
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
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "#E0E0E0",
    alignSelf: "center",
  },
});

const Index = () => {
  const route = useRoute();
  const agentId = route.params?.agentId;

  const {
    data: customersData,
    isLoading,
    error,
    refetch,
  } = useClientsOfAgent(agentId);
  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <AntDesign name="left" size={24} color="black" />
        <Image source={avatar2} style={styles.avatar} />
        <Text style={styles.titleText}>Sales Agent</Text>
        <Text style={styles.titleDesignationText}>Sales Agent</Text>
      </View>
      <View style={styles.header}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>Assigned Customer</Text>
        </View>
        <View style={styles.pill}>
          <Text style={styles.pillText}>{customersData?.data?.count}</Text>
        </View>
      </View>
      {customersData &&
        customersData.data &&
        Array.isArray(customersData?.data?.data) && (
          <ScrollView
            horizontal
            contentContainerStyle={styles.CustomerCard}
            showsHorizontalScrollIndicator={false}
          >
            {customersData?.data?.data.map((customer, index) => (
              <CustomerCard
                key={index}
                name="sd"
                designation="dcsndk"
                phoneNumber="1234567890"
                address="address"
                id={customer._id}
              />
            ))}
          </ScrollView>
        )}
    </View>
  );
};

export default Index;
