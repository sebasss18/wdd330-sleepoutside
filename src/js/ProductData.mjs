const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor() {
    // We no longer need the category or path set here
  }
  
  async getData(category) {
    // Fetch directly from the backend API using the category parameter
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
    
    // The API sends the array inside a property called "Result"
    return data.Result;
  }
  
  async findProductById(id) {
    // Fetch a single product directly from the API by its ID
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    
    return data.Result;
  }
}