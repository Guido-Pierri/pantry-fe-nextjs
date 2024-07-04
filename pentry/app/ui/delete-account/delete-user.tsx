"use client";
import { deleteUserFromProfile } from "@/app/lib/actions";
import { useFormStatus } from "react-dom";
import Loading from "@/app/[lng]/loading";
import { Box, Button, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";

export default function DeleteUser({ id }: { id: string }) {
  const deleteUserWithId = deleteUserFromProfile.bind(null, id);
  const { pending } = useFormStatus();
  console.log("pending", pending);
  if (pending) {
    return <Loading />;
  }
  return (
    <Box display={"flex"} justifyContent={"end"} flexDirection={"column"}>
      <Typography>We are sorry to see you leave</Typography>
      <Box
        component={"form"}
        action={deleteUserWithId}
        style={{ marginTop: "1rem" }}
      >
        <Button endIcon={<DeleteIcon />} color={"warning"} type={"submit"}>
          Delete your account
        </Button>
      </Box>
    </Box>
  );
}
