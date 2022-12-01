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
            <button class="btn__mua">Mua</button>
          </div>
      `;
    return total;
  }, "");
  domId("products__content").innerHTML = html;
};

window.onload = () => {
  getProductList();
};
