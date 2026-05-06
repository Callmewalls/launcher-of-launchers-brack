# ICheatReportingServiceApi

All URIs are relative to *https://api.steampowered.com*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**iCheatReportingServiceReportCheatDataV1Post**](#icheatreportingservicereportcheatdatav1post) | **POST** /ICheatReportingService/ReportCheatData/v1 | |

# **iCheatReportingServiceReportCheatDataV1Post**
> iCheatReportingServiceReportCheatDataV1Post()


### Example

```typescript
import {
    ICheatReportingServiceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ICheatReportingServiceApi(configuration);

let inputJson: string; //An alternative to the request body; pass arguments as a URL-encoded JSON blob. The \"key\" and \"format\" fields should still be passed as separate parameters (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)
let steamid: number; //(Required) steamid of the user running and reporting the cheat. (optional) (default to undefined)
let appid: number; //(Required) The appid. (optional) (default to undefined)
let pathandfilename: string; //(Required) path and file name of the cheat executable. (optional) (default to undefined)
let webcheaturl: string; //(Required) web url where the cheat was found and downloaded. (optional) (default to undefined)
let timeNow: number; //(Required) local system time now. (optional) (default to undefined)
let timeStarted: number; //(Required) local system time when cheat process started. ( 0 if not yet run ) (optional) (default to undefined)
let timeStopped: number; //(Required) local system time when cheat process stopped. ( 0 if still running ) (optional) (default to undefined)
let cheatname: string; //(Required) descriptive name for the cheat. (optional) (default to undefined)
let gameProcessId: number; //(Required) process ID of the running game. (optional) (default to undefined)
let cheatProcessId: number; //(Required) process ID of the cheat process that ran (optional) (default to undefined)
let cheatParam1: number; //(Required) cheat param 1 (optional) (default to undefined)
let cheatParam2: number; //(Required) cheat param 2 (optional) (default to undefined)
let cheatDataDump: string; //(Required) data collection in json format (optional) (default to undefined)

const { status, data } = await apiInstance.iCheatReportingServiceReportCheatDataV1Post(
    inputJson,
    format,
    steamid,
    appid,
    pathandfilename,
    webcheaturl,
    timeNow,
    timeStarted,
    timeStopped,
    cheatname,
    gameProcessId,
    cheatProcessId,
    cheatParam1,
    cheatParam2,
    cheatDataDump
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **inputJson** | [**string**] | An alternative to the request body; pass arguments as a URL-encoded JSON blob. The \&quot;key\&quot; and \&quot;format\&quot; fields should still be passed as separate parameters | (optional) defaults to undefined|
| **format** | [**&#39;json&#39; | &#39;xml&#39; | &#39;vdf&#39;**]**Array<&#39;json&#39; &#124; &#39;xml&#39; &#124; &#39;vdf&#39;>** | The format of the response. Defaults to json | (optional) defaults to undefined|
| **steamid** | [**number**] | (Required) steamid of the user running and reporting the cheat. | (optional) defaults to undefined|
| **appid** | [**number**] | (Required) The appid. | (optional) defaults to undefined|
| **pathandfilename** | [**string**] | (Required) path and file name of the cheat executable. | (optional) defaults to undefined|
| **webcheaturl** | [**string**] | (Required) web url where the cheat was found and downloaded. | (optional) defaults to undefined|
| **timeNow** | [**number**] | (Required) local system time now. | (optional) defaults to undefined|
| **timeStarted** | [**number**] | (Required) local system time when cheat process started. ( 0 if not yet run ) | (optional) defaults to undefined|
| **timeStopped** | [**number**] | (Required) local system time when cheat process stopped. ( 0 if still running ) | (optional) defaults to undefined|
| **cheatname** | [**string**] | (Required) descriptive name for the cheat. | (optional) defaults to undefined|
| **gameProcessId** | [**number**] | (Required) process ID of the running game. | (optional) defaults to undefined|
| **cheatProcessId** | [**number**] | (Required) process ID of the cheat process that ran | (optional) defaults to undefined|
| **cheatParam1** | [**number**] | (Required) cheat param 1 | (optional) defaults to undefined|
| **cheatParam2** | [**number**] | (Required) cheat param 2 | (optional) defaults to undefined|
| **cheatDataDump** | [**string**] | (Required) data collection in json format | (optional) defaults to undefined|


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

