import { StyleSheet } from "react-native";

import { colors, fontSize, radius, spacing } from "@/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    flexGrow: 1,
    padding: spacing.md,
    paddingBottom: 120, // espaço para o botão flutuante
  },
  separator: {
    height: spacing.md,
  },
  listHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.md,
  },
  greeting: {
    flex: 1,
    gap: spacing.xs,
  },
  greetingTitle: {
    color: colors.text,
    fontSize: fontSize.xl,
    fontWeight: "800",
  },
  greetingSubtitle: {
    color: colors.textMuted,
    fontSize: fontSize.sm,
  },
  fab: {
    position: "absolute",
    right: spacing.lg,
    bottom: spacing.xl,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  fabPressed: {
    backgroundColor: colors.primaryDark,
  },
  fabText: {
    color: colors.text,
    fontSize: fontSize.md,
    fontWeight: "700",
  },
});
