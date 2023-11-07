function searchWord() {
    const word = document.getElementById("searchWord").value;
    const endpoint = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

    fetch(endpoint)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (Array.isArray(data) && data.length > 0) {
                const wordData = data[0];
                const word = wordData.word;
                const phonetic = wordData.phonetic;
                const phonetics = wordData.phonetics;
                const meanings = wordData.meanings;

                // Initialize variables to store information
                let definitionOutput = '';

                // Display word and phonetic information
                definitionOutput += `
                    <h2>Word Information:</h2>
                    <p>Word: "${word}"</p>
                    <p>Phonetic: "${phonetic}"</p>
                `;

                // Loop through phonetics
                phonetics.forEach(phoneticInfo => {
                    definitionOutput += `
                        <p>Phonetics:</p>
                        <ul>
                            <li>Text: "${phoneticInfo.text}"</li>
                            <li>Audio: <a href="${phoneticInfo.audio}" target="_blank">Audio Pronunciation</a></li>
                            <li>Source URL: <a href="${phoneticInfo.sourceUrl}" target="_blank">Source URL on Wikimedia Commons</a></li>
                            <li>License: ${phoneticInfo.license.name} (<a href="${phoneticInfo.license.url}" target="_blank">License Details</a>)</li>
                        </ul>
                    `;
                });

                // Loop through meanings for different parts of speech
                meanings.forEach(meaning => {
                    const partOfSpeech = meaning.partOfSpeech;
                    const definitions = meaning.definitions;

                    // Loop through definitions for the same part of speech
                    definitions.forEach(definition => {
                        const meaningText = definition.definition;
                        const antonymsArray = definition.antonyms;
                        const antonyms = antonymsArray && antonymsArray.length > 0 ? antonymsArray.join(', ') : 'N/A';
                        const example = definition.example || 'N/A';
                        const soundUrl = phonetics.length > 0 ? phonetics[0].audio : 'N/A';

                        // Build the output for each definition
                        definitionOutput += `
                            <h3>${word} (${partOfSpeech}):</h3>
                            <p>Meaning: "${meaningText}"</p>
                            <p>Antonyms: ${antonyms}</p>
                            <p>Example: "${example}"</p>
                            <audio controls>
                                <source src="${soundUrl}" type="audio/mpeg">
                            </audio>
                        `;
                    });
                });

                // Display the combined output
                document.getElementById("definition").innerHTML = definitionOutput;
            } else {
                document.getElementById("definition").innerHTML = `No definition found for the word "${word}".`;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById("definition").innerHTML = 'An error occurred while fetching the definition.';
        });
}
