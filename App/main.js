import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {
    getDatabase,
    ref,
    push,
    onValue,
    remove
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-20f1c-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const fruitsInDB = ref(database, "fruits")


const myInput = document.getElementById("my-input")
const inputBtn = document.getElementById("input-btn")
let myList = document.querySelector(".my-list")

inputBtn.addEventListener("click", () => {
    let inputValue = myInput.value
    push(fruitsInDB, inputValue)
    clearList()

})

onValue(fruitsInDB, function (snapshot) {

    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
        clearFruitsList()
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            appendList(currentItem)
        }
    } else {
        myList.innerHTML = "Please add Items .. No Items Available"
    }

})

function clearFruitsList() {
    myList.innerHTML = ""
}
function clearList() {
    myInput.value = ""
}
function appendList(item) { // myList.innerHTML += `<li> ${itemValue}</li>`
    let itemID = item[0]
    let itemValue = item[1]
    let newEl = document.createElement("li")
    newEl.textContent = itemValue

    newEl.addEventListener("click", function () {
        let exactLocationItemInDB = ref(database, `fruits/${itemID}`)
        remove(exactLocationItemInDB)
    })


    myList.append(newEl)

}
