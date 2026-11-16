import { router, useFocusEffect } from "expo-router";
import { useCallback, useRef, useState } from "react";
import { ActivityIndicator, FlatList, Pressable, RefreshControl, Text, View } from "react-native";

import GameCard from "@/components/GameCard";
import { EmptyState, LoadingView } from "@/components/StatusView";
import { useAuthContext } from "@/contexts/AuthContext";
import { deleteGame, listGames } from "@/services/games";
import { styles } from "@/styles/gameList.styles";
import { colors } from "@/theme";
import { Game } from "@/types";
import { showAlert, showConfirm } from "@/utils/alert";
import { getErrorMessage } from "@/utils/errors";

export default function GameListScreen() {
  const { user } = useAuthContext();
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true); // primeira carga
  const [refreshing, setRefreshing] = useState(false); // recargas (foco / puxar)
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadGames = useCallback(async (mode: "initial" | "refresh") => {
    if (mode === "refresh") setRefreshing(true);
    try {
      const data = await listGames(); // GET
      setGames(data);
      setError(null);
    } catch (err) {
      const message = getErrorMessage(err);
      setError(message);
      showAlert("Erro ao carregar jogos", message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  // Recarrega sempre que a tela ganha foco (ex.: ao voltar do cadastro/edição)
  const hasLoaded = useRef(false);
  useFocusEffect(
    useCallback(() => {
      loadGames(hasLoaded.current ? "refresh" : "initial");
      hasLoaded.current = true;
    }, [loadGames]),
  );

  const handleEdit = useCallback((game: Game) => {
    router.push({ pathname: "/jogos/[id]", params: { id: game.id } });
  }, []);

  const handleDelete = useCallback((game: Game) => {
    showConfirm(
      "Excluir jogo",
      `Tem certeza que deseja excluir "${game.titulo}"?`,
      async () => {
        setDeletingId(game.id);
        try {
          await deleteGame(game.id); // DELETE
          setGames((prev) => prev.filter((g) => g.id !== game.id));
        } catch (err) {
          showAlert("Erro ao excluir", getErrorMessage(err));
        } finally {
          setDeletingId(null);
        }
      },
      "Excluir",
    );
  }, []);

  if (loading) {
    return <LoadingView message="Buscando seus jogos..." />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={games}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <GameCard
            game={item}
            deleting={deletingId === item.id}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => loadGames("refresh")}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }
        ListHeaderComponent={
          <View style={styles.listHeader}>
            <View style={styles.greeting}>
              <Text style={styles.greetingTitle}>Olá{user?.name ? `, ${user.name}` : ""}!</Text>
              <Text style={styles.greetingSubtitle}>
                {games.length} {games.length === 1 ? "jogo cadastrado" : "jogos cadastrados"}
              </Text>
            </View>
            {refreshing && <ActivityIndicator color={colors.primary} />}
          </View>
        }
        ListEmptyComponent={
          error ? (
            <EmptyState
              emoji="📡"
              title="Não foi possível carregar"
              message={error}
              actionLabel="Tentar novamente"
              onAction={() => loadGames("refresh")}
            />
          ) : (
            <EmptyState
              title="Nenhum jogo por aqui"
              message="Seu catálogo está vazio. Que tal adicionar o primeiro jogo?"
              actionLabel="Adicionar jogo"
              onAction={() => router.push("/jogos/novo")}
            />
          )
        }
      />

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Adicionar jogo"
        onPress={() => router.push("/jogos/novo")}
        style={({ pressed }) => [styles.fab, pressed && styles.fabPressed]}
      >
        <Text style={styles.fabText}>+ Novo jogo</Text>
      </Pressable>
    </View>
  );
}
