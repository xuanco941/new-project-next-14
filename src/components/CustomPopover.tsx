import { Box, ClickAwayListener, Fade, FormControl, Paper, Popper } from '@mui/material';
import React, { Dispatch, ReactNode, SetStateAction, useEffect, useRef, useState } from 'react';
import { useTheme } from '@/providers/theme/ThemeProvider';

interface Props {
  children: ReactNode;
  title: ReactNode;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  palace?:
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'right'
  | 'right-start'
  | 'right-end'
  | 'left'
  | 'left-start'
  | 'left-end';
  overflow?: string;

}

const CustomPopover: React.FC<Props> = ({ children, title, open, setOpen, palace = 'bottom-end', overflow }) => {
  const { theme } = useTheme()
  // const [open, setOpen] = useState(false);

  // useEffect(() => {
  //   if (setIsOpen) {
  //     setIsOpen(open);
  //   }
  //   // eslint-disable-next-line
  // }, [open]);

  const anchorRef = useRef<HTMLDivElement | null>(null);

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickAway = (event: MouseEvent | TouchEvent) => {
    if (anchorRef.current && !anchorRef.current.contains(event.target as Node)) {
      handleClose();
    }
  };



  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box ref={anchorRef} sx={{ width: 'fit-content', position: 'relative' }}>
        {/* btn */}
        <FormControl fullWidth>
          <Box onClick={() => setOpen(!open)}>
            {title}

          </Box>
        </FormControl>

        {/* content */}

        <Popper
          open={open}
          anchorEl={anchorRef.current}
          placement={palace}
          sx={{
            zIndex: 999999,
            borderRadius: '8px',
          }}
          transition
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={150}>
              <Paper
                sx={{
                  // width: anchorRef.current ? anchorRef.current.clientWidth : undefined,
                  width: anchorRef.current ? 'fit-content' : undefined,
                  maxHeight: '400px',
                  overflow: overflow ?? 'auto',
                  border: `1px solid ${theme.borderColorPrimary}`,
                  background: theme.bgDefault,
                  boxShadow: 6,
                  outline: 'none',
                  transition: '.15s',
                  marginTop: '10px',
                  borderRadius: '16px'
                }}
              >
                {children}
              </Paper>
            </Fade>
          )}
        </Popper>
      </Box>
    </ClickAwayListener>
  );
};

export default CustomPopover;
