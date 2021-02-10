// add new ingredients
async function addingrediant() {
  let ingrediantName = document.getElementById("ingrediantName").value;
  console.log(ingrediantName);
  await axios
    .post("http://localhost:3000/ingredients", {
      name: ingrediantName,
      score: "0",
    })
    .then((res) => {
      window.location.href = "./dashboard.html";
    })
    .catch((err) => {
      console.log(err);
    });
}
// get all ingredients

async function fetchIngredients() {
  await axios.get("http://localhost:3000/ingredients").then((res) => {
    const data = res.data;
    for (let i = 0; i < data.length; i++) {
      $("#ingrediant_tbody").append(`
                <tr>
                    <td>${data[i].name}</td>
                    <td>
                    <button class="btn btn-success editIngredinat"  data-toggle="modal"
                    data-target=".bd-example-modalEditIngrediant-lg" data-id="${data[i]._id}">Edit</button>
                    <button class="btn btn-danger"  onclick="deleteIngrediant('${data[i]._id}')" value="${data[i]._id}">Delete</button>
                    </td>
                </tr>
            `);
      $("#ingrediant_list").append(
        `<option value="${data[i]._id}">${data[i].name}</option>`
      );
      $("#ingrediant_listP").append(
        `<option value="${data[i]._id}">${data[i].name}</option>`
      );
    }
  });
}
fetchIngredients();

// delete an ingredient
async function deleteIngrediant(id) {
  await axios
    .delete(`http://localhost:3000/ingredients/${id}`)
    .then((res) => {
      window.location.href = "./dashboard.html";
    })
    .catch((err) => {
      console.log(err);
    });
}

//getting id after clicking edit
$(document).on("click", ".editIngredinat", function (e) {
  e.preventDefault();
  var _self = $(this);
  var myBookId = _self.data("id");
  document.getElementById("ingredian_idE").value = myBookId;
});

//upadting one ingrediant
async function updateIngrediant() {
  let ingrediant = document.querySelector("#ingrediantNameE").value;
  var id = document.getElementById("ingredian_idE").value;
  await axios
    .patch(`http://localhost:3000/ingredients/${id}`, {
      name: ingrediant,
    })
    .then((res) => {
      window.location.href = "./dashboard.html";
    })
    .catch((err) => {
      console.log(err);
    });
}
