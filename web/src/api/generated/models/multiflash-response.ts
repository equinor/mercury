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



/**
 * 
 * @export
 * @interface MultiflashResponse
 */
export interface MultiflashResponse {
    /**
     * Phase labels (vapor, liquid, aqueous, mercury) and their fraction of unity
     * @type {{ [key: string]: number; }}
     * @memberof MultiflashResponse
     */
    phases: { [key: string]: number; };
    /**
     * Mole fractions of each phase
     * @type {{ [key: string]: Array<number>; }}
     * @memberof MultiflashResponse
     */
    moles: { [key: string]: Array<number>; };
}


