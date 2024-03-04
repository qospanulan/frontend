// import { useContext } from "react";
// import { UserContext } from "../../user";

const BASE_URL = process.env.REACT_APP_API_URL;

// const {email, token} = useContext(UserContext)
export const getCountriesApi = async () => {
  try {
    const response = await fetch(`${BASE_URL}/countries/`, {
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
    console.error("Error fetching countries:", error);
    throw error;
  }
};

export const createCountryApi = async (newCountry) => {
  try {
    const response = await fetch(`${BASE_URL}/countries/`, {
      method: "POST",
      headers: {
        // Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCountry),
    });

    if (!response.ok) {
      throw new Error(
        "Network response was not ok:" + JSON.stringify(response.statusText)
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating country:", error);
    throw error;
  }
};
