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
  const html = data.reduce((total, element, idx) => {
    total += `
        <tr>
            <td>${idx + 1}</td>
            <td>${element.name}</td>
            <td>${element.price}</td>
            <td>${element.screen}</td>
            <td>${element.backCamera}</td>
            <td>${element.frontCamera}</td>
            <td><a href="${element.img}" target="blank">Xem hình</a></td>
            <td>${element.desc}</td>
            <td>${element.type}</td>
            <td class="d-flex">
              <button
                data-toggle="modal"
                data-target="#myModal"
                onclick="openUpdateModal(${element.id})"
                class="btn btn-info mr-3">Sửa</button>
              <button
                onclick="deleteProduct(${element.id})"
                class="btn btn-danger">Xóa</button>
            </td>
        </tr>
      `;
    return total;
  }, "");
  domId("tbodySanPham").innerHTML = html;
};

domId("btnThemSP").onclick = () => {
  domId("exampleModalLabel").innerHTML = "Thêm sản phẩm";
  domId("myForm").reset();
  document.querySelector(".modal-footer").innerHTML =
    "<button onclick='addProduct()' class='btn btn-primary'>Thêm</button>";
};

const addProduct = () => {
  const name = domId("TenSP").value;
  const price = domId("GiaSP").value;
  const screen = domId("ManHinhSP").value;
  const backCamera = domId("CameraSau").value;
  const frontCamera = domId("CameraTruoc").value;
  const img = domId("HinhSP").value;
  const desc = domId("MoTaSP").value;
  const type = domId("LoaiSP").value;

  const product = new Product(
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    img,
    desc,
    type
  );

  productService.addProd(product).then(() => {
    document.querySelector(".close").click();
    alert("Thêm sản phẩm thành công");
    getProductList();
  });
};

const deleteProduct = (id) => {
  productService.deleteProd(id).then(() => {
    alert("Xóa sản phẩm thành công");
    getProductList();
  });
};

const openUpdateModal = (id) => {
  domId("exampleModalLabel").innerHTML = "Sửa sản phẩm";
  document.querySelector(
    ".modal-footer"
  ).innerHTML = `<button onclick='updateProduct(${id})' class='btn btn-primary'>Sửa</button>`;

  productService.getById(id).then((response) => {
    domId("TenSP").value = response.data.name;
    domId("GiaSP").value = response.data.price;
    domId("ManHinhSP").value = response.data.screen;
    domId("CameraSau").value = response.data.backCamera;
    domId("CameraTruoc").value = response.data.frontCamera;
    domId("HinhSP").value = response.data.img;
    domId("MoTaSP").value = response.data.desc;
    domId("LoaiSP").value = response.data.type;
  });
};

const updateProduct = (id) => {
  const name = domId("TenSP").value;
  const price = domId("GiaSP").value;
  const screen = domId("ManHinhSP").value;
  const backCamera = domId("CameraSau").value;
  const frontCamera = domId("CameraTruoc").value;
  const img = domId("HinhSP").value;
  const desc = domId("MoTaSP").value;
  const type = domId("LoaiSP").value;

  const product = new Product(
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    img,
    desc,
    type
  );

  productService.updateProd(id, product).then(() => {
    document.querySelector(".close").click();
    alert("Sửa sản phẩm thành công");
    getProductList();
  });
};

window.onload = () => {
  getProductList();
};
window.addProduct = addProduct;
window.deleteProduct = deleteProduct;
window.openUpdateModal = openUpdateModal;
window.updateProduct = updateProduct;
