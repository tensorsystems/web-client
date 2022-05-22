import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FileUploaderComponent, } from "../../components/FileUploaderComponent";
import { Spinner } from "../../components/Spinner";
import { useNotificationDispatch } from "../../notification";
import { getFileUrl } from "../../util";
const GET_ORGANIZATION_DETAILS = gql `
  query GetOrganizationDetails {
    organizationDetails {
      id
      name
      phoneNo
      phoneNo2
      address
      address2
      website
      email
      lanIpAddress
      logoId
      defaultMedicalDepartment
      logo {
        id
        size
        hash
        fileName
        extension
        contentType
        createdAt
      }
    }
  }
`;
const SAVE_ORGANIZATION_DETAILS = gql `
  mutation SaveOrgainzationDetails($input: OrganizationDetailsInput!) {
    saveOrganizationDetails(input: $input) {
      id
    }
  }
`;
export const OrganizationDetails = () => {
    const notifDispatch = useNotificationDispatch();
    const { register, handleSubmit, setValue } = useForm();
    const { data, refetch } = useQuery(GET_ORGANIZATION_DETAILS);
    const [logos, setLogos] = useState();
    const [save, { loading }] = useMutation(SAVE_ORGANIZATION_DETAILS, {
        onCompleted(data) {
            refetch();
            notifDispatch({
                type: "show",
                notifTitle: "Success",
                notifSubTitle: `Organization details saved`,
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
        var _a, _b;
        const organizationDetails = data === null || data === void 0 ? void 0 : data.organizationDetails;
        if (organizationDetails) {
            setValue("name", organizationDetails.name);
            setValue("phoneNo", organizationDetails.phoneNo);
            setValue("phoneNo2", organizationDetails.phoneNo2);
            setValue("address", organizationDetails.address);
            setValue("address2", organizationDetails.address2);
            setValue("website", organizationDetails.website);
            setValue("email", organizationDetails.email);
            setValue("defaultMedicalDepartment", organizationDetails.defaultMedicalDepartment);
            if (organizationDetails === null || organizationDetails === void 0 ? void 0 : organizationDetails.logo) {
                const od = {
                    id: organizationDetails === null || organizationDetails === void 0 ? void 0 : organizationDetails.logo.id,
                    fileUrl: getFileUrl({
                        baseUrl: process.env.REACT_APP_SERVER_URL,
                        fileName: organizationDetails === null || organizationDetails === void 0 ? void 0 : organizationDetails.logo.fileName,
                        hash: organizationDetails === null || organizationDetails === void 0 ? void 0 : organizationDetails.logo.hash,
                        extension: organizationDetails === null || organizationDetails === void 0 ? void 0 : organizationDetails.logo.extension,
                    }),
                    name: (_a = organizationDetails === null || organizationDetails === void 0 ? void 0 : organizationDetails.logo.fileName) !== null && _a !== void 0 ? _a : "",
                    size: organizationDetails === null || organizationDetails === void 0 ? void 0 : organizationDetails.logo.size,
                    createdAt: organizationDetails === null || organizationDetails === void 0 ? void 0 : organizationDetails.logo.createdAt,
                    contentType: (_b = organizationDetails === null || organizationDetails === void 0 ? void 0 : organizationDetails.logo.contentType) !== null && _b !== void 0 ? _b : "",
                };
                setLogos([od]);
            }
        }
    }, [data === null || data === void 0 ? void 0 : data.organizationDetails]);
    const onSubmit = (data) => {
        if (logos && logos.length > 0 && logos[0].fileObject) {
            const file = {
                file: logos[0].fileObject,
                name: logos[0].name,
            };
            data.logo = file;
        }
        save({
            variables: {
                input: data,
            },
        });
    };
    const handleLogoChange = (change) => {
        setLogos(change);
    };
    return (_jsxs("div", Object.assign({ className: "bg-white shadow-md rounded-md p-4" }, { children: [_jsx("p", Object.assign({ className: "font-semibold text-lg text-gray-800" }, { children: "Organization details" }), void 0),
            _jsx("hr", { className: "my-4" }, void 0),
            _jsx("form", Object.assign({ onSubmit: handleSubmit(onSubmit) }, { children: _jsxs("div", Object.assign({ className: "grid grid-cols-2 gap-6" }, { children: [_jsxs("div", { children: [_jsx("label", Object.assign({ htmlFor: "name", className: "block text-sm font-medium text-gray-700" }, { children: "Name" }), void 0),
                                _jsx("input", { type: "text", name: "name", id: "name", ref: register, className: "mt-1 p-1 pl-4 block w-full sm:text-md border-gray-300 border rounded-md capitalize" }, void 0)] }, void 0),
                        _jsxs("div", { children: [_jsx("label", Object.assign({ htmlFor: "phoneNo", className: "block text-sm font-medium text-gray-700" }, { children: "Phone Number" }), void 0),
                                _jsx("input", { type: "text", name: "phoneNo", id: "phoneNo", ref: register, className: "mt-1 p-1 pl-4 block w-full sm:text-md border-gray-300 border rounded-md" }, void 0)] }, void 0),
                        _jsxs("div", { children: [_jsx("label", Object.assign({ htmlFor: "phoneNo", className: "block text-sm font-medium text-gray-700" }, { children: "Phone Number 2" }), void 0),
                                _jsx("input", { type: "text", name: "phoneNo2", id: "phoneNo2", ref: register, className: "mt-1 p-1 pl-4 block w-full sm:text-md border-gray-300 border rounded-md" }, void 0)] }, void 0),
                        _jsxs("div", { children: [_jsx("label", Object.assign({ htmlFor: "address", className: "block text-sm font-medium text-gray-700" }, { children: "Address" }), void 0),
                                _jsx("input", { type: "text", name: "address", id: "address", ref: register, className: "mt-1 p-1 pl-4 block w-full sm:text-md border-gray-300 border rounded-md" }, void 0)] }, void 0),
                        _jsxs("div", { children: [_jsx("label", Object.assign({ htmlFor: "address2", className: "block text-sm font-medium text-gray-700" }, { children: "Address 2" }), void 0),
                                _jsx("input", { type: "text", name: "address2", id: "address2", ref: register, className: "mt-1 p-1 pl-4 block w-full sm:text-md border-gray-300 border rounded-md capitalize" }, void 0)] }, void 0),
                        _jsxs("div", { children: [_jsx("label", Object.assign({ htmlFor: "website", className: "block text-sm font-medium text-gray-700" }, { children: "Website" }), void 0),
                                _jsx("input", { type: "text", name: "website", id: "website", ref: register, className: "mt-1 p-1 pl-4 block w-full sm:text-md border-gray-300 border rounded-md" }, void 0)] }, void 0),
                        _jsxs("div", { children: [_jsx("label", Object.assign({ htmlFor: "email", className: "block text-sm font-medium text-gray-700" }, { children: "Email" }), void 0),
                                _jsx("input", { type: "text", name: "email", id: "email", ref: register, className: "mt-1 p-1 pl-4 block w-full sm:text-md border-gray-300 border rounded-md" }, void 0)] }, void 0),
                        _jsxs("div", { children: [_jsx("label", Object.assign({ htmlFor: "defaultMedicalDepartment", className: "block text-sm font-medium text-gray-700" }, { children: "Default Medical Department" }), void 0),
                                _jsxs("select", Object.assign({ required: true, id: "defaultMedicalDepartment", name: "defaultMedicalDepartment", ref: register({ required: true }), className: "mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" }, { children: [_jsx("option", Object.assign({ value: "General Medicine" }, { children: "General Medicine" }), void 0),
                                        _jsx("option", Object.assign({ value: "Ophthalmology" }, { children: "Ophthalmology" }), void 0)] }), void 0)] }, void 0),
                        _jsxs("div", Object.assign({ className: "col-span-2" }, { children: [_jsx("label", Object.assign({ className: "block text-sm font-medium text-gray-700 mb-4" }, { children: "Logo" }), void 0),
                                _jsx(FileUploaderComponent, { multiSelect: false, accept: "image", values: logos, onAdd: handleLogoChange, onDelete: () => setLogos([]) }, void 0)] }), void 0),
                        _jsx("div", Object.assign({ className: "py-3 bg-gray-50 w-full col-span-2" }, { children: _jsxs("button", Object.assign({ type: "submit", disabled: loading, className: "inline-flex justify-center w-full py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" }, { children: [loading && _jsx(Spinner, {}, void 0),
                                    _jsx("span", Object.assign({ className: "ml-2" }, { children: "Save" }), void 0)] }), void 0) }), void 0)] }), void 0) }), void 0)] }), void 0));
};
