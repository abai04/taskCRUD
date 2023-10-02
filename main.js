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
    document.querySelectorAll("li").forEach(el=>{
            el.after(document.createElement("hr"))
        })
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
        li.innerHTML = `<img src="${el.image}" alt="" srcset="">
            <div style="margin-right: 10px" class="info">
                <p>${el.name}</p>
                <p>${el.email}</p>
                <p>${el.phone}</p>
            </div>
            <div><button class = "update-btn" style = "padding: 0px 10px; height: 20px">update</button>
            <button class = "delete-btn" style = "padding: 0px 10px; height: 20px">delete</button>
            </div>                    
            `
        list.append(li) 
        let btnDelete = document.querySelector(".delete-btn")
        console.log(btnDelete);
        btnDelete.onclick = () => deleteContact(i)              
    })
}
function deleteContact(index){
    let data = JSON.parse(localStorage.getItem("contact"))
    data.splice(index, 1)
    localStorage.setItem("contact", JSON.stringify(data))
    createContact()
}
