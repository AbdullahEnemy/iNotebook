
import React, { useContext } from "react";
import alertContext from "../context/alert/alertContext";

export const Alert = () => {
  const { alert } = useContext(alertContext);
  console.log(alert);
    if (!alert) return null;
  return (
    <>
      <div className={`alert alert-${alert.type}`} role="alert">
        {alert.msg}
      </div>
    </>
  );
};
