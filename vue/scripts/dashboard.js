// category section 
function fetchCategories () {
    fetch("http://localhost:3000/categories").then(res => {
        return res.json()
    }).then(data => {
        //console.log(data)
        data.map(category => {
            $('#category_tbody').append(`
                <tr>
                    <td>${category.name}</td>
                    <td>
                        <button class="btn btn-success editCat"  data-toggle="modal"
                        data-target=".bd-example-modal-lg" data-id="${category._id}">Edit</button>
                        <button class="btn btn-danger"  onclick="deleteCat('${category._id}')" value="${category._id}">Delete</button>
                    </td>
                </tr>
            `)
            $('#category_list').append(`<option value="${category._id}">${category.name}</option>`)
            $('#category_list_E').append(`<option value="${category._id}">${category.name}</option>`)
        })
    })
}

//getting id after clicking edit
$(document).on("click", ".editCat", function (e) {
    e.preventDefault();
    var _self = $(this);
    var myBookId = _self.data("id");
    document.getElementById("category_id").value = myBookId;
});


//add new category
async function addCat() {
    let categoryName = document.getElementById("categoryName").value;
    console.log(categoryName)
    fetch("http://localhost:3000/categories", {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            name : categoryName
        })
    })
    window.location.href = "./dashboard.html"
}


// edit category function
function updateCat() {
    let categoryName = document.querySelector("#name").value;
    var id = document.getElementById("category_id").value;

    fetch(`http://localhost:3000/categories/${id}`, {
        method : 'PATCH',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            name : categoryName,
        })
    })
    window.location.href = "./dashboard.html"
}

// delete a category
function deleteCat(id) {
    fetch(`http://localhost:3000/categories/${id}`, {
        method : 'DELETE'
    }).then(res => {
        return res.json()
    })
    window.location.href = "./dashboard.html"
}

// end of section category

// start section subcategories

// get all subcategories

function fetchSubCategories () {
    fetch("http://localhost:3000/subcategories").then(res => {
        return res.json()
    }).then(data => {
        //console.log(data)
        data.map(subcategory => {
            $('#sub_category_tbody').append(`
                <tr>
                    <td>${subcategory.name}</td>
                    <td>
                    <button id="edsub" class="btn btn-success editSubCat"  data-toggle="modal"
                    data-target=".bd-example-modalEditS-lg" data-id="${subcategory._id}" value="${subcategory._id}">Edit</button>
                    <button class="btn btn-danger"  onclick="deleteSub_cat('${subcategory._id}')" value="${subcategory._id}">Delete</button>
                    </td>
                </tr>
            `)
            $('#sub_category_list').append(`<option value="${subcategory._id}">${subcategory.name}</option>`)
            $('#sub_category_listP').append(`<option value="${subcategory._id}">${subcategory.name}</option>`)
        })
    })
}

// add new subcategory
async function addSub_Cat() {
    let category_id = document.getElementById("category_list").value;
    let sub_categoryName = document.getElementById("sub_categoryName").value;

    //console.log(category_id, sub_categoryName)
    fetch(`http://localhost:3000/subcategories`, {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            name : sub_categoryName,
            category : category_id
        })
    })
    window.location.href = "./dashboard.html"
}

//getting id after clicking edit
$(document).on("click", ".editSubCat", function (e) {
    e.preventDefault();
    var _self = $(this);
    var myBookId = _self.data("id");
    document.getElementById("sub_category_id").value = myBookId;
});

//upadting a single sub_category
async function updateSubCat() {
    let categoryId = document.querySelector("#category_list_E").value;
    var id = document.querySelector("#sub_category_id").value;
    var subCate = document.querySelector("#sub_categoryName_E").value;

    fetch(`http://localhost:3000/subcategories/${id}`, {
        method : 'PATCH',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            name : subCate,
            category : categoryId
        })
    })
    window.location.href = "./dashboard.html"
}

//deleting a single sub_category
async function deleteSub_cat(id) {
    fetch(`http://localhost:3000/subcategories/${id}`, {
        method : 'DELETE'
    })
    window.location.href = "./dashboard.html"
}

// end section of subcategories


// start section of product

// get all products

