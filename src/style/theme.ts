export const theme: ThemeType = {
  colors: {
    primary: {
      opacity: (opacity = 1) => `rgba(52, 143, 235, ${opacity})`,
      backgroundGradient: "#104173"
    },
    white: "#ffffff",
    grey: "rgb(105,105,105)",
    black: "black"
  },
  sizes: {
    md: "1.5rem"
  },
  svg: {
    width: "2rem",
    height: "2rem"
  }
};

export type ThemeType = {
  colors: {
    [color: string]:
      | {
      opacity: (opacity?: number) => string;
      backgroundGradient: string;
    }
      | string;
  };
  sizes: { [size: string]: string };
  svg: {
    width: string;
    height: string;
  }
};
