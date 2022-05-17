import React from "react";
interface Props {
    alt: string;
    refValue: any;
    selectedColor: any;
    selectedLineWeight: any;
    width: string;
    height: string;
    image: any;
    value: any;
    readOnly: boolean;
    imageClassname: string;
    onChange: (value: any) => void;
}
export declare const SketchDiagram: React.FC<Props>;
export {};
