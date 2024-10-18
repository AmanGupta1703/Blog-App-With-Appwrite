import React from "react";

import { Link } from "react-router-dom";

import databasesService from "../../appwrite/Databases";

function PostActions({ post }) {
  function handleDeletePost(postId) {
    databasesService.deleteArticle(postId).then(() => {
      alert("Post deleted successfully");
      // Refresh the page
      window.location.reload();
    });
  }

  return (
    <div className="mt-4 flex space-x-2">
      <Link to={`/edit-post/${post.$id}`} className="text-blue-500 hover:underline">
        Edit
      </Link>
      <button onClick={() => handleDeletePost(post.$id)} className="text-red-500 hover:underline">
        Delete
      </button>
    </div>
  );
}

export default PostActions;
