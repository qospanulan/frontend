const BASE_URL = process.env.REACT_APP_API_URL;

export const getCliRangesApi = async () => {
  try {
    const response = await fetch(`${BASE_URL}/cli-ranges/`, {
      method: "GET",
      headers: {
        // Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching CliRanges:", error);
    throw error;
  }
};

export const createCliRangesApi = async (
  newCarrierId,
  prefix,
  newCliRanges
) => {
  try {
    const response = await fetch(`${BASE_URL}/cli-ranges/`, {
      method: "POST",
      headers: {
        // Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        carrier_id: newCarrierId,
        prefix: prefix,
        ranges: newCliRanges,
      }),
    });

    if (!response.ok) {
      throw new Error(
        "Network response was not ok:" + JSON.stringify(response.statusText)
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating CliRanges:", error);
    throw error;
  }
};
