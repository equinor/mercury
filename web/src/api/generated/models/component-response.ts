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


import { ComponentProperties } from './component-properties';

/**
 * Model for containing the response of getting the component dictionary.
 * @export
 * @interface ComponentResponse
 */
export interface ComponentResponse {
    /**
     * Dictionary of component_ids as string and ComponentProperties as value
     * @type {{ [key: string]: ComponentProperties; }}
     * @memberof ComponentResponse
     */
    components: { [key: string]: ComponentProperties; };
}


