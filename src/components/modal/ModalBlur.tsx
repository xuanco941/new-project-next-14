'use client'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import React from 'react';
import { useTheme } from '@/providers/theme/ThemeProvider';

interface ModalBlurProps {
  open: boolean;
  handleClose: () => void;
  children: React.ReactNode;
  top?: string;
  left?: string;
  transform?: string;
  boxShadow?: any;
  blur?: number;
}

const ModalBlur: React.FC<ModalBlurProps> = ({ open, handleClose, children, top, left, transform, boxShadow, blur }) => {
  const { themeName } = useTheme();
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-hidden="true"
      sx={{
        width: "100dvw",
        height: '100dvh',
        '& .MuiModal-backdrop': {
          backgroundColor: themeName == "dark" ? 'rgba(255, 255, 255, 0.1)' : "rgba(0, 0, 0, 0.5)",
          maxHeight: '100dvh', outline: 0, backdropFilter: `blur(${blur ?? 8}px)`
        }
      }}
      disablePortal={true}
    // disableRestoreFocus={false}
    // disableScrollLock={true}
    >
      <Box
        component={'div'}
        aria-modal='true'
        sx={{
          position: 'absolute',
          top: top ?? '50%',
          left: left ?? '50%',
          transform: transform ?? 'translate(-50%, -50%)',
          boxShadow: boxShadow ?? 24,
          outline: 'none',
          borderRadius: { xs: "8px", md: "12px" }
        }}>
        {children}
      </Box>
    </Modal>
  );
}

export default ModalBlur;