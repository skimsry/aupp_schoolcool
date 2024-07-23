import React from "react";
import { format, isValid } from "date-fns";

const FormattedDate = ({ date }) => {
  const dateObj = new Date(date);

  if (!isValid(dateObj)) {
    return <div></div>;
  }

  const formattedDate = format(dateObj, "dd/MM/yyyy");

  return <div>{formattedDate}</div>;
};

export default FormattedDate;
