import { View, Text, StyleSheet, Pressable } from "react-native";
import { db, auth } from "../firebase/config";
import firebase from "../firebase/config";

function Post(props) {
    const likes = props.data.likes ? props.data.likes : [];

    const miEmail = auth.currentUser.email;

    const yaLikeo = likes.includes(miEmail);

    function like() {
        db.collection("posts")
            .doc(props.id)
            .update({
                likes: firebase.firestore.FieldValue.arrayUnion(miEmail)
            })
            .catch(error => console.log(error));
    }

    function unlike() {
        db.collection("posts")
            .doc(props.id)
            .update({
                likes: firebase.firestore.FieldValue.arrayRemove(miEmail)
            })
            .catch(error => console.log(error));
    }

    return (
        <View style={styles.post}>

            <Text style={styles.email}>
                {props.data.email}
            </Text>

            <Text>
                {props.data.descripcionPost}
            </Text>

            <Text>
                ❤️ {likes.length}
            </Text>

            <Pressable
                style={styles.boton}
                onPress={yaLikeo ? unlike : like}
            >
                <Text style={styles.textoBoton}>
                    Me gusta
                </Text>
            </Pressable>

            <Pressable style={styles.boton} onPress={() => props.navigation.navigate("Comments", { id: props.id })}>
                <Text style={styles.textoBoton}>Comentar</Text>
            </Pressable>

        </View>
    );
}

const styles = StyleSheet.create({
    post: {
        backgroundColor: "#E8DDD4",
        padding: 15,
        marginBottom: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#6F4E37",
        marginHorizontal: 10
    },

    email: {
        fontWeight: "bold",
        marginBottom: 5,
        fontSize: 20
    },
    boton: {
        backgroundColor: "#6F4E37",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        marginTop: 10
    },
    textoBoton: {
        color: "white"
    }
});

export default Post;