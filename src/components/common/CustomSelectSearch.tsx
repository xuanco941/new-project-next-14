import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  Box,
  FormControl,
  MenuItem,
  Popper,
  Paper,
  ClickAwayListener,
  IconButton,
  SxProps,
  Theme,
  styled,
  Fade,
  Grid,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CustomInput from "./input/CustomInput";
import CustomText from "./text/CustomText";
import { useTheme } from "@/providers/theme/ThemeProvider";
import { removeVietnameseTones } from "@/utils/helpers";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Flex from "./Flex";
import FlexReverse from "./FlexReverse";

type TextMenuItem = React.ComponentPropsWithRef<typeof MenuItem> & {
  sx?: SxProps<Theme>;
};

type CustomSelectProps = {
  list: any[];
  value: string;
  handleChange: (value: string) => void;
  renderValue: (value: string) => React.ReactNode;
  renderListItem: (
    item: any,
    value: string,
    handleSelectChange: (value: string) => void
  ) => React.ReactNode;
  renderListByValueSearch: (valueSearch: string) => string[];
  hoverBorder?: string;
  borderColor?: string;
  sx?: SxProps<Theme>;
  sxChosse?: SxProps<Theme>;
};

const CustomSelectSearch: React.FC<CustomSelectProps> = ({
  handleChange,
  list,
  value,
  renderValue,
  renderListItem,
  renderListByValueSearch,
  hoverBorder,
  borderColor,
  sx,
  sxChosse,
}) => {
  const [open, setOpen] = useState(false);
  const { theme } = useTheme();
  const [valueSearch, setValueSearch] = useState("");
  const [newList, setNewList] = useState<any>([]);
  const anchorRef = useRef<HTMLDivElement | null>(null);
  const handleSelectChange = (value: string) => {
    // setValue(value);
    handleChange(value);
    setValueSearch("");
    setOpen(false);
  };

  const handleClickAway = (event: MouseEvent | TouchEvent) => {
    if (
      anchorRef.current &&
      !anchorRef.current.contains(event.target as Node)
    ) {
      setOpen(false);
    }
  };

  const handleValueSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const searchText = removeVietnameseTones(event.target.value);
      setValueSearch(searchText);
    },
    []
  );

  useEffect(() => {
    // console.log('valueSearch', valueSearch);
    const res = renderListByValueSearch(valueSearch);
    setNewList(res);
    // eslint-disable-next-line
  }, [valueSearch]);
  useEffect(() => {
    // console.log('list',list)
    setNewList(list);
  }, [list]);

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box ref={anchorRef} sx={{ width: "100%", position: "relative" }}>
        <FormControl fullWidth>
          <Box
            // onClick={handleOpen}
            onClick={() => setOpen(!open)}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 12px",
              background: theme.bgDefault,
              border: `1px solid ${borderColor || theme.borderColorPrimary}`,
              borderRadius: "8px",
              cursor: "pointer",
              "&:hover": { borderColor: hoverBorder || theme.borderColorPrimary },
              height: "40px",
              boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
              ...sx,
            }}
          >
            {renderValue(value)}
            <IconButton sx={{ color: theme.fgTertiary }}>
              <ChevronLeftIcon
                sx={{
                  transition: "0.25s",
                  transform: open ? "rotate(90deg)" : "rotate(-90deg)",
                }}
              />
            </IconButton>
          </Box>
        </FormControl>

        <Popper
          open={open}
          anchorEl={anchorRef.current}
          placement="bottom-start"
          sx={{
            zIndex: 999999,
          }}
          transition
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={150}>
              <Paper
                sx={{
                  width: anchorRef.current
                    ? anchorRef.current.clientWidth
                    : undefined,
                  marginTop: "6px",
                  overflow: "hidden",
                  boxShadow: 6,
                  outline: "none",
                  transition: ".15s",
                  borderRadius: "8px",
                  border: `1px solid ${theme.borderColorPrimary}`,
                  background: theme.bgDefault,
                }}
              >
                {/* Ô tìm kiếm trong dropdown */}
                <Grid
                  sx={{
                    padding: "8px",
                    background: theme.bgDefault,
                    borderBottom: `1px solid ${theme.borderColorPrimary}`,
                    position: "sticky",
                    top: "0px",
                    zIndex: 10,
                  }}
                >
                  <CustomInput
                    value={valueSearch}
                    onChange={handleValueSearchChange}
                    placeholder="Tìm kiếm..."
                    startAdornment={
                      <Flex sx={{ paddingRight: "6px" }}>
                        <SearchIcon style={{ width: "18px" }} />
                      </Flex>
                    }
                    onClick={(event: any) => event.stopPropagation()} // Ngăn chặn sự kiện click để tránh đóng Popper
                    sx={{
                      width: "100%",
                      borderRadius: "4px",
                      "& .MuiInputBase-input": {
                        padding: "8px",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "none", // Đặt màu border khi hover
                      },
                      ".Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "red",
                      },
                      ".MuiInputBase-root .Mui-focused fieldset": {
                        borderColor: "none",
                      },
                    }}
                  />
                </Grid>
                <FlexReverse
                  sx={{
                    width: "100%",
                    maxHeight: "400px",
                    overflow: "auto",
                    padding: "6px",
                    background: theme.bgDefault,
                    ...sxChosse,
                  }}
                >
                  {/* Danh sách item */}
                  {newList.length > 0 ? (
                    newList.map((item: any) =>
                      renderListItem(item, value, handleSelectChange)
                    )
                  ) : (
                    <ListSelect disabled>
                      <CustomText color="textSecondary">
                        Không tìm thấy kết quả
                      </CustomText>
                    </ListSelect>
                  )}
                </FlexReverse>
              </Paper>
            </Fade>
          )}
        </Popper>
      </Box>
    </ClickAwayListener>
  );
};

export default CustomSelectSearch;

export const ListSelect: React.FC<TextMenuItem> = ({ children, ...props }) => {
  const { theme } = useTheme();
  const CustomMenuItem = styled(MenuItem)({
    background: theme.bgDefault,
    borderRadius: "8px",
    padding: "10px 12px",
    "&:last-child": {
      marginBottom: "0", // Không cách option cuối cùng
    },
    "&:hover": {
      background: theme.bgTertiary,
    },
  });
  return <CustomMenuItem {...props}>{children}</CustomMenuItem>;
};
