import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const CustomerProfileCard = ({ avatar, name, type, phone, email, address }) => {
  return (
    <View style={styles.card}>
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}></View>
      </View>
      <View style={styles.row}>
        <Text style={styles.name}>{name}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.type}>{type}</Text>
      </View>
      <View style={styles.contactRow}>
        <MaterialIcons name="phone" size={24} color="black" />
        <Text style={styles.contactInfo}>{phone}</Text>
      </View>
      <View style={styles.contactRow}>
        <MaterialIcons name="email" size={24} color="black" />
        <Text style={styles.contactInfo}>{email}</Text>
      </View>
      <View style={styles.contactRow}>
        <MaterialIcons name="location-on" size={24} color="black" />
        <Text style={styles.contactInfo}>{address}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  avatarContainer: {
    paddingTop: 20,
    paddingBottom: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#E0E0E0",
    alignSelf: "center",
  },
  row: {
    alignItems: "center",
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  type: {
    fontSize: 16,
    color: "#666666",
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  contactInfo: {
    marginLeft: 10,
    fontSize: 16,
  },
});

export default CustomerProfileCard;
