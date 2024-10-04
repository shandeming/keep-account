"use client";
import React, { useEffect, useState } from "react";
import BillService from "@/service/BillService"; // Adjust the import path as necessary
import { Bill } from "@/types/Bill";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [bills, setBills] = useState<Bill[]>([]);
  const [newBill, setNewBill] = useState({
    name: "",
    amount: 0,
    category: "",
    createTime: "",
  });

  useEffect(() => {
    const billService = new BillService();
    billService
      .getAllBill()
      .then((data) => {
        console.log(data);
        setBills(data);
      })
      .catch((error) => {
        console.error("Error fetching bills:", error);
      });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewBill((prevBill) => ({ ...prevBill, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const billService = new BillService();
    const billToAdd = {
      ...newBill,
      createTime: newBill.createTime || new Date().toISOString().slice(0, 16),
    };
    billService
      .addBill(billToAdd)
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
      <h1 className="text-3xl text-center font-bold">Bill List</h1>
      <form onSubmit={handleSubmit} className="mb-5 flex flex-col space-y-4">
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
        <input
          type="text"
          name="category"
          value={newBill.category}
          onChange={handleInputChange}
          placeholder="Category"
          required
          className="p-2 border border-gray-300 rounded"
        />
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
      <ul style={{ listStyleType: "none", padding: 0 }}>
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
        {bills.map((bill) => (
          <li
            key={bill.id}
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
            <span style={{ flex: 1 }}>{bill.createTime.substring(0, 10)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
