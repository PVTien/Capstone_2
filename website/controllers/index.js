import { Product } from "../models/product.js";
import { ProductService } from "../services/product.js";

const productService = new ProductService();

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
            <button class="btn__addCart">Thêm vào Giỏ hàng</button>
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

window.onload = () => {
  getProductList();
};
