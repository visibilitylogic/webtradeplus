import { RiBarChartBoxLine, RiHeartPulseLine } from "react-icons/ri";
import {
  IoHammerOutline,
  IoPeopleOutline,
  IoPlanetOutline,
} from "react-icons/io5";
import { AiOutlineCalculator } from "react-icons/ai";
import { FaMoneyCheckAlt, FaAward } from "react-icons/fa";
export const asideList = [
  { id: 0, title: "board", path: "/dashboard/board", icon: RiBarChartBoxLine },
  {
    id: 1,
    title: "order book",
    path: "/dashboard/order-book",
    icon: IoHammerOutline,
  },
  {
    id: 2,
    title: "Finances",
    path: "/dashboard/finances",
    icon: FaMoneyCheckAlt,
  },
  { id: 3, title: "market", path: "/dashboard/market", icon: RiHeartPulseLine },
  {
    id: 4,
    title: "auto copy trader",
    path: "/dashboard/auto_copy_trader",
    icon: IoPeopleOutline,
  },
  { id: 5, title: "calc", path: "/dashboard/calc", icon: AiOutlineCalculator },
  // { id: 6, title: "news", path: "/dashboard/news", icon: IoPlanetOutline },
  {
    id: 7,
    title: "Leader Board",
    path: "/dashboard/leaderboard",
    icon: FaAward,
  },
];
