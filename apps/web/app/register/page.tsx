"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    try {
      const response = await axios.post("http://localhost:3333/auth/register", {
        email,
        password,
      });

      setMessage(response.data.message);
      router.push('/login')
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setMessage(err.response?.data?.message ?? "Erro inesperado");
      } else {
        setMessage("Erro desconhecido");
      }
    }
  }
  return (
    <main>
      <h1>Register</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Cadastrar</button>
      </form>

      {message && <p>{message}</p>}
    </main>
  );
}
