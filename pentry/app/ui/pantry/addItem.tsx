"use client";
import { saveSearchItem } from "@/app/lib/actions";
import { Item } from "@/app/lib/definitions";
import { Box } from "@mui/material";
import { SaveItemCard } from "@/app/ui/dashboard/cards";
import { ITEM_IMAGE } from "@/app/lib/constants";
import { Suspense } from "react";
import Loading from "@/app/[lng]/loading";

export default function AddItem({
  pantryId,
  gtin,
  item,
}: {
  pantryId: number;
  gtin: string;
  item: Item;
}) {
  const image: string | undefined = item?.image ?? ITEM_IMAGE;
  const name = item?.name;
  const category = item?.category;
  const brand = item?.brand;
  const formAction = saveSearchItem.bind(
    null,
    pantryId,
    name,
    gtin,
    image,
    category,
    brand,
  );

  return (
    <Box>
      {formAction ? (
        <Box component={"form"} action={formAction}>
          {item ? (
            <Box sx={{ position: "relative" }}>
              <Suspense fallback={<Loading />}>
                <SaveItemCard item={item} />
              </Suspense>
            </Box>
          ) : null}
        </Box>
      ) : null}
    </Box>
  );
}
