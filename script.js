let title = document.getElementById('title')
let price = document.getElementById('price')
let taxes = document.getElementById('taxes')
let ads =document.getElementById('ads')
let discount = document.getElementById('discount')
let total = document.getElementById('total')
let count = document.getElementById('count')
let category = document.getElementById('category')
let submit = document.getElementById('submit')
let deletAllbtn = document.getElementById('deleteAll')
let mood = 'creat'
let tmp 
//get total
function getTotal(){
    if (price.value !== ''){
        let result = (+price.value + +taxes.value + +ads.value)- +discount.value
        total.innerHTML = result
        total.style.background = 'green'
    }
    else{
        total.innerHTML = ''
        total.style.background = 'rgb(241, 179, 21)'
    }
}
//creat product 
let dataPro
if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product)
}else{
    dataPro = []
}
function creatProduct(){
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }
    //count 
    if(mood === 'creat'){
        if(newPro.count > 1){
            for (let i = 0; i < newPro.count; i++) {
                dataPro.push(newPro)
            }
        }else{
            dataPro.push(newPro)
        }
    }else{
        dataPro[tmp] = newPro
        mood = 'creat'
        submit.innerHTML = 'Creat'
        count.style.display = 'block'
    }
    
    // save localsotrage
    localStorage.setItem('product', JSON.stringify(dataPro))
    clearInputs()
    showData()
}
//clear inputs
function clearInputs() {
    title.value = ''
    price.value= '';
    taxes.value= '';
    ads.value='';
    discount.value='' ;
    total.innerHTML = ''
    count.value='' ;
    category.value=''
}
//read
function showData(){
    let table = ''
    for (let i = 0; i < dataPro.length; i++) {
        table += `
        <tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick="updateData(${i})" id="updatebtn">Update</button></td>
        <td><button onclick="deleteData(${i})" id="deletebtn">Delete</button></td>
    </tr>
        `
    }
    document.getElementById('tbody').innerHTML = table
    if(dataPro.length > 0){
        deletAllbtn.style.display = "block"
    }else{
        deletAllbtn.style.display = "none"
    }
    deletAllbtn.innerHTML = `Delete all product(${dataPro.length})`
    getTotal()
}
showData()
//delete
function deleteData(i){
    dataPro.splice(i,1)
    localStorage.product = JSON.stringify(dataPro)
    showData()
}
//delete all
function deleteAll(){
    dataPro.splice(0)
    localStorage.clear()
    showData()
}
//update
function updateData(i){
    title.value = dataPro[i].title;
    price.value= dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    getTotal()
    count.style.display = 'none'
    category.value = dataPro[i].category
    submit.innerHTML = 'Update'
    mood = 'update'
    tmp = i
    scroll({
        top: 0,
        behavior:"smooth"
    })
}
//search
let search = document.getElementById("search")
let searchMood = 'title'
function getSearchMood(id){
    if(id === 'searchTitle'){
        searchMood = 'title'
        
    }else{
        searchMood = 'category'
    }
    search.placeholder = "Search by " + searchMood
    search.focus()
    search.value =""
    showData()
}

function searchData(value){
    let table = ''
    for (let i = 0; i < dataPro.length; i++) {
        if (searchMood === 'title'){
            if (dataPro[i].title.includes(value.toLowerCase())){
                table += `
                <tr>
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="updateData(${i})" id="updatebtn">Update</button></td>
                <td><button onclick="deleteData(${i})" id="deletebtn">Delete</button></td>
            </tr>
                `
            }
        }
    else{
            if (dataPro[i].category.includes(value.toLowerCase())){
                table += `
                <tr>
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="updateData(${i})" id="updatebtn">Update</button></td>
                <td><button onclick="deleteData(${i})" id="deletebtn">Delete</button></td>
            </tr>
                `
            }
        }
    document.getElementById('tbody').innerHTML = table
    }
}

