# IEconServiceApi

All URIs are relative to *https://api.steampowered.com*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**iEconServiceGetTradeHistoryV1Get**](#ieconservicegettradehistoryv1get) | **GET** /IEconService/GetTradeHistory/v1 | |
|[**iEconServiceGetTradeHoldDurationsV1Get**](#ieconservicegettradeholddurationsv1get) | **GET** /IEconService/GetTradeHoldDurations/v1 | |
|[**iEconServiceGetTradeOfferV1Get**](#ieconservicegettradeofferv1get) | **GET** /IEconService/GetTradeOffer/v1 | |
|[**iEconServiceGetTradeOffersSummaryV1Get**](#ieconservicegettradeofferssummaryv1get) | **GET** /IEconService/GetTradeOffersSummary/v1 | |
|[**iEconServiceGetTradeOffersV1Get**](#ieconservicegettradeoffersv1get) | **GET** /IEconService/GetTradeOffers/v1 | |
|[**iEconServiceGetTradeStatusV1Get**](#ieconservicegettradestatusv1get) | **GET** /IEconService/GetTradeStatus/v1 | |

# **iEconServiceGetTradeHistoryV1Get**
> iEconServiceGetTradeHistoryV1Get()


### Example

```typescript
import {
    IEconServiceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IEconServiceApi(configuration);

let maxTrades: number; //(Required) The number of trades to return information for (optional) (default to undefined)
let startAfterTime: number; //(Required) The time of the last trade shown on the previous page of results, or the time of the first trade if navigating back (optional) (default to undefined)
let startAfterTradeid: number; //(Required) The tradeid shown on the previous page of results, or the ID of the first trade if navigating back (optional) (default to undefined)
let navigatingBack: boolean; //(Required) The user wants the previous page of results, so return the previous max_trades trades before the start time and ID (optional) (default to undefined)
let getDescriptions: boolean; //(Required) If set, the item display data for the items included in the returned trades will also be returned (optional) (default to undefined)
let language: string; //(Required) The language to use when loading item display data (optional) (default to undefined)
let includeFailed: boolean; //(Required) (optional) (default to undefined)
let includeTotal: boolean; //(Required) If set, the total number of trades the account has participated in will be included in the response (optional) (default to undefined)
let inputJson: string; //An alternative to the query string parameters; pass arguments as a URL-encoded JSON blob. The \"key\" and \"format\" fields should still be passed as separate parameters (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iEconServiceGetTradeHistoryV1Get(
    maxTrades,
    startAfterTime,
    startAfterTradeid,
    navigatingBack,
    getDescriptions,
    language,
    includeFailed,
    includeTotal,
    inputJson,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **maxTrades** | [**number**] | (Required) The number of trades to return information for | (optional) defaults to undefined|
| **startAfterTime** | [**number**] | (Required) The time of the last trade shown on the previous page of results, or the time of the first trade if navigating back | (optional) defaults to undefined|
| **startAfterTradeid** | [**number**] | (Required) The tradeid shown on the previous page of results, or the ID of the first trade if navigating back | (optional) defaults to undefined|
| **navigatingBack** | [**boolean**] | (Required) The user wants the previous page of results, so return the previous max_trades trades before the start time and ID | (optional) defaults to undefined|
| **getDescriptions** | [**boolean**] | (Required) If set, the item display data for the items included in the returned trades will also be returned | (optional) defaults to undefined|
| **language** | [**string**] | (Required) The language to use when loading item display data | (optional) defaults to undefined|
| **includeFailed** | [**boolean**] | (Required) | (optional) defaults to undefined|
| **includeTotal** | [**boolean**] | (Required) If set, the total number of trades the account has participated in will be included in the response | (optional) defaults to undefined|
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

# **iEconServiceGetTradeHoldDurationsV1Get**
> iEconServiceGetTradeHoldDurationsV1Get()


### Example

```typescript
import {
    IEconServiceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IEconServiceApi(configuration);

let steamidTarget: number; //(Required) User you are trading with (optional) (default to undefined)
let tradeOfferAccessToken: string; //(Required) A special token that allows for trade offers from non-friends. (optional) (default to undefined)
let inputJson: string; //An alternative to the query string parameters; pass arguments as a URL-encoded JSON blob. The \"key\" and \"format\" fields should still be passed as separate parameters (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iEconServiceGetTradeHoldDurationsV1Get(
    steamidTarget,
    tradeOfferAccessToken,
    inputJson,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **steamidTarget** | [**number**] | (Required) User you are trading with | (optional) defaults to undefined|
| **tradeOfferAccessToken** | [**string**] | (Required) A special token that allows for trade offers from non-friends. | (optional) defaults to undefined|
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

# **iEconServiceGetTradeOfferV1Get**
> iEconServiceGetTradeOfferV1Get()


### Example

```typescript
import {
    IEconServiceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IEconServiceApi(configuration);

let tradeofferid: number; //(Required) (optional) (default to undefined)
let language: string; //(Required) (optional) (default to undefined)
let getDescriptions: boolean; //(Required) If set, the item display data for the items included in the returned trade offers will also be returned. If one or more descriptions can\'t be retrieved, then your request will fail. (optional) (default to undefined)
let inputJson: string; //An alternative to the query string parameters; pass arguments as a URL-encoded JSON blob. The \"key\" and \"format\" fields should still be passed as separate parameters (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iEconServiceGetTradeOfferV1Get(
    tradeofferid,
    language,
    getDescriptions,
    inputJson,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **tradeofferid** | [**number**] | (Required) | (optional) defaults to undefined|
| **language** | [**string**] | (Required) | (optional) defaults to undefined|
| **getDescriptions** | [**boolean**] | (Required) If set, the item display data for the items included in the returned trade offers will also be returned. If one or more descriptions can\&#39;t be retrieved, then your request will fail. | (optional) defaults to undefined|
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

# **iEconServiceGetTradeOffersSummaryV1Get**
> iEconServiceGetTradeOffersSummaryV1Get()


### Example

```typescript
import {
    IEconServiceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IEconServiceApi(configuration);

let timeLastVisit: number; //(Required) The time the user last visited.  If not passed, will use the time the user last visited the trade offer page. (optional) (default to undefined)
let inputJson: string; //An alternative to the query string parameters; pass arguments as a URL-encoded JSON blob. The \"key\" and \"format\" fields should still be passed as separate parameters (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iEconServiceGetTradeOffersSummaryV1Get(
    timeLastVisit,
    inputJson,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **timeLastVisit** | [**number**] | (Required) The time the user last visited.  If not passed, will use the time the user last visited the trade offer page. | (optional) defaults to undefined|
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

# **iEconServiceGetTradeOffersV1Get**
> iEconServiceGetTradeOffersV1Get()


### Example

```typescript
import {
    IEconServiceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IEconServiceApi(configuration);

let getSentOffers: boolean; //(Required) Request the list of sent offers. (optional) (default to undefined)
let getReceivedOffers: boolean; //(Required) Request the list of received offers. (optional) (default to undefined)
let getDescriptions: boolean; //(Required) If set, the item display data for the items included in the returned trade offers will also be returned. If one or more descriptions can\'t be retrieved, then your request will fail. (optional) (default to undefined)
let language: string; //(Required) The language to use when loading item display data. (optional) (default to undefined)
let activeOnly: boolean; //(Required) Indicates we should only return offers which are still active, or offers that have changed in state since the time_historical_cutoff (optional) (default to undefined)
let historicalOnly: boolean; //(Required) Indicates we should only return offers which are not active. (optional) (default to undefined)
let timeHistoricalCutoff: number; //(Required) When active_only is set, offers updated since this time will also be returned. When historical_only is set, only offers updated since this time are included. (optional) (default to undefined)
let cursor: number; //Cursor aka start index (optional) (default to undefined)
let inputJson: string; //An alternative to the query string parameters; pass arguments as a URL-encoded JSON blob. The \"key\" and \"format\" fields should still be passed as separate parameters (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iEconServiceGetTradeOffersV1Get(
    getSentOffers,
    getReceivedOffers,
    getDescriptions,
    language,
    activeOnly,
    historicalOnly,
    timeHistoricalCutoff,
    cursor,
    inputJson,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **getSentOffers** | [**boolean**] | (Required) Request the list of sent offers. | (optional) defaults to undefined|
| **getReceivedOffers** | [**boolean**] | (Required) Request the list of received offers. | (optional) defaults to undefined|
| **getDescriptions** | [**boolean**] | (Required) If set, the item display data for the items included in the returned trade offers will also be returned. If one or more descriptions can\&#39;t be retrieved, then your request will fail. | (optional) defaults to undefined|
| **language** | [**string**] | (Required) The language to use when loading item display data. | (optional) defaults to undefined|
| **activeOnly** | [**boolean**] | (Required) Indicates we should only return offers which are still active, or offers that have changed in state since the time_historical_cutoff | (optional) defaults to undefined|
| **historicalOnly** | [**boolean**] | (Required) Indicates we should only return offers which are not active. | (optional) defaults to undefined|
| **timeHistoricalCutoff** | [**number**] | (Required) When active_only is set, offers updated since this time will also be returned. When historical_only is set, only offers updated since this time are included. | (optional) defaults to undefined|
| **cursor** | [**number**] | Cursor aka start index | (optional) defaults to undefined|
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

# **iEconServiceGetTradeStatusV1Get**
> iEconServiceGetTradeStatusV1Get()


### Example

```typescript
import {
    IEconServiceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IEconServiceApi(configuration);

let tradeid: number; //(Required) (optional) (default to undefined)
let getDescriptions: boolean; //(Required) If set, the item display data for the items included in the returned trades will also be returned (optional) (default to undefined)
let language: string; //(Required) The language to use when loading item display data (optional) (default to undefined)
let inputJson: string; //An alternative to the query string parameters; pass arguments as a URL-encoded JSON blob. The \"key\" and \"format\" fields should still be passed as separate parameters (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iEconServiceGetTradeStatusV1Get(
    tradeid,
    getDescriptions,
    language,
    inputJson,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **tradeid** | [**number**] | (Required) | (optional) defaults to undefined|
| **getDescriptions** | [**boolean**] | (Required) If set, the item display data for the items included in the returned trades will also be returned | (optional) defaults to undefined|
| **language** | [**string**] | (Required) The language to use when loading item display data | (optional) defaults to undefined|
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

