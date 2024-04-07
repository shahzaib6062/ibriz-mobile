import { Redirect, Stack } from "expo-router";

import { View } from "react-native";
import { useSession } from "../../contexts/sessionContext";

export default function AuthLayout() {
  const { user, isLoading } = useSession();

  if (isLoading) {
    return (
      <View
        alignSelf="center"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        {/* <Spinner color="black" size="large" /> */}
      </View>
    );
  }

  if (user) {
    return <Redirect href="/" />;
  }

  return <Stack screenOptions={{ header: () => null }} />;
}
