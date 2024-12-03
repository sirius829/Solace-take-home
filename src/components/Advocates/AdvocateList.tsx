import React, { type FC } from "react";

import { Advocate } from "@/types/Advocate";

import AdvocateItem from "./AdvocateItem";
import { useAdvocates } from "@/contexts/AdvocateContext";

const AdvocateList: FC = () => {
    const advocates = useAdvocates();
    return (
        <table>
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>City</th>
                    <th>Degree</th>
                    <th>Specialties</th>
                    <th>Years of Experience</th>
                    <th>Phone Number</th>
                </tr>
            </thead>
            <tbody>
                {advocates?.map((advocate, index) => (
                    <AdvocateItem key={index} {...advocate} />
                ))}
            </tbody>
        </table>

    )
};

export default React.memo(AdvocateList);