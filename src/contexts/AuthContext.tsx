import React, {useState, createContext, ReactNode, useEffect} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { api } from "../services/api";
import axios from 'axios';


import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { NavigateStackRoutes } from "../routes/app.routes";


type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (crendentials: SignProps) => Promise<void>;
    newFolder: (crendentials: FolderProps) => Promise<void>;
    editFolder: (crendentials: EditFolderProps) => Promise<void>;
    deleteFolder: (crendentials: DeleteFolderProps) => Promise<void>;
    newRegister: (crendentials: RegisterProps) => Promise<void>;

    loadingAuth: boolean;
    loading: boolean;
    signOut: () => Promise<void>;
    erro: string
}

type UserProps = {
    id: string
    name: string;
    email: string;
    token: string;
}

type AuthProviderProps = {
    children: ReactNode;
}

type SignProps = {
    email: string;
    password: string;
}
type EditFolderProps = {
    id: number;
    title: string;
    text: string;
}
type FolderProps = {
    title: string;
    text: string;
}


// delete folder 
type DeleteFolderProps = {
    id: number;
    title: string;
}


type RegisterProps = {
    id: number;
    title: string;
    link: string;
    usuario: string;
    senha: string;
    descricao: string;

}



export const AuthContext = createContext({} as AuthContextData);



export function AuthProvider({children}: AuthProviderProps){
    const navigator = useNavigation<NativeStackNavigationProp<NavigateStackRoutes>>()
    
    const [user, setUser] = useState<UserProps>({
        id: '',
        name: '',
        email: '',
        token: ''
    });

    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loading, setLoading] = useState(true);
    const [erro, setError] = useState('');


    const isAuthenticated = !!user.name;

    //manter usuário conectado quando sai do app
    useEffect(()=>{
        async function getUser(){
            //pegar os dados salvos do user

            const userInfo = await AsyncStorage.getItem('@mrpass')//verifica se existe algo salvo no storage @mrpass 
            let hasUser:UserProps = JSON.parse(userInfo || '{}')//caso exista algo no storage @mrpass converte para objeto, caso não, variavel retorna objeto vázio

            //verificar se recebemos as informações dele.
            if(Object.keys(hasUser).length > 0){
                api.defaults.headers.common['Authorization'] = `Bearer ${hasUser.token}`;
                setUser({
                    id: hasUser.id,
                    name: hasUser.name,
                    email: hasUser.email,
                    token: hasUser.token,
                })
            }
            setLoading(false);
        }
        getUser();
    }, [])

    async function postFetchMultipart(body:any, route:string) {
        let myResponse = fetch(`${route}`, {
            method: 'POST',
            body: body,
        })
        .then((response) => {
            response.json().then((data) => {
                if(response.status === 200){
                    setUser({
                        id: data.id,
                        name: data.name,
                        email: data.email,
                        token: data.id
                    })
                    AsyncStorage.setItem('@mrpass', JSON.stringify({"id":  data.id, "name": data.name, "email": data.email, "token": data.id}))//guarda informações do usuário no storage
                }
                else{
                    setError(data.message);
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

    async function signIn( {email, password}: SignProps){
        setLoadingAuth(true);
        try{
            //verifica se campo de usuário ou senha estão vázios
            if(!email || !password){
                setError('Preencha todos os campos para continuar');
                return;
            }
            //-------------------------
            
            let formData = new FormData();
            formData.append('username', email);
            formData.append('password', password);

            await postFetchMultipart(formData, 'https://mrpass.site/api/login.php');

            /*
            const response = await api.post('/api/login.php', {
                email,
                password
            })
            const { id, name, token } = response.data;
            const data = {
                ...response.data
            }
            await AsyncStorage.setItem('@mrpass', JSON.stringify(data))
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`
            setUser({
                id,
                name,
                email,
                token
            })
            */

            setLoadingAuth(false);
        }
        catch(err){
            console.log('Erro ao acessar ', err);
            setLoadingAuth(false)            
        }
    }

    async function signOut() {
        await AsyncStorage.clear()
        .then(()=>{
            setUser({
                id: '',
                name: '',
                email: '',
                token: ''
            })
        })
    }

    async function postFetchMultipartNewFolder(body:any, route:string) {
        let myResponse = fetch(`${route}`, {
            method: 'POST',
            body: body,
        })
        .then((response) => {
            response.json().then((data) => {
                if(response.status === 200){
                    console.log('Pasta criada com sucesso!');
                    navigator.navigate("index");
                    setError(data.message);
                }
                else{
                    setError(data.message);
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


    async function newFolder( {title, text}: FolderProps){
        
        let formData = new FormData();
        formData.append('title', title);
        formData.append('text', text);

        await postFetchMultipartNewFolder(formData, 'https://mrpass.site/api/folders/new.php');
    }






    async function postFetchMultipartEditFolder(body:any, route:string) {
        let myResponse = fetch(`${route}`, {
            method: 'POST',
            body: body,
        })
        .then((response) => {
            response.json().then((data) => {
                if(response.status === 200){
                    navigator.navigate("index");
                    setError(data.message);
                }
                else{
                    setError(data.message);
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


    async function editFolder( {id, title, text}: EditFolderProps){
        
        let formData = new FormData();
        formData.append('id', id.toString());
        formData.append('title', title);
        formData.append('text', text);

        await postFetchMultipartEditFolder(formData, 'https://mrpass.site/api/folders/edit.php');
    }




    // delete folder

    async function postFetchMultipartDeleteFolder(body:any, route:string) {
        let myResponse = fetch(`${route}`, {
            method: 'POST',
            body: body,
        })
        .then((response) => {
            response.json().then((data) => {
                console.log(data.status);
                
                if(response.status === 200){
                    navigator.navigate("index");
                    setError(data.message);

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
        formData.append('id', id.toString());
        await postFetchMultipartDeleteFolder(formData, 'https://mrpass.site/api/folders/delete.php');
    }


    
    // new register
    async function postFetchMultipartNewRegister(body:any, route:string, idFolder:any) {
        let myResponse = fetch(`${route}`, {
            method: 'POST',
            body: body,
        })
        .then((response) => {
            response.json().then((data) => {
                console.log(data.status);
                
                if(response.status === 200){
                    navigator.goBack();
                    setError(data.message);
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


    async function newRegister( {id, title, link, usuario, senha, descricao}: RegisterProps){
        
        let formData = new FormData();
        formData.append('id', id.toString());
        formData.append('title', title);
        formData.append('link', link);
        formData.append('usuario', usuario);
        formData.append('senha', senha);
        formData.append('descricao', descricao);
        await postFetchMultipartNewRegister(formData, 'https://mrpass.site/api/register/new.php', id);
    }


    return(
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, newFolder, editFolder, deleteFolder, newRegister, loadingAuth, loading, signOut, erro}}>
            {children}
        </AuthContext.Provider>
    )
}