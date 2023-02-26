import { render } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { theme } from "../style/theme";

const AllTheProviders = ({ children }) =>
  <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>;


const customRender = (ui: any, options?: any) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender };