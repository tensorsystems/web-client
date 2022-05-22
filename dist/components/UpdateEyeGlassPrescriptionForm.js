import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNotificationDispatch } from "../notification";
import RefractionDistanceComponent from "./RefractionDistanceForm";
import RefractionNearComponent from "./RefractionNearForm";
import Select from "react-select";
const UPDATE_EYEGLASS_PRESCRIPTION = gql `
  mutation UpdateEyewearPrescription($input: EyewearPrescriptionUpdateInput!) {
    updateEyewearPrescription(input: $input) {
      id
    }
  }
`;
const DELETE_EYEGLASS_PRESCRIPTION = gql `
  mutation DeleteEyewearPrescription($id: ID!) {
    deleteEyewearPrescription(id: $id)
  }
`;
const EYE_WEAR_SHOPS = gql `
  query EyewearShops($page: PaginationInput!) {
    eyewearShops(page: $page) {
      totalCount
      edges {
        node {
          id
          title
          address
          region
          country
          phone
          inHouse
          active
        }
      }
      pageInfo {
        totalPages
      }
    }
  }
`;
export const UpdateEyewearPrescriptionForm = ({ values, refraction, onUpdateSuccess, eyewearShopIdValue, onDeleteSuccess, onCancel, }) => {
    const notifDispatch = useNotificationDispatch();
    const { register, reset, handleSubmit } = useForm();
    useEffect(() => {
        if (values) {
            reset(values);
        }
    }, [values]);
    const refractionForm = useForm();
    useEffect(() => {
        if (refraction) {
            refractionForm.reset(refraction);
        }
    }, [refraction]);
    const { data } = useQuery(EYE_WEAR_SHOPS, {
        variables: {
            page: { page: 1, size: 1000 },
        },
    });
    const [selectedEyewearShop, setSelectedEyewearShop] = useState();
    useEffect(() => {
        var _a;
        if (eyewearShopIdValue) {
            const eyewearShop = (_a = data === null || data === void 0 ? void 0 : data.eyewearShops.edges.find((e) => (e === null || e === void 0 ? void 0 : e.node.id) === eyewearShopIdValue)) === null || _a === void 0 ? void 0 : _a.node;
            const value = {
                value: eyewearShop === null || eyewearShop === void 0 ? void 0 : eyewearShop.id,
                label: `${eyewearShop === null || eyewearShop === void 0 ? void 0 : eyewearShop.title} - ${eyewearShop === null || eyewearShop === void 0 ? void 0 : eyewearShop.address}, ${eyewearShop === null || eyewearShop === void 0 ? void 0 : eyewearShop.region}, ${eyewearShop === null || eyewearShop === void 0 ? void 0 : eyewearShop.country} ${(eyewearShop === null || eyewearShop === void 0 ? void 0 : eyewearShop.inHouse) ? "(In-House)" : ""}`,
            };
            setSelectedEyewearShop(value);
        }
    }, [values, data]);
    const [update, { error }] = useMutation(UPDATE_EYEGLASS_PRESCRIPTION, {
        onCompleted(data) {
            onUpdateSuccess();
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
    const [deleteEyeGlassPrescription] = useMutation(DELETE_EYEGLASS_PRESCRIPTION, {
        onCompleted(data) {
            onDeleteSuccess();
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
    const onUpdateSubmit = (data) => {
        if ((values === null || values === void 0 ? void 0 : values.id) !== undefined) {
            data.id = values.id;
            update({ variables: { input: data } });
        }
    };
    const onDeleteSubmit = (data) => {
        if ((values === null || values === void 0 ? void 0 : values.id) !== undefined) {
            deleteEyeGlassPrescription({ variables: { id: values === null || values === void 0 ? void 0 : values.id } });
        }
    };
    const eyeWearShops = data === null || data === void 0 ? void 0 : data.eyewearShops.edges.map((e) => ({
        value: e === null || e === void 0 ? void 0 : e.node.id,
        label: `${e === null || e === void 0 ? void 0 : e.node.title} - ${e === null || e === void 0 ? void 0 : e.node.address}, ${e === null || e === void 0 ? void 0 : e.node.region}, ${e === null || e === void 0 ? void 0 : e.node.country} ${(e === null || e === void 0 ? void 0 : e.node.inHouse) ? "(In-House)" : ""}`,
    }));
    return (_jsx("div", Object.assign({ className: "container mx-auto flex justify-center pt-4 pb-6" }, { children: _jsxs("div", Object.assign({ className: "w-3/4" }, { children: [_jsx("div", Object.assign({ className: "float-right" }, { children: _jsx("button", Object.assign({ onClick: onCancel }, { children: _jsx("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", className: "h-8 w-8 text-gray-500" }, { children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }, void 0) }), void 0) }), void 0) }), void 0),
                _jsxs("form", Object.assign({ onSubmit: handleSubmit(onUpdateSubmit) }, { children: [_jsx("p", Object.assign({ className: "text-2xl font-extrabold tracking-wider text-teal-700" }, { children: "Update Eye Glass Prescription" }), void 0),
                        _jsx("div", Object.assign({ className: "mt-4" }, { children: _jsx(Select, { placeholder: "Eyewear Shops", options: eyeWearShops, value: selectedEyewearShop, onChange: (value) => {
                                    setSelectedEyewearShop(value);
                                } }, void 0) }), void 0),
                        _jsx("div", Object.assign({ className: "mt-4" }, { children: _jsx("hr", {}, void 0) }), void 0),
                        _jsxs("div", Object.assign({ className: "grid grid-cols-9 gap-y-4 gap-x-6 justify-items-stretch items-center mt-10" }, { children: [_jsx("div", { className: "col-span-1" }, void 0),
                                _jsx("div", Object.assign({ className: "col-span-4 justify-self-center" }, { children: "OD" }), void 0),
                                _jsx("div", Object.assign({ className: "col-span-4 justify-self-center" }, { children: "OS" }), void 0),
                                _jsx("div", { className: "col-span-1" }, void 0),
                                _jsx("div", Object.assign({ className: "col-span-4" }, { children: _jsxs("div", Object.assign({ className: "flex justify-around" }, { children: [_jsx("div", { children: "SPH" }, void 0),
                                            _jsx("div", { children: "CYL" }, void 0),
                                            _jsx("div", { children: "AXIS" }, void 0)] }), void 0) }), void 0),
                                _jsx("div", Object.assign({ className: "col-span-4" }, { children: _jsxs("div", Object.assign({ className: "flex justify-around" }, { children: [_jsx("div", { children: "SPH" }, void 0),
                                            _jsx("div", { children: "CYL" }, void 0),
                                            _jsx("div", { children: "AXIS" }, void 0)] }), void 0) }), void 0)] }), void 0),
                        _jsxs("div", Object.assign({ className: "grid grid-cols-9 gap-y-4 gap-x-6 justify-items-stretch items-center p-2 rounded-md" }, { children: [_jsx("div", Object.assign({ className: "co-span-1" }, { children: _jsx("span", Object.assign({ className: "text-xs" }, { children: "Distance" }), void 0) }), void 0),
                                _jsx("div", { className: "col-span-4" }, void 0),
                                _jsx("div", { className: "col-span-4" }, void 0)] }), void 0),
                        _jsx(RefractionDistanceComponent, { readonly: true, values: refractionForm.getValues(), register: refractionForm.register, onChange: () => { } }, void 0),
                        _jsxs("div", Object.assign({ className: "grid grid-cols-9 gap-y-4 gap-x-6 justify-items-stretch items-center p-2 rounded-md" }, { children: [_jsx("div", Object.assign({ className: "co-span-1" }, { children: _jsx("span", Object.assign({ className: "text-xs" }, { children: "Near" }), void 0) }), void 0),
                                _jsx("div", { className: "col-span-4" }, void 0),
                                _jsx("div", { className: "col-span-4" }, void 0)] }), void 0),
                        _jsx(RefractionNearComponent, { readonly: true, values: refractionForm.getValues(), register: refractionForm.register, onChange: () => { } }, void 0),
                        _jsxs("div", Object.assign({ className: "grid grid-cols-9 gap-y-4 gap-x-6 justify-items-stretch items-center mt-5" }, { children: [_jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsx("span", Object.assign({ className: "text-gray-600 tracking-wide text-sm" }, { children: "Visual Acuity" }), void 0) }), void 0),
                                _jsx("div", Object.assign({ className: "col-span-4" }, { children: _jsx("input", { type: "text", name: "rightVisualAcuity", readOnly: true, ref: refractionForm.register, className: "p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full", onChange: () => { } }, void 0) }), void 0),
                                _jsx("div", Object.assign({ className: "col-span-4" }, { children: _jsx("input", { type: "text", name: "leftVisualAcuity", readOnly: true, ref: refractionForm.register, className: "p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full", onChange: () => { } }, void 0) }), void 0)] }), void 0),
                        _jsxs("div", Object.assign({ className: "grid grid-cols-9 gap-y-4 gap-x-6 justify-items-stretch items-center mt-2" }, { children: [_jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsx("span", Object.assign({ className: "text-gray-600 tracking-wide text-sm" }, { children: "Far PD" }), void 0) }), void 0),
                                _jsx("div", Object.assign({ className: "col-span-4" }, { children: _jsx("input", { type: "text", name: "farPd", readOnly: true, ref: refractionForm.register, className: "p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full", onChange: () => { } }, void 0) }), void 0),
                                _jsx("div", { className: "col-span-4" }, void 0),
                                _jsx("div", Object.assign({ className: "col-span-1" }, { children: _jsx("span", Object.assign({ className: "text-gray-600 tracking-wide text-sm" }, { children: "Near PD" }), void 0) }), void 0),
                                _jsx("div", Object.assign({ className: "col-span-4" }, { children: _jsx("input", { type: "text", name: "nearPd", readOnly: true, ref: refractionForm.register, className: "p-1 pl-4 sm:text-md border-gray-300 border rounded-md w-full", onChange: () => { } }, void 0) }), void 0),
                                _jsx("div", { className: "col-span-4" }, void 0)] }), void 0),
                        _jsxs("div", Object.assign({ className: "mt-10 grid grid-cols-4 space-y-2 text-lg" }, { children: [_jsxs("label", Object.assign({ className: "inline-flex items-center" }, { children: [_jsx("input", { type: "checkbox", name: "glass", ref: register, onChange: () => { } }, void 0),
                                        _jsx("span", Object.assign({ className: "ml-2" }, { children: "Glass" }), void 0)] }), void 0),
                                _jsxs("label", Object.assign({ className: "inline-flex items-center" }, { children: [_jsx("input", { type: "checkbox", name: "photoChromatic", ref: register, onChange: () => { } }, void 0),
                                        _jsx("span", Object.assign({ className: "ml-2" }, { children: "Photo Chromatic" }), void 0)] }), void 0),
                                _jsxs("label", Object.assign({ className: "inline-flex items-center" }, { children: [_jsx("input", { type: "checkbox", name: "bifocal", ref: register, onChange: () => { } }, void 0),
                                        _jsx("span", Object.assign({ className: "ml-2" }, { children: "Bifocal" }), void 0)] }), void 0),
                                _jsxs("label", Object.assign({ className: "inline-flex items-center" }, { children: [_jsx("input", { type: "checkbox", name: "plastic", ref: register, onChange: () => { } }, void 0),
                                        _jsx("span", Object.assign({ className: "ml-2" }, { children: "Plastic" }), void 0)] }), void 0),
                                _jsxs("label", Object.assign({ className: "inline-flex items-center" }, { children: [_jsx("input", { type: "checkbox", name: "glareFree", ref: register, onChange: () => { } }, void 0),
                                        _jsx("span", Object.assign({ className: "ml-2" }, { children: "Glare Free" }), void 0)] }), void 0),
                                _jsxs("label", Object.assign({ className: "inline-flex items-center" }, { children: [_jsx("input", { type: "checkbox", name: "progressive", ref: register, onChange: () => { } }, void 0),
                                        _jsx("span", Object.assign({ className: "ml-2" }, { children: "Progressive" }), void 0)] }), void 0),
                                _jsxs("label", Object.assign({ className: "inline-flex items-center" }, { children: [_jsx("input", { type: "checkbox", name: "singleVision", ref: register, onChange: () => { } }, void 0),
                                        _jsx("span", Object.assign({ className: "ml-2" }, { children: "Single vision" }), void 0)] }), void 0),
                                _jsxs("label", Object.assign({ className: "inline-flex items-center" }, { children: [_jsx("input", { type: "checkbox", name: "scratchResistant", ref: register, onChange: () => { } }, void 0),
                                        _jsx("span", Object.assign({ className: "ml-2" }, { children: "Scratch Resistant" }), void 0)] }), void 0),
                                _jsxs("label", Object.assign({ className: "inline-flex items-center" }, { children: [_jsx("input", { type: "checkbox", name: "twoSeparateGlasses", ref: register, onChange: () => { } }, void 0),
                                        _jsx("span", Object.assign({ className: "ml-2" }, { children: "Two separate glasses" }), void 0)] }), void 0),
                                _jsxs("label", Object.assign({ className: "inline-flex items-center" }, { children: [_jsx("input", { type: "checkbox", name: "highIndex", ref: register, onChange: () => { } }, void 0),
                                        _jsx("span", Object.assign({ className: "ml-2" }, { children: "High Index" }), void 0)] }), void 0),
                                _jsxs("label", Object.assign({ className: "inline-flex items-center" }, { children: [_jsx("input", { type: "checkbox", name: "tint", ref: register, onChange: () => { } }, void 0),
                                        _jsx("span", Object.assign({ className: "ml-2" }, { children: "Tint" }), void 0)] }), void 0),
                                _jsxs("label", Object.assign({ className: "inline-flex items-center" }, { children: [_jsx("input", { type: "checkbox", name: "blueCut", ref: register, onChange: () => { } }, void 0),
                                        _jsx("span", Object.assign({ className: "ml-2" }, { children: "Blue Cut" }), void 0)] }), void 0)] }), void 0),
                        _jsx("div", Object.assign({ className: "mt-4" }, { children: error && _jsxs("p", Object.assign({ className: "text-red-600" }, { children: ["Error: ", error.message] }), void 0) }), void 0),
                        _jsxs("div", Object.assign({ className: "flex space-x-5" }, { children: [_jsx("button", Object.assign({ type: "button", onClick: handleSubmit(onUpdateSubmit), className: "inline-flex justify-center w-full py-2 px-4 mt-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 focus:outline-none" }, { children: _jsx("span", Object.assign({ className: "ml-2" }, { children: "Update" }), void 0) }), void 0),
                                _jsx("button", Object.assign({ type: "submit", onClick: handleSubmit(onDeleteSubmit), className: "inline-flex justify-center w-full py-2 px-4 mt-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 focus:outline-none" }, { children: _jsx("span", Object.assign({ className: "ml-2" }, { children: "Delete" }), void 0) }), void 0)] }), void 0)] }), void 0)] }), void 0) }), void 0));
};
