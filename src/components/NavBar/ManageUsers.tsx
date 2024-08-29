"use client";
import { useEffect, useState, useTransition } from "react";
import { getUsers } from "@/actions/Auth/getUsers";
import { FormError } from "@/components/FormInfo/FormError";
import { DeleteIcon } from "@/components/Icons/Delete";
import { AvatarIcon } from "@/components/Icons/Avatar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth } from "@/auth";
import { toast } from "sonner";
import { deleteUser } from "@/actions/Auth/deleteUser";

const ManageUsers = ({ session }: { session: any }) => {
  const [isPending, startTransition] = useTransition();
  const [tag, setTag] = useState<boolean>(false);
  const [users, setUsers] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUsers();

        if (response.users) {
          setUsers(response.users || []);
        } else if (response.error) {
          toast.error(response.error);
        }
      } catch (err) {
        toast.error(JSON.stringify(err));
      }
    };

    fetchData();
  }, [tag]);

  const handleDelete = async (userId: string) => {
    if (isPending) {
      return;
    }
    startTransition(() => {
      deleteUser(userId)
        .then((data) => {
          toast.success(data.success);
          setTag((prev) => !prev);
        })
        .catch((error) => {
          toast.error(error);
          setError(error);
        });
    });
  };

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (users.length === 0) {
    return <div>No users</div>;
  }

  if (error) {
    return <FormError message={error} />;
  }

  return (
    <div className="min-h-[500px] border p-2 rounded-lg overflow-scroll">
      {users.map((user) => (
        <div
          key={user.id}
          className="py-1 px-2 border rounded-sm flex justify-between items-center"
        >
          <div className="flex gap-2 items-center">
            <Avatar className="h-8 w-8 border p-1 shadow-sm">
              <AvatarImage
                src={"avatar.svg"}
                className="object-cover text-teal-400"
              />
              <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <p>{user.username}</p>
          </div>
          <DeleteIcon
            className="w-6 h-6 stroke-destructive hover:stroke-transparent hover:fill-destructive"
            onClick={() => handleDelete(user.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default ManageUsers;
