import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { TablePagination } from "./TablePagination";
import { BookmarkIcon as BookmarkSolidIcon, StarIcon as StarSolidIcon, } from "@heroicons/react/solid";
import { BookmarkIcon as BookmarkOutlineIcon, StarIcon as StarOutlineIcon, } from "@heroicons/react/outline";
import { useNotificationDispatch } from "../notification";
import { AppointmentContext } from "../_context/AppointmentContext";
const GET_DATA = gql `
  query GetData(
    $page: PaginationInput!
    $searchTerm: String!
    $favorites: Boolean
  ) {
    diagnoses(page: $page, searchTerm: $searchTerm, favorites: $favorites) {
      totalCount
      edges {
        node {
          id
          categoryCode
          diagnosisCode
          fullCode
          abbreviatedDescription
          fullDescription
          categoryTitle
        }
      }
      pageInfo {
        totalPages
      }
    }
    favoriteDiagnosis {
      id
      diagnosisId
    }
  }
`;
const SAVE_FAVORITE_DIAGNOSIS = gql `
  mutation SaveFavoriteDiagnosis($diagnosisId: ID!) {
    saveFavoriteDiagnosis(diagnosisId: $diagnosisId) {
      id
    }
  }
`;
const DELETE_FAVORITE_DIAGNOSIS = gql `
  mutation DeleteFavoriteDiagnosis($id: ID!) {
    deleteFavoriteDiagnosis(id: $id)
  }
`;
const SAVE_DIAGNOSIS = gql `
  mutation SaveDiagnosis($input: DiagnosisInput!) {
    saveDiagnosis(input: $input) {
      id
    }
  }
`;
export const DiagnosisList = ({ onItemClick, medicalDepartment }) => {
    var _a, _b, _c;
    const notifDispatch = useNotificationDispatch();
    const [searchTerm, setSearchTerm] = useState("");
    const [paginationInput, setPaginationInput] = useState({
        page: 1,
        size: 15,
    });
    const [showAdd, setShowAdd] = useState(false);
    const { patientChartLocked } = React.useContext(AppointmentContext);
    const [diagnosisLocation, setDiagnosisLocation] = useState([]);
    const [showFavorites, setShowFavorites] = useState(true);
    const { data, refetch } = useQuery(GET_DATA, {
        variables: {
            page: paginationInput,
            searchTerm: searchTerm,
            favorites: showFavorites,
        },
    });
    useEffect(() => {
        refetch();
    }, [searchTerm]);
    useEffect(() => {
        refetch();
    }, [showFavorites]);
    useEffect(() => {
        if (searchTerm.length > 0 && (data === null || data === void 0 ? void 0 : data.diagnoses.edges.length) === 0) {
            setShowAdd(true);
        }
        else {
            setShowAdd(false);
        }
    }, [searchTerm, data === null || data === void 0 ? void 0 : data.diagnoses]);
    const [favoriteIds, setFavoriteIds] = useState([]);
    useEffect(() => {
        var _a;
        if (data) {
            const ids = (_a = data.favoriteDiagnosis.map((e) => e === null || e === void 0 ? void 0 : e.diagnosisId)) !== null && _a !== void 0 ? _a : [];
            setFavoriteIds(ids);
        }
    }, [data]);
    const [saveFavoriteDiagnosis] = useMutation(SAVE_FAVORITE_DIAGNOSIS, {
        onCompleted(data) {
            refetch();
        },
        update: (cache, mutationResult) => {
            const diagnosis = mutationResult.data.saveFavoriteDiagnosis;
            const data = cache.readQuery({
                query: GET_DATA,
            });
            if (data !== null) {
                cache.writeQuery({
                    query: GET_DATA,
                    data: {
                        favoriteDiagnosis: [...data.favoriteDiagnosis, diagnosis],
                    },
                });
            }
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
    const [deleteFavoriteDiagnosis] = useMutation(DELETE_FAVORITE_DIAGNOSIS, {
        onCompleted(data) {
            refetch();
        },
        update: (cache, mutationResult) => {
            const favoriteDiagnosisId = mutationResult.data.deleteFavoriteDiagnosis;
            const data = cache.readQuery({
                query: GET_DATA,
            });
            if (data !== null) {
                const favoriteDiagnosis = data.favoriteDiagnosis.filter((e) => (e === null || e === void 0 ? void 0 : e.id) !== favoriteDiagnosisId);
                cache.writeQuery({
                    query: GET_DATA,
                    data: {
                        favoriteDiagnosis: favoriteDiagnosis,
                    },
                });
            }
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
    const [saveDiagnosis] = useMutation(SAVE_DIAGNOSIS, {
        onCompleted(data) {
            refetch();
            notifDispatch({
                type: "show",
                notifTitle: "Success",
                notifSubTitle: "Diagnosis saved",
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
    const handleNextClick = () => {
        setPaginationInput(Object.assign(Object.assign({}, paginationInput), { page: paginationInput.page + 1 }));
    };
    const handlePreviousClick = () => {
        if (paginationInput.page > 1) {
            setPaginationInput(Object.assign(Object.assign({}, paginationInput), { page: paginationInput.page - 1 }));
        }
    };
    const handleItemClick = (diagnosis) => {
        var _a;
        if (diagnosis !== undefined) {
            const location = (_a = diagnosisLocation.find((i) => i.diagnosisId === diagnosis.id)) === null || _a === void 0 ? void 0 : _a.location;
            let loc = "OU";
            if (location) {
                loc = location;
            }
            onItemClick(diagnosis.id, loc);
        }
    };
    const handleFavoriteClick = (item) => {
        var _a;
        if (item) {
            if (favoriteIds.includes(item.id)) {
                const favoriteDiagnosisId = (_a = data === null || data === void 0 ? void 0 : data.favoriteDiagnosis.find((e) => (e === null || e === void 0 ? void 0 : e.diagnosisId) === item.id)) === null || _a === void 0 ? void 0 : _a.id;
                if (favoriteDiagnosisId)
                    deleteFavoriteDiagnosis({
                        variables: { id: favoriteDiagnosisId },
                    });
            }
            else {
                saveFavoriteDiagnosis({
                    variables: { diagnosisId: item.id },
                });
            }
        }
    };
    const handleDiagnosisAdd = () => {
        const diagnosis = searchTerm.trim();
        saveDiagnosis({
            variables: {
                input: {
                    fullDescription: diagnosis,
                },
            },
        });
    };
    return (_jsxs("div", Object.assign({ className: "overflow-x-scroll rounded-lg shadow-xl" }, { children: [_jsxs("table", Object.assign({ className: "w-full" }, { children: [_jsxs("thead", { children: [_jsx("tr", { children: _jsx("th", Object.assign({ scope: "col", colSpan: medicalDepartment === "Ophthalmology" ? 4 : 3, className: "px-4 py-2 bg-teal-700 text-left text-xs text-gray-50 uppercase tracking-wider" }, { children: _jsxs("div", Object.assign({ className: "flex justify-between items-center" }, { children: [_jsx("p", { children: "Diagnosis list" }, void 0),
                                            _jsx("div", { children: _jsx("button", Object.assign({ type: "button", onClick: () => setShowFavorites(!showFavorites) }, { children: showFavorites ? (_jsx(BookmarkSolidIcon, { className: "h-5 w-5 text-white" }, void 0)) : (_jsx(BookmarkOutlineIcon, { className: "h-5 w-5 text-white" }, void 0)) }), void 0) }, void 0)] }), void 0) }), void 0) }, void 0),
                            _jsx("tr", { children: _jsx("th", Object.assign({ colSpan: medicalDepartment === "Ophthalmology" ? 4 : 3 }, { children: _jsxs("div", Object.assign({ className: "flex space-x-1" }, { children: [_jsx("input", { type: "search", name: "search", id: "diagnosis-search", placeholder: "Search", className: "w-full sm:text-md border-none", onChange: (evt) => setSearchTerm(evt.target.value) }, void 0),
                                            showAdd && (_jsxs("button", Object.assign({ type: "button", className: "px-3 py-2 bg-teal-50 text-teal-700 hover:bg-teal-100 flex flex-shrink", onClick: () => handleDiagnosisAdd() }, { children: [_jsx("p", Object.assign({ className: "material-icons" }, { children: "add" }), void 0),
                                                    _jsx("p", { children: "Add" }, void 0)] }), void 0))] }), void 0) }), void 0) }, void 0)] }, void 0),
                    _jsx("tbody", Object.assign({ className: "bg-white divide-y divide-gray-200 p-2" }, { children: data === null || data === void 0 ? void 0 : data.diagnoses.edges.map((e) => (_jsxs("tr", Object.assign({ className: "hover:bg-gray-100 border-t cursor-pointer" }, { children: [_jsx("td", Object.assign({ className: "pl-4 pt-1" }, { children: _jsx("button", Object.assign({ type: "button", onClick: () => !patientChartLocked[0] && handleFavoriteClick(e === null || e === void 0 ? void 0 : e.node) }, { children: favoriteIds.includes(e === null || e === void 0 ? void 0 : e.node.id) ? (_jsx(StarSolidIcon, { className: "h-5 w-5 text-teal-500" }, void 0)) : (_jsx(StarOutlineIcon, { className: "h-5 w-5 text-gray-500" }, void 0)) }), void 0) }), void 0),
                                _jsx("td", Object.assign({ className: "pl-4 px-4 py-5 text-sm font-light text-gray-900", onClick: () => !patientChartLocked[0] && handleItemClick(e === null || e === void 0 ? void 0 : e.node) }, { children: e === null || e === void 0 ? void 0 : e.node.fullDescription }), void 0),
                                medicalDepartment === "Ophthalmology" && (_jsx("td", Object.assign({ className: "px-4 py-5 text-sm text-gray-900" }, { children: _jsxs("select", Object.assign({ name: "location", disabled: patientChartLocked[0], className: "border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm", onChange: (evt) => {
                                            const locationIndex = diagnosisLocation.findIndex((i) => i.diagnosisId === (e === null || e === void 0 ? void 0 : e.node.id));
                                            if (locationIndex === -1) {
                                                setDiagnosisLocation([
                                                    {
                                                        diagnosisId: e === null || e === void 0 ? void 0 : e.node.id,
                                                        location: evt.target.value,
                                                    },
                                                    ...diagnosisLocation,
                                                ]);
                                            }
                                            else {
                                                setDiagnosisLocation([
                                                    ...diagnosisLocation.slice(0, locationIndex),
                                                    Object.assign({}, diagnosisLocation[locationIndex], {
                                                        location: evt.target.value,
                                                    }),
                                                ]);
                                            }
                                        } }, { children: [_jsx("option", Object.assign({ value: "OU" }, { children: "OU" }), void 0),
                                            _jsx("option", Object.assign({ value: "OD" }, { children: "OD" }), void 0),
                                            _jsx("option", Object.assign({ value: "OS" }, { children: "OS" }), void 0)] }), void 0) }), void 0)),
                                _jsx("td", Object.assign({ className: "px-3" }, { children: _jsx("span", Object.assign({ onClick: () => !patientChartLocked[0] && handleItemClick(e === null || e === void 0 ? void 0 : e.node), className: "material-icons text-teal-700 transform hover:scale-110" }, { children: "keyboard_arrow_right" }), void 0) }), void 0)] }), e === null || e === void 0 ? void 0 : e.node.id))) }), void 0)] }), void 0),
            _jsx(TablePagination, { totalCount: (_c = (_b = (_a = data === null || data === void 0 ? void 0 : data.diagnoses) === null || _a === void 0 ? void 0 : _a.edges) === null || _b === void 0 ? void 0 : _b.length) !== null && _c !== void 0 ? _c : 0, onNext: handleNextClick, onPrevious: handlePreviousClick }, void 0)] }), void 0));
};
