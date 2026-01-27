/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type MultiflashResponse = {
    /**
     * Phase labels (vapor, liquid, aqueous, mercury) with their fraction of unity and mercury concentration
     */
    phaseValues: Record<string, Record<string, number>>;
    /**
     * Mole fractions of each of the components (Note: mass is discarded from MultiflashResult)
     */
    componentFractions: Record<string, Array<number>>;
    /**
     * Ratio of components in the feed (guaranteed to sum to 1)
     */
    feedFractions: Record<string, number>;
};

