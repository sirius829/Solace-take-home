"use client";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

import { type Advocate } from "@/types/Advocate";
import { fetchAdvocates } from "@/utils/api";

const AdvocateContext = createContext<Advocate[]>([]);

export const AdvocateProvider = ({ children } : { children: ReactNode }) => {
    const [advocates, setAdvocates] = useState<Advocate[]>([]);

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
        <AdvocateContext.Provider value={advocates}>
            {children}
        </AdvocateContext.Provider>
    )
};

export const useAdvocates = () => {
    return useContext(AdvocateContext);
}