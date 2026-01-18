import axios from "axios";

const BASE_URL = "https://hotelbooking.stepprojects.ge/api/";

export async function fetchRooms() {
    const response = await axios.get(`${BASE_URL}Rooms/GetAll`)
    console.log(response);
    const data = response.data
    return data;
}

export async function fetchCategories(){
    const response = await axios.get(`${BASE_URL}Rooms/GetRoomTypes`)
    console.log(response);
    const data = response.data
    return data;
}