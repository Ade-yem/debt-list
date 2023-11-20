import axios from "axios"

export const getNames = async () => {
  await axios.get("/name-list")
	.then(res => {
	  return res.data;
  }).catch(err => {
	  console.log(err.response.data);
		})
	
}

export const getListByName = async (name: string) => {
  try {
  const res = await axios.get("/list-by-name", { name })
  return res.data;
  }catch(err: any) {
    console.log(err.response.data);
  }
}

export const getListByDate = async (date: string) => {
  try{
    const res = await axios.get("/list-by-date", { date })
    return res.data;
  } catch (err: any) {
    console.log(err.response.data);
  }
}

export const addCard = async (name: string, date: string, amount: number, amount_paid: number, paid: boolean) => {
  try {
    const res = await axios.post("/add-card", { name, date, amount, amount_paid, paid })
    return res.data;
  }catch(err: any) {
    console.log(err.response.data);
  }
}

export const editCard = async (name: string, date: string, amount: number, amount_paid: number, paid: boolean) => {
  try {
    const res = await axios.post("/add-card", { name, date, amount, amount_paid, paid })
    return res.data;
  }catch(err: any) {
    console.log(err.response.data);
  }
}