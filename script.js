async function searchWord() {
    const word = document.getElementById("word").value.trim();
    const result = document.getElementById("result");

    if (word === "") {
        result.innerHTML = "<p>Please enter a word.</p>";
        return;
    }

    result.innerHTML = "<p>🔍 Searching...</p>";

    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);

        if (!response.ok) {
            throw new Error("Word not found");
        }

        const data = await response.json();

        const entry = data[0];

        let phonetic = entry.phonetic || "Not available";

        let audio = "";
        const audioObj = entry.phonetics.find(p => p.audio);

        if (audioObj) {
            audio = `
            <audio controls>
                <source src="${audioObj.audio}" type="audio/mpeg">
            </audio>`;
        }

        let meaningsHTML = "";

        entry.meanings.forEach(meaning => {

            meaningsHTML += `
            <h3>${meaning.partOfSpeech}</h3>
            <ol>
            `;

            meaning.definitions.forEach(def => {

                meaningsHTML += `
                <li>
                    <strong>Meaning:</strong> ${def.definition}<br>

                    ${def.example ? `<strong>Example:</strong> ${def.example}<br>` : ""}

                    ${meaning.synonyms.length ? `<strong>Synonyms:</strong> ${meaning.synonyms.slice(0,5).join(", ")}<br>` : ""}
                </li><br>
                `;
            });

            meaningsHTML += "</ol>";
        });

        result.innerHTML = `
            <h2>${entry.word}</h2>

            <p><strong>Pronunciation:</strong> ${phonetic}</p>

            ${audio}

            ${meaningsHTML}
        `;

    } catch (error) {

        result.innerHTML =
        "<p>❌ Sorry, that word could not be found.</p>";

    }
}
