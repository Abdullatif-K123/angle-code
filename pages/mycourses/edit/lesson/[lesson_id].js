import React from "react";
import { useRouter } from "next/router";
import EditLesson from "../../../../components/lesson/EditLesson";
const EditLessons = () => {
  const router = useRouter();
  console.log(router.query);
  const { lesson_id, lessonName } = router.query;
  return <EditLesson lessonId={lesson_id} lessonName={lessonName} />;
};

export default EditLessons;
