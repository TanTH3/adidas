

const queryItemCart = document.querySelector(".item-cart");
const queryEmptyCart = document.querySelector(".empty-cart");
const queryProvince = document.querySelector(".province");
const queryDistrict = document.querySelector(".district");
const queryWard = document.querySelector(".ward");
const queryNoteFirstName = document.querySelector(".noteFirstName");
const queyNoteLastName = document.querySelector(".noteLastName");
const queryNoteEmail = document.querySelector(".noteEmail");
const queryNotePhone = document.querySelector(".notePhoneNumber");
const queryNoteAddress = document.querySelector(".noteAddress");
const queryNoteProvince = document.querySelector(".noteProvince");
const queryNoteDistrict = document.querySelector(".noteDistrict");
const queryNoteWard = document.querySelector(".noteWard");

const total = new Map();
//tính tổng số lượng các sản phẩm trong giỏ hàng
function totalCart(keyId) {
  let cart = app.getDataFromLocalStorage(keyId);
  return cart.reduce((a, b) => a + b.soLuong, 0);
}
//tính tổng chi phí các sản phẩm trong giỏ hàng
function sumTotalCart(keyId1, keyId2) {
  let sumTotalCart = 0;
  let cart = app.getDataFromLocalStorage(keyId1);
  let data = app.getDataFromLocalStorage(keyId2);
  cart.forEach(function (item) {
    let indexOnLocal = data.findIndex((value) => value.id === item.idSP);
    sumTotalCart += item.soLuong * data[indexOnLocal].price;
  });
  return sumTotalCart;
}
//kiểm tra xem giỏ hàng có chứa sản phẩm nào không
function turnDisplay() {
  let check = app.getDataFromLocalStorage(app.KEYLOCALSTORAGEITEMCART);
  if (check.length > 0) {
    queryItemCart.style.display = "block";
    queryEmptyCart.style.display = "none";
  } else {
    queryItemCart.style.display = "none";
    queryEmptyCart.style.display = "block";
  }
}
//hiển thị danh sách sản phẩm trong giỏ hàng
function createHTML() {
  let cart = app.getDataFromLocalStorage(app.KEYLOCALSTORAGEITEMCART);
  let data = app.getDataFromLocalStorage(app.KEYLOCALSTORAGELISTSP);
  let html = "";
  let queyListCartRender = document.querySelector(".content-list-item");
  let queyTotal = document.querySelector(".total");
  cart.map(function (value) {
    let i = data.findIndex((a) => a.id === value.idSP);
    html += `
        <div class=" list-cart">
            <div class="grid__column-2 info-item-cart">
              <img src="${data[i].src}" alt="pic-${i.id}">
               <div class="info-item"> 
                <h5>${data[i].name}</h5>
                <p>Quality: ${data[i].quantity}</p>
              </div>
            </div>
               
            <div class="grid__column-8 quantity-cart">
                <i class="fa-regular fa-square-minus" 
                  onclick="onClickMinus(${value.idSP})"></i>
                <div>${value.soLuong}</div>
                <i class="fa-regular fa-square-plus" 
                  onclick="onClickPlus(${value.idSP})"></i>
            </div>
            <div class="grid__column-4 subtotal-price">${data[i].price}</div>
            <div class="grid__column-8">${value.soLuong * data[i].price}</div>
            <div class="grid__column-8 clear-item-cart" 
              onclick="clearItemCart(${value.idSP})">
              <i class="fa-regular fa-circle-xmark"></i>
            </div>  
        </div>
        `;
  });
  queyListCartRender.innerHTML = html;

  total.set("Tong so luong", totalCart(app.KEYLOCALSTORAGEITEMCART));
  total.set(
    "Tong so tien",
    sumTotalCart(app.KEYLOCALSTORAGEITEMCART, app.KEYLOCALSTORAGELISTSP)
  );
  total.set("So mat hang", cart.length);
  queyTotal.innerHTML = `Total: ${total.get("Tong so tien")} VND`;
}

function renderListCart() {
  turnDisplay();
  createHTML();
}

renderListCart();
//xóa 1 sản phẩm khỏi giỏ hàng
function clearItemCart(id) {
  if (confirm("Bạn có muốn xóa sản phẩm không!")) {
    let cart = app.getDataFromLocalStorage(app.KEYLOCALSTORAGEITEMCART);
    let indexItem = cart.findIndex((item) => item.idSP === id);
    cart.splice(indexItem, 1);
    app.upLoadDataToLocalStorage(app.KEYLOCALSTORAGEITEMCART, cart);
    if (cart.length > 0) {
      createHTML();
    } else {
      queryItemCart.style.display = "none";
      queryEmptyCart.style.display = "block";
    }
  }
}

function onClickPlus(id) {
  app.addItems(id);
  createHTML();
}

function onClickMinus(id) {
  let cart = app.getDataFromLocalStorage(app.KEYLOCALSTORAGEITEMCART);
  let indexItem = cart.findIndex((item) => item.idSP === id);
  if (cart[indexItem].soLuong > 1) {
    cart[indexItem].soLuong--;
    app.upLoadDataToLocalStorage(app.KEYLOCALSTORAGEITEMCART, cart);
    createHTML();
  } else {
    clearItemCart(id);
  }
}
