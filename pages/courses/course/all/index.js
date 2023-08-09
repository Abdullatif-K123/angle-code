import React from "react";
import { useRouter } from "next/router";
import BrowseAll from "../../../../components/ShowAllCourse/BrowseAll";
const index = () => {
  const router = useRouter();
  const { cName } = router.query;
  return <BrowseAll courseName={cName} />;
};

export default index;
