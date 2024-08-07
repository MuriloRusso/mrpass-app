import React, {useContext, useEffect} from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert } from 'react-native';


import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { NavigateStackRoutes } from "../../../routes/app.routes";


import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { Button } from "react-native-elements";

export default function RegisterList({ data }:{data:any}){
    const navigatorr = useNavigation<NativeStackNavigationProp<NavigateStackRoutes>>()



    // const createTwoButtonAlert = () =>
    //     Alert.alert('Alert Title', 'My Alert Msg', [
    //       {
    //         text: 'Cancel',
    //         onPress: () => console.log('Cancel Pressed'),
    //         style: 'cancel',
    //       },
    //       {text: 'OK', onPress: () => console.log('OK Pressed')},
    //     ]);
    
    //   const createThreeButtonAlert = () =>
    //     Alert.alert('Alert Title', 'My Alert Msg', [
    //       {
    //         text: 'Ask me later',
    //         onPress: () => console.log('Ask me later pressed'),
    //       },
    //       {
    //         text: 'Cancel',
    //         onPress: () => console.log('Cancel Pressed'),
    //         style: 'cancel',
    //       },
    //       {text: 'OK', onPress: () => console.log('OK Pressed')},
    //     ]);
    
    
    function copyToClipboard(text:string) {
        navigator.clipboard.writeText(text).then(() => {
            console.log('Texto copiado com sucesso!');
            // showAlert;
        }).catch(err => {
            console.error('Erro ao copiar texto: ', err);
        });
    }

    return(
        <View style={{...styles.border, ...styles.lineList}}>
            <View style={{...styles.row}}>

                <View>
                    <Text style={styles.lineTitle}>{data.plataforma}</Text>
                    <Text>{data.descricao}</Text>
                    <View style={styles.registerContainer}>
                        <View>
                            <Text style={styles.registerTitle}>Link:</Text>
                            <Text>{data.link}</Text>
                        </View>
                        <TouchableOpacity onPress={() => copyToClipboard(data.link)}>
                            <FontAwesomeIcon icon={faCopy} style={styles.iconCopy}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.registerContainer}>
                        <View>
                            <Text style={styles.registerTitle}>Usuário:</Text>
                            <Text>{data.usuario}</Text>
                        </View>
                        <TouchableOpacity onPress={() => copyToClipboard(data.usuario)}>
                            <FontAwesomeIcon icon={faCopy} style={styles.iconCopy}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.registerContainer}>
                        <View>
                            <Text style={styles.registerTitle}>Senha:</Text>
                            <Text>{data.senha}</Text>
                        </View>
                        <TouchableOpacity onPress={() => copyToClipboard(data.senha)}>
                            <FontAwesomeIcon icon={faCopy} style={styles.iconCopy}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={{...styles.row}}>
                <TouchableOpacity style={{...styles.btnActions, ...styles.iconEdit}}
                    onPress={() => {
                        navigatorr.navigate("editFolder", { id: data.id, nome: data.nome, descricao: data.descricao })
                    }}
                >
                    <Image source={{uri: 'https://mrpass.site/img/icons/pencil.png'}} style={styles.iconActions}></Image>
                </TouchableOpacity>

                <TouchableOpacity style={{...styles.btnActions, ...styles.iconDelete}} 
                    onPress={() => {
                        navigatorr.navigate("deleteRegister", { id: data.id, nome: data.plataforma })
                    }}
                >
                    <Image source={{uri: 'https://mrpass.site/img/icons/trash-can.png'}} style={styles.iconActions}></Image>
                </TouchableOpacity>
            </View>
            
            


            {/* <View style={styles.container}>
                <Button title={'2-Button Alert'} onPress={createTwoButtonAlert} />
                <Button title={'3-Button Alert'} onPress={createThreeButtonAlert} />
            </View> */}
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
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
    iconCopy: {
        width: 25, height: 25, marginLeft: 7, color: "#555"
    },
    border: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    },
    registerTitle: {
        fontWeight: '600', fontSize: 16
    },
    registerContainer: {
        marginVertical: 10, display: 'flex', flexDirection: 'row', alignItems: 'flex-end'
    }
})