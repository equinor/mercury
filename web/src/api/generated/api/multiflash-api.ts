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


import globalAxios, { AxiosPromise, AxiosInstance } from 'axios';
import { Configuration } from '../configuration';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from '../common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base';
// @ts-ignore
import { HTTPValidationError } from '../models';
// @ts-ignore
import { Multiflash } from '../models';
// @ts-ignore
import { MultiflashResponse } from '../models';
/**
 * MultiflashApi - axios parameter creator
 * @export
 */
export const MultiflashApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Compute Multiflash
         * @param {Multiflash} multiflash 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        computeMultiflash: async (multiflash: Multiflash, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'multiflash' is not null or undefined
            assertParamExists('computeMultiflash', 'multiflash', multiflash)
            const localVarPath = `/multiflash`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication OAuth2AuthorizationCodeBearer required
            // oauth required
            await setOAuthToObject(localVarHeaderParameter, "OAuth2AuthorizationCodeBearer", [], configuration)


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(multiflash, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * MultiflashApi - functional programming interface
 * @export
 */
export const MultiflashApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = MultiflashApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary Compute Multiflash
         * @param {Multiflash} multiflash 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async computeMultiflash(multiflash: Multiflash, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<MultiflashResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.computeMultiflash(multiflash, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * MultiflashApi - factory interface
 * @export
 */
export const MultiflashApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = MultiflashApiFp(configuration)
    return {
        /**
         * 
         * @summary Compute Multiflash
         * @param {Multiflash} multiflash 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        computeMultiflash(multiflash: Multiflash, options?: any): AxiosPromise<MultiflashResponse> {
            return localVarFp.computeMultiflash(multiflash, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for computeMultiflash operation in MultiflashApi.
 * @export
 * @interface MultiflashApiComputeMultiflashRequest
 */
export interface MultiflashApiComputeMultiflashRequest {
    /**
     * 
     * @type {Multiflash}
     * @memberof MultiflashApiComputeMultiflash
     */
    readonly multiflash: Multiflash
}

/**
 * MultiflashApi - object-oriented interface
 * @export
 * @class MultiflashApi
 * @extends {BaseAPI}
 */
export class MultiflashApi extends BaseAPI {
    /**
     * 
     * @summary Compute Multiflash
     * @param {MultiflashApiComputeMultiflashRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof MultiflashApi
     */
    public computeMultiflash(requestParameters: MultiflashApiComputeMultiflashRequest, options?: any) {
        return MultiflashApiFp(this.configuration).computeMultiflash(requestParameters.multiflash, options).then((request) => request(this.axios, this.basePath));
    }
}
