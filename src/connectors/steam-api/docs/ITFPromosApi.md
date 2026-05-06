# ITFPromosApi

All URIs are relative to *https://api.steampowered.com*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**iTFPromos440GetItemIDV1Get**](#itfpromos440getitemidv1get) | **GET** /ITFPromos_440/GetItemID/v1 | |
|[**iTFPromos440GrantItemV1Post**](#itfpromos440grantitemv1post) | **POST** /ITFPromos_440/GrantItem/v1 | |
|[**iTFPromos620GetItemIDV1Get**](#itfpromos620getitemidv1get) | **GET** /ITFPromos_620/GetItemID/v1 | |
|[**iTFPromos620GrantItemV1Post**](#itfpromos620grantitemv1post) | **POST** /ITFPromos_620/GrantItem/v1 | |

# **iTFPromos440GetItemIDV1Get**
> iTFPromos440GetItemIDV1Get()


### Example

```typescript
import {
    ITFPromosApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ITFPromosApi(configuration);

let steamid: number; //The Steam ID to fetch items for (default to undefined)
let promoid: number; //The promo ID to grant an item for (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iTFPromos440GetItemIDV1Get(
    steamid,
    promoid,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **steamid** | [**number**] | The Steam ID to fetch items for | defaults to undefined|
| **promoid** | [**number**] | The promo ID to grant an item for | defaults to undefined|
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

# **iTFPromos440GrantItemV1Post**
> iTFPromos440GrantItemV1Post()


### Example

```typescript
import {
    ITFPromosApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ITFPromosApi(configuration);

let steamid: number; //The Steam ID to fetch items for (default to undefined)
let promoid: number; //The promo ID to grant an item for (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iTFPromos440GrantItemV1Post(
    steamid,
    promoid,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **steamid** | [**number**] | The Steam ID to fetch items for | defaults to undefined|
| **promoid** | [**number**] | The promo ID to grant an item for | defaults to undefined|
| **format** | [**&#39;json&#39; | &#39;xml&#39; | &#39;vdf&#39;**]**Array<&#39;json&#39; &#124; &#39;xml&#39; &#124; &#39;vdf&#39;>** | The format of the response. Defaults to json | (optional) defaults to undefined|


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

# **iTFPromos620GetItemIDV1Get**
> iTFPromos620GetItemIDV1Get()


### Example

```typescript
import {
    ITFPromosApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ITFPromosApi(configuration);

let steamid: number; //The Steam ID to fetch items for (default to undefined)
let promoID: number; //The promo ID to grant an item for (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iTFPromos620GetItemIDV1Get(
    steamid,
    promoID,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **steamid** | [**number**] | The Steam ID to fetch items for | defaults to undefined|
| **promoID** | [**number**] | The promo ID to grant an item for | defaults to undefined|
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

# **iTFPromos620GrantItemV1Post**
> iTFPromos620GrantItemV1Post()


### Example

```typescript
import {
    ITFPromosApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ITFPromosApi(configuration);

let steamid: number; //The Steam ID to fetch items for (default to undefined)
let promoID: number; //The promo ID to grant an item for (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iTFPromos620GrantItemV1Post(
    steamid,
    promoID,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **steamid** | [**number**] | The Steam ID to fetch items for | defaults to undefined|
| **promoID** | [**number**] | The promo ID to grant an item for | defaults to undefined|
| **format** | [**&#39;json&#39; | &#39;xml&#39; | &#39;vdf&#39;**]**Array<&#39;json&#39; &#124; &#39;xml&#39; &#124; &#39;vdf&#39;>** | The format of the response. Defaults to json | (optional) defaults to undefined|


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

