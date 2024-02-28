const BASE_URL = process.env.REACT_APP_API_URL;

export const getCurrentUser = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/users/me/`, {
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
    console.error("Error fetching call-types:", error);
    throw error;
  }
};

// export const getTokenApi = async (email, password) => {
export const getTokenApi = async (formData) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/token/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify(
        `grant_type=&username=${formData.email}&password=${formData.password}&scope=&client_id=&client_secret=`
      ),
    });

    if (!response.ok) {
      throw new Error(
        "Network response was not ok:" + JSON.stringify(response.statusText)
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error getting token:", error);
    throw error;
  }
};
