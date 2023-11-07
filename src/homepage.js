function searchWord() {
    const selectedWord = document.getElementById("wordList").value; // Get the selected word from the dropdown list
    const endpoint = `https://api.dictionaryapi.dev/api/v2/entries/en/${selectedWord}`; // Use the selected word

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
                const meanings = wordData.meanings;

                // Initialize variables to store information
                let definitionOutput = '';

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
                        const soundUrl = wordData.phonetics && wordData.phonetics.length > 0 ? wordData.phonetics[0].audio : 'N/A';

                        // Build the output for each definition
                        definitionOutput += `
                            <h3>${word} (${partOfSpeech})</h3>
                            <p>Meaning: ${meaningText}</p>
                            <p>Antonyms: ${antonyms}</p>
                            <p>Example: ${example}</p>
                            <audio controls>
                                <source src="${soundUrl}" type="audio/mpeg">
                            </audio>
                        `;
                    });
                });

                // Display the combined output
                document.getElementById("definition").innerHTML = definitionOutput;
            } else {
                document.getElementById("definition").innerHTML = `No definition found for the word "${selectedWord}".`;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById("definition").innerHTML = 'An error occurred while fetching the definition.';
        });
}
