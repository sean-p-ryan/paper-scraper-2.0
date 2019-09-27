const paperURLS = document.querySelectorAll('.paper-url');
const table = document.querySelector(".papers-table");
const addRowButton = document.querySelector(".add-row-button");
const deleteRowButton = document.querySelector(".delete-row-button");

const newRowMarkup = `
    <td>
        <input type="text" name="paperUrl" placeholder="Paper URL">
    </td>
    <td class="paperTitle"></td>
    <td class="Authors"></td>
    <td class="journalName"></td>
`


const getAllPapers = async () => {
    const response = await fetch('/papers/all');
    const json = await response.json();
    const shows = json.results;
    console.log(shows);
    getShowNames(shows);
}

document.addEventListener('click', function (e) {
    if (e.target === addRowButton) {
        addNewRow();
    } else if (e.target === deleteRowButton) {
        deleteLastRow();
    }
})

const addNewRow = () => {
    const newRow = document.createElement('tr');
    document.body.appendChild(newRow);
    newRow.innerHTML = newRowMarkup;    
    table.appendChild(newRow);
}

const deleteLastRow = () => {
    const rows = document.getElementsByTagName('tr');
    const lastRow = rows[rows.length-1];
    table.removeChild(lastRow);
}

