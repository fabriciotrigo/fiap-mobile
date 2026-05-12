import { Redirect } from "expo-router"

export default function Index() {
  return <Redirect href="/login" />
}
/*import { View, Text } from "react-native"

export default function Index() {
  return (
    <View style={{ flex: 1, backgroundColor: "red", justifyContent: "center", alignItems: "center" }}>
      <Text style={{ color: "white" }}>FUNCIONANDO</Text>
    </View>
  )
}*/