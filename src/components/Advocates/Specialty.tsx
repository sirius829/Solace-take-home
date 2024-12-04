import { type FC } from "react";

import Chip from "@mui/material/Chip";

const Specialty: FC<{ tag: string }> = ({ tag }) => (
    <Chip component="span" label={tag} />
);

export default Specialty;