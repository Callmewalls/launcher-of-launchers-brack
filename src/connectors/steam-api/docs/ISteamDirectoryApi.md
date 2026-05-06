# ISteamDirectoryApi

All URIs are relative to *https://api.steampowered.com*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**iSteamDirectoryGetCMListForConnectV1Get**](#isteamdirectorygetcmlistforconnectv1get) | **GET** /ISteamDirectory/GetCMListForConnect/v1 | |
|[**iSteamDirectoryGetCMListV1Get**](#isteamdirectorygetcmlistv1get) | **GET** /ISteamDirectory/GetCMList/v1 | |
|[**iSteamDirectoryGetSteamPipeDomainsV1Get**](#isteamdirectorygetsteampipedomainsv1get) | **GET** /ISteamDirectory/GetSteamPipeDomains/v1 | |

# **iSteamDirectoryGetCMListForConnectV1Get**
> iSteamDirectoryGetCMListForConnectV1Get()


### Example

```typescript
import {
    ISteamDirectoryApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ISteamDirectoryApi(configuration);

let cellid: number; //Client\'s Steam cell ID, uses IP location if blank (optional) (default to undefined)
let cmtype: string; //Optional CM type filter (optional) (default to undefined)
let realm: string; //Optional Steam Realm filter (optional) (default to undefined)
let maxcount: number; //Max number of servers to return (optional) (default to undefined)
let qoslevel: number; //Desired connection priority (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iSteamDirectoryGetCMListForConnectV1Get(
    cellid,
    cmtype,
    realm,
    maxcount,
    qoslevel,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **cellid** | [**number**] | Client\&#39;s Steam cell ID, uses IP location if blank | (optional) defaults to undefined|
| **cmtype** | [**string**] | Optional CM type filter | (optional) defaults to undefined|
| **realm** | [**string**] | Optional Steam Realm filter | (optional) defaults to undefined|
| **maxcount** | [**number**] | Max number of servers to return | (optional) defaults to undefined|
| **qoslevel** | [**number**] | Desired connection priority | (optional) defaults to undefined|
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

# **iSteamDirectoryGetCMListV1Get**
> iSteamDirectoryGetCMListV1Get()


### Example

```typescript
import {
    ISteamDirectoryApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ISteamDirectoryApi(configuration);

let cellid: number; //Client\'s Steam cell ID (default to undefined)
let maxcount: number; //Max number of servers to return (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iSteamDirectoryGetCMListV1Get(
    cellid,
    maxcount,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **cellid** | [**number**] | Client\&#39;s Steam cell ID | defaults to undefined|
| **maxcount** | [**number**] | Max number of servers to return | (optional) defaults to undefined|
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

# **iSteamDirectoryGetSteamPipeDomainsV1Get**
> iSteamDirectoryGetSteamPipeDomainsV1Get()


### Example

```typescript
import {
    ISteamDirectoryApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ISteamDirectoryApi(configuration);

let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iSteamDirectoryGetSteamPipeDomainsV1Get(
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
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

