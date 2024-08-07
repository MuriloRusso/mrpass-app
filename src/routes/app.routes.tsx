import React from "react";

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Panel from "../pages/Panel";
import NewFolder from "../pages/Panel/NewFolder";
import DeleteFolder from "../pages/Panel/DeleteFolder";
import EditFolder from "../pages/Panel/EditFolder";
import Register from "../pages/Register";
import NewRegister from "../pages/Register/NewRegister";
import DeleteRegister from "../pages/Register/DeleteRegister";
import EditRegister from "../pages/Register/EditRegister";

export type NavigateStackRoutes = {
    index: undefined;
    newFolder: undefined;
    editFolder: {
        id:any,
        nome: string,
        descricao: string
    }
    deleteFolder: {
        id:any,
        nome: string
    },
    register:{
        id:any,
        nome: string,
        file: string,
        extensao: string
    }
    newRegister: {
        id:any,
    };
    editRegister: {
        id:any,
        plataforma: string,
        link: string,
        usuario: string,
        senha: string,
        descricao: string,
    }
    deleteRegister: {
        id:any,
        nome: string
    },
}


const Stack = createNativeStackNavigator<NavigateStackRoutes>();

function AppRoutes(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="index" component={Panel} options={{headerShown: false}}/>
            <Stack.Screen name="newFolder" component={NewFolder} options={{headerShown: false}}/>
            <Stack.Screen name="editFolder" component={EditFolder} options={{headerShown: false}}/>
            <Stack.Screen name="deleteFolder" component={DeleteFolder} options={{headerShown: false}}/>
            <Stack.Screen name="register" component={Register} options={{headerShown: false}}/>
            <Stack.Screen name="newRegister" component={NewRegister} options={{headerShown: false}}/>
            <Stack.Screen name="editRegister" component={EditRegister} options={{headerShown: false}}/>
            <Stack.Screen name="deleteRegister" component={DeleteRegister} options={{headerShown: false}}/>

        </Stack.Navigator>
    )
}

export default AppRoutes;
