import { ActivityIndicator, Pressable, PressableProps, Text } from "react-native";

import { colors } from "@/theme";
import { styles } from "./styles";

export type ButtonVariant = "primary" | "secondary" | "danger";

export interface ButtonProps extends Omit<PressableProps, "children" | "style"> {
  title: string;
  variant?: ButtonVariant;
  loading?: boolean;
}

export default function Button({
  title,
  variant = "primary",
  loading = false,
  disabled,
  ...rest
}: ButtonProps) {
  const isDisabled = disabled || loading;
  const isSecondary = variant === "secondary";

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: !!isDisabled, busy: loading }}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        styles[variant],
        pressed && styles.pressed,
        isDisabled && styles.disabled,
      ]}
      {...rest}
    >
      {loading && (
        <ActivityIndicator
          testID="button-loading"
          color={isSecondary ? colors.primary : colors.text}
        />
      )}
      <Text style={[styles.text, isSecondary && styles.textSecondary]}>{title}</Text>
    </Pressable>
  );
}
