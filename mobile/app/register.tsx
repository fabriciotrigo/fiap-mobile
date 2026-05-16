import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { router } from "expo-router";
import Header from "../components/shared/Header";
import { api } from "../src/services/api";

export default function Register() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // 1 = professor
  // 2 = aluno
  const [nivel, setNivel] = useState(2);

  async function handleRegister() {

    setNivel(2);

    try {
      await api.post("/users", {
        username,
        password,
        nivel,
      });

      Alert.alert(
        "Sucesso",
        "Usuário cadastrado"
      );

      router.replace("/login");

    } catch (error) {

      console.log(error);

      Alert.alert(
        "Erro",
        "Não foi possível cadastrar"
      );

    }
  }

  return (
    <View style={styles.container}>

      <Header showBack />

      <View style={styles.content}>

        <Text style={styles.title}>
          Cadastro
        </Text>

        <TextInput
          placeholder="Usuário"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
        />

        <TextInput
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleRegister}
        >

          <Text style={styles.buttonText}>
            Cadastrar
          </Text>

        </TouchableOpacity>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#e0f2fe",
  },

  content: {
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
    color: "#1e3a8a",
    textAlign: "center",
  },

  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
    fontSize: 16,
  },

  levelContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },

  levelButton: {
    flex: 1,
    backgroundColor: "#dbeafe",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  selected: {
    backgroundColor: "#2563eb",
  },

  levelText: {
    color: "#111",
    fontWeight: "bold",
  },

  button: {
    backgroundColor: "#2563eb",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

});