const contextInput = document.getElementById("context-input");
const contextQuote = document.getElementById("context-quote");
const contextMention = document.getElementById("context-mention");
const quoteInput = document.getElementById("quote-input");
const mentionInput = document.getElementById("mention-input");
const mentionStart = document.getElementById("mention-start");
const mentionFirst = document.getElementById("mention-first");
const mentionMan = document.getElementById("mention-man");
const mentionWoman = document.getElementById("mention-woman");
const mentionEnv = document.getElementById("mention-env");
const submitButton = document.getElementById("submit");


function hashCode(s) {
    for(var i = 0, h = 0; i < s.length; i++)
        h = Math.imul(31, h) + s.charCodeAt(i) | 0;
    return h;
};

function handleTyping(event){
    const contextLength = document.getElementById("context-length");
    const length = contextInput.value.length;
    contextLength.textContent = `context length: ${length}`;
}

function handleCopy(event){
    const selected = event.target.value.substring(event.target.selectionStart, event.target.selectionEnd);
    localStorage.setItem("selected", selected);
    localStorage.setItem("selected_start", event.target.selectionStart);
};

function handlePasteQuote(event){
    const selected = localStorage.getItem("selected");
    quoteInput.value = selected;
}

function handlePasteMention(event){
    mentionInput.value = localStorage.getItem("selected");
    mentionStart.value = localStorage.getItem("selected_start");
}

function handleSubmit(event){
    data = {
        "context": contextInput.value,
        "quote": quoteInput.value,
        "mention": mentionInput.value,
        "mention_start": mentionStart.value,
        "mention_first": mentionFirst.checked,
        "mention_env": mentionEnv.checked,
        "gender": document.querySelector('input[name="gender"]:checked').value,
        "age": document.querySelector('input[name="age"]:checked').value,
        // "sentiment": document.querySelector('input[name="sentiment"]:checked').value,
    };

    fileName = hashCode(data.context);

    const anchor = document.createElement("a");
    document.body.appendChild(anchor);
    data_string = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data));
    anchor.setAttribute('href', data_string);
    anchor.setAttribute('download', `${fileName}.json`);
    anchor.click();

    contextInput.value = "";
    quoteInput.value = "";
    mentionInput.value = "";
    mentionStart.value = "";
    mentionFirst.checked = false;
    mentionEnv.checked = false;
    document.querySelector('#gender_unknown').checked = true;
    document.querySelector('#age_unknown').checked = true;
    document.querySelector('#sentiment_neutral').checked = true;



}

contextInput.addEventListener("keyup", handleTyping);
contextInput.addEventListener("select", handleCopy);
contextQuote.addEventListener("click", handlePasteQuote);
contextMention.addEventListener("click", handlePasteMention);
submitButton.addEventListener("click", handleSubmit);