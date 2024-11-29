import { useState } from "react";
import { Input } from "@/components/ui/input";

type User = {
  username: string;
};

import { account, ID } from "../CreateClient";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();

  async function login(email: string, password: string) {
    const promise = account.createEmailPasswordSession(email, password);

    promise.then(
      async function (response) {
        console.log(response); // Success
        const user = await account.get();
        setLoggedInUser({
          username: user.name as string, // Assuming user.name contains the username
        });
        navigate("/dashboard");
      },
      function (error) {
        console.log(error); // Failure
        window.alert("Login failed. Invalid credentials.");
      }
    );
  }

  return (
    <>
      <div className="bg-white shadow-md p-4 grid gap-4 md:w-2/6 mx-auto">
        <p>
          {loggedInUser
            ? `Logged in as ${loggedInUser.username}`
            : "Not logged in"}
        </p>

        <form className="grid gap-4">
          <Tabs defaultValue="login">

            <TabsList>
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="grid gap-4">
              <div className="flex flex-col gap-4">
                <Input
                  className="border-2 rounded-md p-3"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  className="border-2 rounded-md p-3"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex gap-4 justify-center">
                <button
                  className="px-4 py-2 rounded-md bg-blue-400 text-white"
                  type="button"
                  onClick={() => {
                    if (!email || !password) {
                      window.alert("Please fill in all fields.");
                      return;
                    }
                    login(email, password);
                    setEmail("");
                    setPassword("");
                    setName("");
                  }}
                >
                  Login
                </button>
              </div>
            </TabsContent>

            <TabsContent value="register" className="grid gap-4">
              <div className="flex flex-col gap-4">
                <Input
                  className="border-2 rounded-md"
                  type="text"
                  placeholder="Username"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  className="border-2 rounded-md"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  className="border-2 rounded-md"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="flex gap-4 justify-center">
                <button
                  className="px-4 py-2 border-2 border-blue-400 text-blue-400 rounded-md"
                  type="button"
                  onClick={async () => {
                    if (!email || !password || !name) {
                      window.alert("Please fill in all fields.");
                      return;
                    }
                    await account.create(ID.unique(), email, password, name);
                    login(email, password);
                    setEmail("");
                    setPassword("");
                    setName("");
                    navigate("/dashboard");
                  }}
                >
                  Register
                </button>
              </div>
            </TabsContent>
          </Tabs>
        </form>
      </div>
    </>
  );
};

export default App;
