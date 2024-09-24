"use client"

import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';

import { useState } from "react";
import { Input } from "@/components/ui/input";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { Button } from "@/components/ui/button";

export default function LoginForm() {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const [hasError, setHasError] = useState(false);
	const router = useRouter();

	async function login(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const formData = new FormData(e.currentTarget)

		const data = {
			email: formData.get("email"),
			password: formData.get("password")
		}

		const res = await signIn("credentials", {
			...data,
			redirect: false
		})

		if (res?.error) {
			setHasError(true);
			setError(res.error);
			setIsLoading(false);
		} else {
			router.push('/admin');
		}
	}

	return (
		<form onSubmit={login} className="space-y-4">
			<div>
				<label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
					Usuário
				</label>
				<Input id="email" name="email" type="email" placeholder="Digite seu email" required />
				{/* {<UserErrorMessage />} */}
			</div>
			<div>
				<label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
					Senha
				</label>
				<Input id="password" name="password" type="password" placeholder="Digite sua senha" required />
				{/* {(<PasswordErrorMessage />)} */}
			</div>
			<Button className="w-full" type="submit" disabled={isLoading}>
				{isLoading ? (
					<span className="flex items-center justify-center">
						<LoadingSpinner />
						<span className="ml-2">Carregando</span>
					</span>
				) : (
					'Entrar'
				)}
			</Button>
			{hasError && (<ServerErrorMessage error={error} />)}
		</form>
	);
}

type ChildComponentProps = {
	error: string;
};

const ServerErrorMessage = ({ error }: ChildComponentProps) => {
	return (
		<div className='bg-orange-500 text-white p-2'>
			<h1>{error}</h1>
		</div>
	)
};