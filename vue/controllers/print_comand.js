const url3 = "http://localhost:3000/commands";

async function getdata() {
  await axios
    .get(url3)
    .then(function (res) {
      const data = res.data;
      for (let i = 0; i < data.length; i++) {
        var option = `
          <tr>
            <td>${data[i].nameProduct}</td>
            <td>${data[i].cardNumber}</td>
            <td>${data[i].price} DH</td>
            <td>
              <button class ="btn btn-primary"onclick="printCommnad('${data[i].nameProduct}', '${data[i].cardNumber}','${data[i].price}')" >print</button>
            </td>
          </tr>
          
          `;
        document.getElementById("commands_tbody").innerHTML += option;
      }
    })
    .catch(function (err) {
      console.log(err);
    });
}
getdata();

function printCommnad(name, price, card) {
  var doc = new jsPDF();

  doc.fromHTML(
    `   
        <div style="width:122px;display:flex;">
          <h1>Order Details</h1>
          <hr style="color:black;">
          <h3>Product Name</h3>
          <h4 style="color: blue;"> ${name}</h4>
          <h3> Card Number</h3>
          <h4 style="color: blue;">${card}</h4>
          <h3>Price </h3>
          <h4 style="color: blue;">${price} DH</h4>
        </div>
        
    `,
    9,
    9
  );
  doc.save("a4.pdf");
}
