const imageContainer = document.getElementById("img-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photoArray = [];

//unsplash API
const count = 10; //how many images we wanna see, diffault valueis 10
const apiKey = "Snts7sDnFlyjzyUFzZFsE8Vp2A8xEjd7QSt2tGTf6nQ";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded(){ 
  console.log("image loaded");
  imagesLoaded++;
  if(imagesLoaded === totalImages){
    ready = true;
    console.log("ready =", ready);
  }
}

// helper func to set atrributes on dom elements
function setAttribute(element, atrributes) {
  for (const key in atrributes) {
    element.setAttribute(key, atrributes[key]);
  }
}

// create element for links nd photos
function displayPhotos() {
  totalImages = photoArray.length;
  imagesLoaded = 0;
  // run a func for each object in photoarray
  photoArray.forEach((photo) => {
    // create <a> to link to unsplash
    const item = document.createElement("a");
    setAttribute(item, {
      href: photo.links.html,
      target: "_blank",
    });
    // create <img> for photo
    const img = document.createElement("img");
    setAttribute(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description
    });

    // event listener, check when
    img.addEventListener('load', imageLoaded );

    // put img inside anchor tag
    item.append(img);

    // put anchor inside img-container
    imageContainer.appendChild(item);
  });
}

// get photos from unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photoArray = await response.json();
    displayPhotos();
  } catch (error) {
    console.log(error);
  }
}

// check to see if scrolling near bottom of the pg , lad more potos
window.addEventListener("scroll", () => {
  if(window.scrollY + window.innerHeight > document.body.offsetHeight && ready)
    {
      ready = false;
      getPhotos();
    }
});

// onload
getPhotos();

