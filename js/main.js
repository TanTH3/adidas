const app = (function () {

  const KEYLOCALSTORAGELISTSP = "DANHSACHSP";
  const KEYLOCALSTORAGEITEMCART = "DANHSACHITEMCART";
  
  const isObject = (data) => {
    let result = false;
    if (typeof data === "object") {
      result = true;
    }
    return result;
  };

  const upLoadDataToLocalStorage = (key, data) => {
    if (isObject(data)) {
      localStorage.setItem(key, JSON.stringify(data));
    }
  };

  const getDataFromLocalStorage = (key) => {
    let dataJson = localStorage.getItem(key);
    let data = [];
    if (dataJson !== null) {
      data = JSON.parse(dataJson);
    }
    return data;
  };

  // const getDataAPI = (url, resolve) => {
  //   fetch(url)
  //       .then(response => response.json())
  //       .then(resolve)
  //       // .catch(() => { alert(`Không thể lấy dữ liệu`) })
  
  const getDataAPI = async (url, resolve) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data)
      resolve(data);
    } catch (error) {
      alert(`Can't get data API`);
    }

  };

  const postDataAPI = async (url, data, resolve) => {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      const response = await fetch(url, options);
      const responseData = await response.json();
      resolve(responseData);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteDataAPI = async (url, resolve) => {
    try {
      const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(url, options);
      const responseData = await response.json();
      resolve(responseData);
    } catch (error) {
      console.error(error);
    }
  };

  const addItems = (id) => {
    let data = getDataFromLocalStorage(KEYLOCALSTORAGELISTSP);
    let cart = getDataFromLocalStorage(KEYLOCALSTORAGEITEMCART);
    let indexItem = cart.findIndex((item) => item.idSP === id);
    let indexOnLocal = data.findIndex((value) => value.id === id);

    if (0 === data[indexOnLocal].quantity) {
      alert("Hàng trong kho đã hết, vui lòng chọn mặt hàng khác");
    } else if (indexItem < 0) {
      cart.push({ idSP: id, soLuong: 1 });
    } else if (cart[indexItem].soLuong === data[indexOnLocal].quantity) {
      alert("Số lượng yêu cầu vượt quá số lượng hàng có trong kho");
    } else {
      cart[indexItem].soLuong++;
    }
    upLoadDataToLocalStorage(KEYLOCALSTORAGEITEMCART, cart);
  };

  return {
    upLoadDataToLocalStorage,
    getDataFromLocalStorage,
    getDataAPI,
    postDataAPI,
    deleteDataAPI,
    addItems,
    KEYLOCALSTORAGELISTSP,
    KEYLOCALSTORAGEITEMCART,
  };
})();
