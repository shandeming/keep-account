import axios from "axios";

class BillService {
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
