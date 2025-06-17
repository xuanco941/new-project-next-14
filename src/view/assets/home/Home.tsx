"use client";
import React from "react";
import MainLayout from "@/layout/MainLayout";
import { Box, Container } from "@mui/material";
import FlexReverse from "@/components/common/FlexReverse";

function Home() {
  return (
      <Container maxWidth="lg">
        <FlexReverse sx={{ width: "100%", gap: "40px" }}>
          <Box>
            abcd

          </Box>
        </FlexReverse>
      </Container>
  );
}

export default Home;
