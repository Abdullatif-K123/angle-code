import React from "react";
import { useRouter } from "next/router";
import LessonPreview from "../../../../components/showLessons/LessonPreview";
const Lesson = () => {
  const router = useRouter();
  const { id, cName } = router.query;
  return <LessonPreview lessonId={id} courseName={cName} />;
};

export default Lesson;
