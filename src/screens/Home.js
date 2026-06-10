import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import Post from "../components/Post";

function Home(props) {

    const [posts, setPosts] = useState([]);

    useEffect(() => {

        db.collection("posts")
            .orderBy("createdAt", "desc")
            .onSnapshot((docs) => {
                let postsAux = [];

                docs.forEach((doc) => {
                    postsAux.push({
                        id: doc.id,
                        data: doc.data()
                    });
                });

                setPosts(postsAux);
            });
    }, []);

    return (

        <View style={styles.container}>
            <Image style={styles.image}
                               source={require('../../assets/logo.png')}
                                resizeMode='center'/>
            <Text style={styles.titulo}>Home</Text>

            <FlatList
                data={posts}
                keyExtractor={(item) => item.id}

                renderItem={({ item }) =>
                    <Post
                        data={item.data}
                        id={item.id}
                        navigation={props.navigation}
                    />
                }

            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: 30,
        alignItems: "center",

    },
    titulo: {
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20
    },
    image: {
        height: 60,
    }
});

export default Home;