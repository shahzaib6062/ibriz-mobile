import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const AgentsCard = ({
  avatar,
  name,
  designation,
  totalCustomers,
  groupAvatars,
}) => {
  const navigation = useNavigation();

  const handleCardPress = () => {
    navigation.navigate("agent/index");
  };

  return (
    <TouchableOpacity onPress={handleCardPress} style={styles.container}>
      <View style={styles.row}>
        <View style={styles.userInfoContainer}>
          <Image source={{ uri: avatar }} style={styles.avatar} />
          <View>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.designation}>{designation}</Text>
          </View>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.customerCountContainer}>
          <Text style={styles.customerCount}>{totalCustomers} customers</Text>
        </View>
        <View style={styles.groupAvatarContainer}>
          {groupAvatars.map((avatar, index) => (
            <Image
              key={index}
              source={{ uri: avatar }}
              style={styles.groupAvatar}
            />
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: "450px",
    height: "100px",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
    backgroundColor: "#3498db",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginRight: 10,
  },
  customerCount: {
    color: "#fff",
    fontSize: 12,
  },
  groupAvatarContainer: {
    flexDirection: "row",
  },
  groupAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginLeft: 5,
  },
});

export default AgentsCard;
