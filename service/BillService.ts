import axios from "axios";

class BillService {
  private API_URL: string;

  constructor() {
    this.API_URL = "https://keep-account-api.calvinzhaomr.workers.dev";
    // this.API_URL = "http://127.0.0.1:8787";
  }

  public async addBill(newBill: {
    name: string;
    amount: number;
    category: string;
    createTime: string;
  }) {
    try {
      const response = await axios.post(`${this.API_URL}/addBill`, newBill, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error adding bill:", error);
      throw error;
    }
  }

  public async getAllBill() {
    const response = await axios.get(`${this.API_URL}/getAllBill`);
    //transform the data to Bill type
    return response.data;
  }
  public async getMonthlyTotalAmount() {
    const response = await axios.get(`${this.API_URL}/getMonthlyTotalAmount`);
    return response.data;
  }
}

export default BillService;
