import { useState } from "react";
import { account } from "../../CreateClient";
import { getRegisteredNames } from "../../appwrite/Actions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type User = {
  username: string;
};

import { useEffect } from "react";

const AdminDashboard = () => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  const [users, setUsers] = useState<RegisteredNames[]>([]);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const fetchedUsers = await getRegisteredNames();
        setUsers(fetchedUsers);
        console.log(fetchedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const fetchUser = async () => {
      try {
        const user = await account.get();
        if (!user || !user.name) {
          return;
        }
        setLoggedInUser({
          username: user.name as string, // Assuming user.name contains the username
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
    fetchDocument();
  }, []);

  return (
    <section className="md:w-4/6 mx-auto grid gap-8">
      <h1 className="text-2xl">Admin Dashboard</h1>
      <div>
        <p className="text-lg">
          {loggedInUser ? (
            <>
              Good day, <strong>{loggedInUser.username}</strong>!
            </>
          ) : (
            <span></span>
          )}
        </p>
        <h3 className="font-light">
          "Welcome to the admin dashboard. Here you can view all registered
          applicants and approve or reject their applications."
        </h3>
      </div>

      <div className="shadow-lg p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">First Name</TableHead>
              <TableHead className="text-left">Last Name</TableHead>
              <TableHead className="text-left">Username</TableHead>
              <TableHead className="text-left">Email Address</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {users.map((user) => (
              <TableRow key={user.$id}>

                  <TableCell className="text-left px-2">
                    {user.firstName}
                  </TableCell>

                  <TableCell className="text-left px-2">
                    {user.lastName}
                  </TableCell>

                  <TableCell className="text-left px-2">
                    {user.username}
                  </TableCell>

                  <TableCell className="text-left px-2">
                    {user.emailAddress}
                  </TableCell>

                  <TableCell className="flex gap-2 justify-center">
                    <p className="hover:cursor-pointer">✅</p>
                    <p className="hover:cursor-pointer">❌</p>
                  </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export default AdminDashboard;
