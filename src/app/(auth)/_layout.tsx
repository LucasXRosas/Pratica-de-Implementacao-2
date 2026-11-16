import { Stack } from "expo-router";

// Fluxo público (autenticação)
export default function AuthLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
