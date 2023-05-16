const button = document.getElementById("button")
const endorsementInput = document.getElementById("endorsement")
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