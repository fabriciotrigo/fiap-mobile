import { useEffect, useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import Header from "../../../components/shared/Header";
import { api } from "../../../src/services/api";
import { useAuth } from "../../../src/contexts/AuthContext";

export default function EditarPostagem() {

  const { id } = useLocalSearchParams();
  const { user } = useAuth();
  const isProfessor = user?.nivel === 1;

  const [disciplina, setDisciplina] = useState("");
  const [texto, setTexto] = useState("");

  async function loadPost() {

    try {

      const response = await api.get(
        `/postagem/${id}`
      );

      setDisciplina(response.data.disciplina);
      setTexto(response.data.texto_postagem);

    } catch (error) {

      console.log(error);

    }
  }

  async function handleUpdate() {

    try {

      await api.put(`/postagem/${id}`, {
        disciplina,
        texto,
      });

      alert("Postagem atualizada");

      router.back();

    } catch (error) {

      console.log(error);

      alert("Erro ao atualizar");

    }
  }

  async function handleDelete() {

    try {

      await api.delete(`/postagem/${id}`);

      alert("Postagem excluída com sucesso!");

      router.back();

    } catch (error) {

      console.log(error);

      alert("Erro ao excluir");

    }
  }

  useEffect(() => {
    loadPost();
  }, []);

  return (
    <View style={styles.container}>

      <Header showBack />

      <View style={styles.content}>

        <TextInput
          placeholder="Disciplina"
          value={disciplina}
          onChangeText={setDisciplina}
          style={styles.input}
          editable={isProfessor}
        />

        <TextInput
          placeholder="Conteúdo"
          value={texto}
          onChangeText={setTexto}
          style={[
            styles.input,
            styles.textArea,
          ]}
          multiline
          editable={isProfessor}
        />

        {isProfessor && (
            <TouchableOpacity
            style={styles.button}
            onPress={handleUpdate}
            >
            <Text style={styles.buttonText}>
                Salvar
            </Text>
            </TouchableOpacity>
        )}

        {isProfessor && (
            <TouchableOpacity
            style={styles.buttonDelete}
            onPress={handleDelete}
            >
            <Text style={styles.buttonText}>
                Excluir
            </Text>
            </TouchableOpacity>
        )}
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
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },

  textArea: {
    height: 160,
    textAlignVertical: "top",
  },

  button: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },

  buttonDelete: {
    backgroundColor: "#e41212",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },

});