/* 
    Current steps to update the files list:
    1. cd images/gallery
    2. ./write.sh
    3. Copy contents of _files.txt
    4. Paste into the array below
    5. Upload new images and gallery.js
*/

const files = [
    "braunfels-1.jpeg","braunfels-2.jpeg","bridge-1.jpeg","bridge-2.jpeg","bridge-3.jpeg","bridge-4.jpeg","bridge-5.jpeg","bridge-6.jpeg","bridge-7.jpeg","bridge-8.jpeg","bridge-9.jpeg","corner-1.jpeg","corner-10.jpeg","corner-11.jpeg","corner-12.jpeg","corner-13.jpeg","corner-14.jpeg","corner-15.jpeg","corner-16.jpeg","corner-17.jpeg","corner-2.jpeg","corner-3.jpeg","corner-4.jpeg","corner-5.jpeg","corner-6.jpeg","corner-7.jpeg","corner-8.jpeg","corner-9.jpeg","farm-1.jpeg","farm-10.jpeg","farm-11.jpeg","farm-12.jpeg","farm-13.jpeg","farm-14.jpeg","farm-15.jpeg","farm-16.jpeg","farm-17.jpeg","farm-18.jpeg","farm-2.jpeg","farm-3.jpeg","farm-4.jpeg","farm-5.jpeg","farm-6.jpeg","farm-7.jpeg","farm-8.jpeg","farm-9.jpeg","lake-1.jpeg","lake-10.jpeg","lake-11.jpeg","lake-12.jpeg","lake-13.jpeg","lake-14.jpeg","lake-15.jpeg","lake-16.jpeg","lake-17.jpeg","lake-18.jpeg","lake-19.jpeg","lake-20.jpeg","lake-21.jpeg","lake-22.jpeg","lake-23.jpeg","lake-24.jpeg","lake-25.jpeg","lake-26.jpeg","lake-27.jpeg","lake-28.jpeg","lake-29.jpeg","lake-3.jpeg","lake-30.jpeg","lake-31.jpeg","lake-32.jpeg","lake-34.jpeg","lake-35.jpeg","lake-36.jpeg","lake-37.jpeg","lake-38.jpeg","lake-39.jpeg","lake-4.jpeg","lake-40.jpeg","lake-41.jpeg","lake-42.jpeg","lake-43.jpeg","lake-44.jpeg","lake-45.jpeg","lake-46.jpeg","lake-47.jpeg","lake-48.jpeg","lake-49.jpeg","lake-5.jpeg","lake-50.jpeg","lake-51.jpeg","lake-52.jpeg","lake-53.jpeg","lake-54.jpeg","lake-55.jpeg","lake-6.jpeg","lake-8.jpeg","lake-9.jpeg","leopard-1.jpeg","leopard-10.jpeg","leopard-11.jpeg","leopard-12.jpeg","leopard-13.jpeg","leopard-2.jpeg","leopard-3.jpeg","leopard-4.jpeg","leopard-5.jpeg","leopard-6.jpeg","leopard-7.jpeg","leopard-8.jpeg","leopard-9.jpeg","lights-1.jpeg","lights-10.jpeg","lights-11.jpeg","lights-12.jpeg","lights-13.jpeg","lights-14.jpeg","lights-2.jpeg","lights-3.jpeg","lights-4.jpeg","lights-5.jpeg","lights-6.jpeg","lights-7.jpeg","lights-8.jpeg","lights-9.jpeg","love-1.jpeg","love-2.jpeg","love-3.jpeg","love-4.jpeg","love-5.jpeg","love-6.jpeg","love-7.jpeg","love-8.jpeg","me5.jpeg","me6.jpeg","sbwy-1.jpeg","sbwy-2.jpeg","sbwy-3.jpeg","sbwy-4b.jpeg","sbwy-4c.jpeg","sbwy-8.jpeg","sunlake-1.jpeg","sunlake-10.jpeg","sunlake-11.jpeg","sunlake-12.jpeg","sunlake-13.jpeg","sunlake-14.jpeg","sunlake-15.jpeg","sunlake-16.jpeg","sunlake-17.jpeg","sunlake-18.jpeg","sunlake-2.jpeg","sunlake-3.jpeg","sunlake-4.jpeg","sunlake-5.jpeg","sunlake-6.jpeg","sunlake-7.jpeg","sunlake-8.jpeg","sunlake-9.jpeg","sunset1.jpeg","sunset10.jpeg","sunset11.jpeg","sunset12.jpeg","sunset13.jpeg","sunset2.jpeg","sunset3.jpeg","sunset4.jpeg","sunset5.jpeg","sunset6.jpeg","sunset7.jpeg","sunset8.jpeg","sunset9.jpeg","swans-1.jpeg","swans-10.jpeg","swans-11.jpeg","swans-12.jpeg","swans-13.jpeg","swans-14.jpeg","swans-15.jpeg","swans-16.jpeg","swans-17.jpeg","swans-18.jpeg","swans-19.jpeg","swans-2.jpeg","swans-20.jpeg","swans-21.jpeg","swans-3.jpeg","swans-4.jpeg","swans-5.jpeg","swans-6.jpeg","swans-7.jpeg","swans-8.jpeg","swans-9.jpeg","tlb-1.jpeg","tlb-2.jpeg","tlb-3.jpeg","tlb-4.jpeg","tlb-5.jpeg","tlb-6.jpeg","trees-1.jpeg","trees-10.jpeg","trees-11.jpeg","trees-12.jpeg","trees-13.jpeg","trees-2.jpeg","trees-3.jpeg","trees-4.jpeg","trees-5.jpeg","trees-6.jpeg","trees-7.jpeg","trees-8.jpeg","trees-9.jpeg"
]


/* Setting the image */

frame = document.getElementById("image")
info = document.getElementById("info")

max = files.length
index = Math.floor(Math.random() * max)

const setImage = (index) => {
    chosen = files[index]
    frame.innerHTML = `<a href="images/gallery/${chosen}" target="_blank"><img src="images/gallery/${chosen}"/></a>`
    info.innerHTML = `${index + 1} / ${max}`
}

setImage(index)


/* Left and right buttons */

left = document.getElementById("left-button");
right = document.getElementById("right-button");

left.onclick = function() {
    moveLeft()
};
right.onclick = function() {
    moveRight()
};


/* Functions */

const moveLeft = () => {
    console.log("moveLeft")
    if (index > 0) {
        index -= 1;
    }
    else {
        index = max - 1
    }
    setImage(index)
};

const moveRight = () => {
    console.log("moveRight")
    if (index < max - 1) {
        index += 1;
    }
    else {
        index = 0
    }
    setImage(index)
};