import React, { useState, useEffect } from "react";

import databasesService from "../../appwrite/Databases";
import { HeroSection, Post } from "../../components";
import { useAuth } from "../../hooks/useAuth";

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      databasesService
        .getArticles()
        .then((articles) => {
          setError(null);
          setPosts(articles.documents); // Set the posts state
        })
        .catch((error) => {
          setError(error.message);
          console.error("Error fetching articles:", error); // Handle errors
        })
        .finally(() => setLoading(false));
    }
  }, [isLoggedIn]);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <>
      {!isLoggedIn ? (
        <HeroSection />
      ) : (
        <>
          {loading ? (
            <div className="flex items-center justify-center h-screen">
              <h1 className="text-xl font-semibold text-gray-600">Loading...</h1>
            </div>
          ) : (
            posts.map((post) => <Post key={post.$id} post={post} />)
          )}
        </>
      )}
    </>
  );
}

export default HomePage;
