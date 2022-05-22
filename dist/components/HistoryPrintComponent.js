import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { gql, useQuery } from "@apollo/client";
import { format, parseISO } from "date-fns";
import { useNotificationDispatch } from "../notification";
const GET_HISTORY = gql `
  query GetHistory($id: ID!) {
    pastIllnesses(patientHistoryId: $id) {
      id
      title
      description
    }
    pastInjuries(patientHistoryId: $id) {
      id
      description
      injuryDate
    }
    pastHospitalizations(patientHistoryId: $id) {
      id
      reason
      provider
      from
      to
    }
    pastSurgeries(patientHistoryId: $id) {
      id
      description
      surgeryDate
    }
    lifestyles(patientHistoryId: $id) {
      id
      title
      description
      note
    }
    familyIllnesses(patientHistoryId: $id) {
      id
      title
      description
    }
  }
`;
const HistoryPrintComponent = ({ patientHistoryId }) => {
    const notifDispatch = useNotificationDispatch();
    const { data } = useQuery(GET_HISTORY, {
        variables: {
            id: patientHistoryId,
        },
        onError(error) {
            notifDispatch({
                type: "show",
                notifTitle: "Error",
                notifSubTitle: error.message,
                variant: "failure",
            });
        },
    });
    const hasPastIllnesses = (data === null || data === void 0 ? void 0 : data.pastIllnesses) && (data === null || data === void 0 ? void 0 : data.pastIllnesses.length) > 0;
    const hasPastInjuries = (data === null || data === void 0 ? void 0 : data.pastInjuries) && (data === null || data === void 0 ? void 0 : data.pastInjuries.length) > 0;
    const hasPastHospitalizations = (data === null || data === void 0 ? void 0 : data.pastHospitalizations) && (data === null || data === void 0 ? void 0 : data.pastHospitalizations.length) > 0;
    const hasPastSurgeries = (data === null || data === void 0 ? void 0 : data.pastSurgeries) && (data === null || data === void 0 ? void 0 : data.pastSurgeries.length) > 0;
    const hasLifestyles = (data === null || data === void 0 ? void 0 : data.lifestyles) && (data === null || data === void 0 ? void 0 : data.lifestyles.length) > 0;
    const hasFamilyIllnesses = (data === null || data === void 0 ? void 0 : data.familyIllnesses) && (data === null || data === void 0 ? void 0 : data.familyIllnesses.length) > 0;
    const hasHistory = hasPastIllnesses ||
        hasPastInjuries ||
        hasPastHospitalizations ||
        hasPastSurgeries ||
        hasLifestyles ||
        hasFamilyIllnesses;
    if (hasHistory) {
        return (_jsxs("div", { children: [_jsx("p", Object.assign({ className: "text-xl tracking-wider text-gray-800 font-light" }, { children: "History" }), void 0),
                _jsx("hr", { className: "mt-5 mb-5" }, void 0),
                hasPastIllnesses && (_jsxs("div", { children: [_jsxs("span", Object.assign({ className: "font-semibold text-gray-800" }, { children: ["Past Illnesses:", " "] }), void 0), " ", _jsx("span", { children: data === null || data === void 0 ? void 0 : data.pastIllnesses.map((e) => `${e === null || e === void 0 ? void 0 : e.title} ${e === null || e === void 0 ? void 0 : e.description}`).join(", ") }, void 0)] }, void 0)),
                hasPastInjuries && (_jsxs("div", { children: [_jsx("span", Object.assign({ className: "font-semibold text-gray-800" }, { children: "Past Injuries: " }), void 0), " ", _jsx("span", { children: data === null || data === void 0 ? void 0 : data.pastInjuries.map((e) => `${e === null || e === void 0 ? void 0 : e.description} on ${format(parseISO(e === null || e === void 0 ? void 0 : e.injuryDate), "MMM d, y")}`).join(", ") }, void 0)] }, void 0)),
                hasPastHospitalizations && (_jsxs("div", { children: [_jsxs("span", Object.assign({ className: "font-semibold text-gray-800" }, { children: ["Past Hospitalizations:", " "] }), void 0), " ", _jsx("span", { children: data === null || data === void 0 ? void 0 : data.pastHospitalizations.map((e) => `${e === null || e === void 0 ? void 0 : e.reason} at ${e === null || e === void 0 ? void 0 : e.provider} from ${(e === null || e === void 0 ? void 0 : e.from) && format(parseISO(e === null || e === void 0 ? void 0 : e.from), "MMM d, y")} to ${(e === null || e === void 0 ? void 0 : e.to) && format(parseISO(e === null || e === void 0 ? void 0 : e.to), "MMM d, y")}`).join(", ") }, void 0)] }, void 0)),
                hasPastSurgeries && (_jsxs("div", { children: [_jsxs("span", Object.assign({ className: "font-semibold text-gray-800" }, { children: ["Past Surgeries:", " "] }), void 0), " ", _jsx("span", { children: data === null || data === void 0 ? void 0 : data.pastSurgeries.map((e) => `${e === null || e === void 0 ? void 0 : e.description} on ${(e === null || e === void 0 ? void 0 : e.surgeryDate) ? format(parseISO(e === null || e === void 0 ? void 0 : e.surgeryDate), "MMM d, y")
                                : "date not stated"}`).join(", ") }, void 0)] }, void 0)),
                hasFamilyIllnesses && (_jsxs("div", { children: [_jsxs("span", Object.assign({ className: "font-semibold text-gray-800" }, { children: ["Family Illnesses:", " "] }), void 0), " ", _jsx("span", { children: data === null || data === void 0 ? void 0 : data.familyIllnesses.map((e) => `${e === null || e === void 0 ? void 0 : e.title} ${e === null || e === void 0 ? void 0 : e.description}`).join(", ") }, void 0)] }, void 0)),
                hasLifestyles && (_jsxs("div", { children: [_jsx("span", Object.assign({ className: "font-semibold text-gray-800" }, { children: "Lifestyle: " }), void 0), " ", _jsx("span", { children: data === null || data === void 0 ? void 0 : data.lifestyles.map((e) => `${e === null || e === void 0 ? void 0 : e.title} ${e === null || e === void 0 ? void 0 : e.description}`).join(", ") }, void 0)] }, void 0))] }, void 0));
    }
    else {
        return _jsx("div", {}, void 0);
    }
};
export default HistoryPrintComponent;
