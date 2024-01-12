
import axios from "axios"

export const getNames = async () => {
  try {
    const res = await axios.get("/debt/name-list")
	  return res.data;
  } catch(err: any) {
	  console.log(err.error);
    throw new Error("Unable to get list of names")
	}
}

export const getList = async (data: string) => {
  try {
  const res = await axios.post("/debt/list", {data})
  return res.data;
  }catch(err: any) {
    console.log(err.error);
    throw new Error("Unable to get data")
  }
}

export const addCard = async (record: Object) => {
  try {
    const res = await axios.post("/debt/add-card", record)
    return res.data;
  }catch(err: any) {
    console.log(err);
    throw new Error("Unable to create record")
  }
}

export const editCard = async (card: Object) => {
  try {
    const res = await axios.put("/debt/update-card", card)
    return res.data;
  } catch(err: any) {
    console.log(err.error);
    throw new Error("Unable to update record")
  }
}

export const deleteCard = async (id: string) => {
  try {
    const res = await axios.delete(`/debt/delete-card/${id}`)
    return res.data;
  } catch(err: any) {
    console.log(err.error);
    throw new Error("Unable to delete record")
  }
}