/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ComponentProperties } from './ComponentProperties';
/**
 * Model for containing the response of getting the component dictionary.
 */
export type ComponentResponse = {
    /**
     * Dictionary of component_ids as string and ComponentProperties as value
     */
    components: Record<string, ComponentProperties>;
};

