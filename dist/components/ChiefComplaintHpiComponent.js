import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useQuery, useLazyQuery, gql, useMutation } from "@apollo/client";
import classnames from "classnames";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ReactLoading from "react-loading";
import { useNotificationDispatch } from "../notification";
import ReactTooltip from "react-tooltip";
const GET_HPI_COMPONENT_TYPES = gql `
  query HpiComponentTypes($page: PaginationInput!) {
    hpiComponentTypes(page: $page) {
      edges {
        node {
          id
          title
          description
        }
      }
    }
  }
`;
const GET_HPI_COMPONENTS = gql `
  query HpiComponents($page: PaginationInput!, $filter: HpiFilter) {
    hpiComponents(page: $page, filter: $filter) {
      totalCount
      pageInfo {
        totalPages
      }
      edges {
        node {
          id
          title
        }
      }
    }
  }
`;
const SAVE_HPI_COMPONENT = gql `
  mutation SaveHpiComponent($input: HpiComponentInput!) {
    saveHpiComponent(input: $input) {
      id
    }
  }
`;
const ChiefComplaintHpiComponent = ({ values, onChange }) => {
    const notifDispatch = useNotificationDispatch();
    const { register, getValues } = useForm({
        defaultValues: {
            id: values === null || values === void 0 ? void 0 : values.id,
            hpiComponentIds: values === null || values === void 0 ? void 0 : values.hpiComponents.map((e) => e === null || e === void 0 ? void 0 : e.id.toString()),
        },
    });
    const [searchValue, setSearchValue] = useState("");
    const [openIndex, setOpenIndex] = useState(-1);
    const [showAddButton, setShowAddButton] = useState(false);
    const [hpiComponents, setHpiComponents] = useState([]);
    const { data } = useQuery(GET_HPI_COMPONENT_TYPES, {
        variables: { page: { page: 0, size: 100 } },
    });
    const hpiComponentLazyQuery = useLazyQuery(GET_HPI_COMPONENTS);
    const [saveHpiComponent] = useMutation(SAVE_HPI_COMPONENT, {
        onCompleted(data) {
            hpiComponentLazyQuery[1].refetch && hpiComponentLazyQuery[1].refetch();
            setSearchValue("");
            notifDispatch({
                type: "show",
                notifTitle: "Success",
                notifSubTitle: "HPI component saved successfully",
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
    useEffect(() => {
        let isMounted = true;
        if (openIndex !== -1 && data !== undefined && isMounted) {
            const hpiComponentType = data.hpiComponentTypes.edges[openIndex];
            hpiComponentLazyQuery[0]({
                variables: {
                    page: { page: 0, size: 100 },
                    filter: { hpiComponentTypeId: hpiComponentType === null || hpiComponentType === void 0 ? void 0 : hpiComponentType.node.id },
                },
            });
        }
        return () => {
            isMounted = false;
        };
    }, [openIndex, data]);
    useEffect(() => {
        var _a, _b;
        if ((_a = hpiComponentLazyQuery[1].data) === null || _a === void 0 ? void 0 : _a.hpiComponents) {
            const result = (_b = hpiComponentLazyQuery[1].data) === null || _b === void 0 ? void 0 : _b.hpiComponents.edges.map((e) => e === null || e === void 0 ? void 0 : e.node).filter((e) => searchValue.length > 0
                ? e === null || e === void 0 ? void 0 : e.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) : e);
            setHpiComponents(result);
        }
    }, [hpiComponentLazyQuery[1].data, searchValue]);
    useEffect(() => {
        if (searchValue.length > 0 && hpiComponents.length === 0) {
            setShowAddButton(true);
        }
        else {
            setShowAddButton(false);
        }
    }, [searchValue, hpiComponents]);
    const handleOpen = (index) => {
        setOpenIndex(index);
    };
    const handleSaveHpiComponent = () => {
        const hpiComponent = searchValue.trim();
        const hpiComponentType = data === null || data === void 0 ? void 0 : data.hpiComponentTypes.edges[openIndex];
        if (hpiComponentType === null || hpiComponentType === void 0 ? void 0 : hpiComponentType.node.id) {
            saveHpiComponent({
                variables: {
                    input: {
                        title: hpiComponent,
                        hpiComponentTypeId: hpiComponentType === null || hpiComponentType === void 0 ? void 0 : hpiComponentType.node.id,
                    },
                },
            });
        }
    };
    return (_jsx("div", Object.assign({ className: "p-1 bg-gray-50 shadow-inner rounded-lg" }, { children: _jsx("form", { children: data === null || data === void 0 ? void 0 : data.hpiComponentTypes.edges.map((hpiComponentType, i) => (_jsx("div", Object.assign({ className: classnames({
                    "border-b": i !== (data === null || data === void 0 ? void 0 : data.hpiComponentTypes.edges.length) - 1,
                }) }, { children: _jsxs("div", Object.assign({ className: classnames({
                        "border-l-2 border-transparent": i !== openIndex,
                        "border-l-2 bg-gray-100 border-teal-500 p-2": i === openIndex,
                    }) }, { children: [_jsxs("div", Object.assign({ className: "flex justify-between p-3 cursor-pointer select-none", onClick: () => {
                                setSearchValue("");
                                if (i === openIndex) {
                                    handleOpen(-1);
                                }
                                else {
                                    handleOpen(i);
                                }
                            } }, { children: [_jsx("div", { children: _jsxs("div", Object.assign({ className: classnames({
                                            "text-gray-700": i !== openIndex,
                                            "text-teal-500": i === openIndex,
                                        }) }, { children: [_jsx("a", Object.assign({ "data-tip": true, "data-for": hpiComponentType === null || hpiComponentType === void 0 ? void 0 : hpiComponentType.node.title }, { children: hpiComponentType === null || hpiComponentType === void 0 ? void 0 : hpiComponentType.node.title }), void 0),
                                            _jsx(ReactTooltip, Object.assign({ id: hpiComponentType === null || hpiComponentType === void 0 ? void 0 : hpiComponentType.node.title, type: "info" }, { children: hpiComponentType === null || hpiComponentType === void 0 ? void 0 : hpiComponentType.node.description }), void 0)] }), void 0) }, void 0),
                                _jsx("div", Object.assign({ className: classnames("rounded-full border w-7 h-7 flex items-center justify-center", {
                                        "border-gray-300": i !== openIndex,
                                        "border-teal-500 bg-teal-500": i === openIndex,
                                    }) }, { children: i === openIndex ? (_jsx("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", className: "w-5 text-white" }, { children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 15l7-7 7 7" }, void 0) }), void 0)) : (_jsx("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", className: "w-5 text-gray-400" }, { children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" }, void 0) }), void 0)) }), void 0)] }), void 0),
                        _jsx("div", { children: i === openIndex && (_jsx("div", Object.assign({ className: "mt-3 ml-4" }, { children: hpiComponentLazyQuery[1].loading ? (_jsx("div", Object.assign({ className: "p-6" }, { children: _jsx(ReactLoading, { type: "spin", color: "teal", height: "5%", width: "5%" }, void 0) }), void 0)) : (_jsxs("div", { children: [_jsxs("div", Object.assign({ className: "flex space-x-1 mb-2" }, { children: [_jsx("input", { type: "search", className: "p-2 bg-gray-100 text-gray-500 text-sm border-none", placeholder: "Search", value: searchValue, onChange: (evt) => setSearchValue(evt.target.value) }, void 0),
                                                showAddButton && (_jsxs("button", Object.assign({ type: "button", className: "items-center  text-teal-700 hover:bg-teal-50 flex", onClick: () => handleSaveHpiComponent() }, { children: [_jsx("p", Object.assign({ className: "material-icons" }, { children: "add" }), void 0),
                                                        _jsx("p", { children: "Add" }, void 0)] }), void 0))] }), void 0),
                                        hpiComponents.map((hpiComponent) => (_jsxs("div", Object.assign({ className: "p-2" }, { children: [_jsx("input", { type: "checkbox", id: hpiComponent === null || hpiComponent === void 0 ? void 0 : hpiComponent.id, name: "hpiComponentIds", value: hpiComponent === null || hpiComponent === void 0 ? void 0 : hpiComponent.id, ref: register, onChange: () => {
                                                        var _a;
                                                        const hpiComponents = (_a = hpiComponentLazyQuery[1].data) === null || _a === void 0 ? void 0 : _a.hpiComponents.edges.filter((e) => { var _a; return (_a = getValues("hpiComponentIds")) === null || _a === void 0 ? void 0 : _a.includes(e === null || e === void 0 ? void 0 : e.node.id.toString()); });
                                                        onChange(hpiComponents, hpiComponentType === null || hpiComponentType === void 0 ? void 0 : hpiComponentType.node.id);
                                                    } }, void 0),
                                                _jsx("label", Object.assign({ className: "ml-3 text-gray-800 font-light", htmlFor: "hpiComponentIds" }, { children: hpiComponent === null || hpiComponent === void 0 ? void 0 : hpiComponent.title }), void 0)] }), hpiComponent === null || hpiComponent === void 0 ? void 0 : hpiComponent.id)))] }, void 0)) }), void 0)) }, void 0)] }), void 0) }), i))) }, void 0) }), void 0));
};
export default ChiefComplaintHpiComponent;
