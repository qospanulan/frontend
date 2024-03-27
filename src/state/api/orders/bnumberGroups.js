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

export const getBnumberGroupNumbersApi = async (token, id) => {
  try {
    const response = await fetch(
      `${BASE_URL}/bnumber-groups/bnumbers/?` +
        new URLSearchParams({
          bnumber_group_id: id,
        }).toString(),
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
    console.error("Error fetching bnumber groups:", error);
    throw error;
  }
};

// export const getBnumberGroupsNumbersApi = async (id, token) => {
//   try {
//     const response = await fetch(
//       `${BASE_URL}/bnumber-groups/bnumbers` +
//         new URLSearchParams({
//           bnumber_group_id: id,
//         }).toString(),
//       {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }

//     return await response.json();
//   } catch (error) {
//     console.error("Error fetching bnumber groups:", error);
//     throw error;
//   }
// };

export const deleteBnumberGroupsApi = async (id, token) => {
  try {
    const response = await fetch(
      `${BASE_URL}/bnumber-groups/?` +
        new URLSearchParams({
          bnumber_group_id: id,
        }).toString(),
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        params: {},
      }
    );

    if (!response.ok) {
      // throw new Error("Network response was not ok");
      return false;
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching bnumber groups:", error);
    throw error;
  }
};

export const createBnumberGroupApi = async (newBnumberGroup, token) => {
  try {
    const response = await fetch(`${BASE_URL}/bnumber-groups/`, {
      method: "POST",
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: newBnumberGroup,
    });

    if (!response.ok) {
      return false;
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating bnumber group:", error);
    throw error;
  }
};
