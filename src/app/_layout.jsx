import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SessionProvider } from "../contexts/sessionContext";
import { SafeAreaView, View } from "react-native";
import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
    },
  },
});

export default function Layout() {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}
