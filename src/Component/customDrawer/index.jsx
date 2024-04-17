import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import Ionicons from "react-native-vector-icons/Ionicons";
import logo from "../../../assets/svg/IBRIZ _logo_nav.svg";
import { Image } from "expo-image";
import { useSession } from "../../contexts/sessionContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CustomDrawer = (props) => {
  const { removeUser, user } = useSession();
  const { bottom } = useSafeAreaInsets();

  const logout = () => {
    removeUser();
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#0432FF",
      }}
    >
      <View style={styles.header}>
        <Image
          source={logo}
          style={{
            height: 45,
            width: "100%",
            marginTop: 30,
            marginBottom: -20,
          }}
          contentFit="contain"
        />
        <Text style={styles.username}>{user?.name}</Text>
      </View>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View style={styles.logoutContainer}>
        <Pressable style={styles.logoutButton} onPress={logout}>
          <Ionicons name="exit-outline" size={22} color={"#FFF"} />
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    paddingTop: 20,
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  logoutContainer: {
    paddingTop: 10,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    color: "#FFF",
    paddingHorizontal: 20,
  },
  logoutText: {
    fontSize: 16,
    marginLeft: 10,
    color: "#FFF",
  },
});

export default CustomDrawer;
