const table = document.getElementById("gallery");

/* 
    Filenames need to be added manually here,
    because apparently you can't scan files in client-side JS.
*/

const files = [
    "cat",
    "smile",
    "cat2",
    "sbwy-1",
    "sbwy-3",
    "sbwy-4c",
    "sbwy-8",
    "rbj",
    "c-c",
    "c-f",
    "etc1",
    "etc2",
    "me3",
    "me4",
    "me6",
    "sunset1",
    "sunset2",
    "sunset3",
    "sunset4",
    "sunset5",
    "sunset6",
    "sunset7",
    "sunset8",
    "sunset9"
];

max = files.length
random = Math.floor(Math.random() * max)
chosen = files[random]

frame = document.getElementById("image")
frame.innerHTML = `<img src=\"images/gallery/${chosen}.png\">`

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