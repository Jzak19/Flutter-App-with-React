import React, { useEffect, useState } from "react";
import './GridPane.css';
import getImagesFromStorage from '../js/storageComms';
import deleteImageFromFirebase from "../js/imageDelete";

function GridPane() { //grid pane fetches and desiplays the images from the database and also handles deleting the images. 

    const [images, setImages] = useState([]);

    useEffect(() => {
        // Fetch the images when the component mounts
        const fetchImages = async () => {
        const urls = await getImagesFromStorage();
        setImages(urls);
        };

        fetchImages();
    }, []);

    const [selectedImage, setSelectedImage] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleImageClick = (imageUrl) => {
        console.log("imageclicked: " + imageUrl )
        setSelectedImage(imageUrl);
        setShowModal(true);
    };

    const handleDelete = async () => {
        if (selectedImage) {
        // Call Firebase delete function here
        deleteImageFromFirebase(selectedImage);
        setShowModal(false);
        setSelectedImage(null);
        const urls = await getImagesFromStorage();
        setImages(urls);
        }
    };

    const handleCancel = () => {
        setShowModal(false);
        setSelectedImage(null);
    };

    return (
        <div className="Grid">
            {images.map((url, index) => (
                <div key={index} className="gridItem">
                    <img src={url} alt={`Image ${index + 1}`} onClick={() => handleImageClick(url)} style={{ cursor: "pointer" }}/>
                </div>      
            ))}
            {showModal && (
                <div className="modal">
                    <p>Are you sure you want to delete this image?</p>
                    <button onClick={handleDelete}>Delete</button>
                    <button onClick={handleCancel}>Cancel</button>
                </div>
            )}
        </div>
    );
  }
  
export default GridPane