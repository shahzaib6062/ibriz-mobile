import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const CustomerCard = ({ avatar, name, designation, phoneNumber, address }) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.userInfoContainer}>
          <Image source={{ uri: avatar }} style={styles.avatar} />
          <View style={styles.userInfo}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.designation}>{designation}</Text>
          </View>
        </View>
        <View style={styles.contactInfo}>
          <Text style={styles.icon}>icon</Text>
          <Text>{phoneNumber}</Text>
        </View>
        <View style={styles.contactInfo}>
          <Text style={styles.icon}>icon</Text>
          <Text>{address}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  userInfoContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userInfo: {
    justifyContent: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  designation: {
    color: "gray",
  },
  contactInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  icon: {
    marginRight: 5,
  },
});

export default CustomerCard;
