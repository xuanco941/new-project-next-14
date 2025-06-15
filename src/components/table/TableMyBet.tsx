import Loading from "@/components/loading/Loading";
import { useTheme } from "@/providers/theme/ThemeProvider";
import {
  Box,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Flex from "@/components/Flex";
import { formatDateUS, formatNumber } from "@/utils/helpers";
import { useI18n } from "@/locales/clients";
import { PageInfo } from "./TableBet";

interface TableMyBetProps {
  pageInfo: PageInfo;
}


const TableMyBet: React.FC<TableMyBetProps> = ({ pageInfo }) => {
  const { theme, themeName } = useTheme();
  const [loading, setLoading] = useState(true);
  const t = useI18n();
  const cells: string[] = ["Phiên", "Thời gian", "Tiền", "Loại", "Hệ số nhân", "Kết quả", "Trả thưởng"];

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [pageInfo.action, pageInfo.page])
  return (
    <TableContainer
      className="scroll-container1"
      component={Paper}
      sx={{
        maxHeight: { xs: '400px', md: '500px' },
        "&::-webkit-scrollbar": {
          width: "5px",
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: theme.bgSecondary,
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: theme.bgTertiary,
          borderRadius: "8px",
        },
        maskImage: 'linear-gradient(to bottom,  rgba(0, 0, 0, 1) 95%, rgba(0, 0, 0, 0) 100%)'
      }}
    >
      <Table
        stickyHeader
        sx={{
          borderCollapse: "separate",
          borderSpacing: "0 6px",
          backgroundColor: theme.bgSecondary,
          maxHeight: { xs: '400px', md: '500px' },
          paddingBottom: "0px"
        }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow sx={{ height: '40px' }}>
            {cells.map((item, index) => {
              return (<TableCell
                key={item}
                align={index == 0 ? "left" : index == cells.length - 1 ? "right" : "center"}
                sx={{
                  textWrap: "nowrap",
                  background: theme.bgTertiary,
                  borderRadius: index == 0 ? "5px 0px 0px 5px" : index == cells.length - 1 ? "0px 5px 5px 0px" : "0px",
                }}
              >
                <Box
                  sx={{
                    fontWeight: "600",
                    whiteSpace: "nowrap",
                    color: theme.fgSecondary,
                    fontSize: { xs: "13px", md: "14px" }
                  }}
                >
                  {item}
                </Box>
              </TableCell>);
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow sx={{ backgroundColor: theme.bgSecondary }}>
              <TableCell colSpan={cells.length} align="center">
                <Grid justifyContent="center">
                  <Loading />
                </Grid>
              </TableCell>
            </TableRow>
          ) : (
            <>
              {pageInfo.data.map((item, index) => (
                <TableRow
                  key={index}
                  sx={{
                    background: theme.bgSecondary,
                    "&:hover": { background: theme.bgColorPrimary },
                    transition: "0.2s",
                    borderTop: themeName == "dark" ? "1px solid rgba(255,255,255,0.03)" : `1px solid rgba(0,0,0,0.1)`
                  }}
                >
                  <TableCell
                    sx={{
                      borderRadius: "0px",
                    }}
                  >
                    <Box sx={{ fontWeight: "600", color: theme.fgPrimary }}>
                      1
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        fontWeight: "600",
                        color: theme.fgPrimary,
                        textAlign: "center",
                      }}
                    >
                      2001-09-09
                    </Box>
                  </TableCell>
                  <TableCell>

                    <Flex sx={{ justifyContent: "center", gap: "6px" }}>

                      <Box
                        sx={{ fontWeight: "600", color: theme.colorPrimary }}
                      >
                        {formatNumber(10000)}
                      </Box>
                    </Flex>

                  </TableCell>
                  <TableCell>

                    <Flex sx={{ justifyContent: "center", gap: "6px" }}>

                      <Box
                        sx={{ fontWeight: "600", color: theme.fgPrimary }}
                      >
                        Cửa dưới

                      </Box>
                    </Flex>

                  </TableCell>
                  <TableCell>

                    <Flex sx={{ justifyContent: "center", gap: "6px" }}>

                      <Box
                        sx={{ fontWeight: "600", color: theme.fgPrimary }}
                      >
                        5x

                      </Box>
                    </Flex>

                  </TableCell>
                  <TableCell>


                    <div className="flex justify-center">
                      <Box
                        sx={{
                          fontWeight: "600",
                          background: 1 > 0 ? 'rgba(114, 242, 56, 0.12)' : theme.bgTertiary,
                          color: 1 > 0 ? theme.colorSuccess : theme.fgTertiary,
                          padding: "4px 10px",
                          borderRadius: "6px",
                          border: 1 > 0 ? `1px solid ${theme.colorSuccess}` : `1px solid #61646C`,
                          width: "fit-content",
                          textAlign: "center"
                        }}
                      >
                        100
                      </Box>
                    </div>
                  </TableCell>


                  <TableCell >

                    <Flex sx={{ justifyContent: "end", gap: "6px" }}>

                      <Box
                        sx={{ fontWeight: "600", color: 1 > 0 ? theme.colorSuccess : theme.fgPrimary }}
                      >
                        {formatNumber(1)}
                      </Box>
                    </Flex>

                  </TableCell>

                </TableRow>
              ))}
            </>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default React.memo(TableMyBet);