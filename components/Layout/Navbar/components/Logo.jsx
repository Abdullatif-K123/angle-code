import React from "react";
import { useRouter } from "next/router";
const Logo = () => {
  const router = useRouter();
  return (
    <div>
      {" "}
      <div
        onClick={() => {
          router.push("/");
        }}
      >
        <svg
          fill="#4553FF"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 400 400"
          height="26px"
          class="text-logo dark:text-white"
        >
          <path d="M333 0H67A67 67 0 000 67v266a67 67 0 0067 67h266a67 67 0 0067-67V67a67 67 0 00-67-67zm29 325a37 37 0 01-37 37H75a37 37 0 01-37-37V162h324zm0-201H38V75a37 37 0 0137-37h250a37 37 0 0137 37z"></path>
          <rect x="68" y="63" width="38.1" height="38.1" rx="2.4"></rect>
          <rect x="126" y="63" width="38.1" height="38.1" rx="2.4"></rect>
          <rect x="184" y="63" width="38.1" height="38.1" rx="2.4"></rect>
          <rect x="200" y="295" width="114.3" height="38.1" rx="3.3"></rect>
          <path d="M109 331a3 3 0 005 0l61-68a3 3 0 001-4l-59-69a3 3 0 00-4-1l-20 17a3 3 0 00-1 5l40 47a3 3 0 010 4l-43 47a3 3 0 001 4z"></path>
        </svg>
      </div>
    </div>
  );
};

export default Logo;
