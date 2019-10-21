const paperURLS = document.querySelectorAll('.paper-url');;
const table = document.querySelector(".papers-table");
const addRowButton = document.querySelector(".add-row-button");
const deleteRowButton = document.querySelector(".delete-row-button");
const submitButton = document.querySelector(".submit-button");

const newRowMarkup = `
    <td>
        <input type="text" class="paper-url" placeholder="Paper URL">
    </td>
    <td class="paperTitle"></td>
    <td class="Authors"></td>
    <td class="journalName"></td>
`

document.addEventListener('click', function(e) {
    if (e.target === addRowButton) {
        addNewRow();
    } else if (e.target === deleteRowButton) {
        deleteLastRow();
    } else if (e.target === submitButton) {
        sendURLsToServer()
    }
})

const sendURLsToServer = () => {
    let urlArray = [];
    paperURLS.forEach(paper => {
        urlArray.push(paper.value);
    })

    fetch('data/retrieve', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({ paperURLs: urlArray })
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))
}

const addNewRow = () => {
    const newRow = document.createElement('tr');
    document.body.appendChild(newRow);
    newRow.innerHTML = newRowMarkup;
    table.appendChild(newRow);
}

const deleteLastRow = () => {
    const rows = document.getElementsByTagName('tr');
    const lastRow = rows[rows.length - 1];
    table.removeChild(lastRow);
};