import { createFullHPVBundle } from "../bundles/hpv.bundle";
import HPVService from "../services/hpv.service";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";
import FhirService from "../services/fhir.service";

export const exportData = async () => {
  const hpvService = new HPVService();

  const fhirService = new FhirService();

  const cursor = JSON.parse(
    fs.readFileSync(path.join(__dirname, "./cursor.json"))
  );

  let data = await hpvService.getDhis2Data(
    cursor.start,
    cursor.end,
    cursor.page
  );

  for (const row of data.rows) {
    cursor.start = formatJSDate(new Date(row[1]));
    cursor.end = formatJSDate(new Date());

    const bundle = createBundleObject(row);
    const hpvBundle = createFullHPVBundle(bundle);

    cursor.start = formatJSDate(new Date(row[2]));

    const fhirResponse = await fhirService.postBundle(hpvBundle);

    saveCursor(cursor);
  }
};

const formatJSDate = (date) => {
  let year = new Intl.DateTimeFormat("en", { year: "numeric" }).format(date);
  let month = new Intl.DateTimeFormat("en", { month: "2-digit" }).format(date);
  let day = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(date);

  return `${year}-${month}-${day}`;
};

const saveCursor = (cursor) => {
  fs.writeFileSync("./cursor.json", JSON.stringify(cursor));
};

const createBundleObject = (row) => {
  return {
    patient: {
      id: uuidv4(),
      firstName: row[10],
      lastName: row[11],
      sex: "F",
      address: row[8],
      phone: row[16],
      cardNumber: row[9],
      nrc: row[12],
      dob: row[13],
      organization: {
        id: 34,
      },
    },
    encounter: {
      id: uuidv4(),
      code: "",
      start: formatJSDate(new Date(row[1])),
      start: formatJSDate(new Date(row[1])),
    },
    immunization: {
      id: uuidv4(),
      code: "",
      registrationDate: "",
    },
    observation: {
      id: uuidv4(),
    },
    medication: {
      id: "945590fa-56a9-4a92-b47f-3242a57991f3",
    },
    guardian: {
      id: uuidv4(),
      firstName: row[10],
      lastName: row[11],
    },
    facility: {
      id: uuidv4(),
      name: row[4],
    },
  };
};

exportData();
