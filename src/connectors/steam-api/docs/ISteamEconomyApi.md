# ISteamEconomyApi

All URIs are relative to *https://api.steampowered.com*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**iSteamEconomyGetAssetClassInfoV1Get**](#isteameconomygetassetclassinfov1get) | **GET** /ISteamEconomy/GetAssetClassInfo/v1 | |
|[**iSteamEconomyGetAssetPricesV1Get**](#isteameconomygetassetpricesv1get) | **GET** /ISteamEconomy/GetAssetPrices/v1 | |

# **iSteamEconomyGetAssetClassInfoV1Get**
> iSteamEconomyGetAssetClassInfoV1Get()


### Example

```typescript
import {
    ISteamEconomyApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ISteamEconomyApi(configuration);

let appid: number; //Must be a steam economy app. (default to undefined)
let classCount: number; //Number of classes requested. Must be at least one. (default to undefined)
let classid0: number; //Class ID of the nth class. (default to undefined)
let language: string; //The user\'s local language (optional) (default to undefined)
let instanceid0: number; //Instance ID of the nth class. (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iSteamEconomyGetAssetClassInfoV1Get(
    appid,
    classCount,
    classid0,
    language,
    instanceid0,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **appid** | [**number**] | Must be a steam economy app. | defaults to undefined|
| **classCount** | [**number**] | Number of classes requested. Must be at least one. | defaults to undefined|
| **classid0** | [**number**] | Class ID of the nth class. | defaults to undefined|
| **language** | [**string**] | The user\&#39;s local language | (optional) defaults to undefined|
| **instanceid0** | [**number**] | Instance ID of the nth class. | (optional) defaults to undefined|
| **format** | [**&#39;json&#39; | &#39;xml&#39; | &#39;vdf&#39;**]**Array<&#39;json&#39; &#124; &#39;xml&#39; &#124; &#39;vdf&#39;>** | The format of the response. Defaults to json | (optional) defaults to undefined|


### Return type

void (empty response body)

### Authorization

[key](../README.md#key)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | A successful request |  -  |
|**400** | If the user fails to supply all required fields, or supplies invalid data |  -  |
|**403** | If the user fails to supply a valid API key, or if the key does not allow access to this resource |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **iSteamEconomyGetAssetPricesV1Get**
> iSteamEconomyGetAssetPricesV1Get()


### Example

```typescript
import {
    ISteamEconomyApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ISteamEconomyApi(configuration);

let appid: number; //Must be a steam economy app. (default to undefined)
let currency: string; //The currency to filter for (optional) (default to undefined)
let language: string; //The user\'s local language (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iSteamEconomyGetAssetPricesV1Get(
    appid,
    currency,
    language,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **appid** | [**number**] | Must be a steam economy app. | defaults to undefined|
| **currency** | [**string**] | The currency to filter for | (optional) defaults to undefined|
| **language** | [**string**] | The user\&#39;s local language | (optional) defaults to undefined|
| **format** | [**&#39;json&#39; | &#39;xml&#39; | &#39;vdf&#39;**]**Array<&#39;json&#39; &#124; &#39;xml&#39; &#124; &#39;vdf&#39;>** | The format of the response. Defaults to json | (optional) defaults to undefined|


### Return type

void (empty response body)

### Authorization

[key](../README.md#key)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | A successful request |  -  |
|**400** | If the user fails to supply all required fields, or supplies invalid data |  -  |
|**403** | If the user fails to supply a valid API key, or if the key does not allow access to this resource |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

