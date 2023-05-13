import React, { useEffect, useMemo, useState } from "react";
import Chart from "../../components/chart/chart";
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import axios from 'axios';

const SalesAnalyticsChart = () => {
  // Assuming you have the following data available:
  // const salesData = [
  //   { month: 'Jan', revenue: 1000 },
  //   { month: 'Feb', revenue: 1050 },
  //   { month: 'Mar', revenue: 3000 },
  //   { month: 'Apr', revenue: 2500 },
  //   { month: 'May', revenue: 3000 },
  //   { month: 'Jun', revenue: 1400 },
  // ];

  // // Calculate the KPI (conversion rate)
  // const conversionRateData = salesData.map((data) => ({
  //   month: data.month,
  //   conversionRate: (data.revenue / 1000) * 100 // Assuming a conversion rate formula
  // }));

  const API_URL = "https://us-central1-web-shop-group-3.cloudfunctions.net/api/orders";

  const [orderStat, setOrder] = useState([]);
  const MONTHS = useMemo(() => ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Agu", "Sep", "Oct", "Nov", "Dec"], []);

  useEffect(() => {
    const getStats = async () => {
      try {
        // const res = await axios.get(`${API_URL}`, { withCredentials: true },);
        const res = [
          { mon: 1, totalPrice: 1500 },
          { mon: 2, totalPrice: 2500 },
          { mon: 3, totalPrice: 2050 },
          { mon: 4, totalPrice: 1690 },
          { mon: 5, totalPrice: 1800 },
        ];
        console.log("res order", res);
        res.map((item) => setOrder((prev) => [...prev, { month: MONTHS[item.mon - 1], "Total Sales": item.totalPrice }]));
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [MONTHS]);

  return (
    <>
      <div>
        <Chart data={orderStat} title="Sales Analytics" grid dataKey="Total Sales" color="#b71c1c" />

        {/* <ResponsiveContainer width="100%" aspect={4 / 1}>
          <LineChart data={conversionRateData}>
            <CartesianGrid strokeDasharray="5 5" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="conversionRate" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer> */}
      </div>
    </>
  );
};

export default SalesAnalyticsChart;
