class ProductService {
  getList = () => {
    return axios({
      url: "https://6384edd93fa7acb14f04fa6f.mockapi.io/Products",
      method: "GET",
    });
  };

  addProd = (data) => {
    return axios({
      url: "https://6384edd93fa7acb14f04fa6f.mockapi.io/Products",
      method: "POST",
      data: data,
    });
  };

  deleteProd = (id) => {
    return axios({
      url: `https://6384edd93fa7acb14f04fa6f.mockapi.io/Products/${id}`,
      method: "DELETE",
    });
  };

  getById = (id) => {
    return axios({
      url: `https://6384edd93fa7acb14f04fa6f.mockapi.io/Products/${id}`,
      method: "GET",
    });
  };

  updateProd = (id, data) => {
    return axios({
      url: `https://6384edd93fa7acb14f04fa6f.mockapi.io/Products/${id}`,
      method: "PUT",
      data: data,
    });
  };
}
