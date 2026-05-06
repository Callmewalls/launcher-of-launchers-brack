# IWishlistServiceApi

All URIs are relative to *https://api.steampowered.com*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**iWishlistServiceGetWishlistItemCountV1Get**](#iwishlistservicegetwishlistitemcountv1get) | **GET** /IWishlistService/GetWishlistItemCount/v1 | |
|[**iWishlistServiceGetWishlistSortedFilteredV1Get**](#iwishlistservicegetwishlistsortedfilteredv1get) | **GET** /IWishlistService/GetWishlistSortedFiltered/v1 | |
|[**iWishlistServiceGetWishlistV1Get**](#iwishlistservicegetwishlistv1get) | **GET** /IWishlistService/GetWishlist/v1 | |

# **iWishlistServiceGetWishlistItemCountV1Get**
> iWishlistServiceGetWishlistItemCountV1Get()


### Example

```typescript
import {
    IWishlistServiceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IWishlistServiceApi(configuration);

let steamid: number; //(Required) (optional) (default to undefined)
let inputJson: string; //An alternative to the query string parameters; pass arguments as a URL-encoded JSON blob. The \"key\" and \"format\" fields should still be passed as separate parameters (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iWishlistServiceGetWishlistItemCountV1Get(
    steamid,
    inputJson,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **steamid** | [**number**] | (Required) | (optional) defaults to undefined|
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

# **iWishlistServiceGetWishlistSortedFilteredV1Get**
> iWishlistServiceGetWishlistSortedFilteredV1Get()


### Example

```typescript
import {
    IWishlistServiceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IWishlistServiceApi(configuration);

let steamid: number; //(Required) (optional) (default to undefined)
let context: string; //(Required) (optional) (default to undefined)
let dataRequest: string; //(Required) If passed, item data will be returned (optional) (default to undefined)
let sortOrder: string; // (optional) (default to undefined)
let filters: string; //(Required) (optional) (default to undefined)
let startIndex: number; //Data in this range will be filled in with StoreBrowse data (optional) (default to undefined)
let pageSize: number; // (optional) (default to undefined)
let inputJson: string; //An alternative to the query string parameters; pass arguments as a URL-encoded JSON blob. The \"key\" and \"format\" fields should still be passed as separate parameters (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iWishlistServiceGetWishlistSortedFilteredV1Get(
    steamid,
    context,
    dataRequest,
    sortOrder,
    filters,
    startIndex,
    pageSize,
    inputJson,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **steamid** | [**number**] | (Required) | (optional) defaults to undefined|
| **context** | [**string**] | (Required) | (optional) defaults to undefined|
| **dataRequest** | [**string**] | (Required) If passed, item data will be returned | (optional) defaults to undefined|
| **sortOrder** | [**string**] |  | (optional) defaults to undefined|
| **filters** | [**string**] | (Required) | (optional) defaults to undefined|
| **startIndex** | [**number**] | Data in this range will be filled in with StoreBrowse data | (optional) defaults to undefined|
| **pageSize** | [**number**] |  | (optional) defaults to undefined|
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

# **iWishlistServiceGetWishlistV1Get**
> iWishlistServiceGetWishlistV1Get()


### Example

```typescript
import {
    IWishlistServiceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IWishlistServiceApi(configuration);

let steamid: number; //(Required) (optional) (default to undefined)
let inputJson: string; //An alternative to the query string parameters; pass arguments as a URL-encoded JSON blob. The \"key\" and \"format\" fields should still be passed as separate parameters (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iWishlistServiceGetWishlistV1Get(
    steamid,
    inputJson,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **steamid** | [**number**] | (Required) | (optional) defaults to undefined|
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

