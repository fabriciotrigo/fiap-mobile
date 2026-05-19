import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { router } from "expo-router";
import Header from "../components/shared/Header";
import { api } from "../src/services/api";
import { useAuth } from "../src/contexts/AuthContext";

export default function Register() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [nivel, setNivel] = useState(2);
  const { user } = useAuth();
  const isProfessor = user?.nivel === 1; // 1 = Professor; 2 = Aluno

  async function handleRegister() {

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

      if (!isProfessor) {
        router.replace("/login");
      } else {
        router.replace("/usuarios")
      }

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

        {isProfessor && (
        <View style={styles.levelContainer}>
            <TouchableOpacity
              style={[
                styles.levelButton,
                nivel === 1 && styles.selected,
              ]}
              onPress={() => setNivel(1)}
            >
              <Text 
                style={[
                  styles.levelText,
                  nivel === 1 && styles.buttonText,
                ]}
                >
                Professor
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.levelButton,
                nivel === 2 && styles.selected,
                ]}
              onPress={() => setNivel(2)}
            >
              <Text 
                style={[
                  styles.levelText,
                  nivel === 2 && styles.buttonText,
                ]}
            >
                Aluno
              </Text>
            </TouchableOpacity>
        </View>
        )}

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
    color: "#5e5d5d",
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