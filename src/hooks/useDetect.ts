import { useMediaQuery } from "@mui/material";

const useDetect = () => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const isTablet = useMediaQuery("(min-width:600px) and (max-width:1024px)");
  const isDesktop = useMediaQuery("(min-width:1025px)");
  return { isMobile, isTablet, isDesktop };
};

export default useDetect;
