import React from "react";
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { Drawer } from "expo-router/drawer";
import { Redirect } from "expo-router";
import { useSession } from "../../../contexts/sessionContext";
import { View, Text, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import CustomDrawer from "../../../Component/customDrawer";
import { getHeaderTitle } from "@react-navigation/elements";
import avatar from "../../../../assets/svg/avatar_2.svg";
import drawerIcon from "../../../../assets/svg/drawerIcon.svg";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import { Feather } from "@expo/vector-icons";

const MyHeader = () => {
  const { user } = useSession();
  const navigation = useNavigation();

  return (
    <>
      <View style={styles.header}>
        <StatusBar style="light" backgroundColor="#0432FF" />
        <View
          style={{
            marginTop: 30,
            flexDirection: "row",
            alignItems: "center",
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <View>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Image source={drawerIcon} width={20} height={30} />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={avatar}
              width={30}
              height={30}
              style={styles.avatar}
            />
            <Text style={styles.username}>{user?.data?.name}</Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default function Layout() {
  const { user } = useSession();

  if (!user) {
    return <Redirect href="/login" />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Drawer
        screenOptions={{
          drawerLabelStyle: { marginLeft: -20 },
          drawerActiveBackgroundColor: "#FFF",
          drawerActiveTintColor: "black",
          drawerInactiveTintColor: "#FFF",
          header: ({ navigation, route, options }) => {
            const title = getHeaderTitle(options, route.name);
            return <MyHeader title={title} style={options.headerStyle} />;
          },
        }}
        drawerContent={CustomDrawer}
      >
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: "Home",
            title: "Home",
            drawerIcon: ({ size, color }) => (
              <AntDesign name="home" size={size} color={color} />
            ),
          }}
        />

        <Drawer.Screen
          name="agent/profile"
          options={{
            drawerLabel: "Profile",
            title: "Profile",
            drawerIcon: ({ size, color }) => (
              <AntDesign name="user" size={size} color={color} />
            ),
            drawerItemStyle: { display: "none", height: 0 },
          }}
        />

        <Drawer.Screen
          name="agent/index"
          options={{
            drawerLabel: "Agents List",
            title: "Agents",
            drawerIcon: ({ size, color }) => (
              <AntDesign name="user" size={size} color={color} />
            ),
            drawerItemStyle: { display: "none", height: 0 },
          }}
        />

        <Drawer.Screen
          name="listings/agents"
          options={{
            drawerLabel: "Agents",
            title: "Agents",
            drawerIcon: ({ size, color }) => (
              <Feather name="users" size={size} color={color} />
            ),
            drawerItemStyle: {
              display: user?.data?.type === "sales" ? "flex" : "none",
            },
          }}
        />

        <Drawer.Screen
          name="listings/customers"
          options={{
            drawerLabel: "Customers",
            title: "Customers",
            drawerIcon: ({ size, color }) => (
              <AntDesign name="user" size={size} color={color} />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    backgroundColor: "#0432FF",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 5,
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
    // marginTop: 30,
  },
});
