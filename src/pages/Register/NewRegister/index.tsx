import React, { useContext, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';
import Header from "../../../components/header";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { NavigateStackRoutes } from "../../../routes/app.routes";

import DocumentPicker from 'react-native-document-picker';
import { AuthContext } from "../../../contexts/AuthContext";

export default function NewFolder() {
    const navigator = useNavigation<NativeStackNavigationProp<NavigateStackRoutes>>();

    const [title, setTitle] = React.useState('');
    const [text, setText] = React.useState('');

    const {newFolder} = useContext(AuthContext)


    const handleNewFolder = async () => {
        await newFolder({ title,  text })
    };


    // const pickFile = async () => {
    //     try {
    //         const result = await DocumentPicker.pick({
    //             type: [DocumentPicker.types.allFiles],
    //         });
    //         console.log(result);
    //     } catch (err) {
    //         if (DocumentPicker.isCancel(err)) {
    //             console.log('User cancelled the picker');
    //         } else {
    //             throw err;
    //         }
    //     }
    // };

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

                {/* <Button title="Pick a file" onPress={pickFile} /> */}
                <Button title="Escolha uma imagem" onPress={()=> console.log('teste')} />


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
                        Entrar
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
});
