"use client";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

import { type Advocate } from "@/types/Advocate";
import { fetchAdvocates } from "@/utils/api";

const AdvocateContext = createContext<{
    advocates: Advocate[], 
    searchTerm: string, 
    setSearchTerm: (val: string) => void
}>({
    advocates: [],
    searchTerm: "",
    setSearchTerm: () => {}
});

export const AdvocateProvider = ({ children } : { children: ReactNode }) => {
    const [advocates, setAdvocates] = useState<Advocate[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");

    useEffect(() => {
        const loadAdvocates = async () => {
            try {
                const { data } = await fetchAdvocates();
                setAdvocates(data);
            } catch (error) {
                console.error('Error while fetching data: ', error);
            }
        };
        loadAdvocates();
    }, []);

    return (
        <AdvocateContext.Provider value={{advocates, searchTerm, setSearchTerm}}>
            {children}
        </AdvocateContext.Provider>
    )
};

export const useAdvocates = () => {
    return useContext(AdvocateContext);
}