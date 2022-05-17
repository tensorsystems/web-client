import React from "react";
interface Props {
    selectedColor: any;
    selectedLineWeight: any;
    onColorChange: (value: string) => void;
    onLineWeightChange: (value: any) => void;
}
export declare const SketchTool: React.FC<Props>;
export {};
