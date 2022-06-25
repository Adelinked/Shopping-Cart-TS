import { render, screen } from "@testing-library/react";
import AboutPage from "../../pages/about";
describe("Test pages", () => {
  test("Test about page", () => {
    render(<AboutPage />);
    const heading = screen.getByRole("heading", {
      name: /about/i,
    });
    const homeLink = screen.getByTestId("gohome");
    expect(heading).toBeInTheDocument();
    expect(homeLink).toBeInTheDocument();
  });
});
