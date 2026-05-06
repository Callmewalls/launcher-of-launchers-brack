# IEconItemsApi

All URIs are relative to *https://api.steampowered.com*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**iEconItems1046930GetPlayerItemsV1Get**](#ieconitems1046930getplayeritemsv1get) | **GET** /IEconItems_1046930/GetPlayerItems/v1 | |
|[**iEconItems1269260GetEquippedPlayerItemsV1Get**](#ieconitems1269260getequippedplayeritemsv1get) | **GET** /IEconItems_1269260/GetEquippedPlayerItems/v1 | |
|[**iEconItems238460GetPlayerItemsV1Get**](#ieconitems238460getplayeritemsv1get) | **GET** /IEconItems_238460/GetPlayerItems/v1 | |
|[**iEconItems440GetPlayerItemsV1Get**](#ieconitems440getplayeritemsv1get) | **GET** /IEconItems_440/GetPlayerItems/v1 | |
|[**iEconItems440GetSchemaItemsV1Get**](#ieconitems440getschemaitemsv1get) | **GET** /IEconItems_440/GetSchemaItems/v1 | |
|[**iEconItems440GetSchemaOverviewV1Get**](#ieconitems440getschemaoverviewv1get) | **GET** /IEconItems_440/GetSchemaOverview/v1 | |
|[**iEconItems440GetSchemaURLV1Get**](#ieconitems440getschemaurlv1get) | **GET** /IEconItems_440/GetSchemaURL/v1 | |
|[**iEconItems440GetSchemaV1Get**](#ieconitems440getschemav1get) | **GET** /IEconItems_440/GetSchema/v1 | |
|[**iEconItems440GetStoreMetaDataV1Get**](#ieconitems440getstoremetadatav1get) | **GET** /IEconItems_440/GetStoreMetaData/v1 | |
|[**iEconItems440GetStoreStatusV1Get**](#ieconitems440getstorestatusv1get) | **GET** /IEconItems_440/GetStoreStatus/v1 | |
|[**iEconItems570GetPlayerItemsV1Get**](#ieconitems570getplayeritemsv1get) | **GET** /IEconItems_570/GetPlayerItems/v1 | |
|[**iEconItems570GetStoreMetaDataV1Get**](#ieconitems570getstoremetadatav1get) | **GET** /IEconItems_570/GetStoreMetaData/v1 | |
|[**iEconItems583950GetEquippedPlayerItemsV1Get**](#ieconitems583950getequippedplayeritemsv1get) | **GET** /IEconItems_583950/GetEquippedPlayerItems/v1 | |
|[**iEconItems620GetPlayerItemsV1Get**](#ieconitems620getplayeritemsv1get) | **GET** /IEconItems_620/GetPlayerItems/v1 | |
|[**iEconItems620GetSchemaV1Get**](#ieconitems620getschemav1get) | **GET** /IEconItems_620/GetSchema/v1 | |
|[**iEconItems730GetPlayerItemsV1Get**](#ieconitems730getplayeritemsv1get) | **GET** /IEconItems_730/GetPlayerItems/v1 | |
|[**iEconItems730GetSchemaURLV2Get**](#ieconitems730getschemaurlv2get) | **GET** /IEconItems_730/GetSchemaURL/v2 | |
|[**iEconItems730GetSchemaV2Get**](#ieconitems730getschemav2get) | **GET** /IEconItems_730/GetSchema/v2 | |
|[**iEconItems730GetStoreMetaDataV1Get**](#ieconitems730getstoremetadatav1get) | **GET** /IEconItems_730/GetStoreMetaData/v1 | |

# **iEconItems1046930GetPlayerItemsV1Get**
> iEconItems1046930GetPlayerItemsV1Get()


### Example

```typescript
import {
    IEconItemsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IEconItemsApi(configuration);

let steamid: number; //The Steam ID to fetch items for (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iEconItems1046930GetPlayerItemsV1Get(
    steamid,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **steamid** | [**number**] | The Steam ID to fetch items for | defaults to undefined|
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

# **iEconItems1269260GetEquippedPlayerItemsV1Get**
> iEconItems1269260GetEquippedPlayerItemsV1Get()


### Example

```typescript
import {
    IEconItemsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IEconItemsApi(configuration);

let steamid: number; //The Steam ID to fetch items for (default to undefined)
let classId: number; //Return items equipped for this class id (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iEconItems1269260GetEquippedPlayerItemsV1Get(
    steamid,
    classId,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **steamid** | [**number**] | The Steam ID to fetch items for | defaults to undefined|
| **classId** | [**number**] | Return items equipped for this class id | defaults to undefined|
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

# **iEconItems238460GetPlayerItemsV1Get**
> iEconItems238460GetPlayerItemsV1Get()


### Example

```typescript
import {
    IEconItemsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IEconItemsApi(configuration);

let steamid: number; //The Steam ID to fetch items for (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iEconItems238460GetPlayerItemsV1Get(
    steamid,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **steamid** | [**number**] | The Steam ID to fetch items for | defaults to undefined|
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

# **iEconItems440GetPlayerItemsV1Get**
> iEconItems440GetPlayerItemsV1Get()


### Example

```typescript
import {
    IEconItemsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IEconItemsApi(configuration);

let steamid: number; //The Steam ID to fetch items for (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iEconItems440GetPlayerItemsV1Get(
    steamid,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **steamid** | [**number**] | The Steam ID to fetch items for | defaults to undefined|
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

# **iEconItems440GetSchemaItemsV1Get**
> iEconItems440GetSchemaItemsV1Get()


### Example

```typescript
import {
    IEconItemsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IEconItemsApi(configuration);

let language: string; //The language to return the names in. Defaults to returning string keys. (optional) (default to undefined)
let start: number; //The first item id to return. Defaults to 0. Response will indicate next value to query if applicable. (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iEconItems440GetSchemaItemsV1Get(
    language,
    start,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **language** | [**string**] | The language to return the names in. Defaults to returning string keys. | (optional) defaults to undefined|
| **start** | [**number**] | The first item id to return. Defaults to 0. Response will indicate next value to query if applicable. | (optional) defaults to undefined|
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

# **iEconItems440GetSchemaOverviewV1Get**
> iEconItems440GetSchemaOverviewV1Get()


### Example

```typescript
import {
    IEconItemsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IEconItemsApi(configuration);

let language: string; //The language to return the names in. Defaults to returning string keys. (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iEconItems440GetSchemaOverviewV1Get(
    language,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **language** | [**string**] | The language to return the names in. Defaults to returning string keys. | (optional) defaults to undefined|
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

# **iEconItems440GetSchemaURLV1Get**
> iEconItems440GetSchemaURLV1Get()


### Example

```typescript
import {
    IEconItemsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IEconItemsApi(configuration);

let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iEconItems440GetSchemaURLV1Get(
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
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

# **iEconItems440GetSchemaV1Get**
> iEconItems440GetSchemaV1Get()


### Example

```typescript
import {
    IEconItemsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IEconItemsApi(configuration);

let language: string; //The language to return the names in. Defaults to returning string keys. (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iEconItems440GetSchemaV1Get(
    language,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **language** | [**string**] | The language to return the names in. Defaults to returning string keys. | (optional) defaults to undefined|
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

# **iEconItems440GetStoreMetaDataV1Get**
> iEconItems440GetStoreMetaDataV1Get()


### Example

```typescript
import {
    IEconItemsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IEconItemsApi(configuration);

let language: string; //The language to results in. (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iEconItems440GetStoreMetaDataV1Get(
    language,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **language** | [**string**] | The language to results in. | (optional) defaults to undefined|
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

# **iEconItems440GetStoreStatusV1Get**
> iEconItems440GetStoreStatusV1Get()


### Example

```typescript
import {
    IEconItemsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IEconItemsApi(configuration);

let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iEconItems440GetStoreStatusV1Get(
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
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

# **iEconItems570GetPlayerItemsV1Get**
> iEconItems570GetPlayerItemsV1Get()


### Example

```typescript
import {
    IEconItemsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IEconItemsApi(configuration);

let steamid: number; //The Steam ID to fetch items for (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iEconItems570GetPlayerItemsV1Get(
    steamid,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **steamid** | [**number**] | The Steam ID to fetch items for | defaults to undefined|
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

# **iEconItems570GetStoreMetaDataV1Get**
> iEconItems570GetStoreMetaDataV1Get()


### Example

```typescript
import {
    IEconItemsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IEconItemsApi(configuration);

let language: string; //The language to results in. (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iEconItems570GetStoreMetaDataV1Get(
    language,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **language** | [**string**] | The language to results in. | (optional) defaults to undefined|
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

# **iEconItems583950GetEquippedPlayerItemsV1Get**
> iEconItems583950GetEquippedPlayerItemsV1Get()


### Example

```typescript
import {
    IEconItemsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IEconItemsApi(configuration);

let steamid: number; //The Steam ID to fetch items for (default to undefined)
let classId: number; //Return items equipped for this class id (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iEconItems583950GetEquippedPlayerItemsV1Get(
    steamid,
    classId,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **steamid** | [**number**] | The Steam ID to fetch items for | defaults to undefined|
| **classId** | [**number**] | Return items equipped for this class id | defaults to undefined|
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

# **iEconItems620GetPlayerItemsV1Get**
> iEconItems620GetPlayerItemsV1Get()


### Example

```typescript
import {
    IEconItemsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IEconItemsApi(configuration);

let steamid: number; //The Steam ID to fetch items for (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iEconItems620GetPlayerItemsV1Get(
    steamid,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **steamid** | [**number**] | The Steam ID to fetch items for | defaults to undefined|
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

# **iEconItems620GetSchemaV1Get**
> iEconItems620GetSchemaV1Get()


### Example

```typescript
import {
    IEconItemsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IEconItemsApi(configuration);

let language: string; //The language to return the names in. Defaults to returning string keys. (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iEconItems620GetSchemaV1Get(
    language,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **language** | [**string**] | The language to return the names in. Defaults to returning string keys. | (optional) defaults to undefined|
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

# **iEconItems730GetPlayerItemsV1Get**
> iEconItems730GetPlayerItemsV1Get()


### Example

```typescript
import {
    IEconItemsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IEconItemsApi(configuration);

let steamid: number; //The Steam ID to fetch items for (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iEconItems730GetPlayerItemsV1Get(
    steamid,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **steamid** | [**number**] | The Steam ID to fetch items for | defaults to undefined|
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

# **iEconItems730GetSchemaURLV2Get**
> iEconItems730GetSchemaURLV2Get()


### Example

```typescript
import {
    IEconItemsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IEconItemsApi(configuration);

let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iEconItems730GetSchemaURLV2Get(
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
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

# **iEconItems730GetSchemaV2Get**
> iEconItems730GetSchemaV2Get()


### Example

```typescript
import {
    IEconItemsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IEconItemsApi(configuration);

let language: string; //The language to return the names in. Defaults to returning string keys. (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iEconItems730GetSchemaV2Get(
    language,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **language** | [**string**] | The language to return the names in. Defaults to returning string keys. | (optional) defaults to undefined|
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

# **iEconItems730GetStoreMetaDataV1Get**
> iEconItems730GetStoreMetaDataV1Get()


### Example

```typescript
import {
    IEconItemsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IEconItemsApi(configuration);

let language: string; //The language to results in. (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iEconItems730GetStoreMetaDataV1Get(
    language,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **language** | [**string**] | The language to results in. | (optional) defaults to undefined|
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

