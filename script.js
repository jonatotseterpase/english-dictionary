function searchWord() {
    const word = document.getElementById("word").value;

    if (word === "") {
        alert("Please enter a word.");
        return;
    }

    document.getElementById("result").innerHTML =
        "<h2>" + word + "</h2>" +
        "<p><strong>Dictionary search will be connected in the next step.</strong></p>";
}
