"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function SalesChart() {
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [month, setMonth] = useState("October");

  const fetchSalesData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://dummyjson.com/carts");
    //   console.log(response.data, "Fetched Sales Data");

      const sales = response.data.carts.slice(0, 30).map((cart, index) => ({
        name: `${(index + 1) * 2}k`, 
        sales: (cart.total % 100) + 20, 
      }));

      setSalesData(sales);
    } catch (error) {
      console.error("Error fetching sales data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSalesData();
  }, [month]);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Sales Details</h2>
        <div className="relative">
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="appearance-none border rounded-md px-3 py-1 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>October</option>
            <option>November</option>
            <option>December</option>
          </select>
          <div className="absolute right-3 top-2 pointer-events-none">
            <svg className="h-4 w-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">Loading...</div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={salesData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorSalesLine" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            
            <XAxis dataKey="name" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#3b82f6"
              fillOpacity={1}
              fill="url(#colorSalesLine)"
              dot={{ r: 3 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
