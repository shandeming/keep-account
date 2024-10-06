import Config from "@/config/Config";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
//TODO：去掉类包裹，参考https://github.com/gothinkster/node-express-realworld-example-app/blob/master/src/app/routes/article/article.service.ts
class BillService {
  // public static API_URL = Config.API_URL;
  public static API_URL = Config.API_URL;

  public static async addBill(newBill: {
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

  public static async getAllBill() {
    const response = await axios.get(`${this.API_URL}/getAllBill`);
    //transform the data to Bill type
    return response.data;
  }
  public static async getBillByPage(page: number, pageSize: number) {
    //打印消息
    console.log("getBillByPage");
    try {
      const response = await axios.get(`${this.API_URL}/getBillByPage`, {
        params: {
          page,
          pageSize,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching bills:", error);
      throw error;
    }
  }

  public static async getMonthlyTotalAmount() {
    const response = await axios.get(`${this.API_URL}/getMonthlyTotalAmount`);
    return response.data;
  }
}

export default BillService;
