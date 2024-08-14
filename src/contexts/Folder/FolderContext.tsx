import React, { useState, createContext, ReactNode } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { NavigateStackRoutes } from "../../routes/app.routes";

type FolderContextData = {
    newFolder: (credentials: FolderProps) => Promise<void>;
    erro2: string;
    setError2: any;
}

type FolderProviderProps = {
    children: ReactNode;
}

type FolderProps = {
    title: string;
    text: string;
}

export const FolderContext = createContext({} as FolderContextData);

export function FolderProvider({ children }: FolderProviderProps) {
    const navigator = useNavigation<NativeStackNavigationProp<NavigateStackRoutes>>();
    const [erro2, setError2] = useState('');

    async function postFetchMultipartNewFolder(body: any, route: string) {
        try {
            const response = await fetch(route, {
                method: 'POST',
                body: body,
            });

            const data = await response.json();

            if (response.status === 200) {
                console.log('Pasta criada com sucesso!');
                navigator.navigate("index");
                setError2('');
            } else {
                setError2(data.message);
                console.log(data.message);
            }
        } catch (error) {
            console.error('Erro na requisição POST:', error);
            setError2('Erro na requisição POST');
        }
    }

    async function newFolder({ title, text }: FolderProps) {
        let formData = new FormData();
        formData.append('title', title);
        formData.append('text', text);

        await postFetchMultipartNewFolder(formData, 'https://mrpass.site/api/folders/new.php');
    }

    return (
        <FolderContext.Provider value={{ newFolder, erro2, setError2 }}>
            {children}
        </FolderContext.Provider>
    );
}

