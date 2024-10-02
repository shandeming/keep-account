"use client";
import React, { useEffect, useState } from "react";
import BillService from "@/service/BillService"; // Adjust the import path as necessary
import { Bill } from "@/types/Bill";

export default function Home() {
  const [bills, setBills] = useState<Bill[]>([]);

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

  return (
    <div>
      <h1>Bill List</h1>
      <ul style={{ listStyleType: "none", padding: 0 }}>
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
