import React from "react";
import { useRouter } from "next/router";
import EditCourse from "../../../components/courses/components/EditCourse";
const EditCourses = () => {
  const router = useRouter();
  const { id } = router.query;
  return <EditCourse courseId={id} />;
};

export default EditCourses;
