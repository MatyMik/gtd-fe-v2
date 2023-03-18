import { render } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { theme } from "../style";
import { Provider } from "react-redux";
import { store } from "../store";
import { ReactNode } from "react";

const AllTheProviders = ({ children }: { children: ReactNode | ReactNode[] }) =>
  <ThemeProvider theme={theme}>
    <Provider store={store()}>
      {children}
    </Provider>
  </ThemeProvider>;


const customRender = (ui: any, options?: any) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender };