const productService = new ProductService();

let cart = [];

const domId = (id) => document.getElementById(id);

const getProductList = () => {
  productService.getList().then((response) => {
    renderProductList(response.data);
  });
};

const renderProductList = (data) => {
  const html = data.reduce((total, element) => {
    total += `
      <div class="card col-3" style="width: 18rem">
            <img src="${element.img}" class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">${element.name}</h5>
              <p><span>Kích thước: </span>${element.screen}</p>
              <p><span>Camera sau: </span>${element.backCamera}</p>
              <p><span>Camera trước: </span>${element.frontCamera}</p>
              <p><span>Nổi bật: </span>${element.desc}</p>           
            </div>
            <p class="span__price">Giá: <span>${element.price}</span></p>
            <button class="btn__addCart" onclick="addToCart(${element.id}); setTimeout(() => {
              saveData()
            }, 2000);">Thêm vào Giỏ hàng</button>
          </div>
      `;
    return total;
  }, "");
  domId("products__content").innerHTML = html;
};

const filterProduct = (data, type) => {
  let result = [];
  if (type === "all") return data;
  for (let i in data) {
    if (data[i].type === type) {
      result.push(data[i]);
    }
  }
  return result;
};

const getFilterProductList = (type) => {
  productService.getList().then((response) => {
    const data = filterProduct(response.data, type);
    renderProductList(data);
  });
};

domId("select__type").onchange = (event) => {
  const value = event.target.value;
  getFilterProductList(value);
};

const renderCart = (data) => {
  const html = data.reduce((total, element) => {
    total += `
      <div class="cartItem d-flex">
        <div class="img__Cart d-flex align-items-center px-3">
          <img src="${element.prod.img}" />
        </div>
        <div class="info">
          <p class="p__Name">${element.prod.name}</p>
          <p class="p__Price">${element.prod.price}</p>
          <button class="btn btn-secondary" onclick="minusQuantity(${element.prod.id})">
            <i class="fa-solid fa-minus"></i>
          </button>
          <input
            class="form-control mx-2 text-center"
            type="text"
            value="${element.quantity}"
            disabled
          />
          <button class="btn btn-secondary" onclick="plusQuantity(${element.prod.id})">
            <i class="fa-solid fa-plus"></i>
          </button>
        </div>
        <div class="btn__delete d-flex align-items-center px-3">
          <button class="btn btn-danger" onclick="deleteCartItem(${element.prod.id})">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>    
    `;
    return total;
  }, "");
  domId("modal__body").innerHTML = html;
};

const addToCart = (id) => {
  alert("Đã thêm vào giỏ hàng");

  productService.getById(id).then((response) => {
    for (let i in cart) {
      if (Number(cart[i].prod.id) === id) {
        cart[i].quantity++;
        return cart;
      }
    }
    cart.push({ prod: response.data, quantity: 1 });
  });
};

const plusQuantity = (id) => {
  for (let i in cart) {
    if (Number(cart[i].prod.id) === id) {
      cart[i].quantity++;
    }
  }
  renderCart(cart);
  saveData();
};

const minusQuantity = (id) => {
  for (let i in cart) {
    if (Number(cart[i].prod.id) === id) {
      cart[i].quantity--;
      if (cart[i].quantity < 1) {
        cart.splice(i, 1);
      }
    }
  }
  renderCart(cart);
  saveData();
};

const deleteCartItem = (id) => {
  for (let i in cart) {
    if (Number(cart[i].prod.id) === id) {
      cart.splice(i, 1);
    }
  }
  renderCart(cart);
  saveData();
};

const saveData = () => {
  const cartJSON = JSON.stringify(cart);
  localStorage.setItem("cart", cartJSON);
};

const getData = () => {
  const cartJSON = localStorage.getItem("cart");
  if (!cartJSON) return;
  const cartLocal = JSON.parse(cartJSON);
  cart = cartLocal;
};

const pay = () => {
  let totalMoney = 0;
  let oneProd = 0;

  for (let i in cart) {
    oneProd = cart[i].quantity * cart[i].prod.price;
    totalMoney += oneProd;
  }

  if (confirm(`Xác nhận thanh toán ${totalMoney}`)) {
    alert("Thanh toán thành công");
    document.querySelector(".close").click();
    cart = [];
  } else {
    document.querySelector(".close").click();
  }
  saveData();
};

window.onload = () => {
  getProductList();
  getData();
};
