import React from "react";

import Typography from "@mui/material/Typography";

import AdvocateList from "@/components/Advocates/AdvocateList";
import SearchBox from "@/components/Advocates/SearchBox";

export default function Home() {

  return (
    <main className="m-6">
      <Typography variant="h1" className="text-center mb-6">Solace Advocates</Typography>
      <SearchBox />
      <AdvocateList />
    </main>
  );
}
