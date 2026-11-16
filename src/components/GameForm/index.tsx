import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";

import Button from "@/components/Button";
import TextField from "@/components/TextField";
import { FormErrors, GameFormValues, GameInput } from "@/types";
import { formToGameInput, hasErrors, validateGameForm } from "@/utils/validation";
import { styles } from "./styles";

export interface GameFormProps {
  initialValues: GameFormValues;
  submitLabel: string;
  submitting?: boolean;
  onSubmit: (input: GameInput) => void;
  onCancel?: () => void;
}

export default function GameForm({
  initialValues,
  submitLabel,
  submitting = false,
  onSubmit,
  onCancel,
}: GameFormProps) {
  const [values, setValues] = useState<GameFormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors<GameFormValues>>({});

  function setField(field: keyof GameFormValues) {
    return (text: string) => {
      setValues((prev) => ({ ...prev, [field]: text }));
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    };
  }

  function handleSubmit() {
    const validation = validateGameForm(values);
    setErrors(validation);
    if (hasErrors(validation)) return;
    onSubmit(formToGameInput(values));
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <TextField
          label="Título"
          placeholder="Ex.: The Legend of Zelda"
          value={values.titulo}
          onChangeText={setField("titulo")}
          error={errors.titulo}
          editable={!submitting}
        />
        <TextField
          label="Gênero"
          placeholder="Ex.: Aventura, RPG, FPS"
          value={values.genero}
          onChangeText={setField("genero")}
          error={errors.genero}
          editable={!submitting}
        />
        <TextField
          label="Plataforma"
          placeholder="Ex.: PC, PS5, Switch"
          value={values.plataforma}
          onChangeText={setField("plataforma")}
          error={errors.plataforma}
          editable={!submitting}
        />
        <View style={styles.row}>
          <View style={styles.rowItem}>
            <TextField
              label="Ano"
              placeholder="2024"
              keyboardType="number-pad"
              maxLength={4}
              value={values.ano}
              onChangeText={setField("ano")}
              error={errors.ano}
              editable={!submitting}
            />
          </View>
          <View style={styles.rowItem}>
            <TextField
              label="Nota (0–10)"
              placeholder="8,5"
              keyboardType="decimal-pad"
              maxLength={4}
              value={values.nota}
              onChangeText={setField("nota")}
              error={errors.nota}
              editable={!submitting}
            />
          </View>
        </View>
        <TextField
          label="Descrição (opcional)"
          placeholder="Uma breve descrição do jogo"
          multiline
          value={values.descricao}
          onChangeText={setField("descricao")}
          error={errors.descricao}
          editable={!submitting}
        />

        <View style={styles.actions}>
          <Button title={submitLabel} loading={submitting} onPress={handleSubmit} />
          {onCancel && (
            <Button title="Cancelar" variant="secondary" disabled={submitting} onPress={onCancel} />
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
