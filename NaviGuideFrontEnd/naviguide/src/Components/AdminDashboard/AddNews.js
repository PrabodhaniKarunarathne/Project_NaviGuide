import axios from "axios";
import React, { useState } from "react";

const AddNews = () => {
    const [newsTopic, setNewsTopic] = useState('');
    const [newsDescription, setNewsDescription] = useState('');
    const [newsPublishDate, setNewsPublishDate] = useState('');
    const [selectedImages, setSelectedImages] = useState([]);
    const [newsImages,setNewsImages]=useState([]);
    const [error,setError]=useState([]);
    const [loading,setLoading]=useState(false);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedImages([...selectedImages, ...files]);
    };

    const uploadImage = async (image) => {

        const formData = new FormData();
        formData.append('image', image);
        try {

            const response = await axios.post("api/user/uploadimages", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            const imageUrl = response.data;
            return imageUrl.url;
        } catch (error) {
            alert("Error uploading images");
            console.error("Error uploading image:", error);
            return null;
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const uploadedImageUrls = [];
        for (const image of selectedImages) {
            const imageUrl = await uploadImage(image);
            if (imageUrl) {
                uploadedImageUrls.push(imageUrl.toString());
            }
        }        
    
        try {
            const response = await axios.post(
                "/api/news/savenews",
                {
                    newsTopic: newsTopic,
                    newsDescription: newsDescription,
                    newsPublishDate: newsPublishDate,
                    newsImages: uploadedImageUrls // Send array of strings directly
                }
            );
    
            if (response.status === 200) {
                alert("News published Successfully");
                setNewsDescription("");
                setNewsTopic("");
                setNewsPublishDate("");
                setSelectedImages([]); 
                window.location.reload();
            } else {
                alert('Unexpected response status :' + response.status);
            }
        } catch (error) {
            alert(`News publish failed due to an error: ${error}`);
            console.error("Error publishing news:", error);
        }        
    };
    

    return (
        <section>
            <form onSubmit={handleFormSubmit}>
                <h1 className='pveventstopics'>Publish News</h1>
                <div id="eventcardnew">
                    <div id="neweventform">
                        <div id="formdivevent">
                            <div id="content" className="content">
                                
                                <div>
                                    <div className="row">
                                        <div className="cardreg">
                                            <label htmlFor="eventName">News topic</label>
                                            <input
                                                type="text"
                                                className="inputssinglenews"
                                                name="newsName"
                                                id="eventName"
                                                value={newsTopic}
                                                onChange={(e) => setNewsTopic(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="cardreg">
                                            <label htmlFor="eventDescription">News description</label>
                                            <textarea
                                                id="eventDescription"
                                                name="newsDescription"
                                                className="inputssinglenews"
                                                value={newsDescription}
                                                onChange={(e) => setNewsDescription(e.target.value)}
                                            ></textarea>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="cardreg">
                                            <label htmlFor="eventDate">Date publish</label>
                                            <input
                                                id="eventDate"
                                                className="inputssinglenews"
                                                type="date"
                                                name="newsDate"
                                                value={newsPublishDate}
                                                onChange={(e) => setNewsPublishDate(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="rowimagesevent">
                                        <div className="neweventform">
                                            <label htmlFor="eventVenue">Pictures (Max : 6 pictures)</label>
                                            <div className="pics">
                                                <div className="picdiv">
                                                    {selectedImages.map((image, index) => (
                                                        <img key={index} className="pictures" alt={`Image ${index + 1}`} src={URL.createObjectURL(image)} />
                                                    ))}
                                                </div>
                                                <div className="imagesupload">
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        name="img1"
                                                        onChange={handleImageChange}
                                                        className="eventImages"
                                                    />
                                                                <input
                                                                type="file"
                                                                accept="image/*"
                                                                className="eventImages"
                                                                name="img2"
                                                                onChange={handleImageChange}
                                                            />
                                                            <input
                                                                type="file"
                                                                accept="image/*"
                                                                
                                                                className="eventImages"
                                                                name="img3"
                                                                onChange={handleImageChange}
                                                            />
                                                            <input
                                                                type="file"
                                                                
                                                                accept="image/*"
                                                                className="eventImages"
                                                                name="img4"
                                                                onChange={handleImageChange}
                                                            />

                                                            <input
                                                                type="file"
                                                               
                                                                accept="image/*"
                                                                className="eventImages"
                                                                name="img5"
                                                                onChange={handleImageChange}
                                                            />

                                                            <input
                                                                type="file"
                                                               
                                                                accept="image/*"
                                                                className="eventImages"
                                                                name="img6"
                                                                onChange={handleImageChange}
                                                            />
                                                    
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="btnsaveevent">
                            <input type="submit" className="devbtn" id="publishnewsbtn" value="Publish" />
                        </div>
                    </div>
                </div>
            </form>
        </section>
    );
}

export default AddNews;
