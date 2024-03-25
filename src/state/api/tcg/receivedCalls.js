const BASE_URL = process.env.REACT_APP_API_URL;

export const getReceivedCallsApi = async ({ token, ...params }) => {
  try {
    const queryParams = Object.entries(params)
      .map(([key, value]) => {
        return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
      })
      .join("&");

    const response = await fetch(`${BASE_URL}/received-calls/?${queryParams}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": `${
          params.is_xlsx & !params.email
            ? "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            : "application/json"
        }`,
        Accept: `${
          params.is_xlsx & !params.email
            ? "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            : "application/json"
        }`,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    if (!params.is_xlsx || params.email) {
      return await response.json();
    } else {
      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "report.xlsx";
      document.body.appendChild(a);

      a.click();

      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }
  } catch (error) {
    console.error("Error fetching received calls:", error);
    throw error;
  }
};