function fetchProducts () {
    fetch("http://localhost:3000/produits").then(res => {
        return res.json()
    }).then(data => {
        //console.log(data)
        data.map(product => {
            $('#product_tbody').append(`
                <tr>
                    <td>${product.name}</td>
                    <td>${product.price} DH</td>
                    <td>
                    <button class="btn btn-success editproduct"  data-toggle="modal"
                    data-target=".bd-example-modal5-lg" data-id="${product._id}">Edit</button>
                    <button class="btn btn-danger"  onclick="deleteproduct('${product._id}')" value="${product._id}">Delete</button>
                    </td>
                </tr>
            `)
        })
    })
}



// add new product
async function addProduct() {
    let id_ingrediant = document.getElementById("ingrediant_list").value;
    let id_sub_category = document.getElementById("sub_category_list").value;
    let productName = document.getElementById("productName").value;
    let productPrice = document.getElementById("productPrice").value;

    fetch(`http://localhost:3000/produits`, {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            name : productName,
            subcategory : id_sub_category,
            ingrediant : id_ingrediant,
            price : productPrice,
            score : "0"
        })
    })
    window.location.href = "./dashboard.html"
}


//getting id after clicking edit
$(document).on("click", ".editproduct", function (e) {
    e.preventDefault();
    var _self = $(this);
    var myBookId = _self.data("id");
    document.getElementById("product_id").value = myBookId;
})

// edit product 
function editProduct() {
    let id_ingrediant = document.getElementById("ingrediant_listP").value;
    let id_sub_category = document.getElementById("sub_category_listP").value;
    let productName = document.getElementById("productNameP").value;
    let productPrice = document.getElementById("productPriceP").value;
    let id = document.querySelector('#product_id').value

    console.log(id_ingrediant, id_sub_category, productPrice, productName, id)
    fetch(`http://localhost:3000/produits/${id}`, {
        method : 'PATCH',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            name : productName,
            subcategory : id_sub_category,
            ingrediant : id_ingrediant,
            price : productPrice,
            score : "0"
        })
    })
    window.location.href = "./dashboard.html"
}

// delete product
async function deleteproduct(id) {
    fetch(`http://localhost:3000/produits/${id}`, {
        method : 'DELETE'
    })
    window.location.href = "./dashboard.html"
}


// end section of product

// start section of ingredints

// get all ingredients

function fetchIngredients () {
    fetch("http://localhost:3000/ingredients").then(res => {
        return res.json()
    }).then(data => {
        //console.log(data)
        data.map(ingredient => {
            $('#ingrediant_tbody').append(`
                <tr>
                    <td>${ingredient.name}</td>
                    <td>
                    <button class="btn btn-success editIngredinat"  data-toggle="modal"
                    data-target=".bd-example-modalEditIngrediant-lg" data-id="${ingredient._id}">Edit</button>
                    <button class="btn btn-danger"  onclick="deleteIngrediant('${ingredient._id}')" value="${ingredient._id}">Delete</button>
                    </td>
                </tr>
            `)
            $('#ingrediant_list').append(`<option value="${ingredient._id}">${ingredient.name}</option>`)
            $('#ingrediant_listP').append(`<option value="${ingredient._id}">${ingredient.name}</option>`)
        })
    })
}

// add new ingredients

async function addingrediant() {
    let ingrediantName = document.getElementById("ingrediantName").value;
    console.log(ingrediantName)
    fetch("http://localhost:3000/ingredients", {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            name : ingrediantName,
            score : "0"
        })
    })
        window.location.href = "./dashboard.html";
}

//getting id after clicking edit
$(document).on("click", ".editIngredinat", function (e) {
    e.preventDefault();
    var _self = $(this);
    var myBookId = _self.data("id");
    document.getElementById("ingredian_idE").value = myBookId;
})

//upadting one ingrediant
async function updateIngrediant() {
    let ingrediant = document.querySelector("#ingrediantNameE").value;
    var id = document.getElementById("ingredian_idE").value;

    fetch(`http://localhost:3000/ingredients/${id}`, {
        method : 'PATCH',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            name : ingrediant
        })
    })
    window.location.href = "./dashboard.html";
}

// delete an ingredient
async function deleteIngrediant(id) {
    fetch(`http://localhost:3000/ingredients/${id}`, {
        method : 'DELETE'
    })
    window.location.href = "./dashboard.html";
}

// end section of ingredients



fetchCategories()
fetchSubCategories()
fetchProducts()
fetchIngredients()