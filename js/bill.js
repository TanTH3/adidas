const listBillsApi = "http://localhost:3000/DANHSACHDONHANG";

const queryItemBill = document.querySelector(".list-bills");
const queryEmptyCart = document.querySelector(".empty-cart");

app.getDataAPI(listBillsApi, renderBills);

//kiểm tra xem giỏ hàng có chứa sản phẩm nào không

function renderBills(data) {
  console.log(data)
  
  let queryListBill = document.querySelector(".list-bills");
  let html = "";
  data.map((value) => {
    html += `
        <div class="list-bills-render">
            <div class="grid__column-8">${value.idUser}</div>
            <div class="grid__column-4">${value.fullName}</div>
            <div class="grid__column-8">${value.buyTime}</div>
            <div class="grid__column-8">${value.itemNumber}</div>
            <div class="grid__column-8">${value.totalQuantity}</div>
            <div class="grid__column-8">${value.totalPrice}</div>
            <div class="grid__column-8 clear-item-cart" onclick="removeBill(${value.idUser})"><i class="fa-regular fa-circle-xmark"></i></div>
        </div>
        <div class="detail-list">        
            <div class="detail-button" onclick="showOrHideDetailList(event)">Detail <i class="fa-solid fa-caret-down"></i></div>
        `;
    html += creatDetailListHTML(value);
  });

  queryListBill.innerHTML = html;
}
function creatDetailListHTML(data) {
  console.log(data)
  let html = `
        
        <div class="detail-content">
            <div class="bill-detail-header">
                <div class="grid__column-8">STT</div>
                <div class="grid__column-2">Name</div>
                <div class="grid__column-8">Quantity</div>
                <div class="grid__column-8">Price</div>
                <div class="grid__column-8">Total Price</div>
            </div>        
    `;
  data.cart.map((a, i) => {
    const listDataLocal = app.getDataFromLocalStorage(
      app.KEYLOCALSTORAGELISTSP
    );
    const item = listDataLocal.find((b) => b.id === a.idSP);
    html += `
        <div class="bill-detail-render">
            <div class="grid__column-8">${i + 1}</div>
              <div class="grid__column-2">${item.name}</div>
              <div class="grid__column-8">${a.soLuong}</div>
              <div class="grid__column-8">${item.price}</div> 
              <div class="grid__column-8">${a.soLuong * item.price}</div>
              </div>
              `;
  });
  html += `</div> </div>`;
  return html;
}
              // <img src="${data[i].src}" alt="pic-${item.id}">

function showOrHideDetailList(event) {
  let check = event.target.parentElement.childNodes[3].style.display;
  if (check === "none" || check === "") {
    event.target.parentElement.childNodes[3].style.display = "block";
  } else event.target.parentElement.childNodes[3].style.display = "none";
}


function removeBill(id) {
  if (confirm("Bạn có muốn xóa hóa đơn này không!")) {
    fetch(listBillsApi)
      .then((response) => response.json())
      .then((data) => data.find((b) => b.idUser === id))
      .then((customer) => {
        let url = listBillsApi + "/" + customer.id;

        app.deleteDataAPI(url, renderBills);
        rePayBillToLocal(customer.cart);
      });
  }
}


function editCustomer(edit, callback) {
  let url = listBillsApi + "/" + "1";
  let options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(edit),
  };
  fetch(url, options)
    .then((response) => response.json())
    .then(callback);
}

function rePayBillToLocal(payBack) {
  let data = app.getDataFromLocalStorage(app.KEYLOCALSTORAGELISTSP);
  payBack.forEach((a) => {
    data.find((b) => {
      if (b.id === a.idSP) {
        b.quantity += a.soLuong;
      }
    });
  });
  app.upLoadDataToLocalStorage(app.KEYLOCALSTORAGELISTSP, data);
}
