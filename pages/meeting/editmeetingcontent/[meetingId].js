import React from "react";
import { useRouter } from "next/router";
import Editcontent from "../../../components/meeting/Editcontent";
const Editcontents = () => {
  const router = useRouter();
  console.log(router.query);
  const { meetingId } = router.query;
  return <Editcontent meetingId={meetingId}  />;
};

export default Editcontents;