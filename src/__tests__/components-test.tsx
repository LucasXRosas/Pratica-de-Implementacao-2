import { fireEvent, render, screen } from "@testing-library/react-native";

import Button from "@/components/Button";
import GameCard from "@/components/GameCard";
import GameForm from "@/components/GameForm";
import { EmptyState } from "@/components/StatusView";
import TextField from "@/components/TextField";
import { Game } from "@/types";
import { EMPTY_GAME_FORM } from "@/utils/validation";

const game: Game = {
  id: "abc123",
  titulo: "Celeste",
  genero: "Plataforma",
  plataforma: "Switch",
  ano: 2018,
  nota: 9.2,
  descricao: "Escale a montanha.",
};

describe("Button", () => {
  it("renderiza o título e dispara onPress", async () => {
    const onPress = jest.fn();
    await render(<Button title="Salvar" onPress={onPress} />);

    await fireEvent.press(screen.getByText("Salvar"));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("mostra o ActivityIndicator e bloqueia o clique quando loading", async () => {
    const onPress = jest.fn();
    await render(<Button title="Salvar" loading onPress={onPress} />);

    expect(screen.getByTestId("button-loading")).toBeTruthy();
    await fireEvent.press(screen.getByText("Salvar"));
    expect(onPress).not.toHaveBeenCalled();
  });
});

describe("TextField", () => {
  it("renderiza label, repassa o texto digitado e exibe o erro", async () => {
    const onChangeText = jest.fn();
    await render(<TextField label="E-mail" error="E-mail inválido." onChangeText={onChangeText} />);

    expect(screen.getByText("E-mail")).toBeTruthy();
    expect(screen.getByText("E-mail inválido.")).toBeTruthy();

    await fireEvent.changeText(screen.getByLabelText("E-mail"), "a@b.com");
    expect(onChangeText).toHaveBeenCalledWith("a@b.com");
  });
});

describe("GameCard", () => {
  it("exibe os dados do jogo e aciona editar/excluir", async () => {
    const onEdit = jest.fn();
    const onDelete = jest.fn();
    await render(<GameCard game={game} onEdit={onEdit} onDelete={onDelete} />);

    expect(screen.getByText("Celeste")).toBeTruthy();
    expect(screen.getByText("9,2")).toBeTruthy();
    expect(screen.getByText("Switch")).toBeTruthy();

    await fireEvent.press(screen.getByLabelText("Editar Celeste"));
    await fireEvent.press(screen.getByLabelText("Excluir Celeste"));
    expect(onEdit).toHaveBeenCalledWith(game);
    expect(onDelete).toHaveBeenCalledWith(game);
  });

  it("mostra o indicador de exclusão em andamento", async () => {
    await render(<GameCard game={game} deleting onEdit={jest.fn()} onDelete={jest.fn()} />);
    expect(screen.getByTestId("delete-loading")).toBeTruthy();
  });
});

describe("EmptyState", () => {
  it("renderiza a mensagem e a ação", async () => {
    const onAction = jest.fn();
    await render(<EmptyState title="Nada aqui" actionLabel="Adicionar" onAction={onAction} />);

    await fireEvent.press(screen.getByText("Adicionar"));
    expect(onAction).toHaveBeenCalled();
  });
});

describe("GameForm", () => {
  it("não envia o formulário vazio e mostra erros de validação", async () => {
    const onSubmit = jest.fn();
    await render(<GameForm initialValues={EMPTY_GAME_FORM} submitLabel="Cadastrar" onSubmit={onSubmit} />);

    await fireEvent.press(screen.getByText("Cadastrar"));
    expect(onSubmit).not.toHaveBeenCalled();
    expect(screen.getByText("Informe o título.")).toBeTruthy();
  });

  it("envia o payload convertido quando válido", async () => {
    const onSubmit = jest.fn();
    await render(<GameForm initialValues={EMPTY_GAME_FORM} submitLabel="Cadastrar" onSubmit={onSubmit} />);

    await fireEvent.changeText(screen.getByLabelText("Título"), "Celeste");
    await fireEvent.changeText(screen.getByLabelText("Gênero"), "Plataforma");
    await fireEvent.changeText(screen.getByLabelText("Plataforma"), "Switch");
    await fireEvent.changeText(screen.getByLabelText("Ano"), "2018");
    await fireEvent.changeText(screen.getByLabelText("Nota (0–10)"), "9,2");
    await fireEvent.press(screen.getByText("Cadastrar"));

    expect(onSubmit).toHaveBeenCalledWith({
      titulo: "Celeste",
      genero: "Plataforma",
      plataforma: "Switch",
      ano: 2018,
      nota: 9.2,
      descricao: "",
    });
  });
});
