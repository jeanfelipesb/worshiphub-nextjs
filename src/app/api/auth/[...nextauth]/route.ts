import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import axios from 'axios';

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
			async authorize(credentials, req) {
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
							token: data.token
						};
					} else {
						throw new Error('Credenciais inválidas.');
					}
				} catch (error: any) {
					const errorMessage = error.response?.data?.message || 'Erro ao tentar autenticar.';
					throw new Error(errorMessage); // Lança a mensagem de erro personalizada
				}
			}
		}),
	],
	session: { strategy: 'jwt' },
	secret: process.env.NEXTAUTH_SECRET,
	callbacks: {
		async jwt({ token, user, account }: any) {
			if (user?.token) {
				token.accessToken = user.token;
			}
			return token;
		},

		async session({ session, token }) {
			session.accessToken = token.accessToken;
			return session;
		},
	},
})

export { handler as GET, handler as POST }