import React from "react";
import { FileUploader } from "./FileUploaderComponent";
interface Props {
    register: any;
    paperRecord: "Yes" | "No";
    setPaperRecord: (value: "Yes" | "No") => void;
    documents: Array<FileUploader>;
    setDocuments: (value: Array<FileUploader>) => void;
    onDocumentDelete: (index: number) => void;
    paperRecordDocument: Array<FileUploader>;
    setPaperRecordDocument: (value: Array<FileUploader>) => void;
    onPaperRecordDocumentDelete: (index: number) => void;
}
export declare const PatientRegistrationDocumentsForm: React.FC<Props>;
export {};
