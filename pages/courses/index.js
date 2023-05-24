import { useRouter } from "next/router";
export default function Home() {
  const router = useRouter();
  const { course } = router.query;
  return <h1>Hello {course}</h1>;
}
