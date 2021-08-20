import { RiBarChartBoxLine, RiHeartPulseLine } from "react-icons/ri";
import {
  IoHammerOutline,
  IoPeopleOutline,
  IoPlanetOutline,
} from "react-icons/io5";
import { AiOutlineCalculator } from "react-icons/ai";

export const asideList = [
  { id: 0, title: "board", path: "/dashboard/board", icon: RiBarChartBoxLine },
  {
    id: 1,
    title: "order book",
    path: "/dashboard/order-book",
    icon: IoHammerOutline,
  },
  { id: 2, title: "market", path: "/dashboard/market", icon: RiHeartPulseLine },
  {
    id: 3,
    title: "auto copy trader",
    path: "/dashboard/auto_copy_trader",
    icon: IoPeopleOutline,
  },
  { id: 4, title: "calc", path: "/dashboard/calc", icon: AiOutlineCalculator },
  { id: 5, title: "news", path: "/dashboard/news", icon: IoPlanetOutline },
];
