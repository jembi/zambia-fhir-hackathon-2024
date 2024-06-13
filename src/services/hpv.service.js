import { createHttpClient } from "../utils/http";

class HPVService {
  client;
  constructor() {
    this.client = createHttpClient(
      "https://play.im.dhis2.org/stable-2-40-3-2",
      {
        Authorization: `Basic ${Buffer.from("admin:district").toString(
          "base64"
        )}`,
      }
    );
  }

  getAll() {
    const response = this.client.get("/api/users");

    console.log(response);

    return response;
  }
}

export default HPVService;
