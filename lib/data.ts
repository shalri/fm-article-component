import FacebookIcon from "../public/images/icon-facebook.svg";
import PinterestIcon from "../public/images/icon-pinterest.svg";
import TwitterIcon from "../public/images/icon-twitter.svg";
import drawersImg from "../public/images/drawers.jpg";
import michelleAvatar from "../public/images/avatar-michelle.jpg";

export const Articles = [
  {
    id: 1,
    title: "Accent Furniture",
    heading:
      "Shift the overall look and feel by adding these wonderful touches to furniture in your home",
    intro:
      "Ever been in a room and felt like something was missing? Perhhaps it felt slightly bare and uninviting. I've got some simple tips to help you make any room feel complete.",
    author: {
      name: "Michelle Appleton",
      img: michelleAvatar,
    },
    date: "28 Jun 2020",
    img: drawersImg,
  },
];

export const shareLinks = [
  {
    site: "Facebook",
    icon: FacebookIcon,
    url: "https://github.com/shalri",
  },
  {
    site: "Twitter",
    icon: TwitterIcon,
    url: "#",
  },
  {
    site: "Pinterest",
    icon: PinterestIcon,
    url: "#",
  },
];
