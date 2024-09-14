"use client";
import { useFormState } from "react-dom";
import { saveCustomItem } from "@/app/lib/actions";
import React from "react";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import Box from "@mui/material/Box";
import { AddItemCard } from "@/app/ui/dashboard/cards";

export default function CreateForm() {
  const [errorMessage, dispatch] = useFormState(saveCustomItem, undefined);

  return (
    <Box component="form" action={dispatch}>
      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <AddItemCard />
        {errorMessage ? (
          <>
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">{errorMessage}</p>
          </>
        ) : null}
      </Box>
    </Box>
  );
}
