import {Button, Label, TextInput} from "flowbite-react";
import {useState, type ReactElement} from "react";
import {Link, useNavigate} from "react-router";
import {useUser} from "./hooks/useUser";

interface RegisterResponse {
    userId: number;
    email: string;
    refreshToken: string;
    token: string;
}

export default function Register(): ReactElement {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [password2, setPassword2] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const {login} = useUser();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (password2 !== password) {
            setError("Passwords don't match");
            return;
        }
        setError(null);

        fetch("/api/register", {
            method: "POST",
            body: JSON.stringify({
                email: email,
                password: password
            }),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then((data: RegisterResponse) => {
                return data;
            })
            .then((data) => {
                login(data.userId, data.email);
                sessionStorage.setItem("token", data.token);
                localStorage.setItem("refreshToken", data.refreshToken);
                navigate("/");
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="my-auto flex min-w-full items-center justify-center bg-gray-100 dark:bg-gray-700">
            <div className="w-full max-w-md space-y-4 rounded bg-white p-8 shadow-md dark:bg-gray-900">
                <h2 className="text-center text-2xl font-bold text-black dark:text-white">Register</h2>
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
                    <div>
                        <Label htmlFor="password" value="Repeat password" />
                        <TextInput
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={password2}
                            onChange={(e) => setPassword2(e.target.value)}
                            required={true}
                        />
                    </div>
                    {error && <div className="text-center text-red-500">{error}</div>}
                    <Button type="submit" fullSized>
                        Register
                    </Button>
                </form>
                <Button as={Link} to={"/login"} fullSized>
                    I already have an account
                </Button>
            </div>
        </div>
    );
}
