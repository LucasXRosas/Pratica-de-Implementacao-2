import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { LoadingView } from "@/components/StatusView";
import AuthContextProvider, { useAuthContext } from "@/contexts/AuthContext";
import { styles } from "@/styles/rootLayout.styles";

// Decide qual fluxo fica acessível com base no token do AuthContext.
// Quando o token muda (login/logout), o Expo Router redireciona automaticamente.
function RootNavigator() {
  const { isAuthenticated, isLoading } = useAuthContext();

  if (isLoading) {
    return <LoadingView message="Restaurando sessão..." />;
  }

  return (
    <Stack screenOptions={{ headerShown: false, contentStyle: styles.content }}>
      {/* redirectTo define o destino exato; sem ele o router iria para "/(auth)",
          que não tem index e cai na tela "Unmatched Route" */}
      <Stack.Protected guard={isAuthenticated} redirectTo="/login">
        <Stack.Screen name="(app)" />
      </Stack.Protected>
      <Stack.Protected guard={!isAuthenticated} redirectTo="/">
        <Stack.Screen name="(auth)" />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthContextProvider>
      <StatusBar style="light" />
      <RootNavigator />
    </AuthContextProvider>
  );
}
