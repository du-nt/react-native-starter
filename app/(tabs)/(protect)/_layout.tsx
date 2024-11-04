import useBoundStore from "@/stores";
import { Redirect, Slot } from "expo-router";

export default function ProtectLayout() {
  const isAuthenticated = useBoundStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }

  return <Slot />;
}
