import { useEffect, useMemo, useState } from "react";

export default function useNavigation() {
  const pathname = window.location.pathname;
  const initialHash = useMemo(() => window.location.hash || "#", []);
  const [location, setLocation] = useState(pathname);
  const [hash, setHash] = useState(initialHash.split("#")[1] || "");

  const redirect = (path) => {
    window.location.href = path;
  };

  const changeHash = (hash) => {
    if (location !== "/") redirect(`/#${hash}`);
    else window.location.hash = hash;
  };

  const handleHashChange = (event) => {
    const hash = event.newURL.split("#")[1];
    setHash(hash);
  };

  useEffect(() => {
    setLocation(pathname);
    window.addEventListener("hashchange", handleHashChange);
  }, [pathname, initialHash, hash]);

  return { location, hash, setLocation, changeHash, redirect };
}
