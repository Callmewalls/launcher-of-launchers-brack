# IContentServerConfigServiceApi

All URIs are relative to *https://api.steampowered.com*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**iContentServerConfigServiceGetSteamCacheNodeParamsV1Get**](#icontentserverconfigservicegetsteamcachenodeparamsv1get) | **GET** /IContentServerConfigService/GetSteamCacheNodeParams/v1 | |
|[**iContentServerConfigServiceSetSteamCacheClientFiltersV1Post**](#icontentserverconfigservicesetsteamcacheclientfiltersv1post) | **POST** /IContentServerConfigService/SetSteamCacheClientFilters/v1 | |
|[**iContentServerConfigServiceSetSteamCachePerformanceStatsV1Post**](#icontentserverconfigservicesetsteamcacheperformancestatsv1post) | **POST** /IContentServerConfigService/SetSteamCachePerformanceStats/v1 | |

# **iContentServerConfigServiceGetSteamCacheNodeParamsV1Get**
> iContentServerConfigServiceGetSteamCacheNodeParamsV1Get()


### Example

```typescript
import {
    IContentServerConfigServiceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IContentServerConfigServiceApi(configuration);

let cacheId: number; //(Required) Unique ID number (optional) (default to undefined)
let cacheKey: string; //(Required) Valid current cache API key (optional) (default to undefined)
let inputJson: string; //An alternative to the query string parameters; pass arguments as a URL-encoded JSON blob. The \"key\" and \"format\" fields should still be passed as separate parameters (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iContentServerConfigServiceGetSteamCacheNodeParamsV1Get(
    cacheId,
    cacheKey,
    inputJson,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **cacheId** | [**number**] | (Required) Unique ID number | (optional) defaults to undefined|
| **cacheKey** | [**string**] | (Required) Valid current cache API key | (optional) defaults to undefined|
| **inputJson** | [**string**] | An alternative to the query string parameters; pass arguments as a URL-encoded JSON blob. The \&quot;key\&quot; and \&quot;format\&quot; fields should still be passed as separate parameters | (optional) defaults to undefined|
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

# **iContentServerConfigServiceSetSteamCacheClientFiltersV1Post**
> iContentServerConfigServiceSetSteamCacheClientFiltersV1Post()


### Example

```typescript
import {
    IContentServerConfigServiceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IContentServerConfigServiceApi(configuration);

let inputJson: string; //An alternative to the request body; pass arguments as a URL-encoded JSON blob. The \"key\" and \"format\" fields should still be passed as separate parameters (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)
let cacheId: number; //(Required) Unique ID number (optional) (default to undefined)
let cacheKey: string; //(Required) Valid current cache API key (optional) (default to undefined)
let changeNotes: string; //(Required) Notes (optional) (default to undefined)
let allowedIpBlocks: string; //(Required) comma-separated list of allowed IP address blocks in CIDR format - blank to clear unfilter (optional) (default to undefined)

const { status, data } = await apiInstance.iContentServerConfigServiceSetSteamCacheClientFiltersV1Post(
    inputJson,
    format,
    cacheId,
    cacheKey,
    changeNotes,
    allowedIpBlocks
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **inputJson** | [**string**] | An alternative to the request body; pass arguments as a URL-encoded JSON blob. The \&quot;key\&quot; and \&quot;format\&quot; fields should still be passed as separate parameters | (optional) defaults to undefined|
| **format** | [**&#39;json&#39; | &#39;xml&#39; | &#39;vdf&#39;**]**Array<&#39;json&#39; &#124; &#39;xml&#39; &#124; &#39;vdf&#39;>** | The format of the response. Defaults to json | (optional) defaults to undefined|
| **cacheId** | [**number**] | (Required) Unique ID number | (optional) defaults to undefined|
| **cacheKey** | [**string**] | (Required) Valid current cache API key | (optional) defaults to undefined|
| **changeNotes** | [**string**] | (Required) Notes | (optional) defaults to undefined|
| **allowedIpBlocks** | [**string**] | (Required) comma-separated list of allowed IP address blocks in CIDR format - blank to clear unfilter | (optional) defaults to undefined|


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

# **iContentServerConfigServiceSetSteamCachePerformanceStatsV1Post**
> iContentServerConfigServiceSetSteamCachePerformanceStatsV1Post()


### Example

```typescript
import {
    IContentServerConfigServiceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IContentServerConfigServiceApi(configuration);

let inputJson: string; //An alternative to the request body; pass arguments as a URL-encoded JSON blob. The \"key\" and \"format\" fields should still be passed as separate parameters (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)
let cacheId: number; //(Required) Unique ID number (optional) (default to undefined)
let cacheKey: string; //(Required) Valid current cache API key (optional) (default to undefined)
let mbpsSent: number; //(Required) Outgoing network traffic in Mbps (optional) (default to undefined)
let mbpsRecv: number; //(Required) Incoming network traffic in Mbps (optional) (default to undefined)
let cpuPercent: number; //(Required) Percent CPU load (optional) (default to undefined)
let cacheHitPercent: number; //(Required) Percent cache hits (optional) (default to undefined)
let numConnectedIps: number; //(Required) Number of unique connected IP addresses (optional) (default to undefined)
let upstreamEgressUtilization: number; //(Required) (deprecated) What is the percent utilization of the busiest datacenter egress link? (optional) (default to undefined)
let upstreamPeeringUtilization: number; //(Required) What is the percent utilization of the busiest peering link? (optional) (default to undefined)
let upstreamTransitUtilization: number; //(Required) What is the percent utilization of the busiest transit link? (optional) (default to undefined)

const { status, data } = await apiInstance.iContentServerConfigServiceSetSteamCachePerformanceStatsV1Post(
    inputJson,
    format,
    cacheId,
    cacheKey,
    mbpsSent,
    mbpsRecv,
    cpuPercent,
    cacheHitPercent,
    numConnectedIps,
    upstreamEgressUtilization,
    upstreamPeeringUtilization,
    upstreamTransitUtilization
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **inputJson** | [**string**] | An alternative to the request body; pass arguments as a URL-encoded JSON blob. The \&quot;key\&quot; and \&quot;format\&quot; fields should still be passed as separate parameters | (optional) defaults to undefined|
| **format** | [**&#39;json&#39; | &#39;xml&#39; | &#39;vdf&#39;**]**Array<&#39;json&#39; &#124; &#39;xml&#39; &#124; &#39;vdf&#39;>** | The format of the response. Defaults to json | (optional) defaults to undefined|
| **cacheId** | [**number**] | (Required) Unique ID number | (optional) defaults to undefined|
| **cacheKey** | [**string**] | (Required) Valid current cache API key | (optional) defaults to undefined|
| **mbpsSent** | [**number**] | (Required) Outgoing network traffic in Mbps | (optional) defaults to undefined|
| **mbpsRecv** | [**number**] | (Required) Incoming network traffic in Mbps | (optional) defaults to undefined|
| **cpuPercent** | [**number**] | (Required) Percent CPU load | (optional) defaults to undefined|
| **cacheHitPercent** | [**number**] | (Required) Percent cache hits | (optional) defaults to undefined|
| **numConnectedIps** | [**number**] | (Required) Number of unique connected IP addresses | (optional) defaults to undefined|
| **upstreamEgressUtilization** | [**number**] | (Required) (deprecated) What is the percent utilization of the busiest datacenter egress link? | (optional) defaults to undefined|
| **upstreamPeeringUtilization** | [**number**] | (Required) What is the percent utilization of the busiest peering link? | (optional) defaults to undefined|
| **upstreamTransitUtilization** | [**number**] | (Required) What is the percent utilization of the busiest transit link? | (optional) defaults to undefined|


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

