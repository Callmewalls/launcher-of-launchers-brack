# IInventoryServiceApi

All URIs are relative to *https://api.steampowered.com*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**iInventoryServiceCombineItemStacksV1Post**](#iinventoryservicecombineitemstacksv1post) | **POST** /IInventoryService/CombineItemStacks/v1 | |
|[**iInventoryServiceGetPriceSheetV1Get**](#iinventoryservicegetpricesheetv1get) | **GET** /IInventoryService/GetPriceSheet/v1 | |
|[**iInventoryServiceSplitItemStackV1Post**](#iinventoryservicesplititemstackv1post) | **POST** /IInventoryService/SplitItemStack/v1 | |

# **iInventoryServiceCombineItemStacksV1Post**
> iInventoryServiceCombineItemStacksV1Post()


### Example

```typescript
import {
    IInventoryServiceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IInventoryServiceApi(configuration);

let inputJson: string; //An alternative to the request body; pass arguments as a URL-encoded JSON blob. The \"key\" and \"format\" fields should still be passed as separate parameters (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)
let appid: number; //(Required) (optional) (default to undefined)
let fromitemid: number; //(Required) (optional) (default to undefined)
let destitemid: number; //(Required) (optional) (default to undefined)
let quantity: number; //(Required) (optional) (default to undefined)
let steamid: number; //(Required) (optional) (default to undefined)

const { status, data } = await apiInstance.iInventoryServiceCombineItemStacksV1Post(
    inputJson,
    format,
    appid,
    fromitemid,
    destitemid,
    quantity,
    steamid
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **inputJson** | [**string**] | An alternative to the request body; pass arguments as a URL-encoded JSON blob. The \&quot;key\&quot; and \&quot;format\&quot; fields should still be passed as separate parameters | (optional) defaults to undefined|
| **format** | [**&#39;json&#39; | &#39;xml&#39; | &#39;vdf&#39;**]**Array<&#39;json&#39; &#124; &#39;xml&#39; &#124; &#39;vdf&#39;>** | The format of the response. Defaults to json | (optional) defaults to undefined|
| **appid** | [**number**] | (Required) | (optional) defaults to undefined|
| **fromitemid** | [**number**] | (Required) | (optional) defaults to undefined|
| **destitemid** | [**number**] | (Required) | (optional) defaults to undefined|
| **quantity** | [**number**] | (Required) | (optional) defaults to undefined|
| **steamid** | [**number**] | (Required) | (optional) defaults to undefined|


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

# **iInventoryServiceGetPriceSheetV1Get**
> iInventoryServiceGetPriceSheetV1Get()


### Example

```typescript
import {
    IInventoryServiceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IInventoryServiceApi(configuration);

let ecurrency: number; //(Required) (optional) (default to undefined)
let currencyCode: string; //(Required) Standard short code of the requested currency (preferred) (optional) (default to undefined)
let inputJson: string; //An alternative to the query string parameters; pass arguments as a URL-encoded JSON blob. The \"key\" and \"format\" fields should still be passed as separate parameters (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iInventoryServiceGetPriceSheetV1Get(
    ecurrency,
    currencyCode,
    inputJson,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **ecurrency** | [**number**] | (Required) | (optional) defaults to undefined|
| **currencyCode** | [**string**] | (Required) Standard short code of the requested currency (preferred) | (optional) defaults to undefined|
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

# **iInventoryServiceSplitItemStackV1Post**
> iInventoryServiceSplitItemStackV1Post()


### Example

```typescript
import {
    IInventoryServiceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IInventoryServiceApi(configuration);

let inputJson: string; //An alternative to the request body; pass arguments as a URL-encoded JSON blob. The \"key\" and \"format\" fields should still be passed as separate parameters (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)
let appid: number; //(Required) (optional) (default to undefined)
let itemid: number; //(Required) (optional) (default to undefined)
let quantity: number; //(Required) (optional) (default to undefined)
let steamid: number; //(Required) (optional) (default to undefined)

const { status, data } = await apiInstance.iInventoryServiceSplitItemStackV1Post(
    inputJson,
    format,
    appid,
    itemid,
    quantity,
    steamid
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **inputJson** | [**string**] | An alternative to the request body; pass arguments as a URL-encoded JSON blob. The \&quot;key\&quot; and \&quot;format\&quot; fields should still be passed as separate parameters | (optional) defaults to undefined|
| **format** | [**&#39;json&#39; | &#39;xml&#39; | &#39;vdf&#39;**]**Array<&#39;json&#39; &#124; &#39;xml&#39; &#124; &#39;vdf&#39;>** | The format of the response. Defaults to json | (optional) defaults to undefined|
| **appid** | [**number**] | (Required) | (optional) defaults to undefined|
| **itemid** | [**number**] | (Required) | (optional) defaults to undefined|
| **quantity** | [**number**] | (Required) | (optional) defaults to undefined|
| **steamid** | [**number**] | (Required) | (optional) defaults to undefined|


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

