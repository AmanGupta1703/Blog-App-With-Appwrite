import React from "react";

import { Link } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";
import { PostActions } from "../";

function Post({ post }) {
  const { user } = useAuth();

  const isAuthor = user.$id === post.userId;

  return (
    <Link to={`/post/${post.$id}`}>
      <div
        className="w-full mx-auto flex flex-col md:flex-row p-4 duration-200 items-center mb-4 bg-white shadow-md rounded-lg hover:bg-gray-100 cursor-pointer"
        key={post.$id}>
        {/* Left Column - Image Placeholder */}
        <div className="flex-none h-32 w-32 border border-gray-300 rounded-lg overflow-hidden mb-4 md:mb-0">
          <div className="flex items-center justify-center h-full bg-gray-200">
            <span className="text-gray-400">No Image</span>
          </div>
        </div>

        {/* Right Column - Title and Summary */}
        <div className="flex-grow md:ml-4">
          <h2 className="text-xl font-bold text-gray-800 mb-2">{post.title}</h2>
          <p className="text-gray-700">{post.summary}</p>
        </div>

        {isAuthor && <PostActions post={post} />}
      </div>
    </Link>
  );
}

export default Post;
