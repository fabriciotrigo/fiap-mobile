import { api } from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function signIn(username: string, password: string) {
  const response = await api.post("/users/signin", {
    username,
    password,
  });

  const { token } = response.data;

  if (!token) {
    throw new Error("Token não recebido");
  }

  await AsyncStorage.setItem("token", token);

  return token;
}