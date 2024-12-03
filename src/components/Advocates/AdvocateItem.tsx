import React, { type FC } from "react";

import { Advocate } from "@/types/Advocate";

const AdvocateItem: FC<Advocate> = (advocate) => (
    <tr>
        <td>{advocate.firstName}</td>
        <td>{advocate.lastName}</td>
        <td>{advocate.city}</td>
        <td>{advocate.degree}</td>
        <td>{advocate.specialties.join(', ')}</td>
        <td>{advocate.phoneNumber}</td>
    </tr>
);

export default React.memo(AdvocateItem);