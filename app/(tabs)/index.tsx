import useBoundStore from "@/stores";
import { Link } from "expo-router";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";

export default function HomeScreen() {
  const unAuthenticate = useBoundStore((state) => state.unAuthenticate);
  const isAuthenticated = useBoundStore((state) => state.isAuthenticated);

  const handleLogout = () => {
    unAuthenticate();
  };

  return (
    <View style={styles.container}>
      <Text>Tab Home</Text>
      {isAuthenticated && (
        <Button title="Logout" onPress={handleLogout}></Button>
      )}
      <Link href="/login" asChild>
        <TouchableOpacity>
          <Text>Login</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
