import axios from "axios";

class BillService {
  public async addBill(newBill: {
    name: string;
    amount: string;
    category: string;
    createTime: string;
  }) {
    const response = await axios.post(`${this.API_URL}/addBill`, newBill);
    return response.data;
  }
  private API_URL: string;

  constructor() {
    this.API_URL = "http://localhost:8080/bill";
  }

  // get all bill
  public async getAllBill() {
    const response = await axios.get(`${this.API_URL}/getAllBill`);
    //transform the data to Bill type
    return response.data;
  }
}

export default BillService;
