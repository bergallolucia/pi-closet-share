import { View, Text, StyleSheet } from "react-native";

function Post(props) {
    return (
        <View style={styles.post}>
            <Text style={styles.email}>
                {props.data.email}
            </Text>

            <Text>
                {props.data.descripcionPost}
            </Text>
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
    }
});

export default Post;