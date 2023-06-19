import React from "react";
import { useRouter } from "next/router";
import Lesson from "../../../components/lesson/Lesson";
const EditCourses = () => {
  const router = useRouter();
  const { id } = router.query;
  return <Lesson courseId={id} />;
};

export default EditCourses;
