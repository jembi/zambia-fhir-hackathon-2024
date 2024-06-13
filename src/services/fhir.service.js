import { createHttpClient } from "../utils/http";

class FhirService {
  client;
  constructor() {
    this.client = createHttpClient({
      baseURL: "https://hapi.moh.gov.zm/fhir",
    });
  }

  getPatientById(id) {
    return this.client.get(`/Patient/${id}`);
  }
}

export default FhirService;
