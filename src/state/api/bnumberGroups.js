const BASE_URL = process.env.REACT_APP_API_URL;

export const getBnumberGroupsApi = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/bnumber-groups/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching bnumber groups:", error);
    throw error;
  }
};

// Dont work
export const createBnumberGroupApi = async (newBnumberGroup) => {
  try {
    const response = await fetch(`${BASE_URL}/bnumber-groups/`, {
      method: "POST",
      // headers: {
      // "Content-Type": "application/json",
      // Authorization: `Bearer ${token}`,
      // },
      // body: JSON.stringify(newBnumberGroup),
      body: newBnumberGroup,
    });

    if (!response.ok) {
      throw new Error(
        "Network response was not ok:" + JSON.stringify(response.statusText)
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating bnumber group:", error);
    throw error;
  }
};
