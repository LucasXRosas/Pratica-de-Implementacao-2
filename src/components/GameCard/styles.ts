import { StyleSheet } from "react-native";

import { colors, fontSize, radius, spacing } from "@/theme";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.sm,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: spacing.md,
  },
  titleBox: {
    flex: 1,
    gap: spacing.xs,
  },
  title: {
    color: colors.text,
    fontSize: fontSize.lg,
    fontWeight: "700",
  },
  year: {
    color: colors.textMuted,
    fontSize: fontSize.sm,
  },
  rating: {
    minWidth: 52,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.md,
    alignItems: "center",
  },
  rating_high: {
    backgroundColor: colors.accent,
  },
  rating_medium: {
    backgroundColor: colors.warning,
  },
  rating_low: {
    backgroundColor: colors.danger,
  },
  ratingText: {
    color: colors.background,
    fontSize: fontSize.lg,
    fontWeight: "800",
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  tag: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceAlt,
  },
  tagText: {
    color: colors.textMuted,
    fontSize: fontSize.sm,
  },
  description: {
    color: colors.textMuted,
    fontSize: fontSize.md,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  action: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 88,
    minHeight: 36,
    paddingHorizontal: spacing.md,
    borderRadius: radius.sm,
    borderWidth: 1,
  },
  actionEdit: {
    borderColor: colors.primary,
  },
  actionDelete: {
    borderColor: colors.danger,
  },
  actionPressed: {
    opacity: 0.7,
  },
  actionTextEdit: {
    color: colors.primary,
    fontWeight: "600",
  },
  actionTextDelete: {
    color: colors.danger,
    fontWeight: "600",
  },
});
