import React, {useContext} from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';


import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { NavigateStackRoutes } from "../../../routes/app.routes";



export default function RegisterList({ data }:{data:any}){
    const navigator = useNavigation<NativeStackNavigationProp<NavigateStackRoutes>>()
    return(
        <View style={{...styles.border, ...styles.lineList}}>
            <View style={{...styles.row}}>

                <View>
                    <Text style={styles.lineTitle}>{data.plataforma}</Text>
                    <Text>{data.descricao}</Text>
                    <View style={{marginVertical: 10}}>
                        <Text style={styles.registerTitle}>Link:</Text>
                        <Text>{data.link}</Text>
                    </View>
                    <View style={{marginVertical: 10}}>
                        <Text style={styles.registerTitle}>Usuário:</Text>
                        <Text>{data.usuario}</Text>
                    </View>
                    <View style={{marginVertical: 10}}>
                        <Text style={styles.registerTitle}>Senha:</Text>
                        <Text>{data.senha}</Text>
                    </View>
                </View>
            </View>
            <View style={{...styles.row}}>
                <TouchableOpacity style={{...styles.btnActions, ...styles.iconEdit}}
                    onPress={() => {
                        navigator.navigate("editFolder", { id: data.id, nome: data.nome, descricao: data.descricao })
                    }}
                >
                    <Image source={{uri: 'https://mrpass.site/img/icons/pencil.png'}} style={styles.iconActions}></Image>
                </TouchableOpacity>

                <TouchableOpacity style={{...styles.btnActions, ...styles.iconDelete}} 
                    onPress={() => {
                        navigator.navigate("deleteFolder", { id: data.id, nome: data.nome })
                    }}
                >
                    <Image source={{uri: 'https://mrpass.site/img/icons/trash-can.png'}} style={styles.iconActions}></Image>
                </TouchableOpacity>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    imgFolder: {
        width: 50,
        height: 50,
        marginHorizontal: 10
    },
    row: {
        flexDirection: 'row'
    },
    lineTitle: {
        fontSize: 18,
        fontWeight: '500',
        maxWidth: '100%',
    },
    lineList: {
        paddingVertical: 10,
        marginVertical: 10,
    },
    btnActions: {
        padding: 15,
        margin: 10
    },
    iconActions:{
        width: 20,
        height: 20
    },
    iconView: {
        backgroundColor: '#E9DBFF'
    },
    iconEdit: {
        backgroundColor: '#DFEFFF'

    },
    iconDelete: {
        backgroundColor: '#FFE8EE'

    },
    border: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    },
    registerTitle: {
        fontWeight: '600', fontSize: 16
    }
})