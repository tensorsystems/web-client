import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useBottomSheetDispatch } from "../bottomsheet";
import { CompleteMedicalPrescriptionOrder } from "../components/CompleteMedicalPrescriptionOrder";
import { PharmacyOrdersList } from "../components/PharmacyOrdersList";
import { PrescriptionOrdersToolbar } from "../components/PrescriptionOrdersToolbar";
import { useNotificationDispatch } from "../notification";
const SEARCH_MEDICAL_PRESCRIPTION_ORDERS = gql `
  query SearchMedicationPrescriptionOrders(
    $page: PaginationInput!
    $filter: PrescriptionOrdersFilter
    $prescribedDate: Time
    $searchTerm: String
  ) {
    searchMedicationPrescriptionOrders(
      page: $page
      filter: $filter
      prescribedDate: $prescribedDate
      searchTerm: $searchTerm
    ) {
      totalCount
      pageInfo {
        totalPages
      }
      edges {
        node {
          id
          pharmacyId
          patientChartId
          firstName
          lastName
          phoneNo
          userName
          orderedById
          orderedBy {
            id
            firstName
            lastName
          }
          medicalPrescriptions {
            id
            medication
            sig
            refill
            generic
            substitutionAllowed
            directionToPatient
            prescribedDate
            history
            status
          }
          status
          createdAt
        }
      }
    }
  }
`;
export const PharmacyHome = () => {
    var _a;
    const bottomSheetDispatch = useBottomSheetDispatch();
    const notifDispatch = useNotificationDispatch();
    const [paginationInput, setPaginationInput] = useState({
        page: 1,
        size: 10,
    });
    const [filter, setFilter] = useState({
        date: new Date(),
        status: "ORDERED",
        userId: "all",
        searchTerm: "",
    });
    const { data, refetch } = useQuery(SEARCH_MEDICAL_PRESCRIPTION_ORDERS, {
        variables: {
            page: paginationInput,
            filter: {
                status: filter.status === "all" ? undefined : filter.status,
            },
            prescribedDate: filter.date,
            searchTerm: filter.searchTerm === "" ? undefined : filter.searchTerm,
        },
        pollInterval: 10000,
    });
    useEffect(() => {
        refetch();
    }, [paginationInput, filter]);
    const handleNextClick = () => {
        var _a;
        const totalPages = (_a = data === null || data === void 0 ? void 0 : data.searchMedicationPrescriptionOrders.pageInfo.totalPages) !== null && _a !== void 0 ? _a : 0;
        if (totalPages > paginationInput.page) {
            setPaginationInput(Object.assign(Object.assign({}, paginationInput), { page: paginationInput.page + 1 }));
        }
    };
    const handlePreviousClick = () => {
        if (paginationInput.page > 1) {
            setPaginationInput(Object.assign(Object.assign({}, paginationInput), { page: paginationInput.page - 1 }));
        }
    };
    const handleItemClick = (value) => {
        bottomSheetDispatch({
            type: "show",
            snapPoint: 0,
            children: (_jsx(CompleteMedicalPrescriptionOrder, { item: value, onSuccess: () => {
                    bottomSheetDispatch({ type: "hide" });
                    refetch();
                    notifDispatch({
                        type: "show",
                        notifTitle: "Success",
                        notifSubTitle: "Prescription marked completed",
                        variant: "success",
                    });
                }, onCancel: () => bottomSheetDispatch({ type: "hide" }) }, void 0)),
        });
    };
    return (_jsxs("div", Object.assign({ className: "h-screen mb-20" }, { children: [_jsx(PrescriptionOrdersToolbar, { date: filter.date, onDateChange: (value) => {
                    setFilter(Object.assign(Object.assign({}, filter), { date: value }));
                }, status: filter.status, onStatusChange: (value) => {
                    setFilter(Object.assign(Object.assign({}, filter), { status: value }));
                }, searchTerm: filter.searchTerm, onSearchTermChange: (value) => {
                    setFilter(Object.assign(Object.assign({}, filter), { searchTerm: value }));
                }, onClear: () => {
                    setFilter({
                        date: new Date(),
                        status: "Ordered",
                        userId: "all",
                        searchTerm: "",
                    });
                } }, void 0),
            _jsx(PharmacyOrdersList, { items: data === null || data === void 0 ? void 0 : data.searchMedicationPrescriptionOrders.edges.map((e) => e === null || e === void 0 ? void 0 : e.node), totalCount: (_a = data === null || data === void 0 ? void 0 : data.searchMedicationPrescriptionOrders.totalCount) !== null && _a !== void 0 ? _a : 0, onClick: handleItemClick, onNextPage: handleNextClick, onPrevPage: handlePreviousClick }, void 0)] }), void 0));
};
