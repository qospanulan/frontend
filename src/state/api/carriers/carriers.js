// import { useContext } from "react";
// import { UserContext } from "../../user";

const BASE_URL = process.env.REACT_APP_API_URL;

// const {email, token} = useContext(UserContext)
export const getCarriersApi = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/carriers/`, {
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
    console.error("Error fetching carriers:", error);
    throw error;
  }
};

export const createCarrierApi = async (newCarrier) => {
  try {
    const response = await fetch(`${BASE_URL}/carriers/`, {
      method: "POST",
      headers: {
        // Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCarrier),
    });

    if (!response.ok) {
      throw new Error(
        "Network response was not ok:" + JSON.stringify(response.statusText)
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating carrier:", error);
    throw error;
  }
};
