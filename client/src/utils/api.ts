import axios from "axios"

export const getNames = async () => {
  try {
    const res = await axios.get("/debt/name-list")
	  return res.data;
  } catch(err: any) {
	  console.log(err.response.data);
	}
}

export const getListByName = async (name: string) => {
  try {
  const res = await axios.post("/debt/list-by-name", {name})
  return res.data;
  }catch(err: any) {
    console.log(err.response.data);
  }
}

export const getListByDate = async (date: string) => {
  try{
    const res = await axios.post(`/debt/list-by-date`, { date })
    return res.data;
  } catch (err: any) {
    console.log(err.response.data);
  }
}

export const addCard = async (record: Object) => {
  try {
    const res = await axios.post("/debt/add-card", record)
    return res.data;
  }catch(err: any) {
    console.log(err.response.data);
  }
}

export const editCard = async (card: Object) => {
  try {
    const res = await axios.put("/debt/update-card", card)
    return res.data;
  }catch(err: any) {
    console.log(err.response.data);
  }
}

export const deleteCard = async (id: string) => {
  try {
    const res = await axios.delete(`/debt/delete-card/${id}`)
    return res.data;
  }catch(err: any) {
    console.log(err.response.data);
  }
}