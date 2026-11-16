import { ActivityIndicator, Text, View } from "react-native";

import Button from "@/components/Button";
import { colors } from "@/theme";
import { styles } from "./styles";

// Feedback de carregamento em tela cheia
export function LoadingView({ message = "Carregando..." }: { message?: string }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary} testID="loading-indicator" />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

interface EmptyStateProps {
  emoji?: string;
  title: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
}

// Feedback de lista vazia / erro, com ação opcional
export function EmptyState({ emoji = "🎮", title, message, actionLabel, onAction }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={styles.title}>{title}</Text>
      {!!message && <Text style={styles.message}>{message}</Text>}
      {!!actionLabel && !!onAction && (
        <View style={styles.action}>
          <Button title={actionLabel} onPress={onAction} />
        </View>
      )}
    </View>
  );
}
