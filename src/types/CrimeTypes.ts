export type Crime = {
  "_id": string,
  "DR_NO": number,
  "Date Rptd": string,
  "DATE OCC": string,
  "TIME OCC": number,
  "AREA": number,
  "AREA NAME": string,
  "Rpt Dist No": number,
  "Part 1-2": number,
  "Crm Cd": number,
  "Crm Cd Desc": string,
  "Mocodes": number,
  "Vict Age": number,
  "Vict Sex": string,
  "Vict Descent": string,
  "Premis Cd": number,
  "Premis Desc": string,
  "Weapon Used Cd": number | null,
  "Weapon Desc": string | null,
  "Status": string,
  "Status Desc": string,
  "Crm Cd 1": number,
  "LOCATION": string,
  "LAT": number,
  "LON": number
}

export type CrimeWeapon = {
  _id: string;
  count: number;
}

export type CrimeDate = {
  _id: string;
  count: number;
};
