import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SessionProvider } from "../contexts/sessionContext";
import { SafeAreaView, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native"; // Import NavigationContainer
import { Stack } from "@react-navigation/native"; // Import Stack for navigation

const Stack = createStackNavigator(); // Create a Stack Navigator instance

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
              <NavigationContainer>
                <Stack.Navigator
                  screenOptions={{ header: () => null }}
                ></Stack.Navigator>
              </NavigationContainer>
            </View>
          </SafeAreaView>
        </GestureHandlerRootView>
      </SessionProvider>
    </QueryClientProvider>
  );
}
