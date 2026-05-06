# IBroadcastServiceApi

All URIs are relative to *https://api.steampowered.com*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**iBroadcastServicePostGameDataFrameRTMPV1Post**](#ibroadcastservicepostgamedataframertmpv1post) | **POST** /IBroadcastService/PostGameDataFrameRTMP/v1 | |

# **iBroadcastServicePostGameDataFrameRTMPV1Post**
> iBroadcastServicePostGameDataFrameRTMPV1Post()


### Example

```typescript
import {
    IBroadcastServiceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IBroadcastServiceApi(configuration);

let inputJson: string; //An alternative to the request body; pass arguments as a URL-encoded JSON blob. The \"key\" and \"format\" fields should still be passed as separate parameters (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)
let appid: number; //(Required) AppID of the game being broadcasted (optional) (default to undefined)
let steamid: number; //(Required) Broadcasters SteamID (optional) (default to undefined)
let rtmpToken: string; //(Required) Valid RTMP token for the Broadcaster (optional) (default to undefined)
let frameData: string; //(Required) game data frame expressing current state of game (string, zipped, whatever) (optional) (default to undefined)

const { status, data } = await apiInstance.iBroadcastServicePostGameDataFrameRTMPV1Post(
    inputJson,
    format,
    appid,
    steamid,
    rtmpToken,
    frameData
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **inputJson** | [**string**] | An alternative to the request body; pass arguments as a URL-encoded JSON blob. The \&quot;key\&quot; and \&quot;format\&quot; fields should still be passed as separate parameters | (optional) defaults to undefined|
| **format** | [**&#39;json&#39; | &#39;xml&#39; | &#39;vdf&#39;**]**Array<&#39;json&#39; &#124; &#39;xml&#39; &#124; &#39;vdf&#39;>** | The format of the response. Defaults to json | (optional) defaults to undefined|
| **appid** | [**number**] | (Required) AppID of the game being broadcasted | (optional) defaults to undefined|
| **steamid** | [**number**] | (Required) Broadcasters SteamID | (optional) defaults to undefined|
| **rtmpToken** | [**string**] | (Required) Valid RTMP token for the Broadcaster | (optional) defaults to undefined|
| **frameData** | [**string**] | (Required) game data frame expressing current state of game (string, zipped, whatever) | (optional) defaults to undefined|


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

