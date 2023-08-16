import React from "react";
import classes from "../../dashboard.module.css";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import angleDashboard from "../../../../assets/png/angleCodeWhite.png";
import OtherHousesOutlinedIcon from "@mui/icons-material/OtherHousesOutlined";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import { SettingsOutlined } from "@mui/icons-material";
import { MailLockOutlined } from "@mui/icons-material";
import { AccountBalanceOutlined } from "@mui/icons-material";
import Image from "next/image";
const style = {
  width: "100%",
};
const Sidebar = ({ changeSelected }) => {
  return (
    <div className={classes.sidebarMain}>
      <div className={classes.angleCodeLogo}>
        <Image
          src={angleDashboard}
          width={60}
          height={60}
          className={classes.imgSidebar}
          alt="angle_codeLogo"
        />
        <p>Angle Code</p>
      </div>
      <div className={classes.sidebarContainer}>
        <TreeView
          aria-label="file system navigator"
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          <TreeItem
            className={classes.treeItem}
            nodeId="1"
            label={
              <div className={classes.labelTreeItem}>
                <OtherHousesOutlinedIcon
                  style={{ width: "20px", height: "20px", marginBottom: "4px" }}
                />
                Dashboard
              </div>
            }
          >
            <TreeItem
              nodeId="2"
              label={
                <div style={{ marginLeft: "95px", padding: "10px 0px" }}>
                  Overview
                </div>
              }
              className={classes.singleItem}
              onClick={() => {
                changeSelected(1);
              }}
            />
            <TreeItem
              nodeId="3"
              label={
                <div style={{ marginLeft: "95px", padding: "10px 0px" }}>
                  Analytics
                </div>
              }
              className={classes.singleItem}
              onClick={() => {
                changeSelected(2);
              }}
            />
          </TreeItem>

          <TreeItem
            nodeId="4"
            className={classes.treeItem}
            label={
              <div className={classes.labelTreeItem}>
                <LibraryBooksOutlinedIcon
                  style={{ width: "20px", height: "20px", marginBottom: "4px" }}
                />
                Courses
              </div>
            }
          >
            <TreeItem
              nodeId="5"
              label={
                <div style={{ marginLeft: "95px", padding: "10px 0px" }}>
                  All Courses
                </div>
              }
              className={classes.singleItem}
              onClick={() => {
                changeSelected(3);
              }}
            />
            <TreeItem
              nodeId="6"
              onClick={() => {
                changeSelected(4);
              }}
              label={
                <div style={{ marginLeft: "95px", padding: "10px 0px" }}>
                  Pending Courses
                </div>
              }
              className={classes.singleItem}
            />
            <TreeItem
              nodeId="7"
              onClick={() => {
                changeSelected(5);
              }}
              label={
                <div style={{ marginLeft: "95px", padding: "10px 0px" }}>
                  Single Courses
                </div>
              }
              className={classes.singleItem}
            />
          </TreeItem>
          <TreeItem
            className={classes.treeItem}
            nodeId="8"
            label={
              <div className={classes.labelTreeItem}>
                <PermIdentityOutlinedIcon
                  style={{ width: "20px", height: "20px", marginBottom: "4px" }}
                />
                Users
              </div>
            }
          >
            <TreeItem
              nodeId="9"
              label={
                <div style={{ marginLeft: "95px", padding: "10px 0px" }}>
                  Instructor
                </div>
              }
              className={classes.singleItem}
              onClick={() => {
                changeSelected(7);
              }}
            />
            <TreeItem
              nodeId="10"
              label={
                <div style={{ marginLeft: "95px", padding: "10px 0px" }}>
                  Students
                </div>
              }
              className={classes.singleItem}
              onClick={() => {
                changeSelected(8);
              }}
            />
            <TreeItem
              nodeId="105"
              label={
                <div style={{ marginLeft: "95px", padding: "10px 0px" }}>
                  Become a teacher
                </div>
              }
              className={classes.singleItem}
              onClick={() => {
                changeSelected(81);
              }}
            />
          </TreeItem>
        </TreeView>
        <Divider light style={{ color: " #dfe4ed" }}>
          Controller
        </Divider>
        <div className="listDivider">
          <List
            sx={style}
            component="nav"
            aria-label="mailbox folders"
            style={{ rowGap: "30px  " }}
          >
            <ListItem
              button
              className={classes.styleList}
              onClick={() => {
                changeSelected(9);
              }}
            >
              <PersonAddAltOutlinedIcon
                style={{ width: "20px", height: "20px", marginBottom: "7px" }}
              />
              <ListItemText primary="Instructor" />
            </ListItem>
            <Divider light />
            <ListItem
              button
              divider
              className={classes.styleList}
              onClick={() => {
                changeSelected(10);
              }}
            >
              <AccountBalanceOutlined
                style={{ width: "20px", height: "20px", marginBottom: "7px" }}
              />
              <ListItemText primary="Accounts" />
            </ListItem>
            <ListItem
              button
              className={classes.styleList}
              onClick={() => {
                changeSelected(11);
              }}
            >
              <MailLockOutlined
                style={{ width: "20px", height: "20px", marginBottom: "7px" }}
              />
              <ListItemText primary="Mails" />
            </ListItem>
            <Divider light />
            <ListItem
              button
              className={classes.styleList}
              onClick={() => {
                changeSelected(12);
              }}
            >
              <SettingsOutlined
                style={{ width: "20px", height: "20px", marginBottom: "7px" }}
              />
              <ListItemText primary="Settings" />
            </ListItem>
          </List>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
