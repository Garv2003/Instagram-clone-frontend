import React from "react";
import ProfileFooter from "../layout/ProfileFooter/ProfileFooter";
import PropType from "prop-types";
import Navbar from "../layout/Navbar/Navbar";
import { toast } from "react-toastify";
import { IoBookmarkOutline } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { MdRestore } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { BsFillStarFill } from "react-icons/bs";
import { FaBell } from "react-icons/fa";
import { RxTimer } from "react-icons/rx";
import { IoStarOutline } from "react-icons/io5";
import { FaBellSlash } from "react-icons/fa";
import { FaPhotoFilm } from "react-icons/fa6";
import { LuHeartOff } from "react-icons/lu";
import { FaLock } from "react-icons/fa";
import { MdBlockFlipped } from "react-icons/md";
import { MdHideSource } from "react-icons/md";
import { FiHelpCircle } from "react-icons/fi";
import { GoPerson } from "react-icons/go";
import { FcAbout } from "react-icons/fc";
import { BsFileBarGraphFill } from "react-icons/bs";
import { IoLaptopOutline } from "react-icons/io5";
import { HiChartBar } from "react-icons/hi2";
import { IoLanguage } from "react-icons/io5";
import { BsUniversalAccessCircle } from "react-icons/bs";
import { MdFileDownload } from "react-icons/md";
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import { IoPersonAddOutline } from "react-icons/io5";
import { FaRegComment } from "react-icons/fa6";
import { IoMdShare } from "react-icons/io";
import { TiTag } from "react-icons/ti";
import { RiMessengerLine } from "react-icons/ri";
import { BsExclamationCircle } from "react-icons/bs";

const Setting = ({ setProgress }) => {
  React.useEffect(() => {
    setProgress(100);
  }, [setProgress]);

  const Logout = () => {
    localStorage.removeItem("token");
    toast.success("Logout Successfully");
    setTimeout(() => {
      window.location.assign("/login");
    }, 1000);
  };
  const SettingBar = (props) => {
    return (
      <div className="setting_subitem">
        <div className="setting_subitem_left">
          {props.icon}
          <span>{props.subitem}</span>
        </div>
        <div className="setting_subitem_right">
          <IoIosArrowForward />
        </div>
      </div>
    );
  };

  SettingBar.propTypes = {
    icon: PropType.element.isRequired,
    subitem: PropType.string.isRequired,
  };

  return (
    <div className="home">
      <Navbar />
      <div className="posts">
        <div className="setting">
          <div className="setting_header">
            <h1 className="setting_title">Settings and Privacy</h1>
          </div>
          <div>
            <div className="setting_subheader">
              <div
                style={{
                  color: "grey",
                }}
              >
                Your Account
              </div>
              <div>Privacy</div>
            </div>
          </div>
          <div className="setting_subheader">
            <div className="setting_subitem">
              <div className="setting_account">
                <CgProfile
                  style={{
                    fontSize: "40px",
                    color: "grey",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    fontSize: "18px",
                    gap: "2px",
                  }}
                >
                  <div>Account Centre</div>
                  <div
                    style={{
                      color: "grey",
                      fontSize: "14px",
                    }}
                  >
                    Password,security,personal details,ads
                  </div>
                </div>
              </div>
              <IoIosArrowForward />
            </div>
          </div>
          <div className="setting_item">
            <div className="setting_item_title">How you used Instagram</div>
            {<SettingBar icon={<IoBookmarkOutline />} subitem="Saved" />}
            {<SettingBar icon={<MdRestore />} subitem="Archive" />}
            {<SettingBar icon={<MdRestore />} subitem="Your activity" />}
            {<SettingBar icon={<BsFillStarFill />} subitem="Close friends" />}
            {<SettingBar icon={<FaBell />} subitem="Notifications" />}
            {<SettingBar icon={<RxTimer />} subitem="Time Spent" />}
          </div>
          <div className="setting_item">
            <div className="setting_item_title">What you use</div>
            {<SettingBar icon={<IoStarOutline />} subitem="Favourities" />}
            {<SettingBar icon={<FaBellSlash />} subitem="Muted accounts" />}
            {<SettingBar icon={<FaPhotoFilm />} subitem="Suggested content" />}
            {
              <SettingBar
                icon={<LuHeartOff />}
                subitem="Like and share counts"
              />
            }
          </div>
          <div className="setting_item">
            <div className="setting_item_title">Who can see your content</div>
            {<SettingBar icon={<FaLock />} subitem="Account privacy" />}
            {<SettingBar icon={<MdBlockFlipped />} subitem="Blocked" />}
            {
              <SettingBar
                icon={<MdHideSource />}
                subitem="Hide story and live"
              />
            }
          </div>
          <div className="setting_item">
            <div className="setting_item_title">
              How others can interact with you
            </div>
            {
              <SettingBar
                icon={<RiMessengerLine />}
                subitem="Messages and story replies"
              />
            }
            {<SettingBar icon={<TiTag />} subitem="Tags and mentions" />}
            {<SettingBar icon={<FaRegComment />} subitem="Comments" />}
            {<SettingBar icon={<IoMdShare />} subitem="Sharing" />}
            {<SettingBar icon={<MdBlockFlipped />} subitem="Restricted" />}
            {
              <SettingBar
                icon={<BsExclamationCircle />}
                subitem="Limited interactions"
              />
            }
            {<SettingBar icon={<MdHideSource />} subitem="Hidden words" />}
            {
              <SettingBar
                icon={<IoPersonAddOutline />}
                subitem="Follow and invite friends"
              />
            }
          </div>
          <div className="setting_item">
            <div className="setting_item_title">Your app and media</div>
            {
              <SettingBar
                icon={<HiOutlineDevicePhoneMobile />}
                subitem="Device permissions"
              />
            }
            {
              <SettingBar
                icon={<MdFileDownload />}
                subitem="Archiving and downloading"
              />
            }
            {
              <SettingBar
                icon={<BsUniversalAccessCircle />}
                subitem="Accessibility"
              />
            }
            {<SettingBar icon={<IoLanguage />} subitem="Language" />}
            {
              <SettingBar
                icon={<HiChartBar />}
                subitem="Data usage and media quality"
              />
            }
            {
              <SettingBar
                icon={<IoLaptopOutline />}
                subitem="Website permissions"
              />
            }
          </div>
          <div className="setting_item">
            <div className="setting_item_title">For families</div>
            {<SettingBar icon={<GoPerson />} subitem="Supervision" />}
          </div>
          <div className="setting_item">
            <div className="setting_item_title">For professionals</div>
            {
              <SettingBar
                icon={<BsFileBarGraphFill />}
                subitem="Account type and tools"
              />
            }
          </div>
          <div className="setting_item">
            <div className="setting_item_title">More info and support</div>
            {<SettingBar icon={<FiHelpCircle />} subitem="Help" />}
            {<SettingBar icon={<GoPerson />} subitem="Account Status" />}
            {<SettingBar icon={<FcAbout />} subitem="About" />}
          </div>
          <div className="setting_item_login">
            <div className="setting_item_title">Login</div>
            <div
              className="setting_subitem"
              style={{ cursor: "pointer" }}
              onClick={() => {
                window.location.assign("/login");
              }}
            >
              Add account
            </div>
            <div
              onClick={() => {
                Logout();
              }}
              className="setting_subitem"
              style={{ color: "red", cursor: "pointer" }}
            >
              Log out
            </div>
          </div>
          <ProfileFooter />
        </div>
      </div>
    </div>
  );
};

Setting.propTypes = {
  setProgress: PropType.func.isRequired,
};

export default Setting;
