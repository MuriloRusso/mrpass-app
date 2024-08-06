import React, {useContext} from "react";

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NewFolder from "../../pages/Panel/NewFolder";

const Stack = createNativeStackNavigator();


export default function Routes(){
    /*const {isAuthenticated, loading} = useContext(AuthContext);

    if(loading){
        return( 
            <View style={{flex: 1, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{marginBottom: 10}}>Carregando</Text>
                <ActivityIndicator size={60} color="#FE715B"/>
            </View>
        )
    }
    return(
        isAuthenticated ? <NewFolder/> : <Login/>
    )*/
    return(
        <Stack.Navigator>
            <Stack.Screen name="index" component={NewFolder} options={{headerShown: false}}/>
        </Stack.Navigator>
    )
}