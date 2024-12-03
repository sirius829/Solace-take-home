import React, { type FC } from "react";

import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

import { Advocate } from "@/types/Advocate";

const AdvocateItem: FC<Advocate> = (advocate) => (
    <TableRow>
        <TableCell>{advocate.firstName}</TableCell>
        <TableCell>{advocate.lastName}</TableCell>
        <TableCell>{advocate.city}</TableCell>
        <TableCell>{advocate.degree}</TableCell>
        <TableCell>{advocate.specialties.join(', ')}</TableCell>
        <TableCell>{advocate.yearsOfExperience}</TableCell>
        <TableCell>{advocate.phoneNumber}</TableCell>
    </TableRow>
);

export default React.memo(AdvocateItem);