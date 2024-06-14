import { createHttpClient } from "../utils/http";

class FhirService {
  client;
  constructor() {
    this.client = createHttpClient("https://hapi.moh.gov.zm");
  }

  async postBundle(bundle) {
    const res = await this.client.post("fhir", bundle);
    return res;
  }
}

export default FhirService;
