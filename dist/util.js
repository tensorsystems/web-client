import { differenceInMonths, differenceInYears, format, parseISO } from "date-fns";
import _ from "lodash";
export const formatDate = (date) => {
    return format(new Date(date), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
};
export function getParsedJwt(token) {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    }
    catch (_a) {
        return undefined;
    }
}
export const parseJwt = (token) => {
    if (token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    }
};
export const groupBy = (array, groupOn) => {
    const groupFn = typeof groupOn === "function" ? groupOn : (o) => o[groupOn];
    return Object.fromEntries(array.reduce((acc, obj) => {
        const groupKey = groupFn(obj);
        return acc.set(groupKey, [...(acc.get(groupKey) || []), obj]);
    }, new Map()));
};
export function getFileUrl({ baseUrl, fileName, hash, extension }) {
    let fileUrl = `${baseUrl}/files/${fileName}`;
    if (hash.length !== 0) {
        fileUrl = fileUrl.concat(`_${hash}.${extension}`);
    }
    else {
        fileUrl = fileUrl.concat(`.${extension}`);
    }
    return fileUrl;
}
export const getEyewearRxNames = (data) => {
    let names = [];
    (data === null || data === void 0 ? void 0 : data.bifocal) && names.push("Bifocal");
    (data === null || data === void 0 ? void 0 : data.glareFree) && names.push("Glare Free");
    (data === null || data === void 0 ? void 0 : data.glass) && names.push("Glass");
    (data === null || data === void 0 ? void 0 : data.photoChromatic) && names.push("Photo Chromatic");
    (data === null || data === void 0 ? void 0 : data.plastic) && names.push("Plastic");
    (data === null || data === void 0 ? void 0 : data.progressive) && names.push("Progressive");
    (data === null || data === void 0 ? void 0 : data.scratchResistant) && names.push("Scratch Resistant");
    (data === null || data === void 0 ? void 0 : data.singleVision) && names.push("Single Vision");
    (data === null || data === void 0 ? void 0 : data.twoSeparateGlasses) && names.push("Two separate glasses");
    (data === null || data === void 0 ? void 0 : data.highIndex) && names.push("High Index");
    (data === null || data === void 0 ? void 0 : data.tint) && names.push("Tint");
    (data === null || data === void 0 ? void 0 : data.blueCut) && names.push("Blue Cut");
    return names.join(" / ");
};
export const getPatientAge = (dateOfBirth) => {
    let years = differenceInYears(new Date(), parseISO(dateOfBirth));
    if (years === 0) {
        let months = differenceInMonths(new Date(), parseISO(dateOfBirth));
        return `${months} months old`;
    }
    return `${years} years old`;
};
export const groupByHpiComponentType = (hpiComponents) => {
    if (hpiComponents) {
        const grouped = _.groupBy(hpiComponents, "hpiComponentType.title");
        const entries = Object.entries(grouped);
        return entries;
    }
};
