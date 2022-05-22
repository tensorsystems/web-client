import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { useNotificationDispatch } from "../../notification";
import cn from "classnames";
export const PATIENT_ENCOUNTER_LIMITS = gql `
  query PatientEncounterLimits($page: PaginationInput!) {
    patientEncounterLimits(page: $page) {
      totalCount
      edges {
        node {
          id
          user {
            id
            firstName
            lastName
          }
          mondayLimit
          tuesdayLimit
          wednesdayLimit
          thursdayLimit
          fridayLimit
          saturdayLimit
          sundayLimit
          overbook
        }
      }
      pageInfo {
        totalPages
      }
    }
  }
`;
const UPDATE_PATIENT_ENCOUNTER_LIMIT = gql `
  mutation UpdatePatientEncounterLimit(
    $input: PatientEncounterLimitUpdateInput!
  ) {
    updatePatientEncounterLimit(input: $input) {
      id
    }
  }
`;
export const PatientEncounterLimitPage = () => {
    const notifDispatch = useNotificationDispatch();
    const [paginationInput] = useState({
        page: 1,
        size: 1000,
    });
    const { data, refetch } = useQuery(PATIENT_ENCOUNTER_LIMITS, {
        variables: { page: paginationInput },
    });
    const [updatePatientEncounterLimit] = useMutation(UPDATE_PATIENT_ENCOUNTER_LIMIT, {
        onCompleted(data) {
            refetch();
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
    const handleChange = (id, target, value) => {
        if (id) {
            updatePatientEncounterLimit({
                variables: {
                    input: {
                        id: id,
                        [target]: value,
                    },
                },
            });
        }
    };
    return (_jsx("div", Object.assign({ className: "w-full" }, { children: _jsxs("div", Object.assign({ className: "grid grid-cols-8 divide-x divide-y shadow-md" }, { children: [_jsx("div", { className: "bg-gray-100" }, void 0),
                _jsx("div", Object.assign({ className: "bg-white text-center" }, { children: "Monday" }), void 0),
                _jsx("div", Object.assign({ className: "bg-white text-center" }, { children: "Tuesday" }), void 0),
                _jsx("div", Object.assign({ className: "bg-white text-center" }, { children: "Wednesday" }), void 0),
                _jsx("div", Object.assign({ className: "bg-white text-center" }, { children: "Thursday" }), void 0),
                _jsx("div", Object.assign({ className: "bg-white text-center" }, { children: "Friday" }), void 0),
                _jsx("div", Object.assign({ className: "bg-white text-center" }, { children: "Saturday" }), void 0),
                _jsx("div", Object.assign({ className: "bg-white text-center" }, { children: "Sunday" }), void 0), data === null || data === void 0 ? void 0 : data.patientEncounterLimits.edges.map((e, i) => (_jsxs("div", Object.assign({ className: cn("col-span-8 grid grid-cols-8 divide-x divide-y", {
                        "bg-white": i % 2 === 0,
                        "bg-gray-100": i % 2 !== 0,
                    }) }, { children: [_jsx("div", Object.assign({ className: "text-center py-3 text-sm text-gray-800" }, { children: `Dr. ${e === null || e === void 0 ? void 0 : e.node.user.firstName} ${e === null || e === void 0 ? void 0 : e.node.user.lastName}` }), void 0),
                        _jsx("div", Object.assign({ className: "py-2 px-2" }, { children: _jsx(Form, { limit: e === null || e === void 0 ? void 0 : e.node.mondayLimit, onChange: (value) => handleChange(e === null || e === void 0 ? void 0 : e.node.id, "mondayLimit", value) }, void 0) }), void 0),
                        _jsx("div", Object.assign({ className: "py-2 px-2" }, { children: _jsx(Form, { limit: e === null || e === void 0 ? void 0 : e.node.tuesdayLimit, onChange: (value) => handleChange(e === null || e === void 0 ? void 0 : e.node.id, "tuesdayLimit", value) }, void 0) }), void 0),
                        _jsx("div", Object.assign({ className: "py-2 px-2" }, { children: _jsx(Form, { limit: e === null || e === void 0 ? void 0 : e.node.wednesdayLimit, onChange: (value) => handleChange(e === null || e === void 0 ? void 0 : e.node.id, "wednesdayLimit", value) }, void 0) }), void 0),
                        _jsx("div", Object.assign({ className: "py-2 px-2" }, { children: _jsx(Form, { limit: e === null || e === void 0 ? void 0 : e.node.thursdayLimit, onChange: (value) => handleChange(e === null || e === void 0 ? void 0 : e.node.id, "thursdayLimit", value) }, void 0) }), void 0),
                        _jsx("div", Object.assign({ className: "py-2 px-2" }, { children: _jsx(Form, { limit: e === null || e === void 0 ? void 0 : e.node.fridayLimit, onChange: (value) => handleChange(e === null || e === void 0 ? void 0 : e.node.id, "fridayLimit", value) }, void 0) }), void 0),
                        _jsx("div", Object.assign({ className: "py-2 px-2" }, { children: _jsx(Form, { limit: e === null || e === void 0 ? void 0 : e.node.saturdayLimit, onChange: (value) => handleChange(e === null || e === void 0 ? void 0 : e.node.id, "saturdayLimit", value) }, void 0) }), void 0),
                        _jsx("div", Object.assign({ className: "py-2 px-2" }, { children: _jsx(Form, { limit: e === null || e === void 0 ? void 0 : e.node.sundayLimit, onChange: (value) => handleChange(e === null || e === void 0 ? void 0 : e.node.id, "sundayLimit", value) }, void 0) }), void 0)] }), e === null || e === void 0 ? void 0 : e.node.id)))] }), void 0) }), void 0));
};
function Form(props) {
    return (_jsx("div", Object.assign({ className: "flex w-full items-stretch" }, { children: _jsx("div", Object.assign({ className: "flex-1 px-4" }, { children: _jsx("input", { required: true, defaultValue: props.limit, type: "number", name: "dailyLimit", className: "h-6 w-full border-gray-300 border rounded-md text-center text-gray-700", onChange: (evt) => props.onChange(parseInt(evt.target.value)) }, void 0) }), void 0) }), void 0));
}
