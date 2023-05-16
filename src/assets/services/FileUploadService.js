import axios from "axios";

class FileUploadService {
  uploadCustomerDocument(params, onUploadProgress) {
    let formData = new FormData();
    formData.append("document", params.file);
    formData.append("customer_id", params.customer_id);
    formData.append("category_id", params.category_id);

    return axios.post("/customer_document", formData, {
      onUploadProgress,
    });
  }

  getFiles(customer_id = 1){
    let formData = new FormData();
    formData.append('customer_id', customer_id);

    return axios.get('/customer_document', formData);
  }

  uploadTaskAttachment(file, onUploadProgress) {
    let formData = new FormData();
    formData.append("attachment", file);
    formData.append("customer_id", 1);
    formData.append("date", "03-03-2022");
    formData.append("name", "dummy_attachment");
    formData.append("place_id", 1);
    formData.append("type", 1);

    return axios.post("/task", formData, {
      onUploadProgress,
    });
  }
}

export default new FileUploadService();
