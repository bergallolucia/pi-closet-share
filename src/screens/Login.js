import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { useState } from "react";
import { auth } from "../firebase/config";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = () => {
    auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        props.navigation.navigate("HomeMenu");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
        value={password}
      />

      {error !== "" ? 
      <Text style={styles.error}> {error} </Text> 
      : null}

      <Pressable style={styles.boton} onPress={login}>
        <Text style={styles.textoBoton}> Ingresar </Text>
      </Pressable>

      <Pressable onPress={() => props.navigation.navigate("Register")}>
        <Text style={styles.link}>¿No tenés cuenta? Registrate</Text>
      </Pressable>
    </View>
  );
}



export default Login;