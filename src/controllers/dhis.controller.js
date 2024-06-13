import HPVService from "../services/hpv.service";

export const index = async (req, res) => {
  const hpvService = new HPVService();

  const hpvData = await hpvService.getAll();

  // Transform data here to fihr bundles

  res.status(200).send(hpvData);
};
