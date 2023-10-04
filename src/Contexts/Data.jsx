import { men, women } from "./UsersImages";
import PostImages from "./PostImages";

const getRandom = () => {
  const arrCopy = [...PostImages];
  const randomIndex = Math.floor(Math.random() * arrCopy.length);
  return arrCopy.splice(randomIndex, 1)[0];
};

const Accounts = [
  {
    id: 0,
    username: "Kaled",
    profilepic: men[Math.floor(Math.random() * men.length)],
    posts: [getRandom(), getRandom(), getRandom()],
  },
  {
    id: 1,
    username: "Layan",
    profilepic: women[Math.floor(Math.random() * men.length)],
    posts: [getRandom(), getRandom(), getRandom()],
  },
  {
    id: 2,
    username: "Ibrahim",
    profilepic: men[Math.floor(Math.random() * men.length)],
    posts: [getRandom(), getRandom(), getRandom()],
  },
  {
    id: 3,
    username: "Sama",
    profilepic: women[Math.floor(Math.random() * men.length)],
    posts: [getRandom(), getRandom(), getRandom()],
  },
  {
    id: 4,
    username: "Mohammed",
    profilepic: men[Math.floor(Math.random() * men.length)],
    posts: [getRandom(), getRandom(), getRandom()],
  },
  {
    id: 5,
    username: "Leen",
    profilepic: women[Math.floor(Math.random() * men.length)],
    posts: [getRandom(), getRandom(), getRandom()],
  },
];

export default Accounts;
