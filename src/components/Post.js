import { View, Text, StyleSheet, Pressable } from "react-native";

function Post(props) {
    return (
        <View style={styles.post}>
            <Text style={styles.email}>
                {props.data.email}
            </Text>

            <Text>
                {props.data.descripcionPost}
            </Text>

            <Pressable style={styles.boton} onPress={() => props.navigation.navigate("Comments", {id: props.id})}>
                <Text style={styles.textoBoton}>Comentar</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    post: {
        backgroundColor: "white",
        padding: 15,
        marginBottom: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#6F4E37",
        marginHorizontal: 10
    },

    email: {
        fontWeight: "bold",
        marginBottom: 5
    }, 
    boton: {
        backgroundColor: "#6F4E37", 
        padding:10, 
        borderRadius: 5, 
        alignItems: "center", 
        marginTop: 10
    }, 
    textoBoton: {
        color: "white"
    }
});

export default Post;