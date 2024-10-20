import React, { useEffect, useState } from "react";

import MDEditor from "@uiw/react-md-editor";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";
import databasesService from "../../appwrite/Databases";
import { Input } from "../";

function PostForm({ post }) {
  const [value, setValue] = useState("" || post?.content);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    title: post?.title || "",
    summary: post?.summary || "",
    content: post?.content || "",
  });
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setFormData((prevFormData) => ({ ...prevFormData, content: value, userId: user.$id }));
  }, [value, user.$id]);

  function onSubmit(ev) {
    ev.preventDefault();

    setIsCreating(true);

    if (post) {
      // do something
      databasesService
        .updateArticle(formData, post.$id)
        .then((res) => {
          navigate(`/post/${res.$id}`);
        })
        .catch((error) => alert("failed to update article"))
        .finally(() => setIsCreating(false));
    } else {
      databasesService
        .createArticle(formData)
        .then((res) => {
          navigate(`/post/${res.$id}`);
        })
        .catch((err) => alert("failed to create article"))
        .finally(() => setIsCreating(false));
    }
  }

  function handleInputChange(ev) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [ev.target.name]: ev.target.value,
    }));
  }

  return (
    <div className="max-w-xl mx-auto p-5">
      <h2 className="text-2xl font-bold mb-5">Create New Content</h2>
      <form className="space-y-4" onSubmit={onSubmit}>
        <Input
          value={formData.title}
          label="Title"
          type="text"
          name="title"
          placeholder="Title"
          onChange={handleInputChange}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="summary">
            Summary
          </label>
          <textarea
            value={formData.summary}
            onChange={handleInputChange}
            name="summary"
            id="summary"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-blue-500"
            rows="3"
            required></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="content">
            Content
          </label>
          <MDEditor value={value} onChange={setValue} />
          {/* <MDEditor.Markdown source={value} style={{ whiteSpace: "pre-wrap" }} /> */}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200">
          {isCreating ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
}

export default PostForm;
