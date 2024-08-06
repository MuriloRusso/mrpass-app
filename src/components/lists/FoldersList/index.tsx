import React, {useContext} from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';


import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { NavigateStackRoutes } from "../../../routes/app.routes";



export default function FolderList({ data }:{data:any}){
    const navigator = useNavigation<NativeStackNavigationProp<NavigateStackRoutes>>()
    return(
        <View style={{...styles.border, ...styles.lineList}}>
            <View style={{...styles.row}}>
                <View>
                    <Image source={data.file ? { uri: `https://mrpass.site/img/upload/${data.file}.${data.extensao}`} : {uri: 'https://mrpass.site/img/icons/folder.png'}} style={styles.imgFolder}></Image>
                </View>
                <View>
                    <Text style={styles.lineTitle}>{data.nome}</Text>
                    <Text>{data.descricao}</Text>
                </View>
            </View>
            <View style={{...styles.row}}>
                <TouchableOpacity style={{...styles.btnActions, ...styles.iconView}}>
                    <Image source={{uri: 'https://mrpass.site/img/icons/eye.png'}} style={styles.iconActions}></Image>
                </TouchableOpacity>
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
        fontSize: 24,
        fontWeight: '500'
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
})