import React from "react";
import ProfileFooter from "../layout/ProfileFooter/ProfileFooter";
import PropType from "prop-types";
import Navbar from "../layout/Navbar/Navbar";
import { toast } from "react-toastify";
import { Icon } from "../utils/iconutitls";

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
          <Icon name="IoIosArrowForward" />
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
                <Icon
                  name="CgProfile"
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
              <Icon name="IoIosArrowForward" />
            </div>
          </div>
          <div className="setting_item">
            <div className="setting_item_title">How you used Instagram</div>
            {
              <SettingBar
                icon={<Icon name="IoBookmarkOutline" />}
                subitem="Saved"
              />
            }
            {<SettingBar icon={<Icon name="MdRestore" />} subitem="Archive" />}
            {
              <SettingBar
                icon={<Icon name="MdRestore" />}
                subitem="Your activity"
              />
            }
            {
              <SettingBar
                icon={<Icon name="BsFillStarFill" />}
                subitem="Close friends"
              />
            }
            {
              <SettingBar
                icon={<Icon name="FaBell" />}
                subitem="Notifications"
              />
            }
            {<SettingBar icon={<Icon name="RxTimer" />} subitem="Time Spent" />}
          </div>
          <div className="setting_item">
            <div className="setting_item_title">What you use</div>
            {
              <SettingBar
                icon={<Icon name="IoStarOutline" />}
                subitem="Favourities"
              />
            }
            {
              <SettingBar
                icon={<Icon name="FaBellSlash" />}
                subitem="Muted accounts"
              />
            }
            {
              <SettingBar
                icon={<Icon name="FaPhotoFilm" />}
                subitem="Suggested content"
              />
            }
            {
              <SettingBar
                icon={<Icon name="LuHeartOff" />}
                subitem="Like and share counts"
              />
            }
          </div>
          <div className="setting_item">
            <div className="setting_item_title">Who can see your content</div>
            {
              <SettingBar
                icon={<Icon name="FaLock" />}
                subitem="Account privacy"
              />
            }
            {
              <SettingBar
                icon={<Icon name="MdBlockFlipped" />}
                subitem="Blocked"
              />
            }
            {
              <SettingBar
                icon={<Icon name="MdHideSource" />}
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
                icon={<Icon name="RiMessengerLine" />}
                subitem="Messages and story replies"
              />
            }
            {
              <SettingBar
                icon={<Icon name="TiTag" />}
                subitem="Tags and mentions"
              />
            }
            {
              <SettingBar
                icon={<Icon name="FaRegComment" />}
                subitem="Comments"
              />
            }
            {<SettingBar icon={<Icon name="IoMdShare" />} subitem="Sharing" />}
            {
              <SettingBar
                icon={<Icon name="MdBlockFlipped" />}
                subitem="Restricted"
              />
            }
            {
              <SettingBar
                icon={<Icon name="BsExclamationCircle" />}
                subitem="Limited interactions"
              />
            }
            {
              <SettingBar
                icon={<Icon name="MdHideSource" />}
                subitem="Hidden words"
              />
            }
            {
              <SettingBar
                icon={<Icon name="IoPersonAddOutline" />}
                subitem="Follow and invite friends"
              />
            }
          </div>
          <div className="setting_item">
            <div className="setting_item_title">Your app and media</div>
            {
              <SettingBar
                icon={<Icon name="HiOutlineDevicePhoneMobile" />}
                subitem="Device permissions"
              />
            }
            {
              <SettingBar
                icon={<Icon name="MdFileDownload" />}
                subitem="Archiving and downloading"
              />
            }
            {
              <SettingBar
                icon={<Icon name="BsUniversalAccessCircle" />}
                subitem="Accessibility"
              />
            }
            {
              <SettingBar
                icon={<Icon name="IoLanguage" />}
                subitem="Language"
              />
            }
            {
              <SettingBar
                icon={<Icon name="HiChartBar" />}
                subitem="Data usage and media quality"
              />
            }
            {
              <SettingBar
                icon={<Icon name="IoLaptopOutline" />}
                subitem="Website permissions"
              />
            }
          </div>
          <div className="setting_item">
            <div className="setting_item_title">For families</div>
            {
              <SettingBar
                icon={<Icon name="GoPerson" />}
                subitem="Supervision"
              />
            }
          </div>
          <div className="setting_item">
            <div className="setting_item_title">For professionals</div>
            {
              <SettingBar
                icon={<Icon name="BsFileBarGraphFill" />}
                subitem="Account type and tools"
              />
            }
          </div>
          <div className="setting_item">
            <div className="setting_item_title">More info and support</div>
            {<SettingBar icon={<Icon name="FiHelpCircle" />} subitem="Help" />}
            {
              <SettingBar
                icon={<Icon name="GoPerson" />}
                subitem="Account Status"
              />
            }
            {<SettingBar icon={<Icon name="FcAbout" />} subitem="About" />}
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
