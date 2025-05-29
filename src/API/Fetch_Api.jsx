import axios from "axios";  // Uncommented the import

// Function to fetch products
export const getUserByEmail = async (email) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/user/${email}`);
    console.log("Products:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error.message);  // Display the error message
    return [];  // Optionally return an empty array in case of error to prevent breaking the flow
  }
};

// Function to fetch products
export const fetchProducts = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/products");
    console.log("Products:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error.message);  // Display the error message
    return [];  // Optionally return an empty array in case of error to prevent breaking the flow
  }
};

// Function to place an order
export const placeOrder = async (order) => {
  try {
    const response = await axios.post("http://localhost:8080/api/store/order", order);
    console.log("Order placed successfully:", response.data);
  } catch (error) {
    console.error("Error placing order:", error.message);  // Display the error message
  }
};

