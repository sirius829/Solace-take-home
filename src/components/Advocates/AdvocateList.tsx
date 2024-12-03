import React, { type FC } from "react";

import { Advocate } from "@/types/Advocate";

import AdvocateItem from "./AdvocateItem";

interface AdvocateListProps {
    advocates: Array<Advocate>;
};
const AdvocateList: FC<AdvocateListProps> = ({ advocates }) => (
    <tbody>
        {advocates.map((advocate) => (
            <AdvocateItem key={advocate.id} {...advocate} />
        ))}
    </tbody>
);

export default React.memo(AdvocateList);