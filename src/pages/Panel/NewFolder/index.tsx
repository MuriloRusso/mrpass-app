import React, { useContext, useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, ScrollView, Platform, Image } from 'react-native';
import Header from "../../../components/header";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { NavigateStackRoutes } from "../../../routes/app.routes";

import DocumentPicker from 'react-native-document-picker';
import { launchImageLibrary } from 'react-native-image-picker';
import * as ImagePicker from 'expo-image-picker';
import { Pressable } from 'react-native';



// import { FolderContext } from "../../../contexts/Folder/FolderContext";
import { AuthContext } from "../../../contexts/AuthContext";
// import { useFolderContext } from "../../../hooks/useFolderContext";
// import { AuthContext } from "../../../contexts/Folder/AuthContext";
// import { AuthContext } from "../../../contexts/FolderContext";
// import { FolderContext } from "../../../contexts/FolderContext";



export default function NewFolder() {
    const navigator = useNavigation<NativeStackNavigationProp<NavigateStackRoutes>>();

    const [title, setTitle] = React.useState('');
    const [text, setText] = React.useState('');

    // const { newFolder } = useContext(AuthContext);
    // const { newFolder, erro2 } = useContext(FolderContext);
    // const { newFolder, erro2, setError2 } = useFolderContext();
    const { newFolder } = useContext(AuthContext);
    // const { newFolder } = useContext(FolderContext);




    const handleNewFolder = async () => {
        await newFolder({ title,  text })
    };

    const [imageUri, setImageUri] = useState(null);
    const pickImage = () => {
        // launchImageLibrary({ mediaType: 'photo' }, (response) => {
        //     console.log(response);
        //     console.log(response.assets);            
        //     if (response.didCancel) {
        //         console.log('User cancelled image picker');
        //     } else if (response.error) {
        //         console.log('ImagePicker Error: ', response.error);
        //     } else {
        //         const uri = response.assets[0].uri;
        //         setImageUri(uri);
        //         console.log(uri);
        //     }
        // });
    };        

    return (
        <ScrollView>
            <Header />
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.btnBack}
                    onPress={() => navigator.goBack()}
                    accessibilityLabel=""
                >
                    <Text style={styles.textBtnBack}>Voltar</Text>
                </TouchableOpacity>

                <TextInput
                    style={styles.input}
                    onChangeText={setTitle}
                    value={title}
                    placeholder="Nome da pasta"
                    keyboardType="default"
                    placeholderTextColor="#777777"
                />

                <View>
                    <Button title="Escolher Imagem" onPress={pickImage} />
                    {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
                </View>

                
                <TextInput
                    style={{ ...styles.input, ...styles.textarea }}
                    onChangeText={setText}
                    value={text}
                    placeholder="Descrição da pasta"
                    keyboardType="default"
                    placeholderTextColor="#777777"
                    multiline={true}
                />

                <TouchableOpacity
                    style={styles.btn}
                    onPress={handleNewFolder}
                    accessibilityLabel=""
                    >
                    <Text style={[styles.textWhite, styles.textCenter]}>
                        Criar Pasta
                    </Text>
                </TouchableOpacity>
            </View> 
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    btnBack: {
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    textBtnBack: {
        fontSize: 26,
        color: '#ccc',
    },
    container: {
        padding: 20,
        maxWidth: 800,
        backgroundColor: 'white',
        marginVertical: 50,
        marginHorizontal: 'auto',
        width: '100%',
        borderRadius: 5,
    },
    input: {
        height: 40,
        marginTop: 10,
        marginBottom: 10,
        borderWidth: 1,
        padding: 10,
        backgroundColor: '#ededfb',
        fontSize: 18,
        borderColor: "transparent",
        width: "100%",
    },
    textarea: {
        height: 150,
    },
    btn: {
        padding: 15,
        backgroundColor: '#FE715B',
        width: '100%',
        margin: 0,
        maxWidth: 500,
    },
    textWhite: {
        color: '#ffffff',
    },
    textCenter: {
        textAlign: 'center',
    },


    image: {
        width: 200,
        height: 200,
        marginTop: 20,
    },
});
