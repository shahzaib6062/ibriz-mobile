import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import CustomerCard from "../../../../Component/CustomerCard";
import avatar2 from "../../../../../assets/svg/avatar_2.svg";
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#F5F5F5",
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

const customersData = [
  {
    avatar: "avatar_url_1",
    name: "Fermi Borgani",
    designation: "Customer",
    phoneNumber: "+92-346-2567607",
    address: "RN2, Nayamugari, Street 29, Burundi",
  },
  {
    avatar: "avatar_url_2",
    name: "John Doe",
    designation: "Customer",
    phoneNumber: "+91-9876543210",
    address: "123 Main Street, City, Country",
  },
];

const Index = () => {
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
          <Text style={styles.pillText}>25</Text>
        </View>
      </View>
      {customersData.map((customer, index) => (
        <CustomerCard key={index} {...customer} />
      ))}
    </View>
  );
};

export default Index;
