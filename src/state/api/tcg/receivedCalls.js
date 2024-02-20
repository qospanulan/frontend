const BASE_URL = process.env.REACT_APP_API_URL;

export const getReceivedCallsApi = async ({
  startDate,
  endDate,
  paginationModel,
}) => {
  try {
    const response = await fetch(
      `${BASE_URL}/received-calls/?page=${paginationModel.page}&per_page=${paginationModel.pageSize}`,
      //   ${startDate ? "start_date=" : ""
      //   }${startDate}&${
      // endDate ? "end_date=" : ""
      //   }${endDate}&page=${page}&per_page=${perPage}`,

      {
        method: "GET",
        headers: {
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
