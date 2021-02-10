// add new product
async function addProduct() {
  let id_ingrediant = document.getElementById("ingrediant_list").value;
  let id_sub_category = document.getElementById("sub_category_list").value;
  let productName = document.getElementById("productName").value;
  let productPrice = document.getElementById("productPrice").value;

  await axios
    .post(`http://localhost:3000/produits`, {
      name: productName,
      subcategory: id_sub_category,
      ingredient: id_ingrediant,
      price: productPrice,
      score: "0"
    })
    .then((res) => {
      window.location.href = "./dashboard.html";
    })
    .catch((err) => {
      console.log(err);
    });
}

// get all products
async function fetchProducts() {
  await axios
    .get("http://localhost:3000/produits")
    .then((res) => {
      const data = res.data;
      for (let i = 0; i < data.length; i++) {
        $("#product_tbody").append(`
          <tr>
            <td>${data[i].name}</td>
            <td>${data[i].price} DH</td>
            <td>
              <button class="btn btn-success editproduct"  data-toggle="modal" data-target=".bd-example-modal5-lg" data-id="${data[i]._id}">Edit</button>
              <button class="btn btn-danger"  onclick="deleteproduct('${data[i]._id}')" value="${data[i]._id}">Delete</button>
            </td>
          </tr>
     `);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

fetchProducts();

//getting id after clicking edit
$(document).on("click", ".editproduct", function (e) {
  e.preventDefault();
  var _self = $(this);
  var myBookId = _self.data("id");
  document.getElementById("product_id").value = myBookId;
});

// edit product
async function editProduct() {
  let id_ingrediant = document.getElementById("ingrediant_listP").value;
  let id_sub_category = document.getElementById("sub_category_listP").value;
  let productName = document.getElementById("productNameP").value;
  let productPrice = document.getElementById("productPriceP").value;
  let id = document.querySelector("#product_id").value;

  console.log(id_ingrediant, id_sub_category, productPrice, productName, id);
  await axios
    .patch(`http://localhost:3000/produits/${id}`, {
      name: productName,
      subcategory: id_sub_category,
      ingredient: id_ingrediant,
      price: productPrice,
      score: "10",
    })
    .then((res) => {
      window.location.href = "./dashboard.html";
    })
    .catch((err) => {
      console.log(err);
    });
}

// delete product
async function deleteproduct(id) {
  await axios
    .delete(`http://localhost:3000/produits/${id}`)
    .then((res) => {
      window.location.href = "./dashboard.html";
    })
    .catch((err) => {
      console.log(err);
    });
}
