import { StyleSheet } from "react-native";

import { colors, spacing } from "@/theme";

export const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flexGrow: 1,
    padding: spacing.md,
    gap: spacing.md,
  },
  row: {
    flexDirection: "row",
    gap: spacing.md,
  },
  rowItem: {
    flex: 1,
  },
  actions: {
    marginTop: spacing.sm,
    gap: spacing.sm,
  },
});
