const listBillsApi = "http://localhost:3000/DANHSACHDONHANG";


function switchBuyPopup() {
  let status = document.querySelector(".buy-popup");
  if ( status.style.display === "none") {
    status.style.display = "block";
    resetNotes();
    renderProvince();
    renderDistrict();
    renderWard();
  } else {
    status.style.display = "none";
  }
}

let dataProvince = [];
let dataDistrict = [];
let dataWard = [];
const urlProvince = "https://provinces.open-api.vn/api/p/";
const urlDistrict = "https://provinces.open-api.vn/api/d/";
const urlWard = "https://provinces.open-api.vn/api/w/";

function renderProvince() {
  app.getDataAPI(urlProvince, renderProvinceHtml);
}

function renderProvinceHtml(data) {
  dataProvince = data;
  let html = `
      <option selected value="0" >--Chọn Tỉnh/Thành phố--</option>
      `;
  dataProvince.map(function (value) {
    html += `
          <option value="${value.code}">${value.name}</option>
          `;
  });
  queryProvince.innerHTML = html;
}

function renderDistrict() {
  queryNoteProvince.innerHTML = "";
  app.getDataAPI(urlDistrict, renderDistrictHtml);
}

function renderDistrictHtml(data) {
  dataDistrict = data;
  const id = queryProvince.value;
  let html = `
      <option selected value="0">--Chọn Quận/Huyện--</option>
      `;
  dataDistrict.map(function (value) {
    if (value.province_code === Number(id)) {
      html += `
              <option value="${value.code}">${value.name}</option>
              `;
    }
  });
  queryDistrict.innerHTML = html;
  queryWard.innerHTML = `<option selected value="0">--Chọn Phường/Xã--</option>`;
}

function renderWard() {
  queryNoteDistrict.innerHTML = "";
  app.getDataAPI(urlWard, renderWardHtml);
}

function renderWardHtml(data) {
  dataWard = data;
  const id = queryDistrict.value;
  let html = `
      <option selected value="0">--Chọn Phường/Xã--</option>
      `;
  dataWard.map(function (value) {
    if (value.district_code === Number(id)) {
      html += `
              <option value="${value.code}">${value.name}</option>
              `;
    }
  });
  queryWard.innerHTML = html;
}

let userId = [];
let customerList = app.getDataFromLocalStorage("DANHSACHKHACHMUAHANG");

function createNewId() {
  let check = true;
  let newUserId = Math.floor(Math.random() * 1000) + 1;
  customerList.map(function (value) {
    if (value.id === newUserId) {
      check = false;
    }
  });
  if (check) {
    return newUserId;
  } else {
    createNewId();
  }
}

function validateBuyAccept() {
  let firstName = document.querySelector(".firstName");
  let lastName = document.querySelector(".lastName");
  let email = document.querySelector(".email");
  let phoneNumber = document.querySelector(".phoneNumber");
  let address = document.querySelector(".address");
  let province = document.querySelector(".province");
  let district = document.querySelector(".district");
  let ward = document.querySelector(".ward");
  if (firstName.value === "" || firstName.value === null) {
    queryNoteFirstName.innerHTML = "Họ không được để trống";
  }
  if (lastName.value === "" || lastName.value === null) {
    queyNoteLastName.innerHTML = "Tên không được để trống";
  }
  if (email.value === "" || email.value === null) {
    queryNoteEmail.innerHTML = "Email không được để trống";
  }
  if (phoneNumber.value === "" || phoneNumber.value === null) {
    queryNotePhone.innerHTML = "Số điện thoại không được để trống";
  }
  if (address.value === "" || address.value === null) {
    queryNoteAddress.innerHTML = "Địa chỉ không được để trống";
  }
  if (province.value === "0" || province.value === null) {
    queryNoteProvince.innerHTML = "Chưa chọn Tỉnh/Thành phố";
  }
  if (district.value === "0" || district.value === null) {
    queryNoteDistrict.innerHTML = "Chưa chọn Quận/Huyện";
  }
  if (ward.value === "0" || ward.value === null) {
    queryNoteWard.innerHTML = "Chưa chọn Phường/Xã";
  }
}

function resetNotes() {
  queryNoteFirstName.innerHTML = "";
  queyNoteLastName.innerHTML = "";
  queryNoteEmail.innerHTML = "";
  queryNotePhone.innerHTML = "";
  queryNoteAddress.innerHTML = "";
  queryNoteProvince.innerHTML = "";
  queryNoteDistrict.innerHTML = "";
  queryNoteWard.innerHTML = "";
}

function validateName() {
  let reg =
    /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀẾỂưăạảấầẩẫậắằẳẵặẹẻẽềếểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳýỵỷỹ]+$/g;
  let firstName = document.querySelector(".firstName").value;
  let newString = firstName.replace(/ /g, "");
  if (!reg.test(newString)) {
    queryNoteFirstName.innerHTML = "Họ không được có số và có ký tự đặc biệt";
  } else {
    queryNoteFirstName.innerHTML = "";
  }
}

