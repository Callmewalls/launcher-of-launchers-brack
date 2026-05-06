# IContentServerDirectoryServiceApi

All URIs are relative to *https://api.steampowered.com*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**iContentServerDirectoryServiceGetCDNForVideoV1Get**](#icontentserverdirectoryservicegetcdnforvideov1get) | **GET** /IContentServerDirectoryService/GetCDNForVideo/v1 | |
|[**iContentServerDirectoryServiceGetClientUpdateHostsV1Get**](#icontentserverdirectoryservicegetclientupdatehostsv1get) | **GET** /IContentServerDirectoryService/GetClientUpdateHosts/v1 | |
|[**iContentServerDirectoryServiceGetDepotPatchInfoV1Get**](#icontentserverdirectoryservicegetdepotpatchinfov1get) | **GET** /IContentServerDirectoryService/GetDepotPatchInfo/v1 | |
|[**iContentServerDirectoryServiceGetServersForSteamPipeV1Get**](#icontentserverdirectoryservicegetserversforsteampipev1get) | **GET** /IContentServerDirectoryService/GetServersForSteamPipe/v1 | |
|[**iContentServerDirectoryServicePickSingleContentServerV1Get**](#icontentserverdirectoryservicepicksinglecontentserverv1get) | **GET** /IContentServerDirectoryService/PickSingleContentServer/v1 | |

# **iContentServerDirectoryServiceGetCDNForVideoV1Get**
> iContentServerDirectoryServiceGetCDNForVideoV1Get()


### Example

```typescript
import {
    IContentServerDirectoryServiceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IContentServerDirectoryServiceApi(configuration);

let propertyType: number; //(Required) ECDNPropertyType (optional) (default to undefined)
let clientIp: string; //(Required) client IP address (optional) (default to undefined)
let clientRegion: string; //(Required) client region (optional) (default to undefined)
let inputJson: string; //An alternative to the query string parameters; pass arguments as a URL-encoded JSON blob. The \"key\" and \"format\" fields should still be passed as separate parameters (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iContentServerDirectoryServiceGetCDNForVideoV1Get(
    propertyType,
    clientIp,
    clientRegion,
    inputJson,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **propertyType** | [**number**] | (Required) ECDNPropertyType | (optional) defaults to undefined|
| **clientIp** | [**string**] | (Required) client IP address | (optional) defaults to undefined|
| **clientRegion** | [**string**] | (Required) client region | (optional) defaults to undefined|
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

# **iContentServerDirectoryServiceGetClientUpdateHostsV1Get**
> iContentServerDirectoryServiceGetClientUpdateHostsV1Get()


### Example

```typescript
import {
    IContentServerDirectoryServiceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IContentServerDirectoryServiceApi(configuration);

let cachedSignature: string; //(Required) (optional) (default to undefined)
let inputJson: string; //An alternative to the query string parameters; pass arguments as a URL-encoded JSON blob. The \"key\" and \"format\" fields should still be passed as separate parameters (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iContentServerDirectoryServiceGetClientUpdateHostsV1Get(
    cachedSignature,
    inputJson,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **cachedSignature** | [**string**] | (Required) | (optional) defaults to undefined|
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

# **iContentServerDirectoryServiceGetDepotPatchInfoV1Get**
> iContentServerDirectoryServiceGetDepotPatchInfoV1Get()


### Example

```typescript
import {
    IContentServerDirectoryServiceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IContentServerDirectoryServiceApi(configuration);

let appid: number; //(Required) (optional) (default to undefined)
let depotid: number; //(Required) (optional) (default to undefined)
let sourceManifestid: number; //(Required) (optional) (default to undefined)
let targetManifestid: number; //(Required) (optional) (default to undefined)
let inputJson: string; //An alternative to the query string parameters; pass arguments as a URL-encoded JSON blob. The \"key\" and \"format\" fields should still be passed as separate parameters (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iContentServerDirectoryServiceGetDepotPatchInfoV1Get(
    appid,
    depotid,
    sourceManifestid,
    targetManifestid,
    inputJson,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **appid** | [**number**] | (Required) | (optional) defaults to undefined|
| **depotid** | [**number**] | (Required) | (optional) defaults to undefined|
| **sourceManifestid** | [**number**] | (Required) | (optional) defaults to undefined|
| **targetManifestid** | [**number**] | (Required) | (optional) defaults to undefined|
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

# **iContentServerDirectoryServiceGetServersForSteamPipeV1Get**
> iContentServerDirectoryServiceGetServersForSteamPipeV1Get()


### Example

```typescript
import {
    IContentServerDirectoryServiceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IContentServerDirectoryServiceApi(configuration);

let cellId: number; //(Required) client Cell ID (optional) (default to undefined)
let maxServers: number; //max servers in response list (optional) (default to undefined)
let ipOverride: string; //client IP address (optional) (default to undefined)
let launcherType: number; //launcher type (optional) (default to undefined)
let ipv6Public: string; //client public ipv6 address if it knows it (optional) (default to undefined)
let currentConnections: string; //(Required) what sources is the client currently using (optional) (default to undefined)
let inputJson: string; //An alternative to the query string parameters; pass arguments as a URL-encoded JSON blob. The \"key\" and \"format\" fields should still be passed as separate parameters (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iContentServerDirectoryServiceGetServersForSteamPipeV1Get(
    cellId,
    maxServers,
    ipOverride,
    launcherType,
    ipv6Public,
    currentConnections,
    inputJson,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **cellId** | [**number**] | (Required) client Cell ID | (optional) defaults to undefined|
| **maxServers** | [**number**] | max servers in response list | (optional) defaults to undefined|
| **ipOverride** | [**string**] | client IP address | (optional) defaults to undefined|
| **launcherType** | [**number**] | launcher type | (optional) defaults to undefined|
| **ipv6Public** | [**string**] | client public ipv6 address if it knows it | (optional) defaults to undefined|
| **currentConnections** | [**string**] | (Required) what sources is the client currently using | (optional) defaults to undefined|
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

# **iContentServerDirectoryServicePickSingleContentServerV1Get**
> iContentServerDirectoryServicePickSingleContentServerV1Get()


### Example

```typescript
import {
    IContentServerDirectoryServiceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IContentServerDirectoryServiceApi(configuration);

let propertyType: number; //(Required) ECDNPropertyType (optional) (default to undefined)
let cellId: number; //(Required) client Cell ID (optional) (default to undefined)
let clientIp: string; //(Required) client IP address (optional) (default to undefined)
let inputJson: string; //An alternative to the query string parameters; pass arguments as a URL-encoded JSON blob. The \"key\" and \"format\" fields should still be passed as separate parameters (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iContentServerDirectoryServicePickSingleContentServerV1Get(
    propertyType,
    cellId,
    clientIp,
    inputJson,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **propertyType** | [**number**] | (Required) ECDNPropertyType | (optional) defaults to undefined|
| **cellId** | [**number**] | (Required) client Cell ID | (optional) defaults to undefined|
| **clientIp** | [**string**] | (Required) client IP address | (optional) defaults to undefined|
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

