import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

type Props = {
  showBack?: boolean;
  userName?: string;
};

export default function Header({ showBack = false, userName }: Props) {
  return (
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
      <View style={styles.container}>

        {/* ESQUERDA (Voltar) */}
        <View style={styles.left}>
          {showBack && (
            <TouchableOpacity onPress={() => router.back()}>
              <Text style={styles.actionText}>←voltar</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* CENTRO (Título) */}
        <View style={styles.center}>
          <Text style={styles.title}>Blog Educacional</Text>
        </View>

        {/* DIREITA (Usuário) */}
        <View style={styles.right}>
          {userName && (
            <Text style={styles.user}>{userName}</Text>
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
    width: 50,
  },

  center: {
    flex: 1,
    alignItems: "center",
  },

  right: {
    width: 80,
    alignItems: "flex-end",
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
});