function ImageShow({image}) {
    return <img src= {image.urls.small} alt = {image.alt_description}></img>
}

export default ImageShow;