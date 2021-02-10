// start section of product

// get all products

function fetchProducts() {
  fetch("http://localhost:3000/produits")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      //console.log(data)
      data.map((product) => {
        $("#product_tbody").append(`
                <tr>
                    <td>${product.name}</td>
                    <td>${product.price} DH</td>
                    <td>
                    <button class="btn btn-success editproduct"  data-toggle="modal"
                    data-target=".bd-example-modal5-lg" data-id="${product._id}">Edit</button>
                    <button class="btn btn-danger"  onclick="deleteproduct('${product._id}')" value="${product._id}">Delete</button>
                    </td>
                </tr>
            `);
      });
    });
}

// add new product
async function addProduct() {
  let id_ingrediant = document.getElementById("ingrediant_list").value;
  let id_sub_category = document.getElementById("sub_category_list").value;
  let productName = document.getElementById("productName").value;
  let productPrice = document.getElementById("productPrice").value;

  fetch(`http://localhost:3000/produits`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: productName,
      subcategory: id_sub_category,
      ingrediant: id_ingrediant,
      price: productPrice,
      score: "0",
    }),
  });
  window.location.href = "./dashboard.html";
}

//getting id after clicking edit
$(document).on("click", ".editproduct", function (e) {
  e.preventDefault();
  var _self = $(this);
  var myBookId = _self.data("id");
  document.getElementById("product_id").value = myBookId;
});

// edit product
function editProduct() {
  let id_ingrediant = document.getElementById("ingrediant_listP").value;
  let id_sub_category = document.getElementById("sub_category_listP").value;
  let productName = document.getElementById("productNameP").value;
  let productPrice = document.getElementById("productPriceP").value;
  let id = document.querySelector("#product_id").value;

  console.log(id_ingrediant, id_sub_category, productPrice, productName, id);
  fetch(`http://localhost:3000/produits/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: productName,
      subcategory: id_sub_category,
      ingrediant: id_ingrediant,
      price: productPrice,
      score: "0",
    }),
  });
  window.location.href = "./dashboard.html";
}

// delete product
async function deleteproduct(id) {
  fetch(`http://localhost:3000/produits/${id}`, {
    method: "DELETE",
  });
  window.location.href = "./dashboard.html";
}

// end section of product

// start section of ingredints

// get all ingredients

async function fetchIngredients() {
  fetch("http://localhost:3000/ingredients")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      //console.log(data)
      data.map((ingredient) => {
        $("#ingrediant_tbody").append(`
                <tr>
                    <td>${ingredient.name}</td>
                    <td>
                    <button class="btn btn-success editIngredinat"  data-toggle="modal"
                    data-target=".bd-example-modalEditIngrediant-lg" data-id="${ingredient._id}">Edit</button>
                    <button class="btn btn-danger"  onclick="deleteIngrediant('${ingredient._id}')" value="${ingredient._id}">Delete</button>
                    </td>
                </tr>
            `);
        $("#ingrediant_list").append(
          `<option value="${ingredient._id}">${ingredient.name}</option>`
        );
        $("#ingrediant_listP").append(
          `<option value="${ingredient._id}">${ingredient.name}</option>`
        );
      });
    });
}



// end section of ingredients

fetchSubCategories();
fetchProducts();
fetchIngredients();
