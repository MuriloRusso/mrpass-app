import { useContext } from "react";
import { FolderContext } from "../contexts/Folder/FolderContext";

export function useFolderContext() {
    const context = useContext(FolderContext);
    if (!context) {
        throw new Error("useFolderContext must be used within a FolderProvider");
    }
    return context;
}