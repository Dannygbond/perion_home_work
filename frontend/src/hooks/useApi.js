export default function useApi() {
  const isDevelopment = process.env.NODE_ENV === "development";

  const getAnalytics = async () => {
    const response = await fetch(
      isDevelopment
        ? "http://localhost:5000/analytics"
        : "https://localhost/api/analytics"
    );
    const data = await response.json();
    return data;
  };

  return {
    getAnalytics,
  };
}
