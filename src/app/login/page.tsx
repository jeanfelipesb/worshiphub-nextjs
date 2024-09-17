import LoginForm from "@/components/LoginForm";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-900 to-orange-400 p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <LoginForm/>
      </div>
    </div>
  );
}