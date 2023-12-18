import { RxHamburgerMenu } from "react-icons/rx";
import Logo from "@icons/main-logo.svg";
import AgriLogo from "@icons/logoAgrihub.svg";
import { FaRegBell } from "react-icons/fa6";
import dp from "@assets/images/dp.svg";
import { SheetTrigger } from "@components/ui/sheet";
import SearchBar from "../search-bar/SearchBar";
import { NavLink } from "react-router-dom";
export default function Topbar() {
  // const toggle = useSelector((state: RootState) => state.sidebar.toggle);
  // const dispatch = useDispatch();

  return (
    <div className="px-6 py-2 bg-white border-b border-border flex justify-between w-full  z-30">
      <div className="flex items-center">
        <SheetTrigger className="md:hidden inline mr-3">
          <RxHamburgerMenu size={20} />
        </SheetTrigger>

        <img className="h-[2.9rem] mr-1" src={Logo} />
        <img
          className="h-[2rem] md:inline hidden mr-3 mb-[.18rem]"
          src={AgriLogo}
        />
        <SearchBar />
      </div>
      <div className="xl:flex hidden items-center justify-center gap-12 text-md   text-[#404040] font-medium">
        <NavLink to={"/"}>Home</NavLink>
        <NavLink
          to={"/forums"}
          className={({ isActive }) =>
            ` ${isActive ? "text-primary" : "text-black"}`
          }
        >
          Forum
        </NavLink>
        <NavLink
          to={"/community"}
          className={({ isActive }) =>
            ` ${isActive ? "text-primary" : "text-black"}`
          }
        >
          Community
        </NavLink>
        <NavLink to={"/article"}>Articles</NavLink>
        <NavLink to={"/blog"}>Blogs</NavLink>
        <NavLink to={""}>About Us</NavLink>
      </div>
      <div className="flex items-center gap-4">
        <FaRegBell size={20} color={"#404040"} />
        <img
          className="h-[2rem] w-[2rem] aspect-square rounded-full"
          src={dp}
        />
      </div>
    </div>
  );
}