import { useRouter } from "next/router";
import CourseOverview from "../../components/showCourse/CourseOverview";
export default function Home() {
  const router = useRouter();
  const CourseId = router.query.id;
  return <CourseOverview courseId={CourseId} />;
}
