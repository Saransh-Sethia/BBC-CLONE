import { addDoc, collection, doc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, database } from "../firebase/setup";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Comments = ({url}) => {
    const [comments, setComments] = useState("");
    const [newsData, setNewsData] = useState([])

    const addComments = async() => {
        const newsDoc = doc(database, "/News", `${url.substr(-10,10)}`);
        const commentsRef = collection(newsDoc, "Comments");
        auth.currentUser === null && toast.error("Please login")
        try{
           auth.currentUser && await addDoc(commentsRef,{
                comments: comments,
                name: auth.currentUser.displayName,
                profileImg: auth.currentUser.photoURL

            });
            auth.currentUser && toast.success("Comment added successfully.")
            setComments("")
        } catch(error){
            console.log(error)
        }
        
    }

    const showComments = async() => {
        const newsDoc = doc(database, "/News", `${url.substr(-10,10)}`);
        const commentsRef = collection(newsDoc, "Comments")
        try{
            const data = await getDocs(commentsRef);
            const filteredData = data.docs.map((doc)=>({
               ...doc.data(),
               id:doc.id,
            }));
            setNewsData(filteredData)
        }catch(error){
            console.log(error)
        }
        
    }

    useEffect(() => {
        showComments()
    },[newsData])
  return (
    <div className="grid grid-rows-2">
      <div className="p-5">
        <label
          htmlFor="Add Comments"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Add Comments
        </label>
        <div className="flex">
        <input
          type="text"
          onChange={(e)=>setComments(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Comments"
          value={comments}
          required
        />
        <button onClick={addComments} className="bg-gray-50  border border-gray-300 hover:bg-slate-500 text-gray-900 text-sm py-2 px-4 rounded ml-2">
          Add
        </button>
        </div>
      </div>
      <div className="h-2 p-4">
      {
        newsData.map((news,id) => {
            return(
                <>
                <div className="flex" key={id}>
                    <img src={news.profileImg} className="rounded-full w-5 h-5"/>
                    <h3 className="font-semibold ml-2 text-sm text-slate-500">{news.name.toUpperCase()}</h3>
                
                </div>
                <h4 className="ml-7">{news.comments}</h4>
                </>
            )
        })
      }
      </div>
      <ToastContainer autoClose={3000}/>
    </div>
  );
};

export default Comments;
