# IGameServersServiceApi

All URIs are relative to *https://api.steampowered.com*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**iGameServersServiceCreateAccountV1Post**](#igameserversservicecreateaccountv1post) | **POST** /IGameServersService/CreateAccount/v1 | |
|[**iGameServersServiceDeleteAccountV1Post**](#igameserversservicedeleteaccountv1post) | **POST** /IGameServersService/DeleteAccount/v1 | |
|[**iGameServersServiceGetAccountListV1Get**](#igameserversservicegetaccountlistv1get) | **GET** /IGameServersService/GetAccountList/v1 | |
|[**iGameServersServiceGetAccountPublicInfoV1Get**](#igameserversservicegetaccountpublicinfov1get) | **GET** /IGameServersService/GetAccountPublicInfo/v1 | |
|[**iGameServersServiceGetServerIPsBySteamIDV1Get**](#igameserversservicegetserveripsbysteamidv1get) | **GET** /IGameServersService/GetServerIPsBySteamID/v1 | |
|[**iGameServersServiceGetServerSteamIDsByIPV1Get**](#igameserversservicegetserversteamidsbyipv1get) | **GET** /IGameServersService/GetServerSteamIDsByIP/v1 | |
|[**iGameServersServiceQueryByFakeIPV1Get**](#igameserversservicequerybyfakeipv1get) | **GET** /IGameServersService/QueryByFakeIP/v1 | |
|[**iGameServersServiceQueryLoginTokenV1Get**](#igameserversservicequerylogintokenv1get) | **GET** /IGameServersService/QueryLoginToken/v1 | |
|[**iGameServersServiceResetLoginTokenV1Post**](#igameserversserviceresetlogintokenv1post) | **POST** /IGameServersService/ResetLoginToken/v1 | |
|[**iGameServersServiceSetMemoV1Post**](#igameserversservicesetmemov1post) | **POST** /IGameServersService/SetMemo/v1 | |

# **iGameServersServiceCreateAccountV1Post**
> iGameServersServiceCreateAccountV1Post()


### Example

```typescript
import {
    IGameServersServiceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IGameServersServiceApi(configuration);

let inputJson: string; //An alternative to the request body; pass arguments as a URL-encoded JSON blob. The \"key\" and \"format\" fields should still be passed as separate parameters (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)
let appid: number; //(Required) The app to use the account for (optional) (default to undefined)
let memo: string; //(Required) The memo to set on the new account (optional) (default to undefined)

const { status, data } = await apiInstance.iGameServersServiceCreateAccountV1Post(
    inputJson,
    format,
    appid,
    memo
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **inputJson** | [**string**] | An alternative to the request body; pass arguments as a URL-encoded JSON blob. The \&quot;key\&quot; and \&quot;format\&quot; fields should still be passed as separate parameters | (optional) defaults to undefined|
| **format** | [**&#39;json&#39; | &#39;xml&#39; | &#39;vdf&#39;**]**Array<&#39;json&#39; &#124; &#39;xml&#39; &#124; &#39;vdf&#39;>** | The format of the response. Defaults to json | (optional) defaults to undefined|
| **appid** | [**number**] | (Required) The app to use the account for | (optional) defaults to undefined|
| **memo** | [**string**] | (Required) The memo to set on the new account | (optional) defaults to undefined|


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

# **iGameServersServiceDeleteAccountV1Post**
> iGameServersServiceDeleteAccountV1Post()


### Example

```typescript
import {
    IGameServersServiceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IGameServersServiceApi(configuration);

let inputJson: string; //An alternative to the request body; pass arguments as a URL-encoded JSON blob. The \"key\" and \"format\" fields should still be passed as separate parameters (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)
let steamid: number; //(Required) The SteamID of the game server account to delete (optional) (default to undefined)

const { status, data } = await apiInstance.iGameServersServiceDeleteAccountV1Post(
    inputJson,
    format,
    steamid
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **inputJson** | [**string**] | An alternative to the request body; pass arguments as a URL-encoded JSON blob. The \&quot;key\&quot; and \&quot;format\&quot; fields should still be passed as separate parameters | (optional) defaults to undefined|
| **format** | [**&#39;json&#39; | &#39;xml&#39; | &#39;vdf&#39;**]**Array<&#39;json&#39; &#124; &#39;xml&#39; &#124; &#39;vdf&#39;>** | The format of the response. Defaults to json | (optional) defaults to undefined|
| **steamid** | [**number**] | (Required) The SteamID of the game server account to delete | (optional) defaults to undefined|


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

# **iGameServersServiceGetAccountListV1Get**
> iGameServersServiceGetAccountListV1Get()


### Example

```typescript
import {
    IGameServersServiceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IGameServersServiceApi(configuration);

let inputJson: string; //An alternative to the query string parameters; pass arguments as a URL-encoded JSON blob. The \"key\" and \"format\" fields should still be passed as separate parameters (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iGameServersServiceGetAccountListV1Get(
    inputJson,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
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

# **iGameServersServiceGetAccountPublicInfoV1Get**
> iGameServersServiceGetAccountPublicInfoV1Get()


### Example

```typescript
import {
    IGameServersServiceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IGameServersServiceApi(configuration);

let steamid: number; //(Required) The SteamID of the game server to get info on (optional) (default to undefined)
let inputJson: string; //An alternative to the query string parameters; pass arguments as a URL-encoded JSON blob. The \"key\" and \"format\" fields should still be passed as separate parameters (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iGameServersServiceGetAccountPublicInfoV1Get(
    steamid,
    inputJson,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **steamid** | [**number**] | (Required) The SteamID of the game server to get info on | (optional) defaults to undefined|
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

# **iGameServersServiceGetServerIPsBySteamIDV1Get**
> iGameServersServiceGetServerIPsBySteamIDV1Get()


### Example

```typescript
import {
    IGameServersServiceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IGameServersServiceApi(configuration);

let serverSteamids: number; //(Required) (optional) (default to undefined)
let inputJson: string; //An alternative to the query string parameters; pass arguments as a URL-encoded JSON blob. The \"key\" and \"format\" fields should still be passed as separate parameters (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iGameServersServiceGetServerIPsBySteamIDV1Get(
    serverSteamids,
    inputJson,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **serverSteamids** | [**number**] | (Required) | (optional) defaults to undefined|
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

# **iGameServersServiceGetServerSteamIDsByIPV1Get**
> iGameServersServiceGetServerSteamIDsByIPV1Get()


### Example

```typescript
import {
    IGameServersServiceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IGameServersServiceApi(configuration);

let serverIps: string; //(Required) (optional) (default to undefined)
let inputJson: string; //An alternative to the query string parameters; pass arguments as a URL-encoded JSON blob. The \"key\" and \"format\" fields should still be passed as separate parameters (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iGameServersServiceGetServerSteamIDsByIPV1Get(
    serverIps,
    inputJson,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **serverIps** | [**string**] | (Required) | (optional) defaults to undefined|
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

# **iGameServersServiceQueryByFakeIPV1Get**
> iGameServersServiceQueryByFakeIPV1Get()


### Example

```typescript
import {
    IGameServersServiceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IGameServersServiceApi(configuration);

let fakeIp: number; //(Required) FakeIP of server to query. (optional) (default to undefined)
let fakePort: number; //(Required) Fake port of server to query. (optional) (default to undefined)
let appId: number; //(Required) AppID to use.  Each AppID has its own FakeIP address. (optional) (default to undefined)
let queryType: string; //(Required) What type of query? (optional) (default to undefined)
let inputJson: string; //An alternative to the query string parameters; pass arguments as a URL-encoded JSON blob. The \"key\" and \"format\" fields should still be passed as separate parameters (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iGameServersServiceQueryByFakeIPV1Get(
    fakeIp,
    fakePort,
    appId,
    queryType,
    inputJson,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **fakeIp** | [**number**] | (Required) FakeIP of server to query. | (optional) defaults to undefined|
| **fakePort** | [**number**] | (Required) Fake port of server to query. | (optional) defaults to undefined|
| **appId** | [**number**] | (Required) AppID to use.  Each AppID has its own FakeIP address. | (optional) defaults to undefined|
| **queryType** | [**string**] | (Required) What type of query? | (optional) defaults to undefined|
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

# **iGameServersServiceQueryLoginTokenV1Get**
> iGameServersServiceQueryLoginTokenV1Get()


### Example

```typescript
import {
    IGameServersServiceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IGameServersServiceApi(configuration);

let loginToken: string; //(Required) Login token to query (optional) (default to undefined)
let inputJson: string; //An alternative to the query string parameters; pass arguments as a URL-encoded JSON blob. The \"key\" and \"format\" fields should still be passed as separate parameters (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iGameServersServiceQueryLoginTokenV1Get(
    loginToken,
    inputJson,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **loginToken** | [**string**] | (Required) Login token to query | (optional) defaults to undefined|
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

# **iGameServersServiceResetLoginTokenV1Post**
> iGameServersServiceResetLoginTokenV1Post()


### Example

```typescript
import {
    IGameServersServiceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IGameServersServiceApi(configuration);

let inputJson: string; //An alternative to the request body; pass arguments as a URL-encoded JSON blob. The \"key\" and \"format\" fields should still be passed as separate parameters (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)
let steamid: number; //(Required) The SteamID of the game server to reset the login token of (optional) (default to undefined)

const { status, data } = await apiInstance.iGameServersServiceResetLoginTokenV1Post(
    inputJson,
    format,
    steamid
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **inputJson** | [**string**] | An alternative to the request body; pass arguments as a URL-encoded JSON blob. The \&quot;key\&quot; and \&quot;format\&quot; fields should still be passed as separate parameters | (optional) defaults to undefined|
| **format** | [**&#39;json&#39; | &#39;xml&#39; | &#39;vdf&#39;**]**Array<&#39;json&#39; &#124; &#39;xml&#39; &#124; &#39;vdf&#39;>** | The format of the response. Defaults to json | (optional) defaults to undefined|
| **steamid** | [**number**] | (Required) The SteamID of the game server to reset the login token of | (optional) defaults to undefined|


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

# **iGameServersServiceSetMemoV1Post**
> iGameServersServiceSetMemoV1Post()


### Example

```typescript
import {
    IGameServersServiceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IGameServersServiceApi(configuration);

let inputJson: string; //An alternative to the request body; pass arguments as a URL-encoded JSON blob. The \"key\" and \"format\" fields should still be passed as separate parameters (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)
let steamid: number; //(Required) The SteamID of the game server to set the memo on (optional) (default to undefined)
let memo: string; //(Required) The memo to set on the new account (optional) (default to undefined)

const { status, data } = await apiInstance.iGameServersServiceSetMemoV1Post(
    inputJson,
    format,
    steamid,
    memo
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **inputJson** | [**string**] | An alternative to the request body; pass arguments as a URL-encoded JSON blob. The \&quot;key\&quot; and \&quot;format\&quot; fields should still be passed as separate parameters | (optional) defaults to undefined|
| **format** | [**&#39;json&#39; | &#39;xml&#39; | &#39;vdf&#39;**]**Array<&#39;json&#39; &#124; &#39;xml&#39; &#124; &#39;vdf&#39;>** | The format of the response. Defaults to json | (optional) defaults to undefined|
| **steamid** | [**number**] | (Required) The SteamID of the game server to set the memo on | (optional) defaults to undefined|
| **memo** | [**string**] | (Required) The memo to set on the new account | (optional) defaults to undefined|


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

