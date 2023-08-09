import React from "react";
import Quiz from "../../../components/TestUser/Quiz";
import { useRouter } from "next/router";
const index = () => {
  const router = useRouter();
  const { id } = router.query;
  return <Quiz testId={id} />;
};

export default index;
