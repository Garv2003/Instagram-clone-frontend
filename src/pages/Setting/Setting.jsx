import "./Setting.css";
import ProfileFooter from "../../layout/ProfileFooter/ProfileFooter";
const Setting = ({ setProgress }) => {
  document.title = "Edit Profile • Instagram";
  setProgress(100);
  return (
    <div>
      <div className="setting">
        <div className="settingtitle">
          <h2>Settings</h2>
        </div>
        <div className="setting_body">
          <div className="body1">
            <div className="body11">
              <div className="body11_item ">Accounts Center</div>
              <div className="body11_item fs">Manage your connected </div>
              <div className="body11_item fs">
                experiences and account settings
              </div>
              <div className="body11_item fs">across Meta technologies.</div>
              <div className="body11_item">Personal details</div>
              <div className="body11_item">Password and security</div>
              <div className="body11_item"> Ad preferences </div>
              <div className="body11_item">See more in Accounts Center</div>
            </div>
            <div className="body12">
              <div className="body12_item">Edit profile</div>
              <div className="body12_item">Apps and websites</div>
              <div className="body12_item"> Email notifications</div>
              <div className="body12_item">Push notifications </div>
              <div className="body12_item">What you see</div>
              <div className="body12_item">Who can see your content </div>
              <div className="body12_item">
                How others can interact with you
              </div>
              <div className="body12_item">
                Supervision Help Switch to professional account
              </div>
            </div>
          </div>
          <div className="body2">
            <div className="body2_heading">Edit profile</div>
            <div className="profileinfo">
              <div>
              </div>
              <div>
                <div>username</div>
                <div>Change profile photo</div>
              </div>
            </div>
            <div>name</div>
            <div>phonenumber</div>
            <div>Bio</div>
          </div>
        </div>
      </div>
      <div className="setting_footer">
        <ProfileFooter />
      </div>
    </div>
  );
};

export default Setting;
