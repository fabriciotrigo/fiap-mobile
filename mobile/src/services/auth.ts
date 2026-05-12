import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "./api";

type User = {
  id: number;
  username: string;
  password: string;
  nivel: number;
};

export async function signIn(
  username: string,
  password: string
) {

  const signInResponse = await api.post(
    "/users/signin",
    {
      username,
      password,
    }
  );

  const token = signInResponse.data.token;

  if (!token) {
    throw new Error("Token inválido");
  }

  // salva token
  await AsyncStorage.setItem("token", token);

  const userResponse = await api.get(
    `/users/${username}`
  );

  const user: User = userResponse.data;

  // salva usuário
  await AsyncStorage.setItem(
    "user",
    JSON.stringify(user)
  );

  return {
    token,
    user,
  };
}

export async function signOut() {

  await AsyncStorage.removeItem("token");
  await AsyncStorage.removeItem("user");
}