const table = document.getElementById("gallery");

const files = [
    "cat",
    "sbwy-1",
    "sbwy-2",
    "sbwy-3",
    "sbwy-4b",
    "sbwy-4c",
    "sbwy-8"
];

const tableWidth = 4;

let htmlString = "";

for (let i = 0; i < files.length; i++) {
    const filename = files[i]

    // Start of row
    if (i % tableWidth == 0) {
        htmlString += `
        <tr>
            <td>
                <img src=\"images/gallery/${filename}.png\">
            </td>
        `
    }
    // End of row
    else if (i % tableWidth == tableWidth - 1) {
        htmlString += `
            <td>
                <img src=\"images/gallery/${filename}.png\">
            </td>
        </tr>
        `
    }
    // Middle of row
    else {
        htmlString += `
            <td>
                <img src=\"images/gallery/${filename}.png\">
            </td>`
    }
}

table.innerHTML = htmlString