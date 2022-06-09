import react from "react";

const Post = ({ username, message, description, timestamp }) => {
  return (
    <div className="post w-80 p-5 h-fit bg-white rounded text-gray-500 my-5">
      <h1 className="text-2xl font-semibold">{username}</h1>
      <p className="text-gray-400 mb-4">{description}</p>
      <p>{message}</p>
      <p className="text-gray-400 text-sm mt-5 w-full flex  justify-end">
        {timestamp}
      </p>
    </div>
  );
};

export default Post;
