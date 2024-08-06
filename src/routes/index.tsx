import React, {useContext} from "react";

import {Text, View, ActivityIndicator} from 'react-native'

import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";
import Login from "../pages/Login";

import { AuthContext } from "../contexts/AuthContext";

export default function Routes(){
    const {isAuthenticated, loading} = useContext(AuthContext);
    // const loading = false;

    if(loading){
        return( 
            <View style={{flex: 1, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{marginBottom: 10}}>Carregando</Text>
                <ActivityIndicator size={60} color="#FE715B"/>
            </View>
        )
    }
    return(
        isAuthenticated ? <AppRoutes/> : <Login/>//<AuthRoutes/>
    )
}