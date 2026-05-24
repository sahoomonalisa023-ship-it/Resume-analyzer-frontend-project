import { useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:5000/login", {
        email,
        password,
      });

      alert(res.data.message);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="flex justify-center items-center mt-20">
        <div className="bg-white/10 p-10 rounded-3xl w-96">
          <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>

          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mb-4 bg-black/30 rounded"
          />

          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-6 bg-black/30 rounded"
          />

          <button
            onClick={handleLogin}
            className="w-full bg-blue-500 py-3 rounded font-bold"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
