import React from "react";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import Increment from "../components/Increment";

const DynamicHeader = dynamic(() => import("../components/vote/VoteImage"), {
  ssr: false,
});

function VoteCard(props) {
  return (
    <Suspense fallback={`Loading...`}>
      <DynamicHeader />
      <Increment />
    </Suspense>
  );
}

export default VoteCard;
