import { View, Text, Pressable, StyleSheet, TextInput } from "react-native";
import { useState } from "react";
import { auth, db } from "../firebase/config";

function Register(props) {

    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [registerError, setRegisterError] = useState("");

    function onSubmit() {

        auth.createUserWithEmailAndPassword(email, password)

            .then(() => {

                db.collection("users")
                    .add({
                        email: email,
                        userName: userName,
                        createdAt: Date.now()
                    })

                    .then(() => {
                        props.navigation.navigate("Login");
                    })

                    .catch(() => {
                        setRegisterError("Error al guardar los datos.");
                    });

            })

            .catch((error) => {
                setRegisterError(error.message);
            });

    }

    return (

        <View style={styles.container}>

            <Text style={styles.titulo}>Registro</Text>

            <TextInput
                style={styles.input}
                keyboardType="email-address"
                placeholder="Ingresá tu email"
                onChangeText={(text) => setEmail(text)}
                value={email}
            />

            <TextInput
                style={styles.input}
                placeholder="Ingresá tu nombre de usuario"
                onChangeText={(text) => setUserName(text)}
                value={userName}
            />

            <TextInput
                style={styles.input}
                placeholder="Ingresá tu contraseña"
                secureTextEntry={true}
                onChangeText={(text) => setPassword(text)}
                value={password}
            />

            {
                registerError !== ""
                ?
                <Text style={styles.error}>
                    {registerError}
                </Text>
                :
                null
            }

            <Pressable
                style={styles.boton}
                onPress={onSubmit}
            >
                <Text style={styles.textoBoton}>
                    Registrarme
                </Text>
            </Pressable>

            <Pressable
                onPress={() => props.navigation.navigate("Login")}
            >
                <Text style={styles.link}>
                    Ya tengo cuenta
                </Text>
            </Pressable>

        </View>

    );

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "white",
        padding: 20,
        justifyContent: "center"
    },

    titulo: {
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20
    },

    input: {
        borderWidth: 1,
        borderColor: "#6F4E37",
        padding: 10,
        marginBottom: 10,
        borderRadius: 5
    },

    boton: {
        backgroundColor: "#6F4E37",
        padding: 12,
        borderRadius: 5,
        alignItems: "center",
        marginTop: 10
    },

    textoBoton: {
        fontWeight: "bold"
    },

    error: {
        color: "red",
        marginTop: 10,
        marginBottom: 10
    },

    link: {
        textAlign: "center",
        marginTop: 15
    }

});

export default Register;