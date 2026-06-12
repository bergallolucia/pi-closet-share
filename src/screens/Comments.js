import { View, Text, Image, StyleSheet, TextInput, Pressable, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { auth, db } from '../firebase/config';

function Comments(props) {

    const [comentarios, setComentarios] = useState([]); 
    const [comentario, setComentario] = useState(""); 

    const idDelPost = props.route.params.id; 

    useEffect(() => {
        db.collection("comments")
            .where("postId", "==", idDelPost)
            .onSnapshot((docs) => {
                let comentariosAux = [];

                docs.forEach((doc) => {
                    comentariosAux.push({
                        id: doc.id,
                        data: doc.data()
                    });
                });

                setComentarios(comentariosAux);
            });
    }, []);

    function agregarComentario() {
        db.collection("comments")
            .add({
                comentario: comentario,
                email: auth.currentUser.email,
                postId: idDelPost,
                createdAt: Date.now()
            })
            .then(() => {
                setComentario("");
            })
            .catch((error) => console.log(error));
    }

    return ( 
        <View style={styles.container}>
            <Image 
                style={styles.image}
                source={require('../../assets/logo.png')} 
            />

            <Text style={styles.titulo}>Comments</Text>

            <TextInput
                style={styles.input}
                placeholder="Escribí un comentario"
                onChangeText={(text) => setComentario(text)}
                value={comentario}
            />

            <Pressable style={styles.boton} onPress={agregarComentario}>
                <Text style={styles.textoBoton}>Comentar</Text>
            </Pressable>

            <FlatList
                data={comentarios}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.comentario}>
                        <Text style={styles.email}>{item.data.email}</Text>
                        <Text>{item.data.comentario}</Text>
                    </View>
                )}
            />
        </View>
    );
}

export default Comments;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        padding: 20,
        paddingTop: 30
    },
    image: { 
        height: 60,
        resizeMode: "contain",
        alignSelf: "center",
        marginBottom: 15
    },
    titulo: {
        fontSize: 28,
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
        marginBottom: 20
    },
    textoBoton: {
        color: "white"
    },
    comentario: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        marginBottom: 10,
        borderRadius: 5
    },
    email: {
        fontWeight: "bold",
        marginBottom: 5
    }
});