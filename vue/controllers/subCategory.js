// add new subcategory
async function addSub_Cat() {
  let category_id = document.getElementById("category_list").value;
  let sub_categoryName = document.getElementById("sub_categoryName").value;
  await axios
    .post("http://localhost:3000/subcategories", {
      name: sub_categoryName,
      category: category_id,
    })
    .then(function (response) {
      window.location.href = "./dashboard.html";
    })
    .catch(function (error) {
      console.log(error);
    });
}

// get all subcategories
async function fetchSubCategories() {
  await axios
    .get("http://localhost:3000/subcategories")
    .then((res) => {
      const data = res.data;
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        $("#sub_category_tbody").append(`
              <tr>
                  <td>${data[i].name}</td>
                  <td>
                  <button id="edsub" class="btn btn-success editSubCat"  data-toggle="modal"
                  data-target=".bd-example-modalEditS-lg" data-id="${data[i]._id}" value="${data[i]._id}">Edit</button>
                  <button class="btn btn-danger"  onclick="deleteSub_cat('${data[i]._id}')" value="${data[i]._id}">Delete</button>
                  </td>
              </tr>
          `);
        $("#sub_category_list").append(
          `<option value="${data[i]._id}">${data[i].name}</option>`
        );
        $("#sub_category_listP").append(
          `<option value="${data[i]._id}">${data[i].name}</option>`
        );
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}
fetchSubCategories();

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

  await axios
    .patch(`http://localhost:3000/subcategories/${id}`, {
      name: subCate,
      category: categoryId,
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  window.location.href = "./dashboard.html";
}

//deleting a single sub_category
async function deleteSub_cat(id) {
  await axios
    .delete(`http://localhost:3000/subcategories/${id}`)
    .then((res) => {
      window.location.href = "./dashboard.html";
    })
    .catch((err) => {
      console.log(err);
    });
}
