"use client";
import { updateUserProfile } from "@/app/lib/actions";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import {
  AccountCircle,
  Email,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import {Field}  from "@base-ui-components/react" ;
import React, { useState } from "react";
import { User } from "@/app/lib/definitions";
import Fab from "@mui/material/Fab";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTranslation } from "react-i18next";

export default function UsersTable({ user }: { user: User }) {
  const [isVisiblePass, setIsVisiblePass] = useState(false);
  const { t } = useTranslation();
  if (!user) return null;
  const updateUserWithId = updateUserProfile.bind(null, user?.id);
  const toggleVisblePass = () => {
    setIsVisiblePass((prev) => !prev);
  };
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };
  return (
    <Box
      component="form"
      action={updateUserWithId}
      flexDirection={"column"}
      sx={{ alignItems: "flex-start" }}
      m={"1rem"}
    >
      <Box component={"div"} display={"flex"} justifyContent={"center"}>
        <Avatar
          alt="Remy Sharp"
          src={user?.imageUrl}
          sx={{ width: 56, height: 56, marginBottom: "1rem" }}
        />
      </Box>
      {/*
      reformat rest of file to use the new TextField component
*/}
      {/*<TextField
        id="firstName"
        name="firstName"
        label={t("text_form_first_name")}
        defaultValue={user?.firstName}
        variant="outlined"
        fullWidth
        sx={{ mb: "1rem" }}
      />*/}
      <Box sx={{ borderRadius: "1%" }} p={1}>
        <TextField
          sx={{ marginBottom: "1rem" }}
          fullWidth={true}
          id="firstName"
          name="firstName"
          label={t("text_form_first_name")}
          defaultValue={user?.firstName}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
          variant="standard"
          required={true}
        />
        <TextField
          sx={{ marginBottom: "1rem" }}
          fullWidth={true}
          id="lastName"
          name="lastName"
          label={t("text_form_last_name")}
          defaultValue={user?.lastName}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
          variant="standard"
          required={true}
        />
        <TextField
          sx={{ marginBottom: "1rem" }}
          fullWidth={true}
          type={"email"}
          id="email"
          name="email"
          label={t("text_form_email")}
          defaultValue={user?.email}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email />
              </InputAdornment>
            ),
          }}
          variant="standard"
          required={true}
        />
        <Field.Control>
          <InputLabel htmlFor="password">{t("text_form_password")}</InputLabel>
          <OutlinedInput
            id="password"
            name={"password"}
            type={isVisiblePass ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={toggleVisblePass}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {isVisiblePass ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            fullWidth={true}
            //onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            required={true}
          />
        </Field.Control>
        <Field.Control>
          <InputLabel htmlFor="confirmPassword">
            {t("text_form_confirm")}
          </InputLabel>
          <OutlinedInput
            id="confirmPassword"
            name={"confirmPassword"}
            type={isVisiblePass ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={toggleVisblePass}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {isVisiblePass ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Confirm password"
            fullWidth={true}
            //value={confirmPassword}
            //onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
            required={true}
          />
        </Field.Control>
      </Box>
      <Button
        endIcon={<DeleteIcon />}
        color={"warning"}
        href={"/dashboard/profile-page/delete-account"}
      >
        {t("text_button_delete")}{" "}
      </Button>
      <Box display={"flex"} justifyContent={"end"} mt={4}>
        <Fab type="submit" variant={"extended"} color={"primary"}>
          {t("text_button_submit")}{" "}
        </Fab>
      </Box>
    </Box>
  );
}
