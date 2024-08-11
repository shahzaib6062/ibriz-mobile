import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";
import phoneLogo from "../../../assets/svg/call_logo.svg";
import locationLogo from "../../../assets/svg/location_logo.svg";
const CustomerProfileCard = ({ avatar, name, type, phone, email, address }) => {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.name}>{name}</Text>
      </View>
      <View>
      <View style={styles.contactRow}>
        <Image source={phoneLogo} style={{ width: 20, height: 20 }} />
        <Text style={styles.contactInfo}>{phone}</Text>
      </View>
      <View style={styles.contactRow}>
        <Image source={locationLogo} style={{ width: 20, height: 20 }} />
        <Text style={styles.contactInfo}>{address}</Text>
      </View>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#0432FF0D",
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 20,
    marginVertical: 10,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
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
    marginTop: 10
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
