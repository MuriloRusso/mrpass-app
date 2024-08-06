import React, {useState, createContext, ReactNode, useEffect} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { api } from "../../services/api";
import axios from 'axios';


type FolterContextData = {
    deleteFolder: (crendentials: DeleteFolderProps) => Promise<void>;
}

type FolderProviderProps = {
    children: ReactNode;
}

type DeleteFolderProps = {
    id: number
}

export const FolderContext = createContext({} as FolterContextData);

export function AuthProvider({children}: FolderProviderProps){
 
    async function postFetchMultipartDeleteFolder(body:any, route:string) {
        let myResponse = fetch(`${route}`, {
            method: 'POST',
            body: body,
        })
        .then((response) => {
            response.json().then((data) => {
                if(response.status === 200){
                    console.log('Pasta criada com sucesso!');                    
                }
                else{
                    console.log(data.message);
                }
            })
        })
        .catch(error => {
            console.error('Erro na requisição POST:', error);
            throw new Error("error");
        });
        return myResponse;
    }


    async function deleteFolder( {id}: DeleteFolderProps){
        
        let formData = new FormData();
        formData.append('id', id);
        await postFetchMultipartDeleteFolder(formData, 'https://mrpass.site/api/folders/delete.php');
    }

    return(
        <FolderContext.Provider value={{ deleteFolder }}>
            {children}
        </FolderContext.Provider>
    )
}