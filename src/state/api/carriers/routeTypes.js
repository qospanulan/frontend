// import { useContext } from "react";
// import { UserContext } from "../../user";

const BASE_URL = process.env.REACT_APP_API_URL;

// const { email, token } = useContext(UserContext);
export const getRouteTypesApi = async () => {
  try {
    const response = await fetch(`${BASE_URL}/route-types/`, {
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
    console.error("Error fetching route-types:", error);
    throw error;
  }
};

export const createRouteTypesApi = async (newRouteType) => {
  try {
    const response = await fetch(`${BASE_URL}/route-types/`, {
      method: "POST",
      headers: {
        // Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRouteType),
    });

    if (!response.ok) {
      throw new Error(
        "Network response was not ok:" + JSON.stringify(response.statusText)
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating route-type:", error);
    throw error;
  }
};
