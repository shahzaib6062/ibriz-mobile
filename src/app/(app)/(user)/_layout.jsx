import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { Redirect } from "expo-router";
import { useSession } from "../../../contexts/sessionContext";

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
    </GestureHandlerRootView>
  );
}
