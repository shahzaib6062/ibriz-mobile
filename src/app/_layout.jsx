import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SessionProvider } from "../contexts/sessionContext";
import { SafeAreaView, View } from "react-native";
import { SplashScreen, Stack } from "expo-router";
export default function Layout() {
  return (
    <SessionProvider>
      <GestureHandlerRootView>
        <SafeAreaView>
          <View height="100%" collapsable={false}>
            <Stack
              initialRouteName="(app)"
              screenOptions={{ header: () => null }}
            />
          </View>
        </SafeAreaView>
      </GestureHandlerRootView>
    </SessionProvider>
  );
}
