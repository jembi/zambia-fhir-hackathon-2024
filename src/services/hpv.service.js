import config from "../config";
import { createHttpClient } from "../utils/http";

class HPVService {
  client;
  constructor() {
    this.client = createHttpClient(config.dhi2.baseUrl, {
      Authorization: `Basic ${Buffer.from(
        "hackathon:Jembi@hackathon_2024"
      ).toString("base64")}`,
    });
  }

  async getDhis2Data(start, endDate, page = 1) {
    const query = {
      paging: true,
      // skipPaging: true,
      order: "createdAt:asc",
      pageSize: 2,
      page: page,
      ou: config.dhi2.orgUnit,
      ouMode: "DESCENDANTS",
      program: config.dhi2.program,
      eventStatus: "ACTIVE",
      eventStartDate: start,
      eventEndDate: endDate,
    };

    const params = new URLSearchParams(query);

    const response = await this.client.get(
      "api/trackedEntityInstances/query?" + params.toString()
    );

    console.log({ response });

    return response;
  }
}

export default HPVService;
