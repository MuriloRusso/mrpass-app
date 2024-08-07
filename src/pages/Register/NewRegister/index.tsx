import React, { useContext, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';
import Header from "../../../components/header";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NavigateStackRoutes } from "../../../routes/app.routes";

import { AuthContext } from "../../../contexts/AuthContext";
import { RegisterRoute } from "..";

export default function NewRegister() {
    const navigator = useNavigation<NativeStackNavigationProp<NavigateStackRoutes>>();

    const route = useRoute<RegisterRoute>();


    const [id, setId] = React.useState(route.params.id);
    const [title, setTitle] = React.useState('');
    const [link, setLink] = React.useState('');
    const [usuario, setUsuario] = React.useState('');
    const [senha, setSenha] = React.useState('');
    const [descricao, setDescricao] = React.useState('');

    const {newRegister} = useContext(AuthContext)

    console.log(route.params.id);   


    const handleNewRegister = async () => {
        await newRegister({ id, title,  link, usuario, senha, descricao })
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
                    placeholder="Plataforma"
                    keyboardType="default"
                    placeholderTextColor="#777777"
                />

                <TextInput
                    style={styles.input}
                    onChangeText={setLink}
                    value={link}
                    placeholder="Link"
                    keyboardType="default"
                    placeholderTextColor="#777777"
                />

                <TextInput
                    style={styles.input}
                    onChangeText={setUsuario}
                    value={usuario}
                    placeholder="Usuário"
                    keyboardType="default"
                    placeholderTextColor="#777777"
                />

                <TextInput
                    style={styles.input}
                    onChangeText={setSenha}
                    value={senha}
                    placeholder="Senha"
                    keyboardType="default"
                    placeholderTextColor="#777777"
                />


                <TextInput
                    style={{ ...styles.input, ...styles.textarea }}
                    onChangeText={setDescricao}
                    value={descricao}
                    placeholder="Descrição"
                    keyboardType="default"
                    placeholderTextColor="#777777"
                    multiline={true}
                />

 

                <TouchableOpacity
                    style={styles.btn}
                    onPress={handleNewRegister}
                    accessibilityLabel=""
                    >
                    <Text style={[styles.textWhite, styles.textCenter]}>
                        Criar Registro
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
