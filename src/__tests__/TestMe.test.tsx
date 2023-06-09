import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("Home", () => {
  it("renders a heading", () => {
    render(<Home />);

    const heading = screen.getByText("Get started by editing");

    expect(heading).toBeInTheDocument();
  });
});
