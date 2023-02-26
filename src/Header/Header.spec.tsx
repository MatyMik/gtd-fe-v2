import { customRender } from "../test/test-util";
import { Header } from "./Header";

describe("Header", () => {
  it("renders the header withd the logo", () => {
    const { getByAltText } = customRender(<Header />);
    const logo = getByAltText("Logo");
    expect(logo).toBeInTheDocument();
  });
});