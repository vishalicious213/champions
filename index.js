import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, update, off } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
import { v4 as uuidv4} from 'https://jspm.dev/uuid'

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

// ⬇️ HELPERS ⬇️

function checkForUUID() {
    if (localStorage.championsId) {
        console.log(localStorage.championsId)
    } else {
        localStorage.setItem("championsId", uuidv4())
    }
}

function removeVisitor(visitorsArray) {
    console.log('arr', visitorsArray)

    const visitorToRemove = visitorsArray.filter(function(item) {
        return item === localStorage.getItem("championsId")
    })[0]

    console.log(visitorToRemove)

    const removalIndex = visitorsArray.indexOf(visitorToRemove)

    console.log(removalIndex)

    const newArr = visitorsArray.splice(removalIndex, 1)

    console.log(newArr)
    console.log(visitorsArray)
}

// ⬇️ EVENT LISTENERS ⬇️

button.addEventListener("click", function() {
    publishEndorsement()
})

endorsementsList.addEventListener("click", function(e) {
    if (e.target.className === "heart") {
        clickHeart(e.target.dataset.id)
    }
})

// ⬇️ EVENT HANDLERS ⬇️

function publishEndorsement() {
    if (endorsementInput.value && fromInput.value && toInput.value) {
        let item = {
            "from": fromInput.value,
            "to": toInput.value,
            "msg": endorsementInput.value,
            "likes": 0,
            "likedBy": ["None"]
        }
        push(endorsementsInDB, item)
        endorsementInput.value = ""
        fromInput.value = ""
        toInput.value = ""
    }
}

function clickHeart(id) {
    const clickedEndorsement = ref(database, `endorsements/${id}`)

    onValue(clickedEndorsement, (snapshot) => {
        const itemData = snapshot.val()
        const visitor = localStorage.getItem("championsId")
        let likedByArr = itemData.likedBy

        off(clickedEndorsement)

        if (likedByArr.find(item => item === visitor)) {
            const indexToRemove = likedByArr.indexOf(visitor)
            likedByArr.splice(indexToRemove, 1)
            update(clickedEndorsement, {
                "likedBy": likedByArr
            })
            .catch(err => console.log(err))
        } else {
            likedByArr.push(visitor)
            update(clickedEndorsement, {
                "likedBy": likedByArr
            })
            .catch(err => console.log(err))
        }
    })
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
                        <div data-id="${item[0]}" class="heart">${item[1].likedBy ? "❤️" : "🖤"}</div>
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
            renderEndorsementsArray(endorsementsArray)
        } else {
            endorsementsList.innerHTML = `
                <div>Send an endorsement to someone to see it here!</div>
            `
        }
    })
}

checkForUUID()
renderEndorsements()