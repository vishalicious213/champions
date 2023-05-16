import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

// firebase settings
const appSettings = {
    databaseURL: "https://champions-4e9b8-default-rtdb.firebaseio.com/"
}

// app elements
const button = document.getElementById("button")
const endorsementInput = document.getElementById("endorsement-input")
const endorsementsList = document.getElementById("endorsements-list")

// ⬇️ EVENT LISTENERS ⬇️

button.addEventListener("click", function() {
    publishEndorsement()
})


// ⬇️ EVENT HANDLERS ⬇️

function publishEndorsement() {
    console.log("clicked")
}


// ⬇️ RENDER THE APP ⬇️

function renderEndorsements() {
    endorsementsList.innerHTML = `
        <div class="endorsement">Hi Bob! Your React Router course is so good. The students are going to LOVE IT. I’m so excited for the launch :) 🔥 Per</div>
    `
}

renderEndorsements()