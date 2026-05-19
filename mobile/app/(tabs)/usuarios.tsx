import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useState, useCallback } from "react";
import { router, useFocusEffect } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import Header from "../../components/shared/Header";
import { api } from "../../src/services/api";
import { useAuth } from "../../src/contexts/AuthContext";

type User = {
  id: number;
  username: string;
  nivel: number;
};

export default function Usuarios() {

  const { user } = useAuth();
  const isProfessor = user?.nivel === 1;

  const [professores, setProfessores] =
    useState<User[]>([]);

  const [alunos, setAlunos] =
    useState<User[]>([]);

  async function loadUsers() {

    try {

      const [
        professoresResponse,
        alunosResponse,
      ] = await Promise.all([
        api.get("/users/nivel/1"),
        api.get("/users/nivel/2"),
      ]);

      setProfessores(
        professoresResponse.data
      );

      setAlunos(
        alunosResponse.data
      );

    } catch (error) {

      console.log(error);

    }
  }

  async function handleDelete(
    id: number
  ) {
    Alert.alert(
      "Excluir usuário",
      "Deseja realmente excluir?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },

        {
          text: "Excluir",
          style: "destructive",

          onPress: async () => {
            try {
              await api.delete(
                `/users/${id}`
              );

              loadUsers();

            } catch (error) {
              console.log(error);

              Alert.alert(
                "Erro",
                "Não foi possível excluir"
              );
            }
          },
        },
      ]
    );
  }

  async function handleChangeLevel(
    id: number,
    nivelAtual: number
  ) {

    try {
        const novoNivel =
        nivelAtual === 1 ? 2 : 1;

        await api.patch(`/users/${id}/nivel`, {
            nivel: novoNivel,
        });

        loadUsers();

    } catch (error) {
        console.log(error);
    }
  }

  useFocusEffect(
    useCallback(() => {

      if (!isProfessor) {
        router.replace("/postagens");
      } else {
        loadUsers();
      }
    }, [isProfessor])
  );

  function renderUser(
    item: User
  ) {
    return (
      <View style={styles.card}>

        <View style={styles.userInfo}>
          <Ionicons
            name="person-circle-outline"
            size={42}
            color="#2563eb"
          />
          <Text style={styles.username}>
            {item.username}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() =>
            handleChangeLevel(
              item.id,
              item.nivel
            )
          }
        >
          <Ionicons
            name="swap-horizontal"
            size={24}
            color="#2563eb"
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            handleDelete(item.id)
          }
        >
          <Ionicons
            name="trash-outline"
            size={24}
            color="#dc2626"
          />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}> 

      <Header />
      
      <View style={styles.content}>
        {/* professores */}
        <Text style={styles.sectionTitle}>
            Professores
        </Text>

        <FlatList
            data={professores}
            keyExtractor={(item) =>
            item.id.toString()
            }
            renderItem={({ item }) =>
            renderUser(item)
            }
            scrollEnabled={false}
        />

        {/* alunos */}
        <Text style={styles.sectionTitle}>
            Alunos
        </Text>

        <FlatList
            data={alunos}
            keyExtractor={(item) =>
            item.id.toString()
            }
            renderItem={({ item }) =>
            renderUser(item)
            }
        />

        <TouchableOpacity
            style={styles.novo}
            onPress={() => router.push("/register")}
        >
            <Ionicons
                name="add"
                size={30}
                color="#fff"
            />
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
    flex: 1,
    padding: 16,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1e3a8a",
    marginVertical: 16,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 3,
  },

  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  username: {
    fontSize: 16,
    fontWeight: "600",
  },

  novo: {
    alignSelf: "center",
    marginTop: 16,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#2563eb",
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
  },

});