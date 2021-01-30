import React, { useRef, useState, useEffect } from "react";

export default function Course(props) {
  const { match } = props;

  let { id } = match.params;
  console.log("ID", id);

  return <h1>Hello</h1>;
}
