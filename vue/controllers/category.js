//add new category
async function addCat() {
  let categoryName = document.getElementById("categoryName").value;
  await axios
    .post("http://localhost:3000/categories", {
      name: categoryName,
    })
    .then(function (response) {
      window.location.href = "./dashboard.html";
    })
    .catch(function (error) {
      console.log(error);
    });
}

// category section
async function fetchCategories() {
  await axios.get("http://localhost:3000/categories").then((res) => {
    const data = res.data;
    for (let i = 0; i < data.length; i++) {
      $("#category_tbody").append(`
                    <tr>
                        <td>${data[i].name}</td>
                        <td>
                            <button class="btn btn-success editCat"  data-toggle="modal"
                            data-target=".bd-example-modal-lg" data-id="${data[i]._id}">Edit</button>
                            <button class="btn btn-danger"  onclick="deleteCat('${data[i]._id}')" value="${data[i]._id}">Delete</button>
                        </td>
                    </tr>
           `);
      $("#category_list").append(
        `<option value="${data[i]._id}">${data[i].name}</option>`
      );
      $("#category_list_E").append(
        `<option value="${data[i]._id}">${data[i].name}</option>`
      );
    }
  });
}

fetchCategories();

//getting id after clicking edit
$(document).on("click", ".editCat", function (e) {
  e.preventDefault();
  var _self = $(this);
  var myBookId = _self.data("id");
  document.getElementById("category_id").value = myBookId;
});

// edit category function
async function updateCat() {
  let categoryName = document.querySelector("#name").value;
  var id = document.getElementById("category_id").value;

  await axios
    .patch(`http://localhost:3000/categories/${id}`, {
      name: categoryName,
    })
    .then((res) => {
      window.location.href = "./dashboard.html";
    })
    .catch((err) => {
      console.log(err);
    });
}

// delete a category
async function deleteCat(id) {
  await axios
    .delete(`http://localhost:3000/categories/${id}`)
    .then((res) => {
      window.location.href = "./dashboard.html";
    })
    .catch((err) => {
      console.log(err);
    });
}
