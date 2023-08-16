import * as React from "react";
import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import axios from "axios";
import Link from "next/link";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import Image from "next/image";
import img from "./1.png";
import MarkunreadIcon from "@mui/icons-material/Markunread";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import InfoIcon from "@mui/icons-material/Info";
import PersonIcon from "@mui/icons-material/Person";
const Info = () => {
    //
    const user = useSelector((state) => state.user.user);
    const [UserInfo, setUserInfo1] = useState("");
    //
    console.log(user.userId);
    var headers = {
        Authorization: `Bearer ${user.token}`,
      };

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(
                `http://127.0.0.1:3333/AngelCode/users/${user.userId}`,
                { headers }
            );

            const UserInfo = response.data.data;
            setUserInfo1(UserInfo);
            console.log(UserInfo);
        }
        fetchData();
    }, []);

    return (
        <>
            <div className="row my-5 mx-3" >
                <div className="col-12">
                    <div style={{ height: "250px" }}>
                        <Image
                            component="img"
                            style={{ backgroundSize: "cover"}}
                            src={img}
                            className="w-100 h-100 rounded-3 border border-5 border-white shadow"
                            alt="background image"
                        />
                    </div>
                </div>
            </div>
            <div className="row mx-3">
                <div className="col-12">
                    <div
                        className="ms-5 px-2 d-flex flex-row justify-content-start align-items-end"
                        style={{ translate: "0px -120px" }}
                    >
                      {UserInfo.avatar ?  <Image
                            style={{ borderRadius: "50%" }}
                            src={require(`../../../AngleCode_Server/img/${UserInfo.avatar}`)}
                            className="border border-5 border-white shadow mb-1 me-5"
                            alt="user vatar"
                            width={200}
                            height={200}
                            />  
                            : <Avatar
                            sx={{ width: 200, height: 200 }}
                            className="border border-5 border-white shadow mb-1 me-5"
                        /> } 
                       
                        <div>
                            <div className="fw-bold fs-3 mb-3">
                                {UserInfo.user_name}
                            </div>
                            {/* <Button size="small" variant="contained" style={{marginLeft:"850px", marginBottom:"5px"}}>
                                {" "}
                                Message
                            </Button> */}
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mb-5 mx-3" style={{ marginTop: "-115px" , padding: "30px" }}>
                <div className="col-12">
                    <div className="m-2 py-4 px-3 bg-white shadow">
                        <div className="d-flex flex-row flex-wrap justify-content-between align-items-center border-bottom pb-1 mb-4">
                            <div className="fw-bolder text-secondary fs-3">
                                Personal Information
                            </div>
                            <Link href="/profile/updateprofile">
                                <Button
                                    size="large"
                                    startIcon={
                                        <EditTwoToneIcon color="primary" />
                                    }
                                ></Button>
                            </Link>
                        </div>
                        <div className="row row-cols-1 row-cols-sm-2 align-items-center p-2">
                            <div className="col mb-4">
                                <div className="mb-1 text-secondary">
                                    <span className="fw-bold fs-5 me-3 text-black">
                                        F
                                    </span>
                                    Full Name:
                                </div>
                                <div className="fs-5">
                                    {UserInfo.first_name} {UserInfo.last_name}
                                </div>
                            </div>
                            <div className="col mb-4">
                                <div className="mb-1 text-secondary">
                                    <span className="fw-bold fs-5 me-3 text-black">
                                    <PersonIcon />
                                    </span>
                                    User Name:
                                </div>
                                <div className="fs-5">{UserInfo.user_name}</div>
                            </div>
                            <div className="col mb-4">
                                <div className="mb-1 text-secondary">
                                    <span className="fw-bold fs-5 me-3 text-black">
                                    <LocalPhoneIcon />
                                    </span>
                                    Phone Number:
                                </div>
                                <div className="fs-5"> {UserInfo.phone_number}</div>
                            </div>
                            <div className="col mb-4">
                                <div className="mb-1 text-secondary">
                                    <span className="fw-bold fs-5 me-3 text-black">
                                        <MarkunreadIcon />
                                    </span>
                                    Email:
                                </div>
                                <div className="fs-5">{UserInfo.email}</div>
                            </div>
                            
                        </div>
                        <div className="row mb-3 p-2">
                            <div className="col">
                                <div className="mb-1 text-secondary">
                                    <span className="fw-bold fs-5 me-3 text-black">
                                        <InfoIcon />
                                    </span>
                                    About me:
                                </div>
                                <div className="fs-5">{UserInfo.about}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Info;
