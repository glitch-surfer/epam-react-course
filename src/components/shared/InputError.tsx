import React from "react";

export const InputError: React.FC<{ message: string | undefined }> = ({
  message,
}) => {
  if (!message) return null;

  return <p className="text-red-500 text-sm">{message}</p>;
};
