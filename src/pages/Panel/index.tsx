import React, {useContext, useEffect}from "react";
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Image, FlatList, ScrollView } from 'react-native';
import Header from "../../components/header";
import FolderList from '../../components/lists/FoldersList'

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { NavigateStackRoutes } from "../../routes/app.routes";
import { useIsFocused } from "@react-navigation/native";
import { AuthContext } from "../../contexts/AuthContext";

export default function Panel(){


    const navigator = useNavigation<NativeStackNavigationProp<NavigateStackRoutes>>()
    const [search, setSearch] = React.useState('');
    const isFocused = useIsFocused();//verifica se páginas foram alteradas
    const [folders, setFolders] = React.useState('');

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
            getFetch('https://mrpass.site/api/folders/panel.php');
        }
    },[isFocused])


    async function getListBySearch() {        
        getFetch(`https://mrpass.site/api/folders/search.php?search=${search}`);
    }


    const {erro, setError} = useContext(AuthContext);

    if(erro){
        setTimeout(() => {
            setError('');
        },5000)
    }


    return(
        <>
            <Header></Header>
            <ScrollView>
                <View style={styles.container}>
                    {
                        erro &&
                            <View style={[styles.alertSuccess, styles.alert]}>
                            <Text style={[styles.alertSuccess, styles.textCenter]}>{erro}</Text>
                            </View>
                    }

                    <View  style={styles.listHeader}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Image source={{uri: 'https://mrpass.site/img/icons/folder.png'}} style={styles.iconHeader}></Image>
                            <Text style={styles.listTitle}>Pastas</Text>
                        </View>
                        <TouchableOpacity style={styles.btn} onPress={() => {
                            navigator.navigate("newFolder")
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
                            renderItem={({ item }) => <FolderList data={item} />} 
                        />
                    </View>
                </View>
            </ScrollView>
            
        </>
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
    }
})