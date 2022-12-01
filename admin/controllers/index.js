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
                class="btn btn-info mr-3">Sửa</button>
              <button
                data-toggle="modal"
                data-target="#myModal"
                class="btn btn-danger">Xóa</button>
            </td>
        </tr>
      `;
    return total;
  }, "");
  domId("tbodySanPham").innerHTML = html;
};

window.onload = () => {
  getProductList();
};
