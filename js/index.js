
const listData = [
  {
    id: 1,
    name: "SUPERSTAR",
    price: 2600000,
    quantity: 10,
    src: '../acset/img/pic1.webp',
  },
  {
    id: 2,
    name: "ULTRABOOST LIGHT",
    price: 5200000,
    quantity: 5,
    src: '../acset/img/pic2.webp',
  },
  {
    id: 3,
    name: "NMD_R1 PRIMEBLUE",
    price: 3900000,
    quantity: 5,
    src: '../acset/img/pic3.webp',
  },
  {
    id: 4,
    name: "NMD_R1 X INDIGO HERZ",
    price: 3900000,
    quantity: 5,
    src: '../acset/img/pic4.webp',
  },
  {
    id: 5,
    name: "ADIZERO ADIOS PRO 3",
    price: 6500000,
    quantity: 15,
    src: '../acset/img/pic5.webp',
  },
  {
    id: 6,
    name: "ADILETTE COMFORT",
    price: 1000000,
    quantity: 15,
    src: '../acset/img/pic6.webp',
  },
  {
    id: 7,
    name: "STAN SMITH Shoe",
    price: 2600000,
    quantity: 15,
    src: '../acset/img/pic7.webp',
  },
  {
    id: 8,
    name: "Forum Low Shoe",
    price: 2300000,
    quantity: 15,
    src: '../acset/img/pic8.webp',

  },
];


function checkUpLoadData(key) {
  const checkData = localStorage.getItem(key);
  if (checkData === null) {
    return true;
  } else {
    return false;
  }
}


if (checkUpLoadData(app.KEYLOCALSTORAGELISTSP)) {
  console.log(app.KEYLOCALSTORAGELISTSP);
  app.upLoadDataToLocalStorage(app.KEYLOCALSTORAGELISTSP, listData);
}


if (checkUpLoadData(app.KEYLOCALSTORAGEITEMCART)) {
  app.upLoadDataToLocalStorage(app.KEYLOCALSTORAGEITEMCART, []);
}

function renderListData() {
  let getListData = app.getDataFromLocalStorage(app.KEYLOCALSTORAGELISTSP);
  let queryListItem = document.querySelector(".list-item");
  let html = "";
  getListData.map((value) => {
    html += `
          <div class="grid__column-4-product item ">
                  <div class="avatar">
                      <img class="avatar-item" src="${value.src}" alt="pic-${value.id}">
                      <div class="add-item-button " onclick="addSP(${value.id})">
                          <i class="fa-solid fa-cart-plus icon"></i>
                      </div>
                  </div>
                  <div class="name-product">
                    <h6>${value.name}</h6>
                  </div>
                  <div class="item-detail">
                      <p class="price-item">Price: ${value.price}</p>
                      <p class="quantity-item">Quantity: ${value.quantity}</p>
                  </div>
          </div>
          `;
  });
  queryListItem.innerHTML = html;
}
renderListData();

function addSP(id) {
  app.addItems(id);
  showNumberItemCart();
}

function showNumberItemCart() {
  let queryShowItemCart = document.querySelector(".number-item");
  let data = app.getDataFromLocalStorage(app.KEYLOCALSTORAGEITEMCART);
  if (data.length > 0) {
    let number = data.length;
    queryShowItemCart.innerHTML = number;
  } else {
    queryShowItemCart.innerHTML = "";
  }
}
showNumberItemCart();
