# IHelpRequestLogsServiceApi

All URIs are relative to *https://api.steampowered.com*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**iHelpRequestLogsServiceGetApplicationLogDemandV1Post**](#ihelprequestlogsservicegetapplicationlogdemandv1post) | **POST** /IHelpRequestLogsService/GetApplicationLogDemand/v1 | |
|[**iHelpRequestLogsServiceUploadUserApplicationLogV1Post**](#ihelprequestlogsserviceuploaduserapplicationlogv1post) | **POST** /IHelpRequestLogsService/UploadUserApplicationLog/v1 | |

# **iHelpRequestLogsServiceGetApplicationLogDemandV1Post**
> iHelpRequestLogsServiceGetApplicationLogDemandV1Post()


### Example

```typescript
import {
    IHelpRequestLogsServiceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IHelpRequestLogsServiceApi(configuration);

let inputJson: string; //An alternative to the request body; pass arguments as a URL-encoded JSON blob. The \"key\" and \"format\" fields should still be passed as separate parameters (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)
let appid: number; //(Required) (optional) (default to undefined)

const { status, data } = await apiInstance.iHelpRequestLogsServiceGetApplicationLogDemandV1Post(
    inputJson,
    format,
    appid
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **inputJson** | [**string**] | An alternative to the request body; pass arguments as a URL-encoded JSON blob. The \&quot;key\&quot; and \&quot;format\&quot; fields should still be passed as separate parameters | (optional) defaults to undefined|
| **format** | [**&#39;json&#39; | &#39;xml&#39; | &#39;vdf&#39;**]**Array<&#39;json&#39; &#124; &#39;xml&#39; &#124; &#39;vdf&#39;>** | The format of the response. Defaults to json | (optional) defaults to undefined|
| **appid** | [**number**] | (Required) | (optional) defaults to undefined|


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

# **iHelpRequestLogsServiceUploadUserApplicationLogV1Post**
> iHelpRequestLogsServiceUploadUserApplicationLogV1Post()


### Example

```typescript
import {
    IHelpRequestLogsServiceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IHelpRequestLogsServiceApi(configuration);

let inputJson: string; //An alternative to the request body; pass arguments as a URL-encoded JSON blob. The \"key\" and \"format\" fields should still be passed as separate parameters (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)
let appid: number; //(Required) (optional) (default to undefined)
let logType: string; //(Required) (optional) (default to undefined)
let versionString: string; //(Required) (optional) (default to undefined)
let logContents: string; //(Required) (optional) (default to undefined)
let requestId: number; //(Required) (optional) (default to undefined)

const { status, data } = await apiInstance.iHelpRequestLogsServiceUploadUserApplicationLogV1Post(
    inputJson,
    format,
    appid,
    logType,
    versionString,
    logContents,
    requestId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **inputJson** | [**string**] | An alternative to the request body; pass arguments as a URL-encoded JSON blob. The \&quot;key\&quot; and \&quot;format\&quot; fields should still be passed as separate parameters | (optional) defaults to undefined|
| **format** | [**&#39;json&#39; | &#39;xml&#39; | &#39;vdf&#39;**]**Array<&#39;json&#39; &#124; &#39;xml&#39; &#124; &#39;vdf&#39;>** | The format of the response. Defaults to json | (optional) defaults to undefined|
| **appid** | [**number**] | (Required) | (optional) defaults to undefined|
| **logType** | [**string**] | (Required) | (optional) defaults to undefined|
| **versionString** | [**string**] | (Required) | (optional) defaults to undefined|
| **logContents** | [**string**] | (Required) | (optional) defaults to undefined|
| **requestId** | [**number**] | (Required) | (optional) defaults to undefined|


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

