import { useState } from "react";
import { Heading } from "@/components";
import * as authApi from "@/utils/backend/api/auth";

const AuthPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSignIn(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const res = await authApi.signIn(email, password);
    setLoading(false);

    if (!res.success) {
      setError(res.error || "Failed to sign in.");
    }
  }

  return (
    <form onSubmit={handleSignIn} className="max-w-sm mx-auto mt-10">
      <div className="border rounded border-neutral-800 bg-white shadow-sm flex flex-col gap-3 p-5 items-center">
        <Heading title="Sign In" />
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email"
          required
          className="input-text"
        />
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
          required
          className="input-text"
        />
        <button type="submit" disabled={loading} className="primary-button">
          {loading ? "Authenticating..." : "Authenticate"}
        </button>
      </div>
      {error && <div className="text-red-500 text-sm">{error}</div>}
    </form>
  );
};

export default AuthPage;