/* 
    Current steps to update the files list:
    1. cd images/gallery
    2. ./write.sh
    3. Copy contents of _files.txt
    4. Paste into the array below
*/

const files = [
    "bridge-1.jpeg","bridge-2.jpeg","bridge-3.jpeg","bridge-4.jpeg","bridge-5.jpeg","bridge-6.jpeg","bridge-7.jpeg","bridge-8.jpeg","bridge-9.jpeg","farm-1.jpeg","farm-2.jpeg","farm-3.jpeg","farm-4.jpeg","farm-5.jpeg","lake-1.jpeg","lake-10.jpeg","lake-11.jpeg","lake-12.jpeg","lake-13.jpeg","lake-14.jpeg","lake-15.jpeg","lake-16.jpeg","lake-17.jpeg","lake-18.jpeg","lake-19.jpeg","lake-20.jpeg","lake-21.jpeg","lake-22.jpeg","lake-23.jpeg","lake-24.jpeg","lake-25.jpeg","lake-26.jpeg","lake-27.jpeg","lake-28.jpeg","lake-29.jpeg","lake-3.jpeg","lake-30.jpeg","lake-4.jpeg","lake-5.jpeg","lake-6.jpeg","lake-8.jpeg","lake-9.jpeg","me5.jpeg","me6.jpeg","sbwy-1.jpeg","sbwy-2.jpeg","sbwy-3.jpeg","sbwy-4b.jpeg","sbwy-4c.jpeg","sbwy-8.jpeg","sunlake-1.jpeg","sunlake-10.jpeg","sunlake-11.jpeg","sunlake-2.jpeg","sunlake-3.jpeg","sunlake-4.jpeg","sunlake-5.jpeg","sunlake-6.jpeg","sunlake-7.jpeg","sunlake-8.jpeg","sunlake-9.jpeg","sunset1.jpeg","sunset10.jpeg","sunset11.jpeg","sunset12.jpeg","sunset13.jpeg","sunset2.jpeg","sunset3.jpeg","sunset4.jpeg","sunset5.jpeg","sunset6.jpeg","sunset7.jpeg","sunset8.jpeg","sunset9.jpeg","trees-1.jpeg","trees-10.jpeg","trees-11.jpeg","trees-12.jpeg","trees-13.jpeg","trees-2.jpeg","trees-3.jpeg","trees-4.jpeg","trees-5.jpeg","trees-6.jpeg","trees-7.jpeg","trees-8.jpeg","trees-9.jpeg"
]

max = files.length
random = Math.floor(Math.random() * max)
chosen = files[random]

frame = document.getElementById("image")
frame.innerHTML = `<a href="images/gallery/${chosen}" target="_blank"><img src="images/gallery/${chosen}"/></a>`