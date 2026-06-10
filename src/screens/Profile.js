import { View, Text, Pressable, StyleSheet, FlatList, Image } from "react-native"; 
import { useState, useEffect } from "react";
import { auth, db } from "../firebase/config";
import Post from "../components/Post";

function Profile(props) {

        const [userName, setUserName] = useState(""); 
        const [posts, setPosts] = useState([]); 

        useEffect(() => {
            db.collection("users")
                .where("email", "==", auth.currentUser.email)
                .onSnapshot((docs) => {
                    docs.forEach((doc) => {
                        setUserName(doc.data().userName); 
                    }); 
                }); 

            db.collection("posts")
                .where("email", "==", auth.currentUser.email)
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

        function logout() {
            auth.signOut()
            .then(() => {
                props.navigation.navigate("Login"); 
            })
            .catch((error) => console.log(error)); 
        }

        return (
            <View style={styles.container}>

                <Image style={styles.image}
                                               source={require('../../assets/logo.png')}
                                                resizeMode='center'/>

                <Text style={styles.titulo}> MI PERFIL </Text>

                <Text style={styles.texto}> Nombre de usuario: {userName} </Text>
                <Text style={styles.texto}> Email: {auth.currentUser.email}</Text>

                <Text style={styles.subtitulo}> Mis posteos </Text>

                <FlatList
                    data={posts}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) =>
                        <Post
                            data={item.data}
                            id={item.id}
                        />
                    }
                />
                    

                <Pressable style={styles.boton} onPress={logout}>
                    <Text style={styles.textoBoton}> Desloguearse </Text>
                </Pressable>
                
            </View>

        ); 
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: "white", 
        padding: 20, 
        paddingTop: 30,
         alignItems: "center",
    }, 
    titulo: {
        fontSize: 28, 
        fontWeight: "bold", 
        textAlign: "center", 
        marginBottom: 20, 
        color: "#6F4E37"
        
    }, 
    texto: {
        fontSize: 17, 
        marginBottom: 12,
        backgroundColor: "#F5F5F5",
        padding: 12, 
        borderRadius: 8 
    }, 
    subtitulo: {
        fontSize: 24, 
        fontWeight: "bold", 
        marginTop: 25, 
        marginBottom:15, 
        color: "#6F4E37"
    }, 
    boton: {
        backgroundColor: "#6F4E37", 
        padding: 14, 
        borderRadius: 8, 
        alignItems: "center", 
        marginTop: 15
    }, 
    textoBoton: {
        color: "white", 
        fontSize: 16, 
        fontWeight: "bold"
    },
    image: {
        height: 60,
    }
}); 

export default Profile; 