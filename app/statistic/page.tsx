"use client";
import { getAllCategoriesSpending } from "@/service/BillService";
import { CategorySpending } from "@/types/CategorySpending";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<CategorySpending[]>([]);
  useEffect(() => {
    getAllCategoriesSpending().then((data) => {
      setData(data);
    });
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "200px", // 固定宽度
          height: "150px", // 固定高度
          textAlign: "center",
          margin: "10px",
          padding: "20px",
          border: "2px solid #000", // 加粗边框
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#FFD700", // 设置显眼的背景颜色
        }}
      >
        <div
          style={{
            fontWeight: "bold",
            marginBottom: "10px",
            fontSize: "23px",
          }}
        >
          category
        </div>
        <div style={{ fontSize: "19px" }}>monthly spending</div>
      </div>
      {data.map((data, index) => (
        <div
          key={data.category}
          style={{
            width: "200px", // 固定宽度
            height: "150px", // 固定高度
            textAlign: "center",
            margin: "10px",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: getColor(index),
          }}
        >
          <div
            style={{
              fontWeight: "bold",
              marginBottom: "10px",
              fontSize: "23px",
            }}
          >
            {data.category}
          </div>
          <div style={{ fontSize: "20px" }}>{data.totalAmount}</div>
        </div>
      ))}
    </div>
  );
}

// 获取颜色的函数
function getColor(index: number): string {
  const colors = ["#FFDDC1", "#FFABAB", "#FFC3A0", "#FF677D"];
  return colors[index % colors.length];
}
