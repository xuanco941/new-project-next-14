"use client";
import React from "react";
import NotFound from "../not-found/NotFound";

function Home() {
  return (
    // <MainLayout>
    //   <Container maxWidth="lg">
    //     <FlexReverse sx={{ width: "100%", gap: "40px" }}>
    //       <Box>
    //         <iframe src="http://localhost:3004/game?id=4&theme=dark&accessToken=1" className="border-none w-full h-[80vh] sm:h-[70vh] md:h-[85vh]">
    //         </iframe>

    //       </Box>
    //     </FlexReverse>
    //   </Container>
    // </MainLayout>
    <NotFound />
  );
}

export default Home;
