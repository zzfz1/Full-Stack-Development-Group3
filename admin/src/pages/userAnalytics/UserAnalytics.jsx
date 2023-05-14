import React, { useEffect } from "react";
import Chart from "../../components/chart/chart";
import { useState, useMemo } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
// import { userRequest } from "../requestMethods";

const API_URL = "https://us-central1-web-shop-group-3.cloudfunctions.net/api/users";

export default function UserAnalytics() {
  const [userStat, setUser] = useState([]);
  const MONTHS = useMemo(() => ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Agu", "Sep", "Oct", "Nov", "Dec"], []);

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await axios.get(`${API_URL}/stats`, { withCredentials: true });
        console.log("res user", res);
        res.data.map((item) => setUser((prev) => [...prev, { month: MONTHS[item._id - 1], "Active User": item.total }]));
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [MONTHS]);

  return (
    <>
      <div>
        <Chart data={userStat} title="User Analytics" grid dataKey="Active User" />
      </div>
    </>
  );
}
