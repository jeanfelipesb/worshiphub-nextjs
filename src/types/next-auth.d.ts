import NextAuth from "next-auth";

// Sobrescreve os tipos padrões de `Session` e `JWT` do NextAuth
declare module "next-auth" {
  interface Session {
    accessToken?: string;  // Adiciona a propriedade `accessToken` à sessão
  }

  interface User {
    accessToken?: string;  // Adiciona a propriedade `accessToken` ao usuário
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;  // Adiciona a propriedade `accessToken` ao token JWT
  }
}
