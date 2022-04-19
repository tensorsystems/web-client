import React from "react";
import { FavoriteMedication, FavoriteMedicationConnection } from "../models/models";
export declare const FavoriteMedicationList: React.FC<{
    userFavoriteMedications: FavoriteMedicationConnection | undefined;
    onItemClick: (item: FavoriteMedication) => void;
    refetch: () => void;
    handleNextClick: () => void;
    handlePreviousClick: () => void;
    setSearchTerm: (searchTerm: string) => void;
}>;
