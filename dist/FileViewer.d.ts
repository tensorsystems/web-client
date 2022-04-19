import React from "react";
export interface FileViewerProps {
    isOpen: boolean;
    src: any;
    meta: any;
    onClose: () => void;
}
export declare const FileViewer: React.FC<FileViewerProps>;
