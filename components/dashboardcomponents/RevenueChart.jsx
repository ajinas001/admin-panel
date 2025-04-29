"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useState } from "react";


const data = [
  { name: '5k', sales: 20, profit: 10 },
  { name: '10k', sales: 60, profit: 50 },
  { name: '15k', sales: 30, profit: 20 },
  { name: '20k', sales: 40, profit: 25 },
  { name: '25k', sales: 50, profit: 35 },
  { name: '30k', sales: 70, profit: 40 },
  { name: '35k', sales: 90, profit: 30 },
  { name: '40k', sales: 50, profit: 45 },
  { name: '45k', sales: 60, profit: 35 },
  { name: '50k', sales: 50, profit: 30 },
  { name: '55k', sales: 40, profit: 55 },
  { name: '60k', sales: 30, profit: 70 },
];

export default function RevenueChart() {
  const [selectedMonth, setSelectedMonth] = useState("October");

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Revenue</h2>
        <div className="relative">
          <select
            value={selectedMonth}
            onChange={handleMonthChange}
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

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#fb7185" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#fb7185" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#a78bfa" stopOpacity={0}/>
            </linearGradient>
          </defs>

          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="sales" stroke="#fb7185" fillOpacity={1} fill="url(#colorSales)" />
          <Area type="monotone" dataKey="profit" stroke="#a78bfa" fillOpacity={1} fill="url(#colorProfit)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
