/*
  Copyright 2021 Kidus Tiliksew

  This file is part of Tensor EMR.

  Tensor EMR is free software: you can redistribute it and/or modify
  it under the terms of the version 2 of GNU General Public License as published by
  the Free Software Foundation.

  Tensor EMR is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

import { differenceInMonths, differenceInYears, format, parseISO } from "date-fns";
import { EyewearPrescription, Maybe } from "./models/models";

export const formatDate = (date: string) => {
  return format(
    new Date(date),
    "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"
  );
}

export const parseJwt: any = (token: string) => {
  if(token) {
    var base64Payload = token.split('.')[1];
    var payload = Buffer.from(base64Payload, 'base64');
    return JSON.parse(payload.toString());
  }
};


export const groupBy = <T, K extends keyof T>(
  array: T[],
  groupOn: K | ((i: T) => string | undefined | null)
): Record<string, T[]> => {
  const groupFn =
    typeof groupOn === "function" ? groupOn : (o: T) => o[groupOn];

  return Object.fromEntries(
    array.reduce((acc, obj) => {
      const groupKey = groupFn(obj);
      return acc.set(groupKey, [...(acc.get(groupKey) || []), obj]);
    }, new Map())
  ) as Record<string, T[]>;
};


interface FileUrlParams {
  baseUrl: string,
  fileName: string,
  hash: string,
  extension: String
}


export function getFileUrl({baseUrl, fileName, hash, extension}: FileUrlParams) {
  let fileUrl = `${baseUrl}/files/${fileName}`;

  if (hash.length !== 0) {
    fileUrl = fileUrl.concat(
      `_${hash}.${extension}`
    );
  } else {
    fileUrl = fileUrl.concat(
      `.${extension}`
    );
  }

  return fileUrl
}

export const getEyewearRxNames = (
  data: Maybe<EyewearPrescription> | undefined
) => {
  let names = [];

  data?.bifocal && names.push("Bifocal");
  data?.glareFree && names.push("Glare Free");
  data?.glass && names.push("Glass");
  data?.photoChromatic && names.push("Photo Chromatic");
  data?.plastic && names.push("Plastic");
  data?.progressive && names.push("Progressive");
  data?.scratchResistant && names.push("Scratch Resistant");
  data?.singleVision && names.push("Single Vision");
  data?.twoSeparateGlasses && names.push("Two separate glasses");
  data?.highIndex && names.push("High Index");
  data?.tint && names.push("Tint");
  data?.blueCut && names.push("Blue Cut");

  return names.join(" / ");
};

export const getPatientAge = (dateOfBirth: any) => {
  let years = differenceInYears(new Date(), parseISO(dateOfBirth))

  if (years === 0) {
    let months = differenceInMonths(new Date(), parseISO(dateOfBirth))
    return `${months} months old`;
  }

  return `${years} years old`;
}