import React from "react";
import { useRouter } from "next/router";
import Showmeeting from "../../../components/meeting/Showmeeting";
const Showmeetings = () => {
  const router = useRouter();
  console.log(router.query);
  const { meetingId } = router.query;
  return <Showmeeting meetingId={meetingId}  />;
};

export default Showmeetings;