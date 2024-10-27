import useActivePage from "./useActivePage";
import { useRouter } from "next/router";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("useActivePage", () => {
  it("should return the active page and query parameters", () => {
    const mockRouter = {
      pathname: "/test-page",
      query: { id: "123" },
    };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    const result = useActivePage();

    expect(result.activePage).toBe("/test-page");
    expect(result.queryParams).toEqual({ id: "123" });
  });

  it("should return empty query parameters if none are present", () => {
    const mockRouter = {
      pathname: "/another-page",
      query: {},
    };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    const result = useActivePage();

    expect(result.activePage).toBe("/another-page");
    expect(result.queryParams).toEqual({});
  });
});
