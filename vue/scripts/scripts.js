// global variables:
const categories = document.querySelector('#categories')
const subcategories = document.querySelector('#subcategories')
const tables = document.querySelector('#tables')
const resetTables = document.querySelector('#optiontest')


// fetching data :
function fetchData () {

    fetch("http://localhost:3000/categories").then(res => {
        return res.json();
    }).then(data => {
        //console.log(data);
        data.map(category => {
            $('#categories').append(`<button class="btn btn-warning" data-id=${category._id} id="optCat" value="${category._id}">${category.name}</button><br>`)
        })
    })
}

fetchData();


categories.addEventListener('click', (e) => {
    e.preventDefault()

    let pressSubcategory = e.target.id == 'optCat'
    const id = e.target.dataset.id

    // clear the div field:
    isEmptyPro()
    isEmptySub()

    if(pressSubcategory) {
        fetch(`http://localhost:3000/subcategories`).then(res => {
            return res.json()
        }).then(data => {
            data.map(subcategories => {
                if(id == subcategories.category){
                    $('#subcategories').append(`<button class="btn btn-warning" data-id=${subcategories._id} id="optSub" value="${subcategories.category}">${subcategories.name}</button><br>`)
                }
            })
        })
    }
})

subcategories.addEventListener('click', (e) => {
    e.preventDefault()

    let pressProduct = e.target.id == 'optSub'
    const id = e.target.dataset.id
    //console.log(id)

    // clear the div field:
    isEmptyPro()

    if(pressProduct) {
        fetch(`http://localhost:3000/produits`).then(res => {
            return res.json()
        }).then(data => {
            data.map(produits => {
                if(id == produits.subcategory){
                    $('#produits').append(`<button data-toggle="modal" data-target="#exampleModalLong" class="btn btn-warning" data-id=${produits.ingredient} id="optPro" value="${produits.name}">${produits.name}</button>
                        <input type="hidden" data-id=${produits._id} id="inpPro" value="${produits._id}">
                        <br>`)
                }
            })
        })
    }
})


produits.addEventListener('click', (e) =>{
    e.preventDefault()

    // generate random code:
    var randomCode = Math.floor(Math.random() * (10000 - 10 + 1) ) + 10

    let pressIngredient = e.target.id == 'optPro'
    const id = e.target.dataset.id

    let pressPro = e.target.id == 'inpPro'
    let idpro = e.target.dataset.id

    const tt = document.querySelector('#inpPro').value

    console.log(tt)

    // clear the div field
    isModalEmpty()
    //isEmptyIng()

    if(pressIngredient){
        fetch(`http://localhost:3000/produits`).then(res => {
            return res.json()
        }).then(data => {
            data.map(produit => {
                if(tt == produit._id){
                    //console.log(produit.name)
                    fetch(`http://localhost:3000/ingredients`).then(res => {
                        return res.json()
                    }).then(data => {
                        fetchTables()
                        data.map(ingredients => {
                            //console.log(ingredients)
                            if(ingredients._id == id){
                                $('.modal-body').append(`
                                    <div id="mod0"><input name="nameProduct" type="hidden" readonly="readonly" id="nam" value="${produit.name}"><input type="hidden" id="sco" name="sco" value="${produit.score}"><input type="hidden" id="pri" name="price" value="${produit.price}"></div>
                                    <div id="mod1">
                                        <select id="ingre" class="form-control">
                                            <option>Select an Ingredient</option>
                                            <option>${ingredients.name}</option>
                                        </select>
                                        <br>
                                        <select id="tables" name=""idTable class="form-control">
                                            <option value="">Select An Option</option>
                                        </select>
                                        <br>
                                        <input id="qte" type="number" placeholder="Select Your Quantity" class="form-control">
                                        <br>
                                        <input name="cardNumber" id="fidele" type="text" class="form-control" placeholder="Enter fidele Card Number">
                                        <br>
                                        <input id="qrco" onclick="qrcodefunction()" type="button" class="btn btn-info" value="QR Code" ><input type="hidden" value="${produit.score}" id="sco">
                                        <br>
                                        <input type="hidden" value="${randomCode}" id="generateCode" >
                                        <br>
                                        <center>
                                            <div id="subqrcode"></div>
                                            <div id="qrcode"></div>
                                        </center>
                                        <br>
                                        <input type="checkbox" id="checkboxy" onclick="checkBoxy()" > <label>Click If You Don t have a fidele Card</label>
                                        <br>
                                        <input type="checkbox" id="promy" onclick="promoCode()" > <label>Click If You Don t have a Code Promo</label>
                                    </div>
                                    <div id="mod2"></div>
                                `)
                            }
                        })
                    })
                }
            })
        })
    }
})


function fetchTables () {
    fetch(`http://localhost:3000/tables`).then(res => {
        return res.json()
    }).then(data => {
        data.map(table => {
            if(table.status == 0){
                $('#tables').append(`<option data-id=${table._id} id="table" value="${table._id}">${table.name}</option>`)
            }
        })
    })
}


