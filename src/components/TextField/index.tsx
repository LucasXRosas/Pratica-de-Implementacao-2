import { Text, TextInput, TextInputProps, View } from "react-native";

import { colors } from "@/theme";
import { styles } from "./styles";

export interface TextFieldProps extends Omit<TextInputProps, "style"> {
  label: string;
  error?: string;
}

export default function TextField({ label, error, multiline, ...rest }: TextFieldProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        accessibilityLabel={label}
        placeholderTextColor={colors.placeholder}
        multiline={multiline}
        style={[styles.input, multiline && styles.inputMultiline, !!error && styles.inputError]}
        {...rest}
      />
      {!!error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}
