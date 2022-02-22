import axios from "axios";
import { Process } from "../contexts/dialogContext";

export const api = axios.create({
  baseURL: "http://localhost:3333/api",
});

const baseUrl = "http://localhost:3333/api";

// delete
export async function deleteRow(processNumber: string) {
  const encodedProcessNumber = encodeURIComponent(processNumber);
  try {
    const response = await axios.delete(
      `${baseUrl}/row/${encodedProcessNumber}`
    );
    return response;
  } catch (error) {
    throw new Error(error);
  }
}

export async function matchRows(rows: string[]): Promise<string[]> {
  try {
    const response = await axios.get(`${baseUrl}/teste`);

    const { rowsProcessNumbers } = response.data;

    const result = rows.filter((item) => rowsProcessNumbers.includes(item));

    return result;
  } catch (error) {
    throw new Error(error);
  }
}
