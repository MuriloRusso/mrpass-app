import React, {useContext} from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

import { AuthContext } from "../../contexts/AuthContext"; 


export default function Header(){

    const {signOut} = useContext(AuthContext);

    return(
        <View style={styles.header}>
            <View  style={styles.headerContainer}>
                <Text style={styles.title}>MRPass</Text>
                <TouchableOpacity style={styles.btn} onPress={signOut}>
                    <Image source={{uri: 'https://mrpass.site/img/icons/logout.png'}} style={styles.btnIcon}></Image>
                    Sair
                </TouchableOpacity>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    header: {
        paddingVertical: 20,
        backgroundColor: 'white',
        width: '100%'
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: 800,
        margin: 'auto',
        width: '100%',
    },
    title: {
        color: '#FE715B',
        fontSize: 32,
        fontWeight: '500',
        marginHorizontal: 10
    },
    btn: {
        backgroundColor: '#FE715B',
        color: 'white',
        padding: 15,
        margin: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    btnIcon: {
        width: 20,
        height: 20,
        marginRight: 10
    }
})