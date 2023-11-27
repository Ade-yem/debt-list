import axios from "axios"

export const getList = async () => {
  try {
    const res = await axios.get("/price/price-list")
	  return res.data;
  } catch(err: any) {
	  console.log(err.response.data);
	}
}

export const addPrice = async (record: Object) => {
  try {
    const res = await axios.post("/price/price-list", record)
    return res.data;
  }catch(err: any) {
    console.log(err.response.data);
  }
}

export const updatePrice = async (price: Object) => {
  try {
    const res = await axios.put("/price/price-list", price)
    return res.data;
  }catch(err: any) {
    console.log(err.response.data);
  }
}

export const deletePrice = async (id: string) => {
  try {
    const res = await axios.delete(`/price/price-list/${id}`)
    return res.data;
  }catch(err: any) {
    console.log(err.response.data);
  }
}