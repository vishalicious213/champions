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
            "msg": endorsementInput.value,
            "likes": 0,
            "liked": false
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
    array.reverse()

    array.forEach(item => {
        itemsToRender += `
            <div class="endorsement">
                <div><b>To: ${item[1].to}</b></div>
                <div class="msg">${item[1].msg}</div>
                <div class="from-likes">
                    <div><b>From: ${item[1].from}</b></div>
                    <div class="liked">
                        <div id="${item[0]}" class="likes">${item[1].likes}</div>
                        <div class="heart">${item[1].liked ? "❤️" : "🖤"}</div>
                    </div>
                </div>
            </div>
        `
    })

    endorsementsList.innerHTML = itemsToRender
}

function renderEndorsements() {
    onValue(endorsementsInDB, function(snapshot) {
        if (snapshot.exists()) {
            let endorsementsArray = Object.entries(snapshot.val())
            console.log(endorsementsArray)
            renderEndorsementsArray(endorsementsArray)
        } else {
            endorsementsList.innerHTML = `
                <div>Send an endorsement to someone to see it here!</div>
            `
        }
    })
}

renderEndorsements()