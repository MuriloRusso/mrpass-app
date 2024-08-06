import React, { useContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import Header from "../../../components/header";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { NavigateStackRoutes } from "../../../routes/app.routes";
import { useRoute, RouteProp } from "@react-navigation/native";
import { AuthContext } from "../../../contexts/AuthContext";

export type DeleteParams = {
    deleteFolder: { id: number, nome: string }
}

export type DeleteRoute = RouteProp<DeleteParams, "deleteFolder">

export default function DeleteFolder() {
    const navigator = useNavigation<NativeStackNavigationProp<NavigateStackRoutes>>();
    const route = useRoute<DeleteRoute>();
    const { deleteFolder } = useContext(AuthContext);

    const handleDeleteFolder = async () => {
        await deleteFolder({ id: route.params.id, title: route.params.nome });
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
                <Text style={{ marginTop: 10, marginBottom: 10 }}>Tem certeza de que deseja excluir a pasta {route.params.nome}?</Text>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={handleDeleteFolder}
                    accessibilityLabel=""
                >
                    <Text style={[styles.textWhite, styles.textCenter]}>
                        Excluir
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
