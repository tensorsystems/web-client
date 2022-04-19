import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { gql, useMutation } from "@apollo/client";
import React from "react";
import { TablePagination } from "./TablePagination";
import { useNotificationDispatch } from "../notification";
import { AppointmentContext } from "../_context/AppointmentContext";
const DELETE_FAVORITE_MEDICATION = gql `
  mutation DeleteFavoriteMedication($id: ID!) {
    deleteFavoriteMedication(id: $id)
  }
`;
export const FavoriteMedicationList = ({ userFavoriteMedications, onItemClick, refetch, handleNextClick, handlePreviousClick, setSearchTerm }) => {
    var _a;
    const notifDispatch = useNotificationDispatch();
    const { patientChartLocked } = React.useContext(AppointmentContext);
    const [deleteFavoriteMedication] = useMutation(DELETE_FAVORITE_MEDICATION, {
        onCompleted(data) {
            refetch();
            notifDispatch({
                type: "show",
                notifTitle: "Success",
                notifSubTitle: "Favorite medication removed",
                variant: "success",
            });
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
    const handleItemClick = (item) => {
        if (item !== undefined) {
            onItemClick(item);
        }
    };
    const handleItemDelete = (id) => {
        if (id !== undefined) {
            deleteFavoriteMedication({ variables: { id } });
        }
    };
    return (_jsxs("div", Object.assign({ className: "overflow-hidden rounded-lg shadow-xl" }, { children: [_jsxs("table", Object.assign({ className: "w-full" }, { children: [_jsxs("thead", { children: [_jsx("tr", { children: _jsx("th", Object.assign({ scope: "col", colSpan: 3, className: "px-4 py-2 bg-teal-700 text-left text-xs text-gray-50 uppercase tracking-wider" }, { children: "Favorite medications" }), void 0) }, void 0),
                            _jsx("tr", { children: _jsx("th", Object.assign({ colSpan: 3 }, { children: _jsx("input", { type: "search", name: "search", placeholder: "Search", autoComplete: "off", className: "w-full sm:text-md border-none", onChange: (evt) => setSearchTerm(evt.target.value.trim()) }, void 0) }), void 0) }, void 0)] }, void 0),
                    _jsx("tbody", Object.assign({ className: "bg-white divide-y divide-gray-200 p-1" }, { children: userFavoriteMedications === null || userFavoriteMedications === void 0 ? void 0 : userFavoriteMedications.edges.map((e) => (_jsxs("tr", Object.assign({ className: "hover:bg-gray-100 border-t cursor-pointer" }, { children: [_jsx("td", Object.assign({ className: "pl-5 text-gray-500 md-12", onClick: () => handleItemDelete(e === null || e === void 0 ? void 0 : e.node.id) }, { children: _jsx("span", Object.assign({ className: "material-icons" }, { children: "delete" }), void 0) }), void 0),
                                _jsx("td", Object.assign({ className: "px-6 py-5 text-sm text-gray-700", onClick: () => !patientChartLocked[0] && handleItemClick(e === null || e === void 0 ? void 0 : e.node) }, { children: e === null || e === void 0 ? void 0 : e.node.medication }), void 0),
                                _jsx("td", Object.assign({ className: "p-2", onClick: () => !patientChartLocked[0] && handleItemClick(e === null || e === void 0 ? void 0 : e.node) }, { children: _jsx("span", Object.assign({ className: "material-icons" }, { children: "keyboard_arrow_right" }), void 0) }), void 0)] }), e === null || e === void 0 ? void 0 : e.node.id))) }), void 0)] }), void 0),
            _jsx(TablePagination, { totalCount: (_a = userFavoriteMedications === null || userFavoriteMedications === void 0 ? void 0 : userFavoriteMedications.totalCount) !== null && _a !== void 0 ? _a : 0, onNext: handleNextClick, onPrevious: handlePreviousClick }, void 0)] }), void 0));
};
