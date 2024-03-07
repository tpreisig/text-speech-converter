const textarea = document.querySelector("textarea"),
    voiceList = document.querySelector("select"),
    speechBtn = document.querySelector("button");

let synth = speechSynthesis,
    isSpeaking = true;

function voices() {
    for (let voice of synth.getVoices()) {
        console.log(voice);
        let selected = voice.name === "Google US English" ? "selected" : "";
        let option = `<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`;
        voiceList.insertAdjacentHTML("beforeend", option);
    }
}
synth.addEventListener("voiceschanged", voices);

function textToSpeech(text) {
    let utterance = new SpeechSynthesisUtterance(text);
    for (let voice of synth.getVoices()) {

        if (voice.name === voiceList.value) {
            utterance.voice = voice;
        }
    }
    synth.speak(utterance);
}
speechBtn.addEventListener("click", (event) => {
    event.preventDefault();
    if (textarea.value !== "") {
        if (!synth.speaking) {
            textToSpeech(textarea.value);
        }
        if (textarea.value.length > 800) {
            if (isSpeaking) {
                synth.resume();
                isSpeaking = false;
                speechBtn.innerText = "Pause speech";
            } else {
                synth.resume();
                isSpeaking = true;
                speechBtn.innerText = "Resume speech";
            }

            setInterval(() => {
                if (!synth.speaking && !isSpeaking) {
                    isSpeaking = true;
                    speechBtn.innerText = "Convert to speech";
                }
            });
        } else {
            speechBtn.innerText = "Convert to speech";
        }
    }
});

