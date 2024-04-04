import { Redirect, Stack } from "expo-router";
import { useSession } from "../../contexts/sessionContext";
import { View } from "react-native";

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
    if (user.isServiceAccount) return <Redirect href="/service" />;

    return <Redirect href="/" />;
  }

  return <Stack screenOptions={{ header: () => null }} />;
}
