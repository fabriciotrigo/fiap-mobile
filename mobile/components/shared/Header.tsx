import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useAuth } from "../../src/contexts/AuthContext";
import Ionicons from "@expo/vector-icons/Ionicons";

type Props = {
  showBack?: boolean;
  userName?: string;
};

export default function Header({ showBack = false }: Props) {
  const { user, logout } = useAuth();

  async function handleLogout() {
    await logout();
    router.replace("/login");
  }

  return (
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
      <View style={styles.container}>

        {/* ESQUERDA (Voltar) */}
        <View style={styles.left}>
          {showBack && (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back-outline" color="white"/>
            </TouchableOpacity>
          )}
        </View>

        {/* CENTRO (Título) */}
        <View style={styles.center}>
          <Text style={styles.title}>Blog Educacional</Text>
        </View>

        {/* usuário */}
        <View style={styles.right}>
          {user && (
            <View style={styles.userContainer}>
              <Text
                style={styles.user}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {user.username}
              </Text>

              <TouchableOpacity onPress={handleLogout}>
                <Text style={styles.logout}>
                  | <Ionicons name="log-out-outline"/>
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "white" //"#2563eb",
  },

  container: {
    height: 64,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: "#2563eb",

    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 6,
  },

  left: {
    width: 80,
    justifyContent: "center",
  },

  center: {
    flex: 1,
    alignItems: "center",
  },

  right: {
    width: 80,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },

  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },

  actionText: {
    color: "#fff",
    fontSize: 22,
  },

  user: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },

  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    maxWidth: 90,
  },

  logout: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});