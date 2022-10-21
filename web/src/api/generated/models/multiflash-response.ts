/* tslint:disable */
/* eslint-disable */
/**
 * Mercury
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import { ComponentIds } from './component-ids';
import { PhaseLabels } from './phase-labels';
import { PhaseResults } from './phase-results';

/**
 * 
 * @export
 * @interface MultiflashResponse
 */
export interface MultiflashResponse {
    /**
     * 
     * @type {Array<ComponentIds>}
     * @memberof MultiflashResponse
     */
    componentIds: Array<ComponentIds>;
    /**
     * 
     * @type {Array<PhaseLabels>}
     * @memberof MultiflashResponse
     */
    phases: Array<PhaseLabels>;
    /**
     * 
     * @type {PhaseResults}
     * @memberof MultiflashResponse
     */
    phaseValues: PhaseResults;
}


