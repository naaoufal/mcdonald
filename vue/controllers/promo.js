//adding new promo code
async function addPromocode() {
  const code = document.getElementById("code").value;
  const points = document.getElementById("points").value;
  await axios
    .post("http://localhost:3000/promos", {
      code: code,
      points: points,
      codeStatus: false,
    })
    .then(function (response) {
      window.location.href = "./promo.html";
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

//Getting all promo codes and display them in aform of a QR
async function getCode() {
  var show = document.getElementById("td_body");
  var shoDiv = document.querySelector("#divShow");
  await axios
    .get("http://localhost:3000/promos")
    .then(function (response) {
      const data = response.data;
      console.log(data);
      data.map((code) => {
        $("#divShow").append(`<hr>`);
        $("#td_body").append(new QRCode(shoDiv, `${code.code}`));
        $("#divShow").append(
          `<button class="btn btn-danger" onclick="deleteCode('${code._id}')" >delete</button>`
        );
      });
    })
    .catch(function (error) {
      console.log(error);
    });
}
getCode();

//deleting a single promo code
async function deleteCode(id) {
  await axios
    .delete("http://localhost:3000/promos/" + id)
    .then(function (response) {
      window.location.href = "./promo.html";
    })
    .catch(function (error) {
      console.log(error);
    });
}

// check if promo code is used & delete it
async function checkAndDelete() {
  await axios
    .get("http://localhost:3000/promos")
    .then((res) => {
      var data = res.data;
      console.log(data);

      for (let index = 0; index < data.length; index++) {
        if (data[index].codeStatus == true) {
          axios.delete("http://localhost:3000/promos/" + data[index]._id);
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

checkAndDelete();
