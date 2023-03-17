import Scrambler from "./textScreamble";
import React, { useRef, useState, useEffect } from "react";

interface props {
    text : string
}

const ScramblerComponent = (props:props) => {
  const [msg, setMsg] = useState(props.text);
  const scramblerRef = useRef(new Scrambler());
  useEffect(() => {
    scramblerRef.current.scramble(msg, setMsg);
  }, []);
  return <>{msg}</>;
};

export default ScramblerComponent;
