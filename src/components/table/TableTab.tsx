import Flex from "@/components/Flex";
import FlexReverse from "@/components/FlexReverse";
import { useTheme } from "@/providers/theme/ThemeProvider";
import { Box, Button } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import TableMyBet from "./TableData";
import CustomButton from "@/components/button/CustomButton";
import { useI18n } from "@/locales/clients";
import TableTheme from "./TableTheme";

export interface PageInfo {
  page: number,
  pageSize: number,
  totalPage: number,
  action: number,
  data: []
}



const TableTab = ({ pageInfo, setPageInfo }: { pageInfo: PageInfo, setPageInfo: Dispatch<SetStateAction<PageInfo>> }) => {

  const { theme } = useTheme();
  const t = useI18n();
  const dataMenu = [
    {
      action: 0,
      name: "Tất cả"
    },
    {
      action: 1,
      name: "Đang chờ xổ"
    },
  ];

  return (
    <FlexReverse sx={{ width: "100%", gap: "20px", borderRadius: "12px", padding: { xs: "16px 16px 16px 16px", lg: "20px 20px 20px 20px" }, backgroundColor: theme.bgSecondary }}>
      <Flex>
        <Box sx={{ fontWeight: "700", color: theme.fgPrimary, fontSize: { xs: "15px", md: "16px" } }}>Lịch sử</Box>

        {/* <CustomInput value={pageInfo.date} type="date" handleChange={(e) => { setPageInfo((prev) => ({ ...prev, date: e.target.value })) }} sx={{ width: "130px", borderColor: theme.borderComponent }} /> */}

      </Flex>
      {/* <Flex sx={{ flexDirection: { xs: 'column', sm: 'row' }, gap: '8px', alignItems: { xs: 'flex-start', sm: 'center' } }} >
        <Flex sx={{ gap: "6px", flexWrap: 'wrap', justifyContent: 'start' }}>
          {dataMenu.map((item) => (
            <Button
              onClick={() => { setPageInfo((prev) => ({ ...prev, action: item.action, page: 1 })) }}
              key={item.action}
              sx={{
                background:
                  pageInfo.action == item.action ? theme.bgColorPrimary : "transparent",
                color:
                  pageInfo.action == item.action ? theme.colorPrimary : theme.fgTertiary,
                borderRadius: "8px",
              }}
            >
              <CustomText fw="400" sx={{ color: "inherit", textTransform: "none", fontSize: { xs: "11px", md: "13px" } }}>
                {item.name}
              </CustomText>
            </Button>
          ))}
        </Flex>
      </Flex> */}
      <TableTheme ><TableMyBet pageInfo={pageInfo} /></TableTheme>
      <Flex sx={{ alignItems: "center" }}>
        <Box sx={{ fontSize: { xs: "12px", color: theme.fgPrimary } }}>Trang {pageInfo.page} / {pageInfo.totalPage}</Box>
        <Flex sx={{ gap: "6px" }}>
          <CustomButton disabled={pageInfo.page <= 1} onClick={() => {
            setPageInfo((prev) => ({ ...prev, page: prev.page <= 1 ? 1 : prev.page - 1 }))
          }} isOutLine sx={{ borderColor: theme.borderComponent, height: "35px", minHeight: "35px", fontSize: "12px", fontWeight: "700", color: theme.fgPrimary }}>Trước</CustomButton>
          <CustomButton disabled={pageInfo.page >= pageInfo.totalPage} onClick={() => {
            setPageInfo((prev) => ({ ...prev, page: prev.page >= prev.totalPage ? prev.totalPage : prev.page + 1 }))
          }} isOutLine sx={{ borderColor: theme.borderComponent, height: "35px", minHeight: "35px", fontSize: "12px", fontWeight: "700", color: theme.fgPrimary }}>Sau</CustomButton>
        </Flex>
      </Flex>
    </FlexReverse>
  );
}

export default TableTab;
