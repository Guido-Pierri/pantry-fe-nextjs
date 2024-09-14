import CreateForm from "@/app/ui/add-item/create-form";
import { auth } from "@/auth";
import { Box } from "@mui/material";

export default async function Page() {
  const session = await auth();
  if (!session?.token) {
    return null;
  }
  return (
    <Box flex={"auto"} flexDirection={"column"} alignContent={"center"}>
      <CreateForm />
    </Box>
  );
}
