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
  const doc = new jsPDF();
  doc.fromHTML(
    `
    
        <h1 style="margin-left:400px">Order Details</h1>
        <h2 style="margin-left:400px">Product Name : ${name}</h2>
        <h2 style="margin-left:400px"> Card Number : ${card}
        </h2>
        <h3 style="color: blue; margin-left:400px">Price : ${price} DH
        </h3>


    `,
    9,
    9
  );
  doc.save("a4.pdf");
}
//"order information" + "\n" + name + "\n" + price, 9, 9
