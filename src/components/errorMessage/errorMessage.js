import React from "react";

const ErrorMessage = (props) => {
  const { name } = props;
  return (
    <>
      <span>Error: {name}</span>
    </>
  );
};

export default ErrorMessage;
