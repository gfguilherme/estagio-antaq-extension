const axios = require("axios").default;

const baseUrl = "http://localhost:3000/api";

export async function getPortos() {
  try {
    const response = await axios.get(`http://localhost:3000/api/portos`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
