import { IconType } from "react-icons";
import { FaGraduationCap, FaCode } from "react-icons/fa";
import { HiMiniPaintBrush } from "react-icons/hi2";

type TimelineItem = {
  college: string;
  date: string;
  title: string;
  desc: string;
  icon: IconType;
};

export const timeline: TimelineItem[] = [
  {
    icon: HiMiniPaintBrush,
    college: "Sai Dham Food bank",
    date: "Jan.2026 - Apr.2026",
    title: "Graphic Designer / Marketing Intern",
    desc: "Designed marketing materials and gained hands-on experience applying design in a real workplace.",
  },
  {
    icon: FaGraduationCap,
    college: "Humber College, Etobicoke, ON, Canada",
    date: "Jan 2024 - Apr 2026",
    title: "Advertising and Graphic Design",
    desc: "Broadened my skills with design, typography, and branding to pair with my development background.",
  },
  {
    icon: HiMiniPaintBrush,
    college: "Aarambha Flex Print, Chitwan, Nepal",
    date: "Nov 2022 - Aug 2023",
    title: "Graphic designer / Web developer",
    desc: "Designed logos, branding, ads, and social media assets for print and digital clients using Photoshop, Illustrator, and InDesign.",
  },
  {
    icon: FaCode,
    college: "Crystal Technologies, Chitwan, Nepal",
    date: "Feb 2020 - Oct 2022",
    title: "Web Developer",
    desc: "Built and maintained websites for clients, my first professional step into development.",
  },
  {
    icon: FaGraduationCap,
    college: "Nepal Polytechnic Institute, Chitwan, Nepal",
    date: "2018 - 2021",
    title: "Diploma in Computer Engineering",
    desc: "Started my path toward becoming a software developer, building a base in programming and computer systems.",
  },
];
