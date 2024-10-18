import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { PostForm } from "../../components";
import databasesService from "../../appwrite/Databases";

function EditPost() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { postId } = useParams();

  useEffect(() => {
    databasesService
      .getArticle(postId)
      .then((article) => {
        console.log(article);

        setPost(article);
      })
      .catch((error) => {
        alert("Failed to fetch post to edit");
        console.log(error);
      })
      .finally(() => setLoading(false));
  }, [post, postId]);

  return loading ? <div className="text-red-500">Loading...</div> : <PostForm post={post} />;
}

export default EditPost;
