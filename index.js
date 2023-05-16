import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

// firebase settings
const appSettings = {
    databaseURL: "https://champions-4e9b8-default-rtdb.firebaseio.com/"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementsInDB = ref(database, "endorsements")

// app elements
const button = document.getElementById("button")
const endorsementInput = document.getElementById("endorsement-input")
const endorsementsList = document.getElementById("endorsements-list")
const fromInput = document.getElementById("from")
const toInput = document.getElementById("to")

// ⬇️ EVENT LISTENERS ⬇️

button.addEventListener("click", function() {
    publishEndorsement()
})

// ⬇️ EVENT HANDLERS ⬇️

function publishEndorsement() {
    if (endorsementInput.value && fromInput.value && toInput.value) {
        let item = {
            "from": fromInput.value,
            "to": toInput.value,
            "msg": endorsementInput.value
        }
        push(endorsementsInDB, item)
        endorsementInput.value = ""
        fromInput.value = ""
        toInput.value = ""
    }
}

// ⬇️ RENDER THE APP ⬇️

function renderEndorsementsArray(array) {
    let itemsToRender = ""

    array.forEach(item => {
        itemsToRender += `
            <div class="endorsement">${item[1]}</div>
        `
    })

    endorsementsList.innerHTML = itemsToRender
}

function renderEndorsements() {
    onValue(endorsementsInDB, function(snapshot) {
        if (snapshot.exists()) {
            let endorsementsArray = Object.entries(snapshot.val())
            renderEndorsementsArray(endorsementsArray)
        } else {
            endorsementsList.innerHTML = `
                <div>Send an endorsement to someone to see it here!</div>
            `
        }
    })
}

renderEndorsements()