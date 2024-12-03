"use client";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

import _ from "lodash";

import { type Advocate } from "@/types/Advocate";
import { fetchAdvocates } from "@/utils/api";

const AdvocateContext = createContext<{
    advocates: Advocate[], 
    searchTerm: string, 
    setSearchTerm: (val: string) => void,
    isLoading: boolean
}>({
    advocates: [],
    searchTerm: "",
    setSearchTerm: () => {},
    isLoading: false
});

export const AdvocateProvider = ({ children } : { children: ReactNode }) => {
    const [advocates, setAdvocates] = useState<Advocate[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        const loadAdvocates = async () => {
            setIsLoading(true);
            try {
                const { data } = await fetchAdvocates(signal);
                setAdvocates(data);
            } catch (error) {
                if (error instanceof Error && error.name === 'AbortError') {
                    console.log('Fetch aborted');
                } else {
                    console.error('Error while fetching data: ', error);
                }
            } finally {
                setTimeout(() => {
                    setIsLoading(false);
                }, 1000);
            }
        };
        loadAdvocates();
        return () => controller.abort();
    }, []);

    const debounceSetSearchTerm = _.debounce((value: string) => {
        setSearchTerm(value);
    }, 300);

    return (
        <AdvocateContext.Provider value={{ advocates, searchTerm, setSearchTerm: debounceSetSearchTerm, isLoading }}>
            {children}
        </AdvocateContext.Provider>
    )
};

export const useAdvocates = () => {
    return useContext(AdvocateContext);
}