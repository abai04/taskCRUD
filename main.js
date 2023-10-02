let inpName = document.querySelector("#name")
let inpEmail = document.querySelector("#email")
let inpPhone = document.querySelector("#phone")
let inpURL = document.querySelector("#image-url")
let saveBtn = document.querySelector(".save-btn")
let list = document.querySelector("ul")
let readBtn = document.querySelector(".read-btn")

saveBtn.addEventListener("click", () =>{
    if(!inpName.value.trim() || !inpEmail.value.trim() || !inpPhone.value.trim() || !inpURL.value.trim()){
        alert("fill all fields")
        return
    }
    let newContact = {name: inpName.value, email: inpEmail.value, phone: inpPhone.value, image: inpURL.value}
    setToLocalStorage(newContact)

    document.querySelectorAll("input").forEach(el => el.value = "")
})
readBtn.addEventListener("click", () =>{
    createContact()
    
})

function setToLocalStorage(contact){
    if(!localStorage.getItem("contact")){
        localStorage.setItem("contact", JSON.stringify([]))
    }
    let data = JSON.parse(localStorage.getItem("contact"))
    data.push(contact)
    localStorage.setItem("contact", JSON.stringify(data))
}
function createContact(){
    let data = JSON.parse(localStorage.getItem("contact"))
    list.innerHTML = ""

    data.forEach((el, i) =>{
        let li  =document.createElement("li")
        let img = document.createElement("img")
        img.setAttribute("src", el.image)
        let pName = document.createElement("p")
        pName.innerText = el.name
        let pEmail = document.createElement("p")
        pEmail.innerText = el.email    
        let pPhone = document.createElement("p")  
        pPhone.innerText = el.phone 
        let infoBlock = document.createElement("div")
        infoBlock.append(pName)
        infoBlock.append(pEmail)
        infoBlock.append(pPhone)
        infoBlock.style.marginRight = "10px"
        let buttonBlock = document.createElement("div")
        let updateBtn = document.createElement("button")
        let deleteBtn = document.createElement("button")
        updateBtn.innerHTML = "update"
        deleteBtn.innerHTML = "delete"
        buttonBlock.append(updateBtn)
        buttonBlock.append(deleteBtn)
        li.append(img)
        li.append(infoBlock)
        li.append(buttonBlock)
        list.append(li) 
        deleteBtn.addEventListener("click", ()=>{
            deleteContact(i)
        })
        updateBtn.addEventListener("click", ()=>{
            editContact(i)
        })
        li.after(document.createElement("hr"))
    })
}
function deleteContact(index){
    let data = JSON.parse(localStorage.getItem("contact"))
    data.splice(index, 1)
    localStorage.setItem("contact", JSON.stringify(data))
    createContact()
}
let modal = document.querySelector(".main-modal")
let nameEdit = document.querySelector("#name-edit")
let emailEdit = document.querySelector("#email-edit")
let phoneEdit = document.querySelector("#phone-edit")
let imgEdit = document.querySelector("#image-edit")
let closer = document.querySelector(".btn-closer")
let saveEdited = document.querySelector(".btn-save-edit")

let idx = null
function editContact(index){
    modal.style.display = "block"
    let data = JSON.parse(localStorage.getItem("contact"))
    nameEdit.value = data[index].name
    emailEdit.value = data[index].email
    phoneEdit.value = data[index].phone
    imgEdit.value = data[index].image
    idx = index
}
closer.addEventListener("click", () => {
    modal.style.display = "none"
})
saveEdited.addEventListener("click", () =>{
    let data = JSON.parse(localStorage.getItem("contact"))
    if(!nameEdit.value.trim() || !emailEdit.value.trim() || !phoneEdit.value.trim() || !imgEdit.value.trim()){
        alert("fill the field!")
        return
    }
    let editedContact = {name: nameEdit.value, email: emailEdit.value, phone: phoneEdit.value, image: imgEdit.value}
    data.splice(idx, 1, editedContact)
    localStorage.setItem("contact", JSON.stringify(data))
    createContact()
    modal.style.display = "none"
})
