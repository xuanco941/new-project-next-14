"use client";

import { SxProps, Theme } from "@mui/material";
import SvgIcon from "@mui/material/SvgIcon";

interface IconProps {
  color?: string;
  sx?: SxProps<Theme>;
  className?: string;
}

export function HomeIcon({ color, sx }: IconProps) {
  return (
    <SvgIcon sx={sx}>
      <svg
        width="24"
        height="25"
        viewBox="0 0 24 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.5 21V16.5C9.5 15.119 10.619 14 12 14V14C13.381 14 14.5 15.119 14.5 16.5V21H20V12.414C20 11.884 19.789 11.375 19.414 11L12.707 4.293C12.316 3.902 11.683 3.902 11.293 4.293L4.586 11C4.211 11.375 4 11.884 4 12.414V21H9.5Z"
          stroke={color || "currentColor" || "#94969C"}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SvgIcon>
  );
}

