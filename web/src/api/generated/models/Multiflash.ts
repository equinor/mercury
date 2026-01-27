/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Model for the computing multiphase flash calculation input.
 */
export type Multiflash = {
    /**
     * The component ids (as string parsed numbers) and the percentage of each component in the feed
     */
    componentComposition: Record<string, number>;
    /**
     * Temperature (in Celsius) for computation
     */
    temperature: number;
    /**
     * Pressure (in bar) for computation
     */
    pressure: number;
};

