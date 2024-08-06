import React from "react";

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Panel from "../pages/Panel";
import NewFolder from "../pages/Panel/NewFolder";
import DeleteFolder from "../pages/Panel/DeleteFolder";
import EditFolder from "../pages/Panel/EditFolder";

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
    }
}


const Stack = createNativeStackNavigator<NavigateStackRoutes>();

function AppRoutes(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="index" component={Panel} options={{headerShown: false}}/>
            <Stack.Screen name="newFolder" component={NewFolder} options={{headerShown: false}}/>
            <Stack.Screen name="editFolder" component={EditFolder} options={{headerShown: false}}/>
            <Stack.Screen name="deleteFolder" component={DeleteFolder} options={{headerShown: false}}/>
        </Stack.Navigator>
    )
}

export default AppRoutes;
