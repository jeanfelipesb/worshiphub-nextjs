import React from 'react';

type ServerErrorMessageProps = {
  error: string;
};

const ServerErrorMessage: React.FC<ServerErrorMessageProps> = ({ error }) => {
  return (
    <div className="bg-orange-500 text-white p-2">
      <h1>{error}</h1>
    </div>
  );
};

export default ServerErrorMessage;
