import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import avatar2 from "../../../assets/svg/avatar_2.svg";
import avatar1 from "../../../assets/svg/avatar_1.svg";
import mailLogo from "../../../assets/svg/mail_logo.svg";
import phoneLogo from "../../../assets/svg/call_logo.svg";
import locationLogo from "../../../assets/svg/location_logo.svg";
import { Image } from "expo-image";
import { useRouter } from "expo-router";

const CustomerCard = ({
  name,
  designation,
  phoneNumber,
  address,
  id,
  orderStatus,
}) => {
  const router = useRouter();

  const handleCardPress = () => {
    if (designation === "Field Agent") {
      router.navigate({
        pathname: "agent",
        params: { agentId: id },
      });
    } else if (designation === "Customer") {
      router.navigate({
        pathname: "agent/profile",
        params: { clientId: id },
      });
    }
  };

  return (
    <TouchableOpacity onPress={handleCardPress}>
      <View style={styles.card}>
        <View style={styles.userInfoContainer}>
          <Image
            source={designation === "Field Agent" ? avatar2 : avatar1}
            style={styles.avatar}
          />
          <View style={styles.userInfo}>
            <Text style={styles.name}>{name}</Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              {/* <Text style={styles.designation}>{designation}</Text> */}
              {orderStatus && (
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "bold",
                    color: "#0432FF",
                    marginLeft: 5,
                    backgroundColor: "#D7DCF0",
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderRadius: 15,
                  }}
                >
                  {orderStatus}
                </Text>
              )}
            </View>
          </View>
        </View>
        <View style={styles.contactInfo}>
          <Image
            source={phoneLogo}
            style={{ width: 14, height: 14, marginRight: 5 }}
          />
          <Text>{phoneNumber}</Text>
        </View>
        {address && (
          <View style={styles.contactInfo}>
            <Image
              source={locationLogo}
              style={{ width: 16, height: 16, marginRight: 5 }}
            />
            <Text>{address}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#DFE5FF",
    borderRadius: 10,
    padding: 15,
    width: 300,
    marginBottom: 10,
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
