import { Stack } from "expo-router";
import { Pressable, Text } from "react-native";

import { useAuthContext } from "@/contexts/AuthContext";
import { styles } from "@/styles/appLayout.styles";
import { colors } from "@/theme";
import { showConfirm } from "@/utils/alert";

function LogoutButton() {
  const { logout } = useAuthContext();

  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => showConfirm("Sair", "Deseja encerrar a sessão?", logout, "Sair")}
      style={({ pressed }) => [styles.logout, pressed && styles.logoutPressed]}
    >
      <Text style={styles.logoutText}>Sair</Text>
    </Pressable>
  );
}

// Fluxo restrito: só é montado quando há token (ver Stack.Protected no layout raiz)
export default function AppLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle,
        headerTintColor: colors.text,
        contentStyle: styles.content,
      }}
    >
      <Stack.Screen
        name="index"
        options={{ title: "Meus Jogos", headerRight: () => <LogoutButton /> }}
      />
      <Stack.Screen name="jogos/novo" options={{ title: "Novo jogo" }} />
      <Stack.Screen name="jogos/[id]" options={{ title: "Editar jogo" }} />
    </Stack>
  );
}
