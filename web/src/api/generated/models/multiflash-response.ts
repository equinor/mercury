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
     * Phase labels (vapor, liquid, aqueous, mercury) with their fraction of unity and mercury concentration
     * @type {{ [key: string]: { [key: string]: number; }; }}
     * @memberof MultiflashResponse
     */
    phaseValues: { [key: string]: { [key: string]: number; }; };
    /**
     * Mole fractions of each of the components (Note: mass is discarded from MultiflashResult)
     * @type {{ [key: string]: Array<number>; }}
     * @memberof MultiflashResponse
     */
    componentFractions: { [key: string]: Array<number>; };
    /**
     * 
     * @type {{ [key: string]: number; }}
     * @memberof MultiflashResponse
     */
    feedFractions: { [key: string]: number; };
}


