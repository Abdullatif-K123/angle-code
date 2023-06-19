import React from "react";
import { Container, LowerBox, MidBox, MidDiv, UpperBox } from "./FooterStyles";
import { Button } from "@mui/material";
import classes from "./footer.module.css";
export const Footer = ({ className }) => {
  return (
    <div className={classes.container}>
      <div className={classes.midDiv}>
        <div className={classes.upperBox}>
          <svg
            width="84"
            height="26"
            viewBox="0 0 84 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d=" 96359V5.37859C5.72713 5.22087 5.55635 5.12233 5.4198 5.20127L1.22102 7.62844C1.1577 7.66504 1.1187 7.73263 1.1187 7.80577V12.1105L1.1187 12.113V16.9016L1.11874 16.9016V17.4524L1.11877 17.4524L1.11874 17.4455L1.11881 17.4342V22.2526C1.11881 22.3657 1.21051 22.4574 1.32363 22.4574H5.52241C5.63553 22.4574 5.72723 22.3657 5.72723 22.2526V14.2408L13.2734 9.88397C13.28 9.88018 13.2865 9.87631 13.2929 9.87236C13.5364 9.72389 13.6856 9.45902 13.6856 9.17292V8.82868L13.6859 8.82846V5.20885C13.6859 4.93954 13.5536 4.68743 13.3319 4.53449L7.00423 0.169041C6.97003 0.145447 6.92946 0.132812 6.88792 0.132813L0.983154 0.13285C0.781238 0.132852 0.700231 0.393436 0.867503 0.50653L2.04208 1.30029L2.04212 1.30032ZM22.0437 20.0486C21.0635 20.0486 20.1177 19.338 20.1177 17.8994C20.1177 16.4436 21.0635 15.7676 22.0437 15.7676C23.0411 15.7676 23.9697 16.4436 23.9697 17.8994C23.9697 19.3553 23.0411 20.0486 22.0437 20.0486ZM22.0437 13.3412C19.4987 13.3412 17.5039 15.2304 17.5039 17.8994C17.5039 20.5685 19.4987 22.475 22.0437 22.475C24.6059 22.475 26.5835 20.5685 26.5835 17.8994C26.5835 15.2304 24.6059 13.3412 22.0437 13.3412ZM16.6382 13.6012C16.4662 13.5492 16.2083 13.5145 15.9504 13.5145C15.2625 13.5145 14.1792 13.7918 13.7321 14.7624V13.6012H11.2042V22.215H13.818V18.4541C13.818 16.7382 14.7638 16.1143 15.8128 16.1143C16.0707 16.1143 16.3459 16.1316 16.6382 16.2009V13.6012ZM31.9288 25.768C29.4698 25.768 27.9049 24.2428 27.6642 22.7003L29.9685 22.0417C30.1404 22.8736 30.8283 23.4802 31.8084 23.4802C33.1154 23.4802 33.9236 22.839 33.9236 21.2791V20.8805C33.614 21.3484 32.8746 21.8511 31.6365 21.8511C29.3666 21.8511 27.6642 20.0486 27.6642 17.6568C27.6642 15.3863 29.2978 13.4452 31.6365 13.4452C33.0294 13.4452 33.7688 14.0691 34.0096 14.5198V13.6012H36.503V21.1405C36.503 23.6189 35.1273 25.768 31.9288 25.768ZM30.278 17.6568C30.278 18.8353 31.069 19.5633 32.118 19.5633C33.1841 19.5633 33.9408 18.8353 33.9408 17.6568C33.9408 16.4782 33.0982 15.7503 32.118 15.7503C31.1378 15.7503 30.278 16.4782 30.278 17.6568ZM44.1454 13.6012C43.9734 13.5492 43.7155 13.5145 43.4575 13.5145C42.7697 13.5145 41.6863 13.7918 41.2392 14.7624V13.6012H38.7114V22.215H41.3252V18.4541C41.3252 16.7382 42.271 16.1143 43.3199 16.1143C43.5779 16.1143 43.853 16.1316 44.1454 16.2009V13.6012ZM48.2399 22.4577C46.3655 22.4577 45.2822 21.2098 45.2822 19.8406C45.2822 18.3154 46.3999 17.4488 47.81 17.2408L49.822 16.9289C50.2863 16.8595 50.441 16.6342 50.441 16.3396C50.441 15.837 50.0111 15.4037 49.1857 15.4037C48.2743 15.4037 47.7756 16.0276 47.724 16.6689L45.4541 16.2009C45.5573 14.9704 46.6923 13.3412 49.2029 13.3412C51.9715 13.3412 52.9861 14.9011 52.9861 16.6689V20.8805C52.9861 21.5564 53.0721 22.1284 53.0892 22.215H50.7334C50.7162 22.1457 50.6474 21.8337 50.6474 21.2444C50.2003 21.9724 49.3749 22.4577 48.2399 22.4577ZM47.8616 19.6673C47.8616 20.1179 48.1539 20.5512 48.8762 20.5512C49.65 20.5512 50.441 20.1699 50.441 18.8353V18.4541L48.8246 18.714C48.2743 18.8007 47.8616 19.0607 47.8616 19.6673ZM57.7993 22.215V17.2582C57.7993 16.4782 58.2979 15.7676 59.2093 15.7676C60.1551 15.7676 60.585 16.4089 60.585 17.2235V22.215H63.1645V17.2408C63.1645 16.4782 63.6631 15.7676 64.5917 15.7676C65.5203 15.7676 65.9502 16.4089 65.9502 17.2235V22.215H68.4781V16.6342C68.4781 14.2945 66.9304 13.3412 65.314 13.3412C64.1618 13.3412 63.3364 13.7225 62.6658 14.6931C62.2359 13.8438 61.3589 13.3412 60.1379 13.3412C59.2093 13.3412 58.1088 13.8265 57.6789 14.5891V13.6012H55.1854V22.215H57.7993ZM83.9165 19.9446V22.215H76.7457V19.8926L80.5116 15.8543H76.8488V13.6012H83.8477V15.7676L79.9098 19.9446H83.9165ZM73.8428 22.1972H70.8374L71.7216 16.5501H70.8374V13.4029H74.7216V16.5501L73.8428 22.1972ZM70.8374 7.71667H74.7216V11.4404H70.8374V7.71667Z"
              fill="white"
            />
          </svg>
          <p>Learn with fun and intractive way</p>
        </div>
        <div className={classes.midBox}>
          <div className={classes.first}>
            <p className={classes.head}>Courses</p>
            <p>Python 3 Course</p>
            <p>SQL Course</p>
            <p>HTML Course</p>
            <p>C++ Course</p>
            <p>Java Course</p>
            <p>Kotlin Course</p>
            <p>C# Course</p>
            <p>Algorithm Course</p>
          </div>
          <div className={classes.first}>
            <p className={classes.head}>Our Services</p>
            <p>Educational Blog</p>
            <p>Meetings Platform</p>
            <p>Testings & Exams</p>
            <p>Messagin with friends</p>
            <p>Challenging with colleague</p>
          </div>
          <div className={classes.first}>
            <p className={classes.head}>More</p>
            <p>About the team</p>
            <p>Course Catalog</p>
            <p>
              Early Access
              <br /> Courses
            </p>
            <p>Free trials</p>
            <p>CodingInterview.com</p>
            <p>Contact Us</p>
          </div>
          <div className={classes.first}>
            <p className={classes.head}>you want to join?</p>
            <Button variant="contained">Join now for free</Button>
          </div>
        </div>
        <LowerBox className={classes.lowerBox}>
          <div>
            <div>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                id="fb"
                class="mb-4 text-gray-50 fill-current hover:text-primary focus:text-primary dark:hover:text-primary-light dark:focus:text-primary-light hover:cursor-pointer focus:cursor-pointer"
              >
                <span class="mr-1 flex justify-center h-12 w-12">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="w-5 h-5"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </span>
              </a>
            </div>
            <div>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Linkedin"
                id="linkedin"
                class="mb-4 text-gray-50 fill-current hover:text-primary focus:text-primary dark:hover:text-primary-light dark:focus:text-primary-light hover:cursor-pointer focus:cursor-pointer"
              >
                <span class="mr-1 flex justify-center h-12 w-12">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="w-5 h-5"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </span>
              </a>
            </div>
            <div>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                id="twitter"
                class="mb-4 text-gray-50 fill-current hover:text-primary focus:text-primary dark:hover:text-primary-light dark:focus:text-primary-light hover:cursor-pointer focus:cursor-pointer"
              >
                <span class="mr-1 flex justify-center h-12 w-12">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="w-5 h-5"
                  >
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                  </svg>
                </span>
              </a>
            </div>
            <div>
              <a
                href="#"
                target="_blank"
                id="youtube"
                rel="noopener noreferrer"
                aria-label="YouTube"
                class="mb-4 text-gray-50 fill-current hover:text-primary focus:text-primary dark:hover:text-primary-light dark:focus:text-primary-light hover:cursor-pointer focus:cursor-pointer"
              >
                <span class="mr-1 flex justify-center h-12 w-12">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="w-5 h-5"
                  >
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                  </svg>
                </span>
              </a>
            </div>
          </div>
          <div className="copyright">
            <p>Copyright ©2023 codehub, Inc. All rights reserved.</p>
            &nbsp;
          </div>
        </LowerBox>
      </div>
    </div>
  );
};
