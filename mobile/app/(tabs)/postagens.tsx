import { useEffect, useState } from "react"
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native"
import Header from "../../components/shared/Header"
import { api } from "../../src/services/api"
import { router } from "expo-router";

type Postagem = {
  id: number;
  disciplina: string;
  texto_postagem: string;
  autor: string
};

export default function Postagens() {

  const [posts, setPosts] = useState<Postagem[]>([]);

  async function loadPosts() {

    try {

      const response = await api.get("/postagem");

      setPosts(response.data);

    } catch (error) {

      console.log(error);

    }
  }

  useEffect(() => {
    loadPosts();
  }, []);

  function handleOpen(id: number) {
    router.push(`/editar/${id}`);
  }

  return (
    <View style={styles.container}>

      <Header />

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.card} 
            onPress={() => handleOpen(item.id)}>

            <Text style={styles.title}>
              {item.disciplina}
            </Text>

            <Text style={styles.content}>
              {item.texto_postagem}
            </Text>

          </TouchableOpacity>
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#e0f2fe",
  },

  list: {
    padding: 16,
  },

  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },

    elevation: 3,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#1e3a8a",
  },

  content: {
    color: "#444",
    lineHeight: 22,
  },

});