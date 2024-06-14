import config from "../config";

export const createFullHPVBundle = (data) => {
  return {
    resourceType: "Bundle",
    id: "HPVFullBundleExample",
    meta: {
      profile: [`${config.fhirIG}/StructureDefinition/hpv-full-bundle`],
    },
    type: "transaction",
    // timestamp: "2024-02-18T09:30:00+02:00",
    entry: [
      {
        fullUrl: `${config.hapiFhirURL}/Patient/${data.patient.id}`,
        resource: {
          resourceType: "Patient",
          id: data.patient.id,
          meta: {
            profile: [
              `${config.fhirIG}/StructureDefinition/hpv-immunization-patient`,
            ],
          },

          extension: [
            {
              url: `${config.fhirIG}/StructureDefinition/administrative-sex`,
              valueCodeableConcept: {
                coding: [
                  {
                    system: "http://terminology.hl7.org/CodeSystem/v2-0001",
                    code: data.patient.sex,
                  },
                ],
              },
            },
          ],
          identifier: [
            {
              system: `${config.fhirIG}/identifier/patient-card-number`,
              value: data.patient.cardNumber,
            },
            {
              system: `${config.fhirIG}/identifier/patient-passport`,
              value: data.patient.passport || "",
            },
            {
              system: `${config.fhirIG}/identifier/patient-nrc`,
              value: data.patient.nrc || "",
            },
          ],
          name: [
            {
              use: "official",
              family: data.patient.lastName,
              given: [data.patient.firstName, data.patient.lastName],
            },
          ],
          telecom: [
            {
              system: "email",
              value: data.patient.email || "",
            },
            {
              system: "phone",
              value: data.patient.phone || "",
            },
          ],
          birthDate: data.patient.dob,
          address: [
            {
              line: [data.patient.address],
              //   city: "Ndola",
              //   district: "Ndola District",
              //   state: "Copperbelt Province",
              country: "Zambia",
            },
          ],
          managingOrganization: {
            reference: `Organization/${data.patient.organization.id}`,
          },
          link: [
            {
              other: {
                reference: `RelatedPerson/${data.guardian.id}`,
              },
              type: "seealso",
            },
          ],
        },
        request: {
          method: "PUT",
          url: `Patient/${data.patient.id}`,
        },
      },
      {
        fullUrl: `${config.hapiFhirURL}/Encounter/${data.encounter.id}`,
        resource: {
          resourceType: "Encounter",
          id: data.encounter.id,
          meta: {
            profile: [
              `${config.fhirIG}/StructureDefinition/target-facility-encounter`,
            ],
          },
          text: {
            status: "generated",
            div: '<div xmlns="http://www.w3.org/1999/xhtml"><a name="Encounter_HPVTargetFacilityEncounterExample"> </a><p><b>Generated Narrative: Encounter</b><a name="HPVTargetFacilityEncounterExample"> </a><a name="hcHPVTargetFacilityEncounterExample"> </a></p><div style="display: inline-block; background-color: #d9e0e7; padding: 6px; margin: 4px; border: 1px solid #8da1b4; border-radius: 5px; line-height: 60%"><p style="margin-bottom: 0px">ResourceEncounter &quot;HPVTargetFacilityEncounterExample&quot; </p><p style="margin-bottom: 0px">Profile: <a href="StructureDefinition-target-facility-encounter.html">Target Facility Encounter</a></p></div><p><b>status</b>: completed</p><p><b>class</b>: ambulatory <span style="background: LightGoldenRodYellow; margin: 4px; border: 1px solid khaki"> (<a href="http://terminology.hl7.org/5.5.0/CodeSystem-v3-ActCode.html">ActCode</a>#AMB)</span></p><p><b>subject</b>: <a href="Patient-ImmunizationPatientExample.html">Patient/ImmunizationPatientExample</a> &quot; SMITH&quot;</p><p><b>serviceProvider</b>: <a href="Organization-OrganizationExample.html">Organization/OrganizationExample</a> &quot;Facility one&quot;</p><p><b>actualPeriod</b>: 2022-12-01 --&gt; 2023-01-20</p></div>',
          },
          status: "completed",
          class: [
            {
              coding: [
                {
                  system: "http://terminology.hl7.org/CodeSystem/v3-ActCode",
                  code: data.encounter.code,
                },
              ],
            },
          ],
          subject: {
            reference: `Patient/${data.patient.id}`,
          },
          serviceProvider: {
            reference: `Organization/${data.patient.organization.id}`,
          },
          actualPeriod: {
            start: data.encounter.start,
            end: data.encounter.end,
          },
        },
        request: {
          method: "PUT",
          url: `Encounter/${data.encounter.id}`,
        },
      },
      {
        fullUrl: `${config.hapiFhirURL}/Immunization/${data.immunization.id}`,
        resource: {
          resourceType: "Immunization",
          id: data.immunization.id,
          meta: {
            profile: [`${config.fhirIG}/StructureDefinition/hpv-immunization`],
          },
          // text: {
          //   status: "extensions",
          //   div: '<div xmlns="http://www.w3.org/1999/xhtml"><a name="Immunization_HPVImmunizationExample"> </a><p><b>Generated Narrative: Immunization</b><a name="HPVImmunizationExample"> </a><a name="hcHPVImmunizationExample"> </a></p><div style="display: inline-block; background-color: #d9e0e7; padding: 6px; margin: 4px; border: 1px solid #8da1b4; border-radius: 5px; line-height: 60%"><p style="margin-bottom: 0px">ResourceImmunization &quot;HPVImmunizationExample&quot; </p><p style="margin-bottom: 0px">Profile: <a href="StructureDefinition-hpv-immunization.html">HPV Immunization</a></p></div><p><b>HPV Patient Registration Date</b>: 2024-01-31</p><p><b>status</b>: completed</p><p><b>vaccineCode</b>: J07BM01 <span style="background: LightGoldenRodYellow; margin: 4px; border: 1px solid khaki"> (mms#J07BM01)</span></p><h3>AdministeredProducts</h3><table class="grid"><tr><td style="display: none">-</td><td><b>Reference</b></td></tr><tr><td style="display: none">*</td><td>See on this page: Medication/HPVVaccineExample</td></tr></table><p><b>patient</b>: See on this page: Patient/HPVImmunizationPatientExample</p><p><b>encounter</b>: See on this page: Encounter/HPVTargetFacilityEncounterExample</p><p><b>occurrence</b>: 2024-01-31</p><h3>Performers</h3><table class="grid"><tr><td style="display: none">-</td><td><b>Actor</b></td></tr><tr><td style="display: none">*</td><td><a href="Organization-OrganizationExample.html">Organization/OrganizationExample</a> &quot;Facility one&quot;</td></tr></table><h3>ProtocolApplieds</h3><table class="grid"><tr><td style="display: none">-</td><td><b>DoseNumber</b></td></tr><tr><td style="display: none">*</td><td>DN0000000</td></tr></table></div>',
          // },
          extension: [
            {
              url: `${config.fhirIG}/StructureDefinition/hpv-vaccination-patient-registration-date`,
              valueDateTime: data.immunization.registrationDate,
            },
          ],
          status: "completed",
          vaccineCode: {
            coding: [
              {
                system: "http://id.who.int/icd11/mms",
                code: data.immunization.vaccineCode,
              },
            ],
          },
          administeredProduct: {
            reference: {
              reference: `Medication/${data.medication.id}`,
            },
          },
          patient: {
            reference: `Patient/${data.patient.id}`,
          },
          encounter: {
            reference: `Encounter/${data.encounter.id}`,
          },
          occurrenceDateTime: data.encounter.start,
          // performer: [
          //   {
          //     actor: {
          //       reference: `Organization/${data.guardian.id}`,
          //     },
          //   },
          // ],
          // protocolApplied: [
          //   {
          //     doseNumber: "DN0000000",
          //   },
          // ],
        },
        request: {
          method: "PUT",
          url: `Immunization/${data.immunization.id}`,
        },
      },
      {
        fullUrl: `${config.hapiFhirURL}/RelatedPerson/${data.guardian.id}`,
        resource: {
          resourceType: "RelatedPerson",
          id: data.guardian.id,
          meta: {
            profile: [
              `${config.fhirIG}/StructureDefinition/guardian-relation-to-patient`,
            ],
          },
          text: {
            status: "generated",
            div: '<div xmlns="http://www.w3.org/1999/xhtml"><a name="RelatedPerson_HPVGuardianRelatedPersonExample"> </a><p><b>Generated Narrative: RelatedPerson</b><a name="HPVGuardianRelatedPersonExample"> </a><a name="hcHPVGuardianRelatedPersonExample"> </a></p><div style="display: inline-block; background-color: #d9e0e7; padding: 6px; margin: 4px; border: 1px solid #8da1b4; border-radius: 5px; line-height: 60%"><p style="margin-bottom: 0px">ResourceRelatedPerson &quot;HPVGuardianRelatedPersonExample&quot; </p><p style="margin-bottom: 0px">Profile: <a href="StructureDefinition-guardian-relation-to-patient.html">Guardian Relation to Patient Profile</a></p></div><p><b>patient</b>: See on this page: Patient/HPVImmunizationPatientExample</p><p><b>relationship</b>: guardian <span style="background: LightGoldenRodYellow; margin: 4px; border: 1px solid khaki"> (<a href="http://terminology.hl7.org/5.5.0/CodeSystem-v3-RoleCode.html">RoleCode</a>#GUARD)</span></p><p><b>name</b>: Mike Smith (Official)</p></div>',
          },
          // patient: {
          //   reference: `Patient/${data.patient.id} `,
          // },
          relationship: [
            {
              coding: [
                {
                  system: "http://terminology.hl7.org/CodeSystem/v3-RoleCode",
                  code: "GUARD",
                },
              ],
            },
          ],
          name: [
            {
              use: "official",
              family: "Smith",
              given: ["Mike"],
            },
          ],
        },
        request: {
          method: "PUT",
          url: `RelatedPerson/${data.guardian.id}`,
        },
      },
      {
        fullUrl: `${config.hapiFhirURL}/Observation/${data.observation.id}`,
        resource: {
          resourceType: "Observation",
          id: data.observation.id,
          meta: {
            profile: [
              `${config.fhirIG}/StructureDefinition/hpv-immunocomprommised`,
            ],
          },
          text: {
            status: "generated",
            div: '<div xmlns="http://www.w3.org/1999/xhtml"><a name="Observation_HPVImmunocomprommisedExample"> </a><p><b>Generated Narrative: Observation</b><a name="HPVImmunocomprommisedExample"> </a><a name="hcHPVImmunocomprommisedExample"> </a></p><div style="display: inline-block; background-color: #d9e0e7; padding: 6px; margin: 4px; border: 1px solid #8da1b4; border-radius: 5px; line-height: 60%"><p style="margin-bottom: 0px">ResourceObservation &quot;HPVImmunocomprommisedExample&quot; </p><p style="margin-bottom: 0px">Profile: <a href="StructureDefinition-hpv-immunocomprommised.html">HPV Immunocomprommised</a></p></div><p><b>status</b>: final</p><p><b>category</b>: Laboratory <span style="background: LightGoldenRodYellow; margin: 4px; border: 1px solid khaki"> (<a href="http://terminology.hl7.org/5.5.0/CodeSystem-observation-category.html">Observation Category Codes</a>#laboratory)</span></p><p><b>code</b>: Primary immunodeficiencies, unspecified <span style="background: LightGoldenRodYellow; margin: 4px; border: 1px solid khaki"> (mms#4A0Z)</span></p><p><b>subject</b>: See on this page: Patient/HPVImmunizationPatientExample</p><p><b>encounter</b>: See on this page: Encounter/HPVTargetFacilityEncounterExample</p><p><b>effective</b>: 2024-01-31</p><p><b>performer</b>: <a href="Organization-OrganizationExample.html">Organization/OrganizationExample</a> &quot;Facility one&quot;</p><p><b>value</b>: true</p></div>',
          },
          status: "final",
          category: [
            {
              coding: [
                {
                  system:
                    "http://terminology.hl7.org/CodeSystem/observation-category",
                  code: "laboratory",
                },
              ],
            },
          ],
          code: {
            coding: [
              {
                system: "http://id.who.int/icd11/mms",
                code: "4A0Z",
              },
            ],
            text: data.observation.immunocompromised
              ? "immunocompromised: yes"
              : "immunocompromised: no",
          },
          subject: {
            reference: `Patient/${data.patient.id}`,
          },
          encounter: {
            reference: `Encounter/${data.encounter.id}`,
          },
          effectiveDateTime: "2024-01-31",
          // performer: [
          //   {
          //     reference: `Organization/${data.patient.organization.id}`,
          //   },
          // ],
          valueBoolean: true,
        },
        request: {
          method: "PUT",
          url: `Observation/${data.observation.id}`,
        },
      },
      //   {
      //     fullUrl: `${config.hapiFhirURL}/Medication/945590fa-56a9-4a92-b47f-3242a57991f3`,
      //     resource: {
      //       resourceType: "Medication",
      //       id: "945590fa-56a9-4a92-b47f-3242a57991f3",
      //       meta: {
      //         profile: [
      //           `${config.hapiFhirURL}/StructureDefinition/hpv-vaccine-details`,
      //         ],
      //       },
      //       text: {
      //         status: "generated",
      //         div: '<div xmlns="http://www.w3.org/1999/xhtml"><a name="Medication_HPVVaccineExample"> </a><p><b>Generated Narrative: Medication</b><a name="HPVVaccineExample"> </a><a name="hcHPVVaccineExample"> </a></p><div style="display: inline-block; background-color: #d9e0e7; padding: 6px; margin: 4px; border: 1px solid #8da1b4; border-radius: 5px; line-height: 60%"><p style="margin-bottom: 0px">ResourceMedication &quot;HPVVaccineExample&quot; </p><p style="margin-bottom: 0px">Profile: <a href="StructureDefinition-hpv-vaccine-details.html">HPV Vaccine Details</a></p></div><p><b>code</b>: J07BM01 <span style="background: LightGoldenRodYellow; margin: 4px; border: 1px solid khaki"> (mms#J07BM01)</span></p><h3>Batches</h3><table class="grid"><tr><td style="display: none">-</td><td><b>LotNumber</b></td></tr><tr><td style="display: none">*</td><td>123</td></tr></table></div>',
      //       },
      //       code: {
      //         coding: [
      //           {
      //             system: "http://id.who.int/icd11/mms",
      //             code: "J07BM01",
      //           },
      //         ],
      //       },
      //       batch: {
      //         lotNumber: "123",
      //       },
      //     },
      //     request: {
      //       method: "PUT",
      //       url: "Medication/945590fa-56a9-4a92-b47f-3242a57991f3",
      //     },
      //   },
      {
        fullUrl: `${config.hapiFhirURL}/Organization/${data.facility.id}`,
        resource: {
          resourceType: "Organization",
          id: data.facility.id,
          meta: {
            profile: [
              `${config.fhirIG}/StructureDefinition/hpv-vaccination-site-type`,
            ],
          },
          text: {
            status: "generated",
            div: '<div xmlns="http://www.w3.org/1999/xhtml"><a name="Organization_HPVVaccinationSiteTypeExample"> </a><p><b>Generated Narrative: Organization</b><a name="HPVVaccinationSiteTypeExample"> </a><a name="hcHPVVaccinationSiteTypeExample"> </a></p><div style="display: inline-block; background-color: #d9e0e7; padding: 6px; margin: 4px; border: 1px solid #8da1b4; border-radius: 5px; line-height: 60%"><p style="margin-bottom: 0px">ResourceOrganization &quot;HPVVaccinationSiteTypeExample&quot; </p><p style="margin-bottom: 0px">Profile: <a href="StructureDefinition-hpv-vaccination-site-type.html">Vaccination site type in HPV</a></p></div><p><b>type</b>: Community <span style="background: LightGoldenRodYellow; margin: 4px; border: 1px solid khaki"> (<a href="CodeSystem-cs-proprietary-hpv-vaccination-site.html">Vaccination site types in HPV (Proprietary)</a>#Community)</span></p><p><b>name</b>: facility name</p></div>',
          },
          type: [
            {
              coding: [
                {
                  system: `${config.fhirIG}/CodeSystem/cs-proprietary-hpv-vaccination-site`,
                  code: "Community",
                },
              ],
            },
          ],
          name: data.facility.name,
        },
        request: {
          method: "PUT",
          url: `Organization/${data.facility.id}`,
        },
      },
    ],
  };
};
