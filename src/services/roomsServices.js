import axios from "axios";

const BASE_URL = "https://hotelbooking.stepprojects.ge/api/";

export async function fetchRooms() {
  const response = await axios.get(`${BASE_URL}Rooms/GetAll`);
  const data = response.data;
  return data;
}

export async function fetchCategories() {
  const response = await axios.get(`${BASE_URL}Rooms/GetRoomTypes`);
  const data = response.data;
  return data;
}

export async function fetchRoomById(id) {
  const response = await axios.get(`${BASE_URL}Rooms/GetRoom/${id}`);
  const data = response.data;
  return data;
}

export async function filterRooms(filterData) {
  const response = await axios.post(
    "https://hotelbooking.stepprojects.ge/api/Rooms/GetFiltered",
    filterData,
    {
      headers: {
        "Content-Type": "application/json",
        accept: "text/plain",
      },
    },
  );

  return response.data;
}
