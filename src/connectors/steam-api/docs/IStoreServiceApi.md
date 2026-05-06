# IStoreServiceApi

All URIs are relative to *https://api.steampowered.com*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**iStoreServiceGetAppListV1Get**](#istoreservicegetapplistv1get) | **GET** /IStoreService/GetAppList/v1 | |
|[**iStoreServiceGetRecommendedTagsForUserV1Get**](#istoreservicegetrecommendedtagsforuserv1get) | **GET** /IStoreService/GetRecommendedTagsForUser/v1 | |

# **iStoreServiceGetAppListV1Get**
> iStoreServiceGetAppListV1Get()


### Example

```typescript
import {
    IStoreServiceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IStoreServiceApi(configuration);

let ifModifiedSince: number; //Return only items that have been modified since this date. (optional) (default to undefined)
let haveDescriptionLanguage: string; //Return only items that have a description in this language. (optional) (default to undefined)
let includeGames: boolean; //Include games (defaults to enabled) (optional) (default to undefined)
let includeDlc: boolean; //Include DLC (optional) (default to undefined)
let includeSoftware: boolean; //Include software items (optional) (default to undefined)
let includeVideos: boolean; //Include videos and series (optional) (default to undefined)
let includeHardware: boolean; //Include hardware (optional) (default to undefined)
let lastAppid: number; //For continuations, this is the last appid returned from the previous call. (optional) (default to undefined)
let maxResults: number; //Number of results to return at a time.  Default 10k, max 50k. (optional) (default to undefined)
let inputJson: string; //An alternative to the query string parameters; pass arguments as a URL-encoded JSON blob. The \"key\" and \"format\" fields should still be passed as separate parameters (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iStoreServiceGetAppListV1Get(
    ifModifiedSince,
    haveDescriptionLanguage,
    includeGames,
    includeDlc,
    includeSoftware,
    includeVideos,
    includeHardware,
    lastAppid,
    maxResults,
    inputJson,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **ifModifiedSince** | [**number**] | Return only items that have been modified since this date. | (optional) defaults to undefined|
| **haveDescriptionLanguage** | [**string**] | Return only items that have a description in this language. | (optional) defaults to undefined|
| **includeGames** | [**boolean**] | Include games (defaults to enabled) | (optional) defaults to undefined|
| **includeDlc** | [**boolean**] | Include DLC | (optional) defaults to undefined|
| **includeSoftware** | [**boolean**] | Include software items | (optional) defaults to undefined|
| **includeVideos** | [**boolean**] | Include videos and series | (optional) defaults to undefined|
| **includeHardware** | [**boolean**] | Include hardware | (optional) defaults to undefined|
| **lastAppid** | [**number**] | For continuations, this is the last appid returned from the previous call. | (optional) defaults to undefined|
| **maxResults** | [**number**] | Number of results to return at a time.  Default 10k, max 50k. | (optional) defaults to undefined|
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

# **iStoreServiceGetRecommendedTagsForUserV1Get**
> iStoreServiceGetRecommendedTagsForUserV1Get()


### Example

```typescript
import {
    IStoreServiceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IStoreServiceApi(configuration);

let language: string; //(Required) (optional) (default to undefined)
let countryCode: string; //(Required) (optional) (default to undefined)
let favorRarerTags: boolean; //(Required) Biases tags towards tags that are less common. e.g. Favor Zombies over Action if the user plays the same number of games with both tags. (optional) (default to undefined)
let inputJson: string; //An alternative to the query string parameters; pass arguments as a URL-encoded JSON blob. The \"key\" and \"format\" fields should still be passed as separate parameters (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iStoreServiceGetRecommendedTagsForUserV1Get(
    language,
    countryCode,
    favorRarerTags,
    inputJson,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **language** | [**string**] | (Required) | (optional) defaults to undefined|
| **countryCode** | [**string**] | (Required) | (optional) defaults to undefined|
| **favorRarerTags** | [**boolean**] | (Required) Biases tags towards tags that are less common. e.g. Favor Zombies over Action if the user plays the same number of games with both tags. | (optional) defaults to undefined|
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

