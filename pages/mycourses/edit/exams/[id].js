import React from "react";
import { useRouter } from "next/router";
import Tests from "../../../../components/exams/Tests";
const Exams = () => {
  const router = useRouter();
  const { id } = router.query;
  return <Tests courseId={id} />;
};

export default Exams;
