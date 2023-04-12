import "./home.css";
import { useEffect, useMemo, useState } from "react";

export default function Home() {
  const [userStats, setUserStats] = useState([]);

  const MONTHS = useMemo(() => ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Agu", "Sep", "Oct", "Nov", "Dec"], []);

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get("/users/stats");
        res.data.map((item) => setUserStats((prev) => [...prev, { name: MONTHS[item._id - 1], "Active User": item.total }]));
      } catch {}
    };
    getStats();
  }, [MONTHS]);

  return <div className="home">home</div>;
}
