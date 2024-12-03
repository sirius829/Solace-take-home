import React, { type FC } from "react";

import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Stack from "@mui/material/Stack";

import Specialty from "./Specialty";

import { Advocate } from "@/types/Advocate";

const AdvocateItem: FC<Advocate> = (advocate) => (
    <TableRow>
        <TableCell align="center">{advocate.firstName}</TableCell>
        <TableCell align="center">{advocate.lastName}</TableCell>
        <TableCell align="center">{advocate.city}</TableCell>
        <TableCell align="center">{advocate.degree}</TableCell>
        <TableCell>
            <Stack flexDirection="row" gap={1} flexWrap="wrap">
                {advocate.specialties.map((specialty, index) => (
                    <Specialty
                        key={`${advocate.firstName}-${advocate.lastName}-specialty-${index}`}
                        tag={specialty}
                    />
                ))}
            </Stack>
        </TableCell>
        <TableCell align="center">{advocate.yearsOfExperience} {advocate.yearsOfExperience > 1 ? 'yrs' : 'yr'}</TableCell>
        <TableCell align="center">{advocate.phoneNumber}</TableCell>
    </TableRow>
);

export default React.memo(AdvocateItem);