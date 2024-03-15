const BASE_URL = process.env.REACT_APP_API_URL;

export const getReceivedCallsApi = async ({
  token,
  filterModel,
  paginationModel,
  report,
}) => {
  try {
    const response = await fetch(
      `${BASE_URL}/received-calls/?page=${paginationModel.page}&per_page=${
        paginationModel.pageSize
      }${report.is_xlsx ? "&is_xlsx=true&email=" + report.email : "&"}${
        filterModel.items[0].value[0] ? "&start_date=" : "&"
      }${filterModel.items[0].value[0]}${
        filterModel.items[0].value[1] ? "&end_date=" : "&"
      }${filterModel.items[0].value[1]}`,

      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching received calls:", error);
    throw error;
  }
};
