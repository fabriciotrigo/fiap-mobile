import { useState, useCallback } from "react"
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput } from "react-native"
import Header from "../../components/shared/Header"
import { api } from "../../src/services/api"
import { router, useFocusEffect } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

type Postagem = {
  id: number;
  disciplina: string;
  texto_postagem: string;
  autor: string
};

export default function Postagens() {

  const [posts, setPosts] = useState<Postagem[]>([]);
  const [search, setSearch] = useState("");

  const filteredPosts = posts.filter((post) => {

    const text = search.toLowerCase();

    return (
      post.disciplina.toLowerCase().includes(text) ||
      post.texto_postagem.toLowerCase().includes(text) ||
      post.autor.toLowerCase().includes(text)
    );
  });

  async function loadPosts() {

    try {

      const response = await api.get("/postagem");

      setPosts(response.data);

    } catch (error) {

      console.log(error);

    }
  }

  useFocusEffect(
    useCallback(() => {
        loadPosts();
    }, [])
  );

  function handleOpen(id: number) {
    router.push(`/editar/${id}`);
  }

  return (
    <View style={styles.container}>

      <Header />

      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#666"
        />
        <TextInput
          placeholder="Pesquisar postagem..."
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
      </View>

      <FlatList
        data={filteredPosts}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.card} 
            onPress={() => handleOpen(item.id)}>

            <Text 
              style={styles.title}
              numberOfLines={1}
            >
              {item.disciplina}
            </Text>

            <Text 
              style={styles.content}
              numberOfLines={2}
            >
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

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    margin: 16,
    marginBottom: 0,
    paddingHorizontal: 12,
    borderRadius: 12,
    height: 50,
  },

  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },

});