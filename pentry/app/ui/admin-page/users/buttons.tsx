import { deleteUser } from "@/app/lib/actions";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "@mui/material/Link";
import EditIcon from "@mui/icons-material/Edit";
import { Button, Typography } from "@mui/material";

export function UpdateUser({ id }: { id: string }) {
  return (
    <Button>
      <Link href={`/dashboard/admin-page/users/${id}/edit`}>
        <EditIcon className="w-5" />
      </Link>
    </Button>
  );
}

export function DeleteUser({ id }: { id: string }) {
  const deleteUserWithId = deleteUser.bind(null, id);

  return (
    <form action={deleteUserWithId}>
      <Button>
        <Typography className="sr-only">Delete</Typography>
        <DeleteIcon />
      </Button>
    </form>
  );
}
