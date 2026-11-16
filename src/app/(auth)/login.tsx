import { isAxiosError } from "axios";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Button from "@/components/Button";
import TextField from "@/components/TextField";
import { useAuthContext } from "@/contexts/AuthContext";
import { styles } from "@/styles/login.styles";
import { FormErrors } from "@/types";
import { showAlert } from "@/utils/alert";
import { getErrorMessage } from "@/utils/errors";
import { LoginValues, hasErrors, validateLogin } from "@/utils/validation";

export default function LoginScreen() {
  const { login } = useAuthContext();
  const [values, setValues] = useState<LoginValues>({ email: "", password: "" });
  const [errors, setErrors] = useState<FormErrors<LoginValues>>({});
  const [loading, setLoading] = useState(false);

  function setField(field: keyof LoginValues) {
    return (text: string) => {
      setValues((prev) => ({ ...prev, [field]: text }));
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    };
  }

  async function handleLogin() {
    const validation = validateLogin(values);
    setErrors(validation);
    if (hasErrors(validation)) return;

    setLoading(true);
    try {
      // Em caso de sucesso o token muda e o Expo Router leva para a área restrita
      await login(values.email, values.password);
    } catch (error) {
      const invalidCredentials = isAxiosError(error) && error.response?.status === 400;
      showAlert(
        "Falha no login",
        invalidCredentials ? "E-mail ou senha inválidos." : getErrorMessage(error),
      );
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.flex}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <View style={styles.brand}>
            <Text style={styles.logo}>🎮</Text>
            <Text style={styles.title}>GameDex</Text>
            <Text style={styles.subtitle}>Seu catálogo pessoal de jogos</Text>
          </View>

          <View style={styles.form}>
            <Text style={styles.formTitle}>Entrar</Text>
            <TextField
              label="E-mail"
              placeholder="voce@exemplo.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              value={values.email}
              onChangeText={setField("email")}
              error={errors.email}
              editable={!loading}
            />
            <TextField
              label="Senha"
              placeholder="••••••••"
              secureTextEntry
              autoComplete="password"
              value={values.password}
              onChangeText={setField("password")}
              error={errors.password}
              editable={!loading}
              onSubmitEditing={handleLogin}
            />
            <Button title="Entrar" loading={loading} onPress={handleLogin} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
