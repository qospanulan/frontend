// import { useContext } from "react";
// import { UserContext } from "../../user";

const BASE_URL = process.env.REACT_APP_API_URL;

// const {email, token} = useContext(UserContext)
export const getOrdersApi = async () => {
  try {
    const response = await fetch(`${BASE_URL}/orders/`, {
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
    console.error("Error fetching orders:", error);
    throw error;
  }
};

export const createOrderApi = async (newOrder) => {
  try {
    const response1 = await fetch(`${BASE_URL}/orders/group/`, {
      method: "POST",
      headers: {
        // Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newOrder.order_group_name }),
    });

    if (!response1.ok) {
      // throw new Error(
      // "Network response was not ok:" + JSON.stringify(response1.statusText)
      // );
      return false;
    }

    let createdOrderGroup = await response1.json();
    newOrder.orders.forEach(
      (element) => (element.order_id = createdOrderGroup.id)
    );

    console.log(createdOrderGroup);

    const response2 = await fetch(`${BASE_URL}/orders/all/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newOrder.orders),
    });

    if (!response2.ok) {
      // throw new Error(
      //   "Network response was not ok:" + JSON.stringify(response2.statusText)
      // );
      return false;
    }

    return await response2.json();
  } catch (error) {
    console.error("Error creating order:", error);
    // throw error;
    return false;
  }
};
