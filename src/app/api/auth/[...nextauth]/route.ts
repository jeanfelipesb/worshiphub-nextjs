import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import axios, { AxiosError } from 'axios';

interface ErrorResponse {
  message: string;
}

const handler = NextAuth({
	pages: {
		signIn: "/login"
	},
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: "Email", type: "text" },
				password: { label: "Password", type: "password" }
			},
			async authorize(credentials) {
				if (!credentials) {
					return null
				}
				try {
					const res = await axios
						.post(`http://localhost:8080/auth/login`, {
							email: credentials.email,
							password: credentials.password,
						});

					const data = await res.data;

					if (res.status === 200 && data.token) {
						return {
							id: data.id,
							email: credentials.email,
							token: data.token,
							privileges: data.authorities
						};
					} else {
						throw new Error('Credenciais inválidas.');
					}
				} catch (error) {					
          const axiosError = error as AxiosError<ErrorResponse>;
					const errorMessage = axiosError.response?.data?.message || 'Erro ao tentar autenticar.';
					throw new Error(errorMessage);
				}
			}
		}),
	],
	session: { strategy: 'jwt' },
	secret: process.env.NEXTAUTH_SECRET,
	callbacks: {
		async jwt({ token, user}) {
			if (user?.token) {
				token.accessToken = user.token;
				token.privileges = user.privileges;
			}
			return token;
		},

		async session({ session, token }) {
			session.accessToken = token.accessToken;
			session.privileges = token.privileges;
			return session;
		},
	},
})

export { handler as GET, handler as POST }