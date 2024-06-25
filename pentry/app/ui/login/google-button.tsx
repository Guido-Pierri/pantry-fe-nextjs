"use client";
import GoogleButton from "react-google-button";
import React from "react";

export default function () {
  return (
    <GoogleButton
      type="light" // can be light or dark
      onClick={() => {
        console.log("Google button clicked");
      }}
    />
  );
}
