import React, { useState } from "react";
import "./AdminDashboard.css";

const ImagePreview = ({ imageList }) => {
    const [mainImage, setMainImage] = useState(imageList[0]);
    
    const changeMainImage = (image) => {
        setMainImage(image);
    };

    return (
        <div>
            <div className="main_view">
                <img src={mainImage} id="main" alt="No image Available" />
            </div>
            <div className="side_view">
                {imageList && imageList.length > 0 && imageList.map((image, index) => (
                    <img className="previewImage"
                        key={index}
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        onClick={() => changeMainImage(image)}
                    />
                ))}
            </div>
        </div>
    );
}

export default ImagePreview;
