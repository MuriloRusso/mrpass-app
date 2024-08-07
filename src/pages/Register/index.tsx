import React, {useContext, useEffect}from "react";
import { StyleSheet, Text, View, TextInput, Alert, TouchableOpacity, Image, FlatList, ScrollView } from 'react-native';
import Header from "../../components/header";
import RegisterList from "../../components/lists/RegisterList";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NavigateStackRoutes } from "../../routes/app.routes";
import { useIsFocused } from "@react-navigation/native";
import { AuthContext } from "../../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";


export type RegisterParams = {
    editFolder: { id: number, nome: string, file: string, extensao: string }
}

export type RegisterRoute = RouteProp<RegisterParams, "editFolder">


export default function Register(){

    const navigator = useNavigation<NativeStackNavigationProp<NavigateStackRoutes>>()
    const [search, setSearch] = React.useState('');
    const isFocused = useIsFocused();//verifica se páginas foram alteradas
    const [folders, setFolders] = React.useState('');

    const route = useRoute<RegisterRoute>();


    async function getFetch(route:any) {
        let myResponse = fetch(`${route}`)
        .then((response) => {
            response.json().then((data) => {
                if(response.status === 200){
                    setFolders(data.itens);
                }
            })
        })
        .catch(error => {
            console.error('Erro na requisição POST:', error);
            throw new Error("error");
        });
        return myResponse;
    }

    useEffect(() => {
        if(isFocused){
            getFetch(`https://mrpass.site/api/register/panel.php?id=${route.params.id}`);
        }
    },[isFocused])
    
    
    async function getListBySearch() {        
        getFetch(`https://mrpass.site/api/register/search.php?search=${search}&id=${route.params.id}`);
    }

    
    const {erro} = useContext(AuthContext);    
 

    return(
        <ScrollView>
            <Header></Header>
            <View style={styles.container}>

                {
                    erro &&
                        <View style={[styles.alertSuccess, styles.alert]}>
                        <Text style={[styles.alertSuccess, styles.textCenter]}>{erro}</Text>
                        </View>
                }

                <View  style={styles.listHeader}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <TouchableOpacity onPress={() => navigator.navigate("index")}>
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </TouchableOpacity>
                        <Image style={styles.forlderImg} source={route.params.file ? { uri: `https://mrpass.site/img/upload/${route.params.file}.${route.params.extensao}`} : {uri: 'https://mrpass.site/img/icons/folder.png'}} ></Image>
                        <Text style={styles.listTitle}>{route.params.nome}</Text>
                    </View>
                    <TouchableOpacity style={styles.btn} onPress={() => {
                        navigator.navigate("newRegister", {id: route.params.id})
                    }}>
                        <Image source={{uri: 'https://mrpass.site/img/icons/add.png'}} style={styles.btnIcon}></Image>
                        Novo
                    </TouchableOpacity>
                </View>
                <View  style={styles.searchContainer}>
                    <TextInput style={styles.searchInput} onChangeText={setSearch} value={search} placeholder="Buscar..."></TextInput>
                    <TouchableOpacity style={styles.btn} onPress={getListBySearch}>
                        <Image source={{uri: 'https://mrpass.site/img/icons/search.png'}} style={styles.btnIcon}></Image>
                        Buscar
                    </TouchableOpacity>
                </View>
                <View>
                    {/* <FlatList data={folders} keyExtractor={(item) => item.key} renderItem={({item}) => <FolderList data={item} />}/> */}
                    <FlatList 
                        data={folders} 
                        keyExtractor={(item) => 'teste'} 
                        renderItem={({ item }) => <RegisterList data={item} />} 
                    />
                </View>
            </View>

            
{/* 
            <View style={styles.copyModal}>
                Texto copiado
            </View> */}



        </ScrollView>
    )
}

const styles = StyleSheet.create({
    scroll:{
        overflow: 'scroll'
    },
    container: {
        padding: 20,
        maxWidth: 800,
        backgroundColor: 'white',
        marginVertical: 50,
        marginHorizontal: 'auto',
        width: '100%',
        borderRadius: 5
    },
    listHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    listTitle: {
        fontSize: 26,
        fontWeight: '500'
    },
    btn: {
        backgroundColor: '#FE715B',
        color: 'white',
        padding: 15,
        margin: 10,
        flexDirection: 'row',
        alignItems: "center"
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: "center",
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#ccc',
        paddingVertical: 10,
        // borderTop: '1px solid #ccc',
    },
    searchInput: {
        backgroundColor: '#EBEBEB',
        paddingHorizontal: 10,
        paddingVertical: 15,
        width: '100%',
        height: 50
    },
    iconHeader: {
        width: 50,
        height: 50,
        marginRight: 10
    },
    btnIcon: {
        width: 20,
        height: 20,
        marginRight: 10
    },
    alert: {
        paddingVertical: 10,
        width: '100%',
        paddingHorizontal: 5,
        maxWidth: '100%',
    },
    alertSuccess: {
        backgroundColor: "green",
        color: "white",
    },
    textCenter: {
      textAlign: 'center',
    },
    copyModal: {
        position: 'absolute',
        // bottom: 20,
        top: 300,
        backgroundColor: "#555",
        color: "white",
        padding: 10,
    },
    forlderImg: {
        width: 40, height: 40, marginHorizontal: 10
    }
})