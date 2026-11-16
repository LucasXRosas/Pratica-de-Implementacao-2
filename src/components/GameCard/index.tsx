import { memo } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

import { colors } from "@/theme";
import { Game } from "@/types";
import { formatRating, getRatingLevel } from "@/utils/format";
import { styles } from "./styles";

export interface GameCardProps {
  game: Game;
  deleting?: boolean;
  onEdit: (game: Game) => void;
  onDelete: (game: Game) => void;
}

function GameCard({ game, deleting = false, onEdit, onDelete }: GameCardProps) {
  const level = getRatingLevel(game.nota);

  return (
    <View style={styles.card} testID={`game-card-${game.id}`}>
      <View style={styles.header}>
        <View style={styles.titleBox}>
          <Text style={styles.title} numberOfLines={2}>
            {game.titulo}
          </Text>
          <Text style={styles.year}>Lançamento: {game.ano}</Text>
        </View>
        <View style={[styles.rating, styles[`rating_${level}`]]}>
          <Text style={styles.ratingText}>{formatRating(game.nota)}</Text>
        </View>
      </View>

      <View style={styles.tags}>
        <View style={styles.tag}>
          <Text style={styles.tagText}>{game.genero}</Text>
        </View>
        <View style={styles.tag}>
          <Text style={styles.tagText}>{game.plataforma}</Text>
        </View>
      </View>

      {!!game.descricao && (
        <Text style={styles.description} numberOfLines={3}>
          {game.descricao}
        </Text>
      )}

      <View style={styles.actions}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Editar ${game.titulo}`}
          disabled={deleting}
          onPress={() => onEdit(game)}
          style={({ pressed }) => [styles.action, styles.actionEdit, pressed && styles.actionPressed]}
        >
          <Text style={styles.actionTextEdit}>Editar</Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Excluir ${game.titulo}`}
          disabled={deleting}
          onPress={() => onDelete(game)}
          style={({ pressed }) => [styles.action, styles.actionDelete, pressed && styles.actionPressed]}
        >
          {deleting ? (
            <ActivityIndicator size="small" color={colors.danger} testID="delete-loading" />
          ) : (
            <Text style={styles.actionTextDelete}>Excluir</Text>
          )}
        </Pressable>
      </View>
    </View>
  );
}

export default memo(GameCard);
