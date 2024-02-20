// import { useContext } from "react";
// import { UserContext } from "../../user";

const BASE_URL = process.env.REACT_APP_API_URL;

// const {email, token} = useContext(UserContext)
export const getCallTypesApi = async () => {
  try {
    const response = await fetch(`${BASE_URL}/call-types`, {
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
    console.error("Error fetching call-types:", error);
    throw error;
  }
};

export const createCallTypeApi = async (newCallType) => {
  try {
    const response = await fetch(`${BASE_URL}/call-types`, {
      method: "POST",
      headers: {
        // Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCallType),
    });

    if (!response.ok) {
      throw new Error(
        "Network response was not ok:" + JSON.stringify(response.statusText)
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating call-type:", error);
    throw error;
  }
};
