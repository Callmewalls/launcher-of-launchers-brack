# ISteamCDNApi

All URIs are relative to *https://api.steampowered.com*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**iSteamCDNSetClientFiltersV1Post**](#isteamcdnsetclientfiltersv1post) | **POST** /ISteamCDN/SetClientFilters/v1 | |
|[**iSteamCDNSetPerformanceStatsV1Post**](#isteamcdnsetperformancestatsv1post) | **POST** /ISteamCDN/SetPerformanceStats/v1 | |

# **iSteamCDNSetClientFiltersV1Post**
> iSteamCDNSetClientFiltersV1Post()


### Example

```typescript
import {
    ISteamCDNApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ISteamCDNApi(configuration);

let cdnname: string; //Steam name of CDN property (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)
let allowedipblocks: string; //comma-separated list of allowed IP address blocks in CIDR format - blank for not used (optional) (default to undefined)
let allowedasns: string; //comma-separated list of allowed client network AS numbers - blank for not used (optional) (default to undefined)
let allowedipcountries: string; //comma-separated list of allowed client IP country codes in ISO 3166-1 format - blank for not used (optional) (default to undefined)

const { status, data } = await apiInstance.iSteamCDNSetClientFiltersV1Post(
    cdnname,
    format,
    allowedipblocks,
    allowedasns,
    allowedipcountries
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **cdnname** | [**string**] | Steam name of CDN property | defaults to undefined|
| **format** | [**&#39;json&#39; | &#39;xml&#39; | &#39;vdf&#39;**]**Array<&#39;json&#39; &#124; &#39;xml&#39; &#124; &#39;vdf&#39;>** | The format of the response. Defaults to json | (optional) defaults to undefined|
| **allowedipblocks** | [**string**] | comma-separated list of allowed IP address blocks in CIDR format - blank for not used | (optional) defaults to undefined|
| **allowedasns** | [**string**] | comma-separated list of allowed client network AS numbers - blank for not used | (optional) defaults to undefined|
| **allowedipcountries** | [**string**] | comma-separated list of allowed client IP country codes in ISO 3166-1 format - blank for not used | (optional) defaults to undefined|


### Return type

void (empty response body)

### Authorization

[key](../README.md#key)

### HTTP request headers

 - **Content-Type**: application/x-www-form-urlencoded
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | A successful request |  -  |
|**400** | If the user fails to supply all required fields, or supplies invalid data |  -  |
|**403** | If the user fails to supply a valid API key, or if the key does not allow access to this resource |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **iSteamCDNSetPerformanceStatsV1Post**
> iSteamCDNSetPerformanceStatsV1Post()


### Example

```typescript
import {
    ISteamCDNApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ISteamCDNApi(configuration);

let cdnname: string; //Steam name of CDN property (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)
let mbpsSent: number; //Outgoing network traffic in Mbps (optional) (default to undefined)
let mbpsRecv: number; //Incoming network traffic in Mbps (optional) (default to undefined)
let cpuPercent: number; //Percent CPU load (optional) (default to undefined)
let cacheHitPercent: number; //Percent cache hits (optional) (default to undefined)

const { status, data } = await apiInstance.iSteamCDNSetPerformanceStatsV1Post(
    cdnname,
    format,
    mbpsSent,
    mbpsRecv,
    cpuPercent,
    cacheHitPercent
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **cdnname** | [**string**] | Steam name of CDN property | defaults to undefined|
| **format** | [**&#39;json&#39; | &#39;xml&#39; | &#39;vdf&#39;**]**Array<&#39;json&#39; &#124; &#39;xml&#39; &#124; &#39;vdf&#39;>** | The format of the response. Defaults to json | (optional) defaults to undefined|
| **mbpsSent** | [**number**] | Outgoing network traffic in Mbps | (optional) defaults to undefined|
| **mbpsRecv** | [**number**] | Incoming network traffic in Mbps | (optional) defaults to undefined|
| **cpuPercent** | [**number**] | Percent CPU load | (optional) defaults to undefined|
| **cacheHitPercent** | [**number**] | Percent cache hits | (optional) defaults to undefined|


### Return type

void (empty response body)

### Authorization

[key](../README.md#key)

### HTTP request headers

 - **Content-Type**: application/x-www-form-urlencoded
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | A successful request |  -  |
|**400** | If the user fails to supply all required fields, or supplies invalid data |  -  |
|**403** | If the user fails to supply a valid API key, or if the key does not allow access to this resource |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

