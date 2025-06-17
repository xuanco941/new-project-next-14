import { styled, Tab, Tabs } from "@mui/material";

export const CustomTabs = styled(Tabs)({
  "& .MuiTabs-indicator": {
    background: "linear-gradient(220deg, #FDEA12 26.86%, #F5F500 81.02%)",
    height: "2px",
  },
  "& .MuiTabs-scrollButtons": {
    color: "#94969C",
  },
  ".MuiTabs-scrollButtons.Mui-disabled": {
    opacity: 0.3,
  },
});

export const CustomTab = styled(Tab)({
  textTransform: "none",
  color: "#FCFCF9",
  fontSize: "14px",
  fontFamily: "Archivo",
  minWidth: "auto",
  fontWeight: "700",
  whiteSpace:'nowrap',
  //   "&:hover": {
  //     background: "linear-gradient(180deg, rgba(255, 247, 62, 0.02) 0%, #FFF73E 100%)",
  //         opacity:' 0.16'
  //   },
  "&.Mui-selected": {
    color: "#FCFCF9",
    background: "linear-gradient(to bottom ,#0c111d, #42411e)",
  },
});
