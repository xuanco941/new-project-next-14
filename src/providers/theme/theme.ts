// theme.ts
export interface Theme {
  bgDefault: string;
  bgSecondary: string;
  bgTertiary: string;
  fgPrimary: string;
  fgSecondary: string;
  fgTertiary: string;
  colorPrimary: string;
  bgColorPrimary: string;
  borderColorPrimary: string;
  colorSuccess: string;
  bgColorSuccess: string;
  borderColorSuccess: string;  
  colorDanger: string;
  bgColorDanger: string;
  borderColorDanger: string;
  borderComponent: string;
  colorPurple: string;
  bgColorPurple: string;
  bgGreenLinear: string;
  bgPurpleLinear: string;
  bgBlueLinear: string;
  bgRedLinear: string;
  bgYellowLinear: string;
}

export const themes: { [key: string]: Theme } = {
  light: {
    bgDefault: "#ffffff", //1
    bgSecondary: "#e9e6e6", //2
    bgTertiary: "#ffffff", //3
    fgPrimary: "#181d27",
    fgSecondary: "#3b404a",
    fgTertiary: "#535862",
    colorSuccess: "#0ac779",
    bgColorSuccess: "#19302e",
    borderColorSuccess: "#bdf3d3",
    colorDanger: "#F18C85",
    bgColorDanger: "#2e242c",
    borderColorDanger: "#fed7d4",
    colorPrimary: "#368bff",
    bgColorPrimary: "#eff8ff",
    borderColorPrimary: "#c9e7ff",
    borderComponent: "#bfc5cb",
    colorPurple: "#5925DC",
    bgColorPurple: "#f4f3ff",
    bgGreenLinear: "linear-gradient(180deg, rgba(0,203,119,1) 26.86%, rgba(17, 107, 70, 1) 81.02%)",
    bgPurpleLinear: "linear-gradient(180deg, #7a5af8 26.86%, #4327ae 81.02%)",
    bgBlueLinear: "linear-gradient(180deg, #368bff 26.86%, #144fa0 81.02%)",
    bgRedLinear: "linear-gradient(180deg, rgb(210 7 7) 26.86%, rgb(150 7 34) 81.02%)",
    bgYellowLinear: "linear-gradient(180deg, rgb(229 211 7) 26.86%, rgb(120 120 14) 83.02%)",

  },
  dark: {
    bgDefault: "#0a0d12", //1
    bgSecondary: "#181d27", //2
    bgTertiary: "#232831", //3
    fgPrimary: "#F5F5F6",
    fgSecondary: "#CECFD2",
    fgTertiary: "#94969C",
    colorSuccess: "#22EE99",
    bgColorSuccess: "#19302e",
    borderColorSuccess: "#bdf3d3",
    colorDanger: "#F18C85",
    bgColorDanger: "#2e242c",
    borderColorDanger: "#fed7d4",
    colorPrimary: "#368bff",
    bgColorPrimary: "#1c273b",
    borderColorPrimary: "#1e2c46",
    borderComponent: "#333741",
    colorPurple: "#9B8AFB",
    bgColorPurple: "#25283c",
    bgGreenLinear: "linear-gradient(180deg, rgba(0,203,119,1) 26.86%, rgba(17, 107, 70, 1) 81.02%)",
    bgPurpleLinear: "linear-gradient(180deg, #7a5af8 26.86%, #4327ae 81.02%)",
    bgBlueLinear: "linear-gradient(180deg, #368bff 26.86%, #144fa0 81.02%)",
    bgRedLinear: "linear-gradient(180deg, rgb(210 7 7) 26.86%, rgb(150 7 34) 81.02%)",
    bgYellowLinear: "linear-gradient(180deg, rgb(229 211 7) 26.86%, rgb(120 120 14) 83.02%)",

  },
};
