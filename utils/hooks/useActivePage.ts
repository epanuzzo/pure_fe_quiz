import { useRouter } from "next/router";

/**
 * Custom hook that provides the current active page and query parameters from the router.
 *
 * @returns An object containing:
 * - `activePage`: The current pathname from the router.
 * - `queryParams`: The current query parameters from the router.
 */
const useActivePage = () => {
  const router = useRouter();
  const activePage = router.pathname;
  const queryParams = router.query;

  return { activePage, queryParams };
};

export default useActivePage;
