import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import Markdown from "markdown-to-jsx";
import { useParams } from "react-router-dom";

import "./singlepost.css";
import { PostActions } from "../";
import { useAuth } from "../../hooks/useAuth";
import databasesService from "../../appwrite/Databases";

function SinglePost() {
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState({});
  const { postId } = useParams();
  const { user } = useAuth();

  const isAuthor = user.$id === post.userId;

  useEffect(
    function () {
      databasesService
        .getArticle(postId)
        .then((article) => {
          setPost(article);
        })
        .finally(() => setLoading(false));

      return () => setPost({});
    },
    [postId],
  );

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div className="markdown">
      <Markdown>{post.content}</Markdown>
      {/* Action Buttons */}
      {isAuthor && <PostActions post={post} />}
    </div>
  );
}

export default SinglePost;
