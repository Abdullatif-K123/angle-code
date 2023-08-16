import React, { useEffect, useState } from "react";
import axios from "axios";
import Meetingcard from "../UI/Meetingcard";
import classes from "./meeting.module.css";
import { useRouter } from "next/router";
const Allmeeting = () => {
    const router = useRouter();
    const [data, setData] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(
                `http://localhost:3333/AngelCode/Meetings/All`
            );
            const data = response.data.data;
            console.log(data);
            setData(data);
        }
        fetchData();
    }, []);
    return (
        <div className={classes.MainSection}>
                {data.map((m) => {
                    if (m.userCreater) {
                        var authorName =
                            m.userCreater.first_name +
                            " " +
                            m.userCreater.last_name;
                        var useravatar = m.userCreater.avatar;
                        console.log(m.userCreater);
                        return (
                            <Meetingcard
                                key={m._id}
                                meetingId={m._id}
                                title={m.title}
                                link={m.link}
                                startDate={m.startDate}
                                duration={m.duration}
                                usercreater={authorName}
                                meetingImage={m.image}
                                users={m.users}
                                useravatar={useravatar}
                            />
                        );
                    }
                })}
            </div>
    );
};

export default Allmeeting;
