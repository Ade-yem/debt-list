import axios from "axios"

export const getNames = async () => {
  await axios.get("/debt/name-list")
	.then(res => {
	  return res.data;
  }).catch(err => {
	  console.log(err.response.data);
		})
	
}

export const getListByName = async (name: string) => {
  try {
  const res = await axios.get(`/debt/list-by-name/${name}`)
  return res.data;
  }catch(err: any) {
    console.log(err.response.data);
  }
}

export const getListByDate = async (date: string) => {
  try{
    const res = await axios.get(`/debt/list-by-date/${date}`)
    return res.data;
  } catch (err: any) {
    console.log(err.response.data);
  }
}

export const addCard = async (name: string, date: string, amount: number, amount_paid: number, paid: boolean, written_by: string, comment: string) => {
  try {
    const res = await axios.post("/debt/add-card", { name, date, amount, amount_paid, paid, written_by, comment })
    return res.data;
  }catch(err: any) {
    console.log(err.response.data);
  }
}

export const editCard = async (name: string, date: string, amount: number, amount_paid: number, paid: boolean, id: string, written_by: string, comment: string) => {
  try {
    const res = await axios.put("/debt/update-card", { name, date, amount, amount_paid, paid, id, written_by, comment })
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