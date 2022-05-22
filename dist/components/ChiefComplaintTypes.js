import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { TablePagination } from "./TablePagination";
import { BookmarkIcon as BookmarkSolidIcon, StarIcon as StarSolidIcon, ChevronRightIcon, } from "@heroicons/react/solid";
import { BookmarkIcon as BookmarkOutlineIcon, StarIcon as StarOutlineIcon, } from "@heroicons/react/outline";
import { useNotificationDispatch } from "../notification";
import { AppointmentContext } from "../_context/AppointmentContext";
const GET_DATA = gql `
  query GetData(
    $page: PaginationInput!
    $searchTerm: String!
    $favorites: Boolean
  ) {
    chiefComplaintTypes(
      page: $page
      searchTerm: $searchTerm
      favorites: $favorites
    ) {
      totalCount
      edges {
        node {
          id
          title
        }
      }
      pageInfo {
        totalPages
      }
    }
    favoriteChiefComplaints {
      id
      chiefComplaintTypeId
    }
  }
`;
const SAVE_CHIEF_COMPLAINT_TYPE = gql `
  mutation SaveChiefComplaintType($input: ChiefComplaintTypeInput!) {
    saveChiefComplaintType(input: $input) {
      id
    }
  }
`;
const SAVE_FAVORITE_CHIEF_COMPLAINT_TYPE = gql `
  mutation SaveFavoriteChiefComplaintType($chiefComplaintTypeId: ID!) {
    saveFavoriteChiefComplaint(chiefComplaintTypeId: $chiefComplaintTypeId) {
      id
    }
  }
`;
const DELETE_FAVORITE_CHIEF_COMPLAINT_TYPE = gql `
  mutation DeleteFavoriteChiefComplaintType($id: ID!) {
    deleteFavoriteChiefComplaint(id: $id)
  }
`;
export const ChiefComplaintTypes = ({ onItemClick }) => {
    var _a, _b, _c;
    const notifDispatch = useNotificationDispatch();
    const [searchTerm, setSearchTerm] = useState("");
    const [showAdd, setShowAdd] = useState(false);
    const { patientChartLocked } = React.useContext(AppointmentContext);
    const [paginationInput, setPaginationInput] = useState({
        page: 1,
        size: 20,
    });
    const [showFavorites, setShowFavorites] = useState(true);
    const [favoriteIds, setFavoriteIds] = useState([]);
    const { data, refetch } = useQuery(GET_DATA, {
        variables: {
            page: paginationInput,
            searchTerm: searchTerm,
            favorites: showFavorites,
        },
    });
    useEffect(() => {
        refetch();
    }, [showFavorites]);
    useEffect(() => {
        if (searchTerm.length > 0 && (data === null || data === void 0 ? void 0 : data.chiefComplaintTypes.totalCount) === 0) {
            setShowAdd(true);
        }
        else {
            setShowAdd(false);
        }
    }, [searchTerm, data === null || data === void 0 ? void 0 : data.chiefComplaintTypes]);
    useEffect(() => {
        var _a;
        if (data) {
            const ids = (_a = data.favoriteChiefComplaints.map((e) => e === null || e === void 0 ? void 0 : e.chiefComplaintTypeId)) !== null && _a !== void 0 ? _a : [];
            setFavoriteIds(ids);
        }
    }, [data]);
    const [saveFavoriteChiefComplaint] = useMutation(SAVE_FAVORITE_CHIEF_COMPLAINT_TYPE, {
        onCompleted(data) {
            refetch();
        },
        update: (cache, mutationResult) => {
            const chiefComplaintType = mutationResult.data.saveFavoriteChiefComplaint;
            const data = cache.readQuery({
                query: GET_DATA,
            });
            if (data !== null) {
                cache.writeQuery({
                    query: GET_DATA,
                    data: {
                        favoriteChiefComplaints: [
                            ...data.favoriteChiefComplaints,
                            chiefComplaintType,
                        ],
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
    const [saveChiefComplaintType] = useMutation(SAVE_CHIEF_COMPLAINT_TYPE, {
        onCompleted(data) {
            refetch();
            setSearchTerm("");
            notifDispatch({
                type: "show",
                notifTitle: "Success",
                notifSubTitle: "Chief complaint type saved",
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
    const [deleteFavoriteChiefComplaint] = useMutation(DELETE_FAVORITE_CHIEF_COMPLAINT_TYPE, {
        onCompleted(data) {
            refetch();
        },
        update: (cache, mutationResult) => {
            const favoriteChiefComplaintTypeId = mutationResult.data.deleteFavoriteChiefComplaint;
            const data = cache.readQuery({
                query: GET_DATA,
            });
            if (data !== null) {
                const favoriteChiefComplaints = data.favoriteChiefComplaints.filter((e) => (e === null || e === void 0 ? void 0 : e.id) !== favoriteChiefComplaintTypeId);
                cache.writeQuery({
                    query: GET_DATA,
                    data: {
                        favoriteChiefComplaints: favoriteChiefComplaints,
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
    useEffect(() => {
        refetch();
    }, [paginationInput, searchTerm]);
    const handleNextClick = () => {
        setPaginationInput(Object.assign(Object.assign({}, paginationInput), { page: paginationInput.page + 1 }));
    };
    const handlePreviousClick = () => {
        if (paginationInput.page > 1) {
            setPaginationInput(Object.assign(Object.assign({}, paginationInput), { page: paginationInput.page - 1 }));
        }
    };
    const handleItemClick = (title) => {
        if (title !== undefined) {
            onItemClick(title);
        }
    };
    const handleFavoriteClick = (item) => {
        var _a;
        if (item) {
            if (favoriteIds.includes(item.id)) {
                const favoriteChiefComplaintId = (_a = data === null || data === void 0 ? void 0 : data.favoriteChiefComplaints.find((e) => (e === null || e === void 0 ? void 0 : e.chiefComplaintTypeId) === item.id)) === null || _a === void 0 ? void 0 : _a.id;
                if (favoriteChiefComplaintId)
                    deleteFavoriteChiefComplaint({
                        variables: { id: favoriteChiefComplaintId },
                    });
            }
            else {
                saveFavoriteChiefComplaint({
                    variables: { chiefComplaintTypeId: item.id },
                });
            }
        }
    };
    const handleChiefComplaintTypeAdd = () => {
        const chiefComplaintType = searchTerm.trim();
        saveChiefComplaintType({
            variables: {
                input: {
                    title: chiefComplaintType,
                },
            },
        });
    };
    return (_jsxs("div", Object.assign({ className: "overflow-hidden rounded-lg shadow-xl" }, { children: [_jsxs("table", Object.assign({ className: "w-full" }, { children: [_jsxs("thead", { children: [_jsx("tr", { children: _jsx("th", Object.assign({ scope: "col", colSpan: 3, className: "px-4 py-2 bg-teal-700 text-left text-xs text-gray-50 uppercase tracking-wider" }, { children: _jsxs("div", Object.assign({ className: "flex justify-between items-center" }, { children: [_jsx("p", { children: "Chief complaint list" }, void 0),
                                            _jsx("div", { children: _jsx("button", Object.assign({ type: "button", onClick: () => setShowFavorites(!showFavorites) }, { children: showFavorites ? (_jsx(BookmarkSolidIcon, { className: "h-5 w-5 text-white" }, void 0)) : (_jsx(BookmarkOutlineIcon, { className: "h-5 w-5 text-white" }, void 0)) }), void 0) }, void 0)] }), void 0) }), void 0) }, void 0),
                            _jsx("tr", { children: _jsx("th", Object.assign({ colSpan: 3 }, { children: _jsxs("div", Object.assign({ className: "flex space-x-1" }, { children: [_jsx("input", { type: "search", name: "search", placeholder: "Search", value: searchTerm, className: "w-full sm:text-md border-none outline-none focus:outline-none focus:ring-0 flex-1", onChange: (evt) => setSearchTerm(evt.target.value) }, void 0),
                                            showAdd && (_jsxs("button", Object.assign({ type: "button", className: "px-3 py-2 bg-teal-50 text-teal-700 hover:bg-teal-100 flex", onClick: () => handleChiefComplaintTypeAdd() }, { children: [_jsx("p", Object.assign({ className: "material-icons" }, { children: "add" }), void 0),
                                                    _jsx("p", { children: "Add" }, void 0)] }), void 0))] }), void 0) }), void 0) }, void 0)] }, void 0),
                    _jsx("tbody", Object.assign({ className: "bg-white divide-y divide-gray-200 p-1" }, { children: data === null || data === void 0 ? void 0 : data.chiefComplaintTypes.edges.map((e) => (_jsxs("tr", Object.assign({ className: "hover:bg-gray-100 border-t" }, { children: [_jsx("td", Object.assign({ className: "pl-4 pt-1" }, { children: _jsx("button", Object.assign({ type: "button", disabled: patientChartLocked[0], onClick: () => handleFavoriteClick(e === null || e === void 0 ? void 0 : e.node) }, { children: favoriteIds.includes(e === null || e === void 0 ? void 0 : e.node.id) ? (_jsx(StarSolidIcon, { className: "h-5 w-5 text-teal-500" }, void 0)) : (_jsx(StarOutlineIcon, { className: "h-5 w-5 text-gray-500" }, void 0)) }), void 0) }), void 0),
                                _jsx("td", Object.assign({ className: "px-6 py-5 text-sm text-gray-900", onClick: () => !patientChartLocked[0] && handleItemClick(e === null || e === void 0 ? void 0 : e.node.title) }, { children: e === null || e === void 0 ? void 0 : e.node.title }), void 0),
                                _jsx("td", Object.assign({ className: "p-2 cursor-pointer", onClick: () => !patientChartLocked[0] && handleItemClick(e === null || e === void 0 ? void 0 : e.node.title) }, { children: _jsx(ChevronRightIcon, { className: "h-6 w-6 text-gray-500" }, void 0) }), void 0)] }), e === null || e === void 0 ? void 0 : e.node.id))) }), void 0)] }), void 0),
            _jsx(TablePagination, { totalCount: (_c = (_b = (_a = data === null || data === void 0 ? void 0 : data.chiefComplaintTypes) === null || _a === void 0 ? void 0 : _a.edges) === null || _b === void 0 ? void 0 : _b.length) !== null && _c !== void 0 ? _c : 0, onNext: handleNextClick, onPrevious: handlePreviousClick }, void 0)] }), void 0));
};
