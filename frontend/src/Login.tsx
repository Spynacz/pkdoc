import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useState, type ReactElement } from "react";
import { Link } from "react-router-dom";

export default function Login(): ReactElement {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="flex min-w-full items-center justify-center bg-gray-100 dark:bg-gray-700">
      <div className="w-full max-w-md space-y-4 rounded bg-white p-8 shadow-md dark:bg-gray-900">
        <h2 className="text-center text-2xl font-bold text-black dark:text-white">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="email" value="Email" />
            <TextInput
              id="email"
              type="email"
              placeholder="name.surname@pk.edu.pl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required={true}
            />
          </div>
          <div>
            <Label htmlFor="password" value="Password" />
            <TextInput
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required={true}
            />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember">Remember me</Label>
          </div>
          <Button type="submit" fullSized>
            Login
          </Button>
        </form>
        <Button as={Link} to={"/register"} fullSized>I don't have an account</Button>
      </div>
    </div>
  );
}
