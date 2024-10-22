"use client";
import React, { useEffect, useState } from "react";
import BillService from "@/service/BillService"; // Adjust the import path as necessary
import { Bill } from "@/types/Bill";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [bills, setBills] = useState<Bill[]>([]);
  const [monthlySpending, setMonthlySpending] = useState(0);
  const [newBill, setNewBill] = useState({
    name: "",
    amount: 0,
    category: "",
    createTime: "",
  });
  const [page, setPage] = useState(1);
  const pageSize = 10;
  // const billService = useRef(new BillService());
  useEffect(() => {
    BillService.getBillByPage(page, pageSize)
      .then((data) => {
        setBills(data);
      })
      .catch((error) => {
        console.error("Error fetching bills:", error);
      });
  }, [page, pageSize]);
  useEffect(() => {
    BillService.getMonthlyTotalAmount()
      .then((data) => {
        setMonthlySpending(data);
      })
      .catch((error) => {
        console.error("Error fetching monthly spending:", error);
      });
  }, []);
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewBill((prevBill) => ({ ...prevBill, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const billToAdd = {
      ...newBill,
      createTime: newBill.createTime || new Date().toISOString().slice(0, 16),
    };
    BillService.addBill(billToAdd)
      .then((result) => {
        if (result != 1) {
          alert("Add bill failed");
          return;
        } else {
          setNewBill({
            name: "",
            amount: 0,
            category: "",
            createTime: "",
          });
        }
      })
      .catch((error) => {
        console.error("Error adding bill:", error);
      });
  };

  return (
    <div className="px-4 sm:px-8 md:px-16 lg:px-32 xl:px-40">
      <h1 className="flex items-center justify-center text-2xl font-bold pt-2 pb-2">
        Current Monthly Spending:
        <span className="italic text-4xl font-extrabold text-emerald-500">
          {monthlySpending ? `${monthlySpending}` : "N/A"}
        </span>
      </h1>
      <form onSubmit={handleSubmit} className="mb-4 flex flex-col space-y-4">
        <input
          type="text"
          name="name"
          value={newBill.name}
          onChange={handleInputChange}
          placeholder="Name"
          required
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="amount"
          value={newBill.amount}
          onChange={handleInputChange}
          placeholder="Amount"
          required
          className="p-2 border border-gray-300 rounded"
        />
        <select
          name="category"
          value={newBill.category}
          onChange={handleInputChange}
          required
          className="p-2 border border-gray-300 rounded"
        >
          <option value="" disabled>
            Select a category
          </option>
          <option value="Clothing">Clothing</option>
          <option value="Food">Food</option>
          <option value="Housing">Housing</option>
          <option value="Transport">Transport</option>
          <option value="Entertainment">Entertainment</option>
        </select>
        <input
          type="datetime-local"
          name="createTime"
          value={newBill.createTime}
          onChange={handleInputChange}
          className="p-2 border border-gray-300 rounded"
        />
        <Button type="submit" className="p-2 bg-blue-500 text-white rounded">
          Add Bill
        </Button>
      </form>
      <ul style={{ listStyleType: "none", padding: 0 }} className="mb-4">
        <li
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "8px 0",
            borderBottom: "1px solid #ccc",
            fontWeight: "bold",
          }}
        >
          <span style={{ flex: 1 }}>Name</span>
          <span style={{ flex: 1 }}>Amount</span>
          <span style={{ flex: 1 }}>Category</span>
          <span style={{ flex: 1 }}>Create Time</span>
        </li>
        {bills.map((bill, index) => (
          <li
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "8px 0",
              borderBottom: "1px solid #ccc",
            }}
          >
            <span style={{ flex: 1 }}>{bill.name}</span>
            <span style={{ flex: 1 }}>{bill.amount}</span>
            <span style={{ flex: 1 }}>{bill.category}</span>
            <span style={{ flex: 1 }}>
              {bill.createTime ? bill.createTime.substring(0, 10) : "N/A"}
            </span>
          </li>
        ))}
      </ul>
      <div>
        <Button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Previous
        </Button>
        <Button
          onClick={() => setPage(page + 1)}
          disabled={bills.length < pageSize}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
