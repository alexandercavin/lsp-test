import axios from "axios";

export const fetchMenuItems = async () => {
    try {
        const response = await axios.get(`http://localhost:4000/menu`);
        return response.data; // Returns the menu data
    } catch (error) {
        console.error("Error fetching menu items:", error);
        throw error; // Propagate the error
    }
};