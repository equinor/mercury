/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Model containing properties of the component: I.e. the chemical name (H2O, Hg, etc.), the alternate name for a
 * component (water, mercury, etc.) and the molecular weight of the component.
 */
export type ComponentProperties = {
    /**
     * Chemical name of the component
     */
    chemicalFormula: string;
    /**
     * Alternate name of the component
     */
    altName: string;
    /**
     * Molecular weight of the component (g/mol)
     */
    molecularWeight: number;
};

