import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMutation, useQuery } from "@apollo/client";
import { format, parseISO } from "date-fns";
import gql from "graphql-tag";
import { useEffect, useState } from "react";
import { useBottomSheetDispatch } from "../../bottomsheet";
import { TablePagination } from "../../components/TablePagination";
import { LabOrderStatus, } from "../../models/models";
import { useNotificationDispatch } from "../../notification";
import cn from "classnames";
import { CompleteLabOrderForm } from "../../components/CompleteLabOrderForm";
import { PlusCircleIcon } from "@heroicons/react/outline";
import { useForm } from "react-hook-form";
import Select from "react-select";
const SEARCH_LAB_ORDERS = gql `
  query SearchLabOrders(
    $page: PaginationInput!
    $filter: LabOrderFilter
    $date: Time
    $searchTerm: String
  ) {
    searchLabOrders(
      page: $page
      filter: $filter
      date: $date
      searchTerm: $searchTerm
    ) {
      totalCount
      pageInfo {
        totalPages
      }
      edges {
        node {
          id
          firstName
          lastName
          phoneNo
          userName
          patientId
          orderedBy {
            id
            firstName
            lastName
            userTypes {
              title
            }
          }
          labs {
            id
            labType {
              id
              title
            }
            payments {
              id
              status
              invoiceNo
              billing {
                id
                item
                code
                price
                credit
              }
            }
            receptionNote
          }
          status
          createdAt
        }
      }
    }
  }
`;
const PatientLabratoryOrders = ({ patientId, }) => {
    var _a;
    const [paginationInput, setPaginationInput] = useState({
        page: 1,
        size: 20,
    });
    const bottomSheetDispatch = useBottomSheetDispatch();
    const notifDispatch = useNotificationDispatch();
    const { data, refetch } = useQuery(SEARCH_LAB_ORDERS, {
        variables: {
            page: paginationInput,
            filter: {
                patientId,
            },
        },
    });
    const handleNextClick = () => {
        var _a;
        const totalPages = (_a = data === null || data === void 0 ? void 0 : data.searchLabOrders.pageInfo.totalPages) !== null && _a !== void 0 ? _a : 0;
        if (totalPages > paginationInput.page) {
            setPaginationInput(Object.assign(Object.assign({}, paginationInput), { page: paginationInput.page + 1 }));
        }
    };
    const handlePrevClick = () => {
        if (paginationInput.page > 1) {
            setPaginationInput(Object.assign(Object.assign({}, paginationInput), { page: paginationInput.page - 1 }));
        }
    };
    const handleOrderClick = (order) => {
        bottomSheetDispatch({
            type: "show",
            snapPoint: 0,
            children: (_jsx(CompleteLabOrderForm, { selectedOrder: order, onSuccess: () => {
                    refetch();
                    notifDispatch({
                        type: "show",
                        notifTitle: "Success",
                        notifSubTitle: "Receipt printed successfully",
                        variant: "success",
                    });
                    bottomSheetDispatch({ type: "hide" });
                }, onCancel: () => bottomSheetDispatch({ type: "hide" }), onRefresh: () => {
                    refetch();
                } }, void 0)),
        });
    };
    return (_jsxs("div", { children: [_jsx("div", Object.assign({ className: "bg-gray-50 w-full shadow-md rounded-sm p-2 flex justify-end" }, { children: _jsx("button", Object.assign({ type: "button", className: "bg-teal-500 hover:bg-teal-600 px-3 py-1 text-white rounded-md", onClick: () => {
                        bottomSheetDispatch({
                            type: "show",
                            snapPoint: 0,
                            children: (_jsx(OrderForm, { patientId: patientId, onSuccess: () => {
                                    bottomSheetDispatch({ type: "hide" });
                                    notifDispatch({
                                        type: "show",
                                        notifTitle: "Success",
                                        notifSubTitle: "New lab order added",
                                        variant: "success",
                                    });
                                    refetch();
                                }, onCancel: () => bottomSheetDispatch({ type: "hide" }) }, void 0)),
                        });
                    } }, { children: _jsxs("div", Object.assign({ className: "flex items-center space-x-2 tracking-wide" }, { children: [_jsx(PlusCircleIcon, { className: "h-4 w-4" }, void 0),
                            _jsx("div", { children: "New Order" }, void 0)] }), void 0) }), void 0) }), void 0),
            _jsxs("table", Object.assign({ className: "w-full divide-y divide-gray-200 shadow-md rounded-md mt-2" }, { children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", Object.assign({ scope: "col", className: "px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, { children: "Date" }), void 0),
                                _jsx("th", Object.assign({ scope: "col", className: "px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, { children: "Ordered By" }), void 0),
                                _jsx("th", Object.assign({ scope: "col", className: "px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, { children: "Payments" }), void 0),
                                _jsx("th", Object.assign({ scope: "col", className: "px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, { children: "Status" }), void 0)] }, void 0) }, void 0),
                    _jsx("tbody", Object.assign({ className: "bg-white divide-y divide-gray-200" }, { children: data === null || data === void 0 ? void 0 : data.searchLabOrders.edges.map((e) => {
                            var _a, _b, _c;
                            const payments = e.node.labs.map((p) => p.payments).flat();
                            return (_jsxs("tr", Object.assign({ className: "hover:bg-gray-100 bg-gray-50 cursor-pointer", onClick: () => e.node && handleOrderClick(e.node) }, { children: [_jsx("td", Object.assign({ className: "px-6 py-4" }, { children: format(parseISO(e === null || e === void 0 ? void 0 : e.node.createdAt), "MMM d, y") }), void 0),
                                    _jsx("td", Object.assign({ className: "px-6 py-4" }, { children: `${((_a = e === null || e === void 0 ? void 0 : e.node.orderedBy) === null || _a === void 0 ? void 0 : _a.userTypes.some((t) => (t === null || t === void 0 ? void 0 : t.title) === "Physician")) ? "Dr. "
                                            : ""} ${(_b = e.node.orderedBy) === null || _b === void 0 ? void 0 : _b.firstName} ${(_c = e.node.orderedBy) === null || _c === void 0 ? void 0 : _c.lastName}` }), void 0),
                                    _jsxs("td", Object.assign({ className: "px-6 py-4" }, { children: [_jsx("div", Object.assign({ className: "text-sm text-gray-900" }, { children: payments
                                                    .map((p) => `${p === null || p === void 0 ? void 0 : p.billing.item} (${p === null || p === void 0 ? void 0 : p.billing.code})`)
                                                    .join(", ") }), void 0),
                                            _jsx("div", Object.assign({ className: "text-sm text-gray-500" }, { children: `ETB ${payments.reduce((a, c) => a + ((c === null || c === void 0 ? void 0 : c.billing) ? c === null || c === void 0 ? void 0 : c.billing.price : 0), 0)}` }), void 0)] }), void 0),
                                    _jsx("td", Object.assign({ className: "px-6 py-4 text-sm text-teal-700 tracking-wide font-semibold" }, { children: _jsx("span", Object.assign({ className: cn("px-2 inline-flex text-xs leading-5 font-semibold rounded-full", {
                                                "bg-yellow-100 text-yellow-800": (e === null || e === void 0 ? void 0 : e.node.status) === LabOrderStatus.Ordered ||
                                                    payments.some((e) => e.status === "NOTPAID" ||
                                                        e.status === "PAYMENT_WAIVER_REQUESTED"),
                                            }, {
                                                "bg-green-100 text-green-800": payments.every((e) => e.status === "PAID"),
                                            }) }, { children: e === null || e === void 0 ? void 0 : e.node.status }), void 0) }), void 0)] }), e === null || e === void 0 ? void 0 : e.node.id));
                        }) }), void 0)] }), void 0),
            _jsx("div", Object.assign({ className: "" }, { children: _jsx(TablePagination, { color: "bg-gray-50 shadow-md", totalCount: (_a = data === null || data === void 0 ? void 0 : data.searchLabOrders.totalCount) !== null && _a !== void 0 ? _a : 0, onNext: handleNextClick, onPrevious: handlePrevClick }, void 0) }), void 0)] }, void 0));
};
const ORDER_DATA = gql `
  query OrderData(
    $labPage: PaginationInput!
    $searchAppointmentsInput: AppointmentSearchInput!
    $appointmentsPage: PaginationInput!
  ) {
    labTypes(page: $labPage) {
      totalCount
      edges {
        node {
          id
          title
          billings {
            id
            item
            code
            price
          }
        }
      }
      pageInfo {
        totalPages
      }
    }

    searchAppointments(
      input: $searchAppointmentsInput
      page: $appointmentsPage
    ) {
      totalCount
      pageInfo {
        totalPages
      }
      edges {
        node {
          id
          providerName
          checkInTime
          checkedInTime
          checkedOutTime
          room {
            id
            title
          }
          visitType {
            id
            title
          }
          appointmentStatus {
            id
            title
          }
        }
      }
    }
  }
`;
const ORDER_AND_CONFIRM_LAB = gql `
  mutation OrderAndConfirmLab($input: OrderAndConfirmLabInput!) {
    orderAndConfirmLab(input: $input) {
      id
    }
  }
`;
const OrderForm = ({ patientId, onSuccess, onCancel, }) => {
    var _a, _b;
    const notifDispatch = useNotificationDispatch();
    const [checkInTime, setCheckInTime] = useState(new Date().toISOString().split("T")[0]);
    const [selectedLabTypeId, setSelectedLabTypeId] = useState(null);
    const [selectedBillings, setSelectedBillings] = useState([]);
    const { register, handleSubmit } = useForm({
        defaultValues: {
            patientId: patientId,
        },
    });
    const { data, refetch } = useQuery(ORDER_DATA, {
        variables: {
            labPage: {
                page: 1,
                size: 10000,
            },
            appointmentsPage: {
                page: 1,
                size: 10000,
            },
            searchAppointmentsInput: {
                patientId: patientId,
                checkInTime: new Date(checkInTime),
            },
        },
    });
    const [orderAndConfirm] = useMutation(ORDER_AND_CONFIRM_LAB, {
        onCompleted(data) {
            onSuccess();
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
    }, [checkInTime]);
    const onSubmit = (input) => {
        if ((data === null || data === void 0 ? void 0 : data.searchAppointments.totalCount) === 0) {
            alert("Please select appointment");
            return;
        }
        if (selectedLabTypeId === null) {
            alert("Please select lab");
            return;
        }
        if (selectedBillings.length === 0) {
            alert("Select atleast one billing item");
            return;
        }
        input.billingIds = selectedBillings.map((e) => e.value);
        input.patientId = patientId;
        input.labTypeId = selectedLabTypeId;
        orderAndConfirm({
            variables: {
                input,
            },
        });
    };
    const labTypes = data === null || data === void 0 ? void 0 : data.labTypes.edges.map((e) => ({
        value: e === null || e === void 0 ? void 0 : e.node.id,
        label: e === null || e === void 0 ? void 0 : e.node.title,
    }));
    const billings = (_b = (_a = data === null || data === void 0 ? void 0 : data.labTypes.edges.find((e) => (e === null || e === void 0 ? void 0 : e.node.id.toString()) === (selectedLabTypeId === null || selectedLabTypeId === void 0 ? void 0 : selectedLabTypeId.toString()))) === null || _a === void 0 ? void 0 : _a.node) === null || _b === void 0 ? void 0 : _b.billings.map((e) => ({
        value: e === null || e === void 0 ? void 0 : e.id,
        label: e === null || e === void 0 ? void 0 : e.item,
        code: e === null || e === void 0 ? void 0 : e.code,
        price: e === null || e === void 0 ? void 0 : e.price,
    }));
    const patientAppointments = data === null || data === void 0 ? void 0 : data.searchAppointments;
    return (_jsx("div", Object.assign({ className: "container mx-auto flex justify-center pt-4 pb-6" }, { children: _jsxs("div", Object.assign({ className: "w-1/2" }, { children: [_jsx("div", Object.assign({ className: "float-right" }, { children: _jsx("button", Object.assign({ onClick: onCancel }, { children: _jsx("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", className: "h-8 w-8 text-gray-500" }, { children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }, void 0) }), void 0) }), void 0) }), void 0),
                _jsxs("form", Object.assign({ onSubmit: handleSubmit(onSubmit) }, { children: [_jsx("p", Object.assign({ className: "text-2xl font-extrabold tracking-wider text-teal-800" }, { children: "Order Lab" }), void 0),
                        _jsx("div", Object.assign({ className: "mt-4" }, { children: _jsx(Select, { placeholder: "Lab", options: labTypes, onChange: (v) => {
                                    if (v === null || v === void 0 ? void 0 : v.value) {
                                        setSelectedLabTypeId(v.value);
                                    }
                                } }, void 0) }), void 0),
                        selectedLabTypeId && (_jsxs("div", { children: [_jsx("div", Object.assign({ className: "mt-4" }, { children: _jsx(Select, { isMulti: true, placeholder: "Billings", options: billings, onChange: (values) => {
                                            setSelectedBillings(values.map((e) => e));
                                        } }, void 0) }), void 0),
                                _jsxs("div", Object.assign({ className: "mt-4" }, { children: [_jsx("label", Object.assign({ htmlFor: "date", className: "block text-sm font-medium text-gray-700" }, { children: "Date" }), void 0),
                                        _jsx("input", { type: "date", name: "date", id: "date", required: true, value: checkInTime, className: "mt-1 p-1 pl-4 block w-full sm:text-md border-gray-300 border rounded-md", onChange: (evt) => {
                                                setCheckInTime(evt.target.value);
                                            } }, void 0)] }), void 0),
                                _jsxs("div", Object.assign({ className: "mt-4" }, { children: [_jsx("label", Object.assign({ htmlFor: "appointmentId", className: "block text-sm font-medium text-gray-700" }, { children: "Select Appointment" }), void 0),
                                        (patientAppointments === null || patientAppointments === void 0 ? void 0 : patientAppointments.totalCount) === 0 ? (_jsx("div", Object.assign({ className: "text-red-500" }, { children: "No appointments found on this day" }), void 0)) : (_jsx("div", { children: patientAppointments === null || patientAppointments === void 0 ? void 0 : patientAppointments.edges.map((e) => (_jsx("div", Object.assign({ className: "border border-gray-300 p-2 rounded-md mt-2" }, { children: _jsxs("label", Object.assign({ className: "inline-flex items-center" }, { children: [_jsx("input", { required: true, type: "radio", name: "appointmentId", value: e === null || e === void 0 ? void 0 : e.node.id, ref: register({ required: true }) }, void 0),
                                                        _jsx("span", Object.assign({ className: "ml-2" }, { children: `Sick visit with Dr. ${e === null || e === void 0 ? void 0 : e.node.providerName}` }), void 0)] }), void 0) }), e === null || e === void 0 ? void 0 : e.node.id))) }, void 0))] }), void 0),
                                _jsxs("div", Object.assign({ className: "mt-4" }, { children: [_jsx("label", Object.assign({ htmlFor: "invoiceNo", className: "block text-sm font-medium text-gray-700" }, { children: "Invoice" }), void 0),
                                        _jsx("input", { id: "invoiceNo", name: "invoiceNo", required: true, ref: register({ required: true }), className: "mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" }, void 0)] }), void 0),
                                _jsxs("div", Object.assign({ className: "mt-4" }, { children: [_jsx("label", Object.assign({ htmlFor: "orderNote", className: "block text-sm font-medium text-gray-700" }, { children: "Order Note" }), void 0),
                                        _jsx("textarea", { name: "orderNote", rows: 2, ref: register, className: "p-1 pl-4 sm:text-md border-gray-300 border rounded-md h-20 w-full" }, void 0)] }), void 0),
                                _jsx("div", { className: "mt-4" }, void 0),
                                _jsx("button", Object.assign({ type: "submit", className: "inline-flex justify-center w-full py-2 px-4 mt-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-700 hover:bg-teal-800 focus:outline-none" }, { children: _jsx("span", Object.assign({ className: "ml-2" }, { children: "Save" }), void 0) }), void 0)] }, void 0))] }), void 0)] }), void 0) }), void 0));
};
export default PatientLabratoryOrders;
