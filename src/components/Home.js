import React, { useEffect, useState } from "react";
import axios from "axios";

import Cards from "./Cards";
import { Link } from "react-router-dom";
import {doc,setDoc} from 'firebase/firestore';
import { database } from "../firebase/setup";

const Home = ({ menu, search }) => {

  const [news, setNews] = useState([]);

  const getNews = async () => {
    const response = await axios.get(
      `https://newsapi.org/v2/everything?q=${
        menu ? menu : "bitcoin"
      }&sortBy=popularity&apiKey=defc48fb054f4f0590915bae7cd8a726`
    );
    const result = response.data.articles;
    console.log("result", result);
    setNews(result);
  };

  const addNews = async(info) => {
    const newsDoc = doc(database, "News", `${info.url.substr(-10,10)}`)
    try{
      await setDoc(newsDoc,{
        title: info.title,
        description: info.description,
      })
    } catch(error){
      console.log(error)
    }

  }

  useEffect(() => {
    getNews();
  }, [menu]);
  return (
    <div className="mt-20 p-5 grid grid-cols-4">
      {news
        ?.filter((info) => info.title.toLowerCase().includes(search))
        .map((info, id) => {
          return (
            <>
              <Link to="/details" onClick={()=>addNews(info)} state={{info:info}}>
                <Cards info={info} id={id} />
              </Link>
            </>
          );
        })}
    </div>
  );
};

export default Home;
