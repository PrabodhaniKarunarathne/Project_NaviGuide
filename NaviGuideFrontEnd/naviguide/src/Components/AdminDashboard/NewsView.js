import React, { useEffect, useState } from "react";
import axios from "axios";
import ImagePreview from "./ImagePreview";

const NewsView =() => {
    const [error, setError] = useState(null);
    const [newsList, setNewsList] = useState(null);
    const [deletePressed,setDeletePressed]=useState(null);
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
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const responseUser = await axios.get('/api/user/profile');
                setUser(responseUser.data);
            } catch (error) {
                setError(error.message);
                console.error('Failed to fetch user data: ', error);
            }
        };
        fetchUserData();
        
    }, []);

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
                                        <div id="namesandbtn">
                                            <h1 className="eventnameheduled">{news.newsTopic}</h1>
                                            <h5>{news.newsPublishDate}</h5>
                                        </div>
                                        <div id="completeeventbtndeletediv">
                                        <button
                                            className="devbtn"
                                            id="deletebtneventcompleted"
                                            onClick={() => setDeletePressed(news.newsTopic)}
                                        >
                                            Delete
                                        </button>
                                        </div>
                                    </div>
                                    <div id="eventDetails">
                                        <p>{news.newsDescription}</p>
                                    </div>
                                    <div className="containerimg">
                                        <ImagePreview imageList={news.newsImages} />
                                    </div>
                                    {deletePressed===news.newsTopic?(
                                        
                                        <div class="button mt-2 d-flex flex-row align-items-center">
                                            <div id="eventDetails">
                                                <p>Do you want to delete the item ?</p>
                                            </div>
                                            {user?(
                                                <div>
                                                    <button className="sidebarbtn" id="editadminbtnno" onClick={()=>setDeletePressed(null)} >No</button>
                                                    <button className="sidebarbtn" id="deleteadminbtnyes" onClick={(e)=>deleteNews(news.newsTopic,news.newsPublishDate,e)} >Yes</button>
                                                </div>
                                            ):(
                                                <div  className="button mt-2 d-flex flex-row align-items-center">
                                                    
                                                </div>
                                            )}
                                            
                                        </div>
                                    ):(
                                        <div>

                                        </div>
                                    )}
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

export default NewsView;
