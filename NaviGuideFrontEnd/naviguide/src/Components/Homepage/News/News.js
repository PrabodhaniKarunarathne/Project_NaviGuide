import React, { useEffect, useState } from "react";
import axios from "axios";
import ImagePreview from "../../AdminDashboard/ImagePreview";

const News =() => {
    const [error, setError] = useState(null);
    const [newsList, setNewsList] = useState(null);
    const [user,setUser]=useState(null);

    useEffect(() => {
        const fetchNewsList = async () => {
            try {
                const responseNews = await axios.get("/api/news/getallnews");
                setNewsList(responseNews.data);
            } catch (error) {
                setError(error.message);
                console.error('Failed to fetch News : ', error);
            }
        };
        fetchNewsList();
    }, []);


    async function deleteNews(newsTopic,newsPublishDate,e){
        e.preventDefault();

        try{
            const responsedelete= await axios.delete(
                `/api/news/deletenews/${newsTopic}/${newsPublishDate}`
            );
            alert("News Deleted Successfull");
            window.location.reload();
        } catch (err) {
            alert("News Deletion Failed: Network Error");
            console.error('Failed to delete news: ', err);
        }

    }   

    return (
        <section>
            <div id="completedEvents">
                <h1 className="pveventstopics">Published News</h1>
                <ul>
                    {newsList && newsList.length > 0 ? (
                        newsList.map(news => (
                            <li key={news.newsTopic} className="adminlist">
                                <div className="eventcard">
                                    <div id="eventNameSchedule">
                                        <div id="namesandbtnnewshome">
                                            <h1 className="eventnameheduled">{news.newsTopic}</h1>
                                            <h5>{news.newsPublishDate}</h5>
                                        </div>
                                        <div id="completeeventbtndeletediv">
                                        
                                     
                                        </div>
                                    </div>
                                    <div id="eventDetails">
                                        <p>{news.newsDescription}</p>
                                    </div>
                                    <div className="containerimg">
                                        <ImagePreview imageList={news.newsImages} />
                                    </div>
                                    
                                </div>
                            </li>
                        ))
                    ) : (
                        <div></div>
                    )}
                </ul>
            </div>
        </section>
    );
}

export default News;
