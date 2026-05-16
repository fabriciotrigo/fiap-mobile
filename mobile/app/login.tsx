import { useState } from "react";
import { Text, TextInput, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { signIn } from "../src/services/auth";
import { useAuth } from "../src/contexts/AuthContext";

export default function Login() {
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    try {
      const { user } = await signIn(username, password);

      await login(user);

      router.replace("/postagens");

    } catch (error) {
      console.log(error);
      alert('Usuário ou senha inválidos');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Image 
          source={require('../assets/images/blog-logo.png')} 
          style={{ alignSelf: "center", width: 120, height: 120 }}
        />
        <Text style={styles.title}>Blog Educacional</Text>

        <TextInput
          placeholder="Usuário"
          style={styles.input}
          placeholderTextColor="#999"
          onChangeText={setUsername}
        />

        <TextInput
          placeholder="Senha"
          secureTextEntry
          style={styles.input}
          placeholderTextColor="#999"
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <View style={styles.registerContainer}>
          <Text style={styles.link}>
            Não tem conta? 
          </Text>
          <TouchableOpacity
            onPress={() => router.push("/register")}
          >
            <Text style={styles.linkBold}> Cadastre-se</Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e0f2fe", // azul claro (igual web)
  },

  card: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    margin: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5, // Android
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
    marginTop: 24,
    color: "#1e3a8a",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: "#f9f9f9",
  },

  button: {
    backgroundColor: "#3b82f6",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  link: {
    color: "#555",
  },

  linkBold: {
    color: "#2563eb",
    fontWeight: "bold",
    marginLeft: 4,
  },

  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  }

});