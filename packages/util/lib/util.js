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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { differenceInMonths, differenceInYears, format, parseISO } from "date-fns";
import _ from "lodash";
export var formatDate = function (date) {
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
export var parseJwt = function (token) {
    if (token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    }
};
export var groupBy = function (array, groupOn) {
    var groupFn = typeof groupOn === "function" ? groupOn : function (o) { return o[groupOn]; };
    return Object.fromEntries(array.reduce(function (acc, obj) {
        var groupKey = groupFn(obj);
        return acc.set(groupKey, __spreadArray(__spreadArray([], (acc.get(groupKey) || []), true), [obj], false));
    }, new Map()));
};
export function getFileUrl(_a) {
    var baseUrl = _a.baseUrl, fileName = _a.fileName, hash = _a.hash, extension = _a.extension;
    var fileUrl = "".concat(baseUrl, "/files/").concat(fileName);
    if (hash.length !== 0) {
        fileUrl = fileUrl.concat("_".concat(hash, ".").concat(extension));
    }
    else {
        fileUrl = fileUrl.concat(".".concat(extension));
    }
    return fileUrl;
}
export var getEyewearRxNames = function (data) {
    var names = [];
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
export var getPatientAge = function (dateOfBirth) {
    var years = differenceInYears(new Date(), parseISO(dateOfBirth));
    if (years === 0) {
        var months = differenceInMonths(new Date(), parseISO(dateOfBirth));
        return "".concat(months, " months old");
    }
    return "".concat(years, " years old");
};
export var groupByHpiComponentType = function (hpiComponents) {
    if (hpiComponents) {
        var grouped = _.groupBy(hpiComponents, "hpiComponentType.title");
        var entries = Object.entries(grouped);
        return entries;
    }
};
