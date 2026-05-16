import { useState, useEffect, useCallback } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import { router, useFocusEffect } from "expo-router";
import Header from "../../components/shared/Header";
import { api } from "../../src/services/api";
import { useAuth } from "../../src/contexts/AuthContext";

export default function CriarPostagem() {

  const { user } = useAuth();
  const isProfessor = user?.nivel === 1;

  const [disciplina, setDisciplina] = useState("");
  const [texto_postagem, setTexto] = useState("");

  async function handleCreatePost() {

    try {

      await api.post("/postagem", {
        texto_postagem,
        disciplina,
        autor: user?.username,
      });

      Alert.alert(
        "Sucesso",
        "Postagem criada com sucesso"
      );

      setDisciplina("");
      setTexto("");

      router.back();

    } catch (error) {

      console.log(error);

      Alert.alert(
        "Erro",
        "Não foi possível criar a postagem"
      );

    }
  }

  useFocusEffect(
    useCallback(() => {
        if (!isProfessor) {
            Alert.alert(
                "Acesso negado",
                "Somente professores podem acessar"
            );

            router.replace("/postagens");
        }
    }, [isProfessor])
  );

  return (
    <View style={styles.container}>

      <Header />

      <View style={styles.content}>

        <TextInput
          placeholder="Disciplina"
          value={disciplina}
          onChangeText={setDisciplina}
          style={styles.input}
        />

        <TextInput
          placeholder="Conteúdo"
          value={texto_postagem}
          onChangeText={setTexto}
          style={[
            styles.input,
            styles.textArea,
          ]}
          multiline
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleCreatePost}
        >

          <Text style={styles.buttonText}>
            Salvar
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
    padding: 16,
  },

  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
    fontSize: 16,
  },

  textArea: {
    height: 180,
    textAlignVertical: "top",
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