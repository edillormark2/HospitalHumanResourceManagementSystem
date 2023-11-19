import React, { useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import { Divider } from "@mui/joy";
import { IoIosMore, IoMdLink } from "react-icons/io";
import { BiLike, BiComment, BiSolidLike } from "react-icons/bi";
import { FaLink } from "react-icons/fa6";
import { FiFile } from "react-icons/fi";

const PostMaterials = ({ postData }) => {
  const { currentColor } = useStateContext();
  const { src, name, date, title, description, link, pdfLink } = postData;

  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState(1);
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    if (!liked) {
      setLikes(likes + 1);
      setLiked(true);
    } else {
      setLikes(likes - 1);
      setLiked(false);
    }
  };

  const dynamicHoverColor = `hover:bg-${currentColor}`;

  return (
    <div className="bg-white p-4 rounded-2xl shadow-lg mb-4">
      <div className="flex justify-end">
        <button type="button" className="text-xl font-semibold text-gray-500">
          <IoIosMore />
        </button>
      </div>
      <div className="flex items-center mb-4 gap-5">
        <img
          src={src}
          alt="User"
          className="w-12 h-12 rounded-full mr-3 drop-shadow-md "
        />
        <div>
          <p className="font-semibold text-lg">
            {name}
          </p>

          <p className="text-gray-500 text-sm">
            {date}
          </p>
        </div>
      </div>
      <Divider />
      <h2 className="text-xl font-bold  m-4">
        {title}
      </h2>
      <div>
        <p className="text-gray-600  text-sm mb-4 m-4">
          {description}
        </p>
      </div>
      <div className="flex mb-4 mt-5 gap-1 m-5">
        <div className="flex gap-2 text-black text-sm bg-gray-200 hover:bg-gray-300 p-2 rounded-lg">
          <IoMdLink />
          <a href={link} target="_blank" rel="noopener noreferrer">
            Video Link
          </a>
        </div>
        <div className="flex gap-2 text-black text-sm bg-gray-200 hover:bg-gray-300 p-2 rounded-lg">
          <FiFile />
          <a href={pdfLink} target="_blank" rel="noopener noreferrer">
            PDF File
          </a>
        </div>
      </div>

      <div className="flex justify-between mt-2 text-sm mb-3">
        <p>
          {likes} like
        </p>
        <p className="gap-1">
          {comments} comment
        </p>
      </div>
      <Divider />
      <div className="flex items-center gap-20 mt-4">
        <div className="flex gap-1 cursor-pointer" onClick={handleLike}>
          {liked
            ? <BiSolidLike size={20} color="blue" />
            : <BiLike size={20} color="black" />}
          <p className="text-sm">Like</p>
        </div>
        <div className="flex gap-1 cursor-pointer">
          <BiComment size={20} />
          <p className="text-sm"> Comment</p>
        </div>
      </div>
    </div>
  );
};

export default PostMaterials;
