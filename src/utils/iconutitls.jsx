import { RxAvatar } from "react-icons/rx";
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import { IoSend } from "react-icons/io5";
import { MdEmojiEmotions } from "react-icons/md";
import { MdInsertPhoto } from "react-icons/md";
import { MdError } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import { FaComment } from "react-icons/fa6";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { MdOutlineChatBubbleOutline } from "react-icons/md";
import { FaTelegramPlane } from "react-icons/fa";
import { MdBookmarkBorder } from "react-icons/md";
import { FaBookmark } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import { BsVolumeMuteFill } from "react-icons/bs";
import { BsVolumeUpFill } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { GrFormPreviousLink } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { FaCamera } from "react-icons/fa";
import { IoBookmarkOutline } from "react-icons/io5";
import { MdOutlineSlideshow } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import { MdOutlineModeNight } from "react-icons/md";
import { MdOutlineAccessTime } from "react-icons/md";
import { MdMoreHoriz } from "react-icons/md";
import { IoPersonCircleSharp } from "react-icons/io5";
import { GrHomeRounded } from "react-icons/gr";
import { IoSearch } from "react-icons/io5";
import { MdOutlineExplore } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { BsPlusSquare } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { GiHamburgerMenu } from "react-icons/gi";
import { BiSolidMoviePlay } from "react-icons/bi";
import { RiMessengerLine } from "react-icons/ri";
import { FaInstagram } from "react-icons/fa";
import { MdVisibilityOff, MdVisibility } from "react-icons/md";
import { MdRestore } from "react-icons/md";
import { IoArrowBack } from "react-icons/io5";
import { MdOutlineRotateLeft } from "react-icons/md";
import { IoPersonAddOutline } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import { MdCircleNotifications } from "react-icons/md";
import { MdOutlineLocationOn } from "react-icons/md";
import { BsChatDotsFill } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
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
import { IoMdShare } from "react-icons/io";
import { TiTag } from "react-icons/ti";
import { BsExclamationCircle } from "react-icons/bs";
import { IoMdArrowBack } from "react-icons/io";
import { FaRegBookmark } from "react-icons/fa";
import { MdOutlineGridOn } from "react-icons/md";

import PropType from "prop-types";

export const Icon = ({ name, ...props }) => {
  const icons = {
    RxAvatar,
    IoMdArrowRoundBack,
    IoEllipsisHorizontalSharp,
    IoSend,
    MdEmojiEmotions,
    MdInsertPhoto,
    MdError,
    MdFavorite,
    FaComment,
    MdOutlineFavoriteBorder,
    MdOutlineChatBubbleOutline,
    FaTelegramPlane,
    MdBookmarkBorder,
    FaBookmark,
    FaPlay,
    BsVolumeMuteFill,
    BsVolumeUpFill,
    FaRegComment,
    RxCross2,
    GrFormPreviousLink,
    MdDelete,
    MdEdit,
    FaCamera,
    IoBookmarkOutline,
    MdOutlineSlideshow,
    IoIosSettings,
    MdOutlineModeNight,
    MdOutlineAccessTime,
    MdMoreHoriz,
    IoPersonCircleSharp,
    GrHomeRounded,
    IoSearch,
    MdOutlineExplore,
    FaRegHeart,
    BsPlusSquare,
    CgProfile,
    GiHamburgerMenu,
    BiSolidMoviePlay,
    RiMessengerLine,
    FaInstagram,
    MdVisibilityOff,
    MdVisibility,
    MdRestore,
    IoArrowBack,
    MdOutlineRotateLeft,
    IoPersonAddOutline,
    FaChevronDown,
    PiDotsThreeOutlineFill,
    MdCircleNotifications,
    MdOutlineLocationOn,
    BsChatDotsFill,
    FaSearch,
    IoIosArrowForward,
    BsFillStarFill,
    FaBell,
    RxTimer,
    IoStarOutline,
    FaBellSlash,
    FaPhotoFilm,
    LuHeartOff,
    FaLock,
    MdBlockFlipped,
    MdHideSource,
    FiHelpCircle,
    GoPerson,
    FcAbout,
    BsFileBarGraphFill,
    IoLaptopOutline,
    HiChartBar,
    IoLanguage,
    BsUniversalAccessCircle,
    MdFileDownload,
    HiOutlineDevicePhoneMobile,
    IoMdShare,
    TiTag,
    BsExclamationCircle,
    IoMdArrowBack,
    FaRegBookmark,
    MdOutlineGridOn,
  };

  const Icon = icons[name];
  return <Icon {...props} />;
};

Icon.propTypes = {
  name: PropType.string.isRequired,
};
