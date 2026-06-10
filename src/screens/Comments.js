import { View, Text, Image } from 'react-native';
import { useState, useEffect } from 'react';
import { auth, db } from '../firebase/config';

function Comments(props) {

    const [comentarios, setComentarios] = useState(""); 
    const [comentario, setComentario] = useState(""); 
    const idDelPost = props.route.params.id; 

    return ( 
        <View>
            <Image style={StyleSheet.image}
                   source={require('../../assets/logo.png')} 
            />
            <Text>Comments</Text>
        </View>
    );
}

export default Comments;

const styles = StyleSheet.create({
    image: { 
        height: 60,
    },
})
