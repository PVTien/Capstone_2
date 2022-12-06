class ProductService {
  getList = () => {
    return axios({
      url: "https://6384edd93fa7acb14f04fa6f.mockapi.io/Products",
      method: "GET",
    });
  };

  getById = (id) => {
    return axios({
      url: `https://6384edd93fa7acb14f04fa6f.mockapi.io/Products/${id}`,
      method: "GET",
    });
  };
}
