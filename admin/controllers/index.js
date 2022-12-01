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
            <td>${element.img}</td>
            <td>${element.desc}</td>
            <td>${element.type}</td>

        </tr>
      `;
    return total;
  }, "");
  domId("tbodySanPham").innerHTML = html;
};

window.onload = () => {
  getProductList();
};
