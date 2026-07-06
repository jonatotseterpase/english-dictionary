async function searchWord() {
    const word = document.getElementById("word").value.trim();
    const result = document.getElementById("result");

    if (word === "") {
        result.innerHTML = "<p>Please enter a word.</p>";
        return;
    }

    result.innerHTML = "<p>🔍 Searching...</p>";

    try {
        const response = await fetch(
            `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
        );

        if (!response.ok) {
            throw new Error("Word not found");
        }

        const data = await response.json();

        const entry = data[0];
        const meaning = entry.meanings[0];
        const definition = meaning.definitions[0];

        result.innerHTML = `
            <h2>${entry.word}</h2>

            <p><strong>Pronunciation:</strong>
            ${entry.phonetic || "Not available"}</p>

            <p><strong>Part of Speech:</strong>
            ${meaning.partOfSpeech}</p>

            <p><strong>Meaning:</strong>
            ${definition.definition}</p>

            <p><strong>Example:</strong>
            ${definition.example || "No example available."}</p>
        `;
    } catch (error) {
        result.innerHTML =
            "<p>❌ Sorry, that word could not be found.</p>";
    }
}
