import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { auth } from "../firebase/config";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        props.navigation.navigate("HomeMenu");
      }
    });
  }, []);

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
        <Text style={styles.error}>{error}</Text>
        :
        null
      }

      <Pressable
        style={styles.boton}
        onPress={login}
      >
        <Text style={styles.textoBoton}>Ingresar</Text>
      </Pressable>

      <Pressable
        onPress={() => props.navigation.navigate("Register")}
      >
        <Text style={styles.link}>¿No tenés cuenta? Registrate</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d78282",
    justifyContent: "center",
    padding: 20
  },
  titulo: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20
  },
  input: {
    borderWidth: 1,
    borderColor: "#e8aaaa",
    padding: 10,
    marginBottom: 10,
    borderRadius: 6
  },
  boton: {
    backgroundColor: "#000000",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 10
  },
  textoBoton: {
    color: "#d78282"
  },
  link: {
    marginTop: 15,
    textAlign: "center",
    color: "black"
  },
  error: {
    color: "red",
    marginBottom: 10,
    textAlign: "center"
  }
});

export default Login;