// qr code for existing card:
function qrcodefunction () {
    isQrcodeEmpty()
    var qrCode = new QRCode(document.getElementById('qrcode'))
    var ran = document.querySelector('#fidele').value
    console.log(ran)
    fetch(`http://localhost:3000/cards`).then(res => {
        return res.json()
    }).then(data => {
        data.map(stat => {
            // clear the fields of QRcode:
            if(stat.generateId === ran){
                qrCode.makeCode(stat.score)
            }
        })
    })
}

// check for client if he have a fidele card:
function checkBoxy () {
    var che = document.querySelector('#checkboxy').checked
    var newCodeFidele = document.querySelector('#generateCode').value
    if(!che) {
        $('#fidele').show()
        $('#qr').show()
        $('#qrcode').show()
        $('#qrco').show()
    } else {
        $('#fidele').hide()
        $('#qr').hide()
        $('#qrcode').hide()
        $('#qrco').hide()
        

        // generate new fidele card :
        fetch(`http://localhost:3000/cards`, {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                generateId : newCodeFidele,
                name : "card",
                score : "0"
            })
        }).then(res => {
            return res.json()
        }).then(data => {
           console.log(data._id)
            $('#testy').append(`<input type="hidden" id="newFideleNum" value="${data._id}" ><input type="hidden" id="currentId" value="${data.generateId}" >`)
        })

    }
}


// post data to collection command
$('#optiontest').click(function() {
    
    const currentPrice = document.querySelector('#pri').value
    const qt = document.querySelector('#qte').value
    const table = document.querySelector('#tables').value
    const nom = document.querySelector('#nam').value
    const cardNum = document.querySelector('#fidele').value
    const ingredient = document.querySelector('#ingre').value
    let inpScore = document.querySelector('#sco').value
    let newCodeFidele = document.querySelector('#generateCode').value

    const totalPrice = currentPrice * qt

    const totalName = ingredient

    // console.log(nom + " + " + ingredient)
    console.log(inpScore)
    console.log(newCodeFidele)
    // console.log(totalPrice)


        // push data to command collection
        if(cardNum){
            fetch(`http://localhost:3000/commands`, {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({
                    price : totalPrice,
                    cardNumber : cardNum,
                    idTable : table,
                    nameProduct : totalName
                })
            }).then(res => {
                return res.json()
            }).then(data => {
                $('#mod1').hide()
                $('#mod2').append(`
                <div class="panel panel-success">
                    <div class="panel-heading">Command Confirmed</div>
                    <div class="panel-body">Take a Sit Your Demand in Progress Now</div>
                </div>
                `)
            })
        } else {
            fetch(`http://localhost:3000/commands`, {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({
                    price : totalPrice,
                    cardNumber : newCodeFidele,
                    idTable : table,
                    nameProduct : totalName
                })
            }).then(res => {
                return res.json()
            }).then(data => {
                $('#mod1').hide()
                $('#mod2').append(`
                <div class="panel panel-success">
                    <div class="panel-heading">Command Confirmed</div>
                    <div class="panel-body">Take a Sit Your Demand in Progress Now</div>
                </div>
                `)
            })
        }


    fetch(`http://localhost:3000/cards`).then(res => {
        return res.json()
    }).then(data => {
        console.log(data)
        data.map(card => {
            if(card.generateId == cardNum){
                let totalSroce = card.score - (-inpScore)
                fetch(`http://localhost:3000/cards/${card._id}`, {
                    method : 'PATCH',
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                    body : JSON.stringify({
                        score : totalSroce,
                    })
                })
            } else {
                //console.log(card._id)
                if(card.generateId == cardNum){
                    
                    fetch(`http://localhost:3000/cards/${card._id}`, {
                        method : 'PATCH',
                        headers : {
                            'Content-Type' : 'application/json'
                        },
                        body : JSON.stringify({
                            score : inpScore
                        })
                    })
                }
            }
        })
    })

    // set selected table to occured :
    fetch(`http://localhost:3000/tables/${table}`, {
        method : 'PATCH',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            status : "1"
        })
    })
})


// function to set time for reset table service:
function resetTable () {
    const url = "http://localhost:3000/tables"
    fetch(`${url}`, {
        method : 'PATCH',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            status : "0"
        })
    }).then(res => {
        return res.json()
    }).then(data => {
        console.log(data)
    })
}

// reset tables after a set of time:
setTimeout(resetTable, 20000)



// clear the div fields :
function isEmptySub (){
    document.getElementById('subcategories').innerHTML = ""
}

function isEmptyPro (){
    document.getElementById('produits').innerHTML = ""
}

function isModalEmpty () {
    document.querySelector('.modal-body').innerHTML = ""
}

function isQrcodeEmpty () {
    document.querySelector('#qrcode').innerHTML = ""
}

function isSubQrEmpty () {
    document.querySelector('#subqrcode').innerHTML = ""
}