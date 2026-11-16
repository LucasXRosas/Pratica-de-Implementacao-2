import { StyleSheet } from "react-native";

import { colors, fontSize, spacing } from "@/theme";

export const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.surface,
  },
  headerTitle: {
    color: colors.text,
    fontWeight: "700",
  },
  content: {
    backgroundColor: colors.background,
  },
  logout: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  logoutPressed: {
    opacity: 0.6,
  },
  logoutText: {
    color: colors.danger,
    fontSize: fontSize.md,
    fontWeight: "600",
  },
});
