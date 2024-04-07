import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import avatar2 from "../../../assets/svg/avatar_2.svg";
import mailLogo from "../../../assets/svg/mail_logo.svg";
import phoneLogo from "../../../assets/svg/call_logo.svg";
import locationLogo from "../../../assets/svg/location_logo.svg";
import { Image } from "expo-image";

const CustomerCard = ({ name, designation, phoneNumber, address, id }) => {
  const navigation = useNavigation();

  const handleCardPress = () => {
    navigation.navigate("agent/profile", { clientId: id });
  };

  return (
    <TouchableOpacity onPress={handleCardPress}>
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.userInfoContainer}>
            <Image source={avatar2} style={styles.avatar} />
            <View style={styles.userInfo}>
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.designation}>{designation}</Text>
            </View>
          </View>
          <View style={styles.contactInfo}>
            <Image
              source={phoneLogo}
              style={{ width: 14, height: 14, marginRight: 5 }}
            />
            <Text>{phoneNumber}</Text>
          </View>
          <View style={styles.contactInfo}>
            <Image
              source={locationLogo}
              style={{ width: 16, height: 16, marginRight: 5 }}
            />
            <Text>{address}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },

  card: {
    backgroundColor: "#DFE5FF",
    borderRadius: 10,
    padding: 15,
    width: "100%",
  },
  userInfoContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
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
