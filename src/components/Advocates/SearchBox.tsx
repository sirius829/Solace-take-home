"use client";
import React from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useAdvocates } from "@/contexts/AdvocateContext";

const SearchBox = () => {
    const { isLoading, setSearchTerm } = useAdvocates();

    const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value)
    };

    return (
        <Box className="mb-12">
            <Typography variant="h5" className="mb-2">Search</Typography>
            <TextField
                type="search"
                label="Search"
                placeholder="search"
                size="small"
                onChange={onSearch}
                disabled={isLoading}
            />
        </Box>
    );
};

export default React.memo(SearchBox);