function validateLastName() {
  let reg =
    /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀẾỂưăạảấầẩẫậắằẳẵặẹẻẽềếểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳýỵỷỹ]+$/g;
  let lastName = document.querySelector(".lastName").value;
  let newString = lastName.replace(/ /g, "");
  if (!reg.test(newString)) {
    queyNoteLastName.innerHTML = "Tên không được có số và có ký tự đặc biệt";
  } else {
    queyNoteLastName.innerHTML = "";
  }
}

function validateEmail() {
  let reg = /^[a-zA-Z0-9.]+@[a-zA-Z]+\.[a-zA-Z]+$/g;
  let email = document.querySelector(".email").value;
  let newEmail = email.replace(/ /g, "");
  if (!reg.test(newEmail)) {
    queryNoteEmail.innerHTML = "Email chưa đúng (VD: minh@gmail.com)";
  } else {
    queryNoteEmail.innerHTML = "";
  }
}

function validatePhoneNumber() {
  let reg = /\D/
  let phone = document.querySelector(".phoneNumber").value;
  let newPhone = phone.replace(/ /g, "");
  if (reg.test(newPhone)) {
    queryNotePhone.innerHTML = "Số điện thoại chưa đúng(chỉ được nhập số)";
  } else {
    queryNotePhone.innerHTML = "";
  }
}

function validateAddress() {
  let address = document.querySelector(".address").value;
  if (address.length > 0) {
    queryNoteAddress.innerHTML = "";
  } else {
    queryNoteAddress.innerHTML = "Nhập địa chỉ nhà";
  }
}

function validateWard() {
  queryNoteWard.innerHTML = "";
}

function nowDate() {
  let date = new Date();
  let date1 =
    date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
  return date1;
}
//kiểm tra các thông báo lỗi hiển thị lên web
function checkNote() {
  let noteFirstName = queryNoteFirstName.innerHTML;
  let noteLastName = queyNoteLastName.innerHTML;
  let noteEmail = queryNoteEmail.innerHTML;
  let notePhoneNumber = queryNotePhone.innerHTML;
  let noteAddress = queryNoteAddress.innerHTML;
  let noteProvince = queryNoteProvince.innerHTML;
  let noteDistrict = queryNoteDistrict.innerHTML;
  let noteWard = queryNoteWard.innerHTML;
  let checkNote =
    noteFirstName +
    noteLastName +
    noteEmail +
    notePhoneNumber +
    noteAddress +
    noteProvince +
    noteDistrict +
    noteWard;
  return checkNote;
}

function makeAddress() {
  let address = document.querySelector(".address").value;
  let idProvince = document.querySelector(".province").value;
  let idDistrict = document.querySelector(".district").value;
  let idWard = document.querySelector(".ward").value;
  let province = dataProvince.find((a) => a.code === Number(idProvince));
  let district = dataDistrict.find(
    (a) =>
      a.code === Number(idDistrict) && a.province_code === Number(idProvince)
  );
  let ward = dataWard.find(
    (a) => a.code === Number(idWard) && a.district_code === Number(idDistrict)
  );
  return address + " " + ward.name + " " + district.name + " " + province.name;
}

function makeFullName() {
  let firstName = document.querySelector(".firstName").value;
  let lastName = document.querySelector(".lastName").value;
  return firstName + " " + lastName;
}
//tạo 1 khách hàng mới lưu trữ thông tin vào api
function createNewCustomer() {
  validateBuyAccept();
  if (checkNote().length === 0) {
    let email = document.querySelector(".email").value;
    let phoneNumber = document.querySelector(".phoneNumber").value;
    let newCustomer = {
      idUser: createNewId(),
      fullName: makeFullName(),
      address: makeAddress(),
      email: email,
      phone: phoneNumber,
      buyTime: nowDate(),
      itemNumber: total.get("So mat hang"),
      totalQuantity: total.get("Tong so luong"),
      totalPrice: total.get("Tong so tien"),
      cart: app.getDataFromLocalStorage(app.KEYLOCALSTORAGEITEMCART),
    };
    app.postDataAPI(listBillsApi, newCustomer);
    minusDataLocal(app.KEYLOCALSTORAGELISTSP, app.KEYLOCALSTORAGEITEMCART);
    switchBuyPopup();
    turnDisplay();
  }
}

function minusDataLocal(keyData, keyCart) {
  let data = app.getDataFromLocalStorage(keyData);
  let cart = app.getDataFromLocalStorage(keyCart);
  cart.forEach((a) => {
    data.find((b) => {
      if (b.id === a.idSP) {
        b.quantity -= a.soLuong;
      }
    });
  });
  app.upLoadDataToLocalStorage(keyData, data);
  app.upLoadDataToLocalStorage(keyCart, []);
}
