import React from "react";
import { useRouter } from "next/router";
import Questions from "../../../../components/exams/test/Questions";
const test = () => {
  const router = useRouter();
  const { testId, testTitle } = router.query;
  console.log(testId, testTitle);
  return <Questions testId={testId} testTitle={testTitle} />;
};

export default test;
