import React, { memo, useRef, useState } from "react";
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
} from "@mui/material";
import { useTheme } from "@/providers/theme/ThemeProvider";
import FlexReverse from "./FlexReverse";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

type TextMenuItem = React.ComponentPropsWithRef<typeof MenuItem> & {
  sx?: SxProps<Theme>;
};

type CustomSelectProps = {
  list: any[];
  value: number;
  handleChange: (value: number) => void;
  renderValue: (value: number) => React.ReactNode;
  renderListItem: (
    item: any,
    value: number,
    handleSelectChange: (value: number) => void
  ) => React.ReactNode;
  hoverBorder?: string;
  borderColor?: string;
  sx?: SxProps<Theme>;
  sxChosse?: SxProps<Theme>;
};

const CustomSelectNumber: React.FC<CustomSelectProps> = ({
  handleChange,
  list,
  value,
  renderValue,
  renderListItem,
  hoverBorder,
  borderColor,
  sx,
  sxChosse,
}) => {
  const [open, setOpen] = useState(false);
  const { theme } = useTheme();

  const anchorRef = useRef<HTMLDivElement | null>(null);

  const handleSelectChange = (value: number) => {
    handleChange(value);
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
              boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
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
                <FlexReverse
                  sx={{
                    width: "100%",
                    maxHeight: "400px",
                    overflow: "auto",
                    padding: "6px",
                    gap: "6px",
                    background: theme.bgDefault,
                    ...sxChosse,
                  }}
                >
                  {list.length > 0 &&
                    list.map((item) =>
                      renderListItem(item, value, handleSelectChange)
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

export default memo(CustomSelectNumber);

export const ListSelect: React.FC<TextMenuItem> = ({ children, ...props }) => {
  const { theme } = useTheme();
  const CustomMenuItem = styled(MenuItem)({
    background: theme.bgDefault,
    borderRadius: "8px",
    padding: "10px 12px",
    "&:last-child": {
      marginBottom: "0",
    },
    "&:hover": {
      background: theme.bgTertiary,
      // color: `${theme.cardForeground} !important`,
    },
  });
  return <CustomMenuItem {...props}>{children}</CustomMenuItem>;
};
