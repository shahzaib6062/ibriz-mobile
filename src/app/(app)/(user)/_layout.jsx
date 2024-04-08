import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { Redirect } from "expo-router";
import { useSession } from "../../../contexts/sessionContext";
import { View, Text, Image, StyleSheet } from "react-native";

export default function Layout() {
  const { user, isLoading } = useSession();

  if (!user) {
    return <Redirect href="/login" />;
  }

  return (
    <GestureHandlerRootView
      style={{ flex: 1, paddingTop: 40, backgroundColor: "#fff" }}
    >
      <Drawer>
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: "Home",
            title: "overview",
          }}
        />
        <Drawer.Screen
          name="agent"
          options={{
            drawerLabel: "Agent",
            title: "Agent",
          }}
        />
        <Drawer.Screen
          name="profile"
          options={{
            drawerLabel: "Profile",
            title: "Profile",
          }}
        />
      </Drawer>
      <View style={styles.header}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        <Text style={styles.username}>vji</Text>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
