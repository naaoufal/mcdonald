//adding new table
async function addTable() {
  const table_name = document.getElementById("table_name").value;
  console.log(table_name);
  await axios
    .post("http://localhost:3000/tables", {
      name: table_name,
      status: "0",
    })
    .then(function (response) {
      window.location.href = "./table.html";
    })
    .catch(function (error) {
      console.log(error);
    });
}

//Getting all tables number and display them in aform of a QR
async function getTable() {
    var show = document.getElementById("td_body");
    var shoDiv = document.querySelector("#divShow");
    await axios
      .get("http://localhost:3000/tables")
      .then(function (response) {
        const data = response.data;
        data.map((table) => {
          $("#divShow").append(`<hr>`);
          $("#td_body").append(new QRCode(shoDiv, `${table.name}`));
          $("#divShow").append(
            `<button class="btn btn-danger" onclick="deleteTable('${table._id}')" >delete</button>`
          );
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  getTable();
  
  //deleting a single table number
  async function deleteTable(id) {
    await axios
      .delete("http://localhost:3000/tables/" + id)
      .then(function (response) {
        window.location.href = "./table.html";
      })
      .catch(function (error) {
        console.log(error);
      });
  }