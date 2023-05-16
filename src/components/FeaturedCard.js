import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import "../styles/featured.css";

export default function FeaturedCard({ TM, allUsers }) {
  const [uName, setUName] = useState("");
  useEffect(() => {
    const { userName } = allUsers.find((user) => user._id === TM.user_id);
    setUName(userName);
  }, [TM, allUsers]);

  return (
    <Link to={`/featured/${TM._id}`} state={{ TM: TM }}>
      <div className="featured-card">
        <h1>{TM.name}</h1>
        <div className="user-date">
          <h3>{uName}</h3>
          <h4>{format(new Date(TM.createdAt), "MMMM dd, yyyy")}</h4>
        </div>
      </div>
    </Link>
  );
}
