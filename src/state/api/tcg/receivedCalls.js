const BASE_URL = process.env.REACT_APP_API_URL;

export const getReceivedCallsApi = async ({
  token,
  // filterModel,
  paginationModel,
  report,
}) => {
  try {
    const response = await fetch(
      `${BASE_URL}/received-calls/?page=${paginationModel.page}&per_page=${
        paginationModel.pageSize
      }${report.is_xlsx ? "&is_xlsx=true" : "&is_xlsx=false"}${
        report.email ? "&email=" + report.email : ""
      }`,
      // ${
      //   report.is_xlsx && "&email=" + report.email
      // }`,
      //  s${
      // filterModel.items[0].value[0] ? "&start_date=" : "&"
      // }
      // ${filterModel.items[0].value[0]}${
      // filterModel.items[0].value[1] ? "&end_date=" : "&"
      // }
      // ${filterModel.items[0].value[1]}`,

      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": `${
            report.is_xlsx & !report.email
              ? "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              : "application/json"
          }`,
          Accept: `${
            report.is_xlsx & !report.email
              ? "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              : "application/json"
          }`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    if (!report.is_xlsx || report.email) {
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
