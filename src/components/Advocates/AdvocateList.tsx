"use client";
import React, { useMemo, useState, type FC } from "react";

import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import CircularProgress from "@mui/material/CircularProgress";
import { Typography } from "@mui/material/Typography";

import AdvocateItem from "./AdvocateItem";

import { useAdvocates } from "@/contexts/AdvocateContext";

const AdvocateList: FC = () => {
    const { advocates, searchTerm, isLoading } = useAdvocates();
    const filteredAdvocates = advocates.filter((advocate) => {
        return (
            advocate.firstName.toLowerCase().includes(searchTerm) ||
            advocate.lastName.toLowerCase().includes(searchTerm) ||
            advocate.city.toLowerCase().includes(searchTerm) ||
            advocate.degree.toLowerCase().includes(searchTerm) ||
            advocate.specialties.some(specialty => specialty.toLowerCase().includes(searchTerm))
        );
    });
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const advocatesOnPage = useMemo(() => {
        return filteredAdvocates.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    }, [page, rowsPerPage, filteredAdvocates]);

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }

    return (
        <Paper>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">First Name</TableCell>
                            <TableCell align="center">Last Name</TableCell>
                            <TableCell align="center">City</TableCell>
                            <TableCell align="center">Degree</TableCell>
                            <TableCell align="center">Specialties</TableCell>
                            <TableCell align="center">Years of Experience</TableCell>
                            <TableCell align="center">Phone Number</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={7} align="center">
                                    <CircularProgress />
                                </TableCell>
                            </TableRow>
                        ) : (advocatesOnPage.length ?
                            advocatesOnPage.map((advocate, index) => (
                                <AdvocateItem key={index} {...advocate} />
                            ))
                            : (
                                <TableRow>
                                    <TableCell colSpan={7} align="center">
                                        No Advocate found!
                                    </TableCell>
                                </TableRow>
                            )
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={advocates.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    )
};

export default React.memo(AdvocateList);