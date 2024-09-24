"use client";

import { useSession } from "next-auth/react";

const TokenDisplay = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Carregando...</p>;
  }

  if (status === "unauthenticated") {
    return <p>Você não está autenticado.</p>;
  }

  return (
    <div>
      <h1>Token JWT:</h1>
      {session?.accessToken ? (
        <p>{session.accessToken}</p>
      ) : (
        <p>Token não disponível</p>
      )}
    </div>
  );
};

export default TokenDisplay;
