import axios from "axios";

const BASE_URL = "https://hotelbooking.stepprojects.ge/api/";

export async function fetchfavRooms() {
    const response = await axios.get(`${BASE_URL}Rooms/GetAll`)
    console.log(response);
    const data = response.data
    return data;
}
