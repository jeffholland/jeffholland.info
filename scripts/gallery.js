const table = document.getElementById("gallery");

/* 
    Filenames need to be added manually here,
    because apparently you can't scan files in client-side JS.
*/

const files = ["bridge-1.jpeg","bridge-2.jpeg","bridge-3.jpeg","bridge-4.jpeg","bridge-5.jpeg","bridge-6.jpeg","bridge-7.jpeg","bridge-8.jpeg","bridge-9.jpeg","cat2.jpeg","etc1.jpeg","etc3.jpeg","me5.jpeg","me6.jpeg","sbwy-1.jpeg","sbwy-2.jpeg","sbwy-3.jpeg","sbwy-4b.jpeg","sbwy-4c.jpeg","sbwy-8.jpeg","sunset1.jpeg","sunset2.jpeg","sunset3.jpeg","sunset4.jpeg","sunset5.jpeg","sunset6.jpeg","sunset7.jpeg","sunset8.jpeg","sunset9.jpeg"];

max = files.length
random = Math.floor(Math.random() * max)
chosen = files[random]

frame = document.getElementById("image")
frame.innerHTML = `<a href="images/gallery/${chosen}" target="_blank"><img src="images/gallery/${chosen}"/></a>`

// const tableWidth = 4;

// let htmlString = "";

// for (let i = 0; i < files.length; i++) {
//     const filename = files[i]

//     // Start of row
//     if (i % tableWidth == 0) {
//         htmlString += "<tr>"
//     }

//     htmlString += `
//         <td>
//             <a href=\"images/gallery/${filename}.png\" target="_blank">
//                 <img src=\"images/gallery/${filename}.png\">
//             </a>
//         </td>
//     `
//     // End of row
//     if (i % tableWidth == tableWidth - 1) {
//         htmlString += "</tr>"
//     }
// }

// table.innerHTML = htmlString