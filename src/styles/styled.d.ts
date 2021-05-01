import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    title: string;
    colors: {
      white: string;
      gray50: string;
      gray100: string;
      gray200: string;
      gray500: string;
      gray800: string;
      green500: string;
      purpleDark: string;
      purple300: string;
      purple400: string;
      purple500: string;
      purple800: string;
    };
  }
}
