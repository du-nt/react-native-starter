import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { SplashScreen } from "expo-router";
import "react-native-reanimated";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useBoundStore from "@/stores";
import { useQuery } from "@/hooks/useQuery";
import { useColorScheme } from "@/hooks/useColorScheme";

export type Profile = {
  username: string;
  city: string;
  email: string;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

SplashScreen.preventAutoHideAsync();

function AppContent() {
  const colorScheme = useColorScheme();
  const authenticate = useBoundStore((state) => state.authenticate);

  useQuery<Profile>({
    queryKey: ["profile"],
    onSuccess: async () => {
      authenticate();
      await SplashScreen.hideAsync();
    },
    onError: async () => {
      await SplashScreen.hideAsync();
    },
  });

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}
