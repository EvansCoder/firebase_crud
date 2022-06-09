import { useState, useEffect } from "react";
import Head from "next/head";
import Post from "../components/Post";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  serverTimestamp,
  addDoc,
} from "firebase/firestore";

const Users = () => {
  const [posts, setPosts] = useState([]);
  const [input, setInput] = useState("");
  const usersCollectionRef = collection(db, "users");
  const timestamp = serverTimestamp();

  useEffect(() => {
    const getPost = async () => {
      const data = await getDocs(usersCollectionRef);
      setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPost();
  }, []);

  const sendPost = () => {
    if (input.trim() === "") {
      alert("Please enter a message");
      return;
    }
    addDoc(usersCollectionRef, {
      username: "Wanga Evans",
      description: "Senior Developer",
      message: input,
      timestamp: timestamp,
    });
setInput("");
  }
  return (
    <div>
      <Head>
        <title>Users</title>
      </Head>
      <div className="bg-gray-100 w-screen h-screen">
        <div className="p-20 ">
          <h1 className="text-4xl text-blue-600">
            Creating Posts with Firebase Firestore
          </h1>
          <div className="container w-40 h-fit bg-gray-100">
            <div className="flex items-center border-2 rounded-full bg-white min-w-fit pr-10 pl-2 py-4 my-4 ">
              <input
                onChange={(e) => setInput(e.target.value)}
                type="text"
                placeholder="Type here your message"
                className="bg-transparent outline-none ml-5"
              />
              <button type="submit" onClick={sendPost} className="flex">
                <p className="text-white ">Pos</p>
                <img
                  className="w-8 h-6"
                  src="https://cdn-icons-png.flaticon.com/512/561/561226.png"
                  alt=""
                />
              </button>
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-600">
                Recent Posts
              </h1>
              {posts.map(
                ({ id,data:{ username, message, description, timestamp} }) => {
                  return (
                    <Post
                      key={id}
                      username={username}
                      description={description}
                      message={message}
                      timestamp={timestamp}
                    />
                  );
                }
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users
