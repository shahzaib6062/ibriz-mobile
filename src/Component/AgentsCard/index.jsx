import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import avatar1 from "../../../assets/svg/avatar_1.svg";
import avatar2 from "../../../assets/svg/avatar_2.svg";
import groupAvatar from "../../../assets/svg/group_avatar.svg";
import { router } from "expo-router";

const AgentsCard = ({ name, designation, totalCustomers, id, orderStatus }) => {
  const handleCardPress = () => {
    if (designation === "Field Agent") {
      router.navigate({
        pathname: "agent",
        params: { agentId: id },
      });
    } else if (designation === "Customer") {
      router.navigate({
        pathname: "agent/profile",
        params: { agentId: id },
      });
    }
  };

  return (
    <TouchableOpacity onPress={handleCardPress} style={styles.container}>
      <View style={styles.row}>
        <View style={styles.userInfoContainer}>
          <Image
            source={designation === "Field Agent" ? avatar2 : avatar1}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.designation}>{designation}</Text>
          </View>
        </View>
      </View>
      <View style={styles.row}>
        {orderStatus && (
          <View style={styles.customerCountContainer}>
            <Text style={{ ...styles.customerCount, color: "#0432FF" }}>
              {orderStatus}
            </Text>
          </View>
        )}
        <View style={styles.groupAvatarContainer}>
          <Image source={groupAvatar} style={styles.groupAvatar} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 11,
    backgroundColor: "#0432FF0D",
    paddingHorizontal: 10,
    paddingVertical: 16,
    marginVertical: 10,
    marginHorizontal: 15,
    width: 280,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "space-between",
  },
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    backgroundColor: "rgba(13, 62, 255, 0.12)",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  designation: {
    fontSize: 14,
    color: "gray",
  },
  moreIcon: {
    fontSize: 24,
  },
  customerCountContainer: {
    backgroundColor: "#D7DCF0",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginTop: 10,
    marginLeft: 5,
  },
  customerCount: {
    fontSize: 12,
    fontWeight: "bold",
  },
  groupAvatarContainer: {},
  groupAvatar: {
    marginLeft: 15,
  },
});

export default AgentsCard;
