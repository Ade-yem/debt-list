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
  await axios.get("/list-by-name", {name})
  .then(res => {
    return res.data;
  }).catch(err => {
    console.log(err.response.data);
    })

}

export const getListByDate = async (date: Date) => {
  await axios.get("/list-by-date", {date})
  .then(res => {
    return res.data;
  }).catch(err => {
    console.log(err.response.data);
    })

}

export const addCard = async (name: string, date: Date, debt: number, amount_payed: number, paid: Boolean) => {
  await axios.post("/add-card", { name, date, amount_paid, paid })
  .then(res => {
    return res.data;
  }).catch(err => {
    console.log(err.response.data);
    })

}

export const editCard = async (name: string, date: Dat\
e, debt: number, amount_payed: number, paid: Boolean)\
 => {
  await axios.post("/add-card", { name, date, amount_\
paid, paid })
  .then(res => {
    return res.data;
  }).catch(err => {
    console.log(err.response.data);
    })

}