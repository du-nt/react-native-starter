import useBoundStore from "@/stores";
import { View, Text, StyleSheet, Button } from "react-native";

export default function ProfileScreen() {
  const unAuthenticate = useBoundStore((state) => state.unAuthenticate);

  const handleLogout = () => {
    unAuthenticate();
  };

  return (
    <View style={styles.container}>
      <Text>Tab Profile</Text>
      <Button title="Logout" onPress={handleLogout}></Button>
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
