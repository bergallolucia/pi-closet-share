import { View, Text, TextInput, Pressable, StyleSheet, Image } from "react-native"; 
import { useState } from "react"; 
import { db, auth } from "../firebase/config"; 

function NewPost() {
    const [descripcionPost, setDescripcionPost] = useState(""); 

    function crearPost() {
        db.collection("posts").add({
            descripcionPost: descripcionPost, 
            email: auth.currentUser.email, 
            createdAt: Date.now(), 
            likes: []
        })
        .then(() => {
            setDescripcionPost(""); 
        })
        .catch(error => console.log(error)); 
    }

    return (
        <View style={styles.container}>

            <Image style={styles.image}
                source={require('../../assets/logo.png')}
                resizeMode='center'/>

            <Text style={styles.titulo}>Nuevo post</Text>

            <TextInput
                style={styles.input}
                placeholder="Escribi tu post..."
                keyboardType="default"
                onChangeText={(text) => setDescripcionPost(text)}
                value={descripcionPost}
            />

            <Pressable style={styles.boton} onPress={crearPost}>
                <Text style={styles.textoBoton}>Crear post</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        padding: 20, 
        backgroundColor: "white",
        alignItems: "center",
    }, 
    titulo: {
        fontSize: 28, 
        fontWeight: "bold", 
        marginBottom: 20, 
        textAlign: "center"
    }, 
    input: {
        borderWidth: 1, 
        borderColor: "#6F4E37", 
        padding: 10, 
        marginBottom: 20
    }, 
    boton: {
        backgroundColor: "#6F4E37", 
        borderColor: "#6F4E37",
        padding: 12, 
        alignItems: "center", 
        borderRadius: 4
    }, 
    textoBoton: {
        color: "white"
    },
    image: {
        height: 60,
    }
}); 

export default NewPost;