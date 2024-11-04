import AsyncStorage from "@react-native-async-storage/async-storage";

export type TokenBulk = {
  accessToken: string;
  refreshToken: string;
};

export const storeTokens = async (tokenBulk: TokenBulk): Promise<void> => {
  await Promise.all([
    AsyncStorage.setItem("access_token", tokenBulk.accessToken),
    AsyncStorage.setItem("refresh_token", tokenBulk.refreshToken),
  ]);
};

export const getTokens = async (): Promise<TokenBulk> => {
  const accessToken: string | null = await AsyncStorage.getItem("access_token");

  const refreshToken: string | null = await AsyncStorage.getItem(
    "refresh_token"
  );

  return { refreshToken: refreshToken || "", accessToken: accessToken || "" };
};

export const clearTokens = async (): Promise<void> => {
  await Promise.all([
    AsyncStorage.removeItem("access_token"),
    AsyncStorage.removeItem("refresh_token"),
  ]);
};

export const getErrorMessage = (error: unknown) => {
  let message: string;

  if (error instanceof Error) {
    message = error.message;
  } else if (error && typeof error === "object" && "message" in error) {
    message = String(error.message);
  } else if (typeof error === "string") {
    message = error;
  } else {
    message = "Something went wrong";
  }

  return message;
};
