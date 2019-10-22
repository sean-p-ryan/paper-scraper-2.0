var paperURLS = document.querySelectorAll('.paper-url');
const table = document.querySelector(".papers-table");
const addRowButton = document.querySelector(".add-row-button");
const deleteRowButton = document.querySelector(".delete-row-button");
const submitButton = document.querySelector(".submit-button");

const newRowMarkup = `
    <td class="paper-title"></td>
    <td class="authors"></td>
    <td class="journal-name"></td>
    <td>
    <input type="text" class="paper-url" placeholder="Paper URL">
    <td class="tweet"></td>
</td>
`

document.addEventListener('click', function(e) {
    if (e.target === addRowButton) {
        addNewRow();
    } else if (e.target === deleteRowButton) {
        deleteLastRow();
    } else if (e.target === submitButton) {
        getAllPaperData()
    }
})

const getAllPaperData = () => {
    let urlArray = [];
    paperURLS.forEach(paper => {
        urlArray.push(paper.value);
    })

    for (let i = 0; i < urlArray.length; i++) {
        const response = fetch('data/retrieve', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                },
                body: JSON.stringify({
                    paperURL: urlArray[i],
                    row: i + 1
                })
            })
            .then(res => res.json())
            .then(json => {
                console.log("should be data" + json)
                const row = i + 1;
                addPaperDataToTable(json, row)
            })
            .catch(err => console.log("There's been an error: " + err))
    }
};

const addPaperDataToTable = (paperData, row) => {
    const paperTitleCell = document.querySelectorAll('.paper-title');
    const authorsCell = document.querySelectorAll('.authors');
    const journalCell = document.querySelectorAll('.journal-name');
    const tweetCell = document.querySelectorAll('.tweet');

    const journalNameText = getCleanJournalName(paperData[3]);
    const authorsText = getCleanAuthorsString(paperData[2]);
    const pdfUrl = getPdfUrl(paperData[4])

    paperTitleCell[row - 1].innerText = paperData[1];
    authorsCell[row - 1].innerText = authorsText;
    journalCell[row - 1].innerText = journalNameText;
    tweetCell[row - 1].innerText = "Read " + paperData[1] + " in " + journalNameText + " by " + authorsText + ": " + pdfUrl;
}

function getCleanAuthorsString(authors) {
    var newAuthorString = '';
    for (let i = 0; i <= authors.length; i++) {
        var char = authors.charAt(i);
        var nextChar = authors.charAt(i + 1);
        if (i < authors.length - 1 && (char === char.toLowerCase()) && char != ' ' && nextChar != ' ' && (nextChar === nextChar.toUpperCase())) {
            newAuthorString += char + ', ';
        } else {
            newAuthorString += char;
        }
    }
    return newAuthorString;
}

function getCleanJournalName(journalString) {
    let closedParenIndex = journalString.indexOf(')');
    let newJournalString = '';
    for (i = 0; i <= closedParenIndex; i++) {
        newJournalString += journalString[i];
    }
    return newJournalString;
}

function getPdfUrl(urlString) {
    let indexOfAmp = urlString.indexOf('&');
    let newUrlString = '';
    newUrlString += 'https://dl.acm.org/'
    for (i = 0; i < indexOfAmp; i++) {
        newUrlString += urlString.charAt(i);
    }
    return newUrlString;
}

const addNewRow = () => {
    const newRow = document.createElement('tr');
    document.body.appendChild(newRow);
    newRow.innerHTML = newRowMarkup;
    table.appendChild(newRow);
    setPaperURLs();
}

const deleteLastRow = () => {
    const rows = document.getElementsByTagName('tr');
    const lastRow = rows[rows.length - 1];
    table.removeChild(lastRow);
    setPaperURLs();
};

const setPaperURLs = () => {
    paperURLS = document.querySelectorAll('.paper-url');
}