# IAuthenticationServiceApi

All URIs are relative to *https://api.steampowered.com*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**iAuthenticationServiceBeginAuthSessionViaCredentialsV1Post**](#iauthenticationservicebeginauthsessionviacredentialsv1post) | **POST** /IAuthenticationService/BeginAuthSessionViaCredentials/v1 | |
|[**iAuthenticationServiceBeginAuthSessionViaQRV1Post**](#iauthenticationservicebeginauthsessionviaqrv1post) | **POST** /IAuthenticationService/BeginAuthSessionViaQR/v1 | |
|[**iAuthenticationServiceGetAuthSessionInfoV1Post**](#iauthenticationservicegetauthsessioninfov1post) | **POST** /IAuthenticationService/GetAuthSessionInfo/v1 | |
|[**iAuthenticationServiceGetAuthSessionRiskInfoV1Post**](#iauthenticationservicegetauthsessionriskinfov1post) | **POST** /IAuthenticationService/GetAuthSessionRiskInfo/v1 | |
|[**iAuthenticationServiceGetPasswordRSAPublicKeyV1Get**](#iauthenticationservicegetpasswordrsapublickeyv1get) | **GET** /IAuthenticationService/GetPasswordRSAPublicKey/v1 | |
|[**iAuthenticationServiceNotifyRiskQuizResultsV1Post**](#iauthenticationservicenotifyriskquizresultsv1post) | **POST** /IAuthenticationService/NotifyRiskQuizResults/v1 | |
|[**iAuthenticationServicePollAuthSessionStatusV1Post**](#iauthenticationservicepollauthsessionstatusv1post) | **POST** /IAuthenticationService/PollAuthSessionStatus/v1 | |
|[**iAuthenticationServiceUpdateAuthSessionWithMobileConfirmationV1Post**](#iauthenticationserviceupdateauthsessionwithmobileconfirmationv1post) | **POST** /IAuthenticationService/UpdateAuthSessionWithMobileConfirmation/v1 | |
|[**iAuthenticationServiceUpdateAuthSessionWithSteamGuardCodeV1Post**](#iauthenticationserviceupdateauthsessionwithsteamguardcodev1post) | **POST** /IAuthenticationService/UpdateAuthSessionWithSteamGuardCode/v1 | |

# **iAuthenticationServiceBeginAuthSessionViaCredentialsV1Post**
> iAuthenticationServiceBeginAuthSessionViaCredentialsV1Post()


### Example

```typescript
import {
    IAuthenticationServiceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IAuthenticationServiceApi(configuration);

let inputJson: string; //An alternative to the request body; pass arguments as a URL-encoded JSON blob. The \"key\" and \"format\" fields should still be passed as separate parameters (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)
let deviceFriendlyName: string; //(Required) (optional) (default to undefined)
let accountName: string; //(Required) (optional) (default to undefined)
let encryptedPassword: string; //(Required) password, RSA encrypted client side (optional) (default to undefined)
let encryptionTimestamp: number; //(Required) timestamp to map to a key - STime (optional) (default to undefined)
let rememberLogin: boolean; //(Required) deprecated (optional) (default to undefined)
let platformType: string; //(Required) (optional) (default to undefined)
let persistence: string; //whether we are requesting a persistent or an ephemeral session (optional) (default to undefined)
let websiteId: string; //(EMachineAuthWebDomain) identifier of client requesting auth (optional) (default to undefined)
let deviceDetails: string; //(Required) User-supplied details about the device attempting to sign in (optional) (default to undefined)
let guardData: string; //(Required) steam guard data for client login (optional) (default to undefined)
let language: number; //(Required) (optional) (default to undefined)
let qosLevel: number; //[ENetQOSLevel] client-specified priority for this auth attempt (optional) (default to undefined)

const { status, data } = await apiInstance.iAuthenticationServiceBeginAuthSessionViaCredentialsV1Post(
    inputJson,
    format,
    deviceFriendlyName,
    accountName,
    encryptedPassword,
    encryptionTimestamp,
    rememberLogin,
    platformType,
    persistence,
    websiteId,
    deviceDetails,
    guardData,
    language,
    qosLevel
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **inputJson** | [**string**] | An alternative to the request body; pass arguments as a URL-encoded JSON blob. The \&quot;key\&quot; and \&quot;format\&quot; fields should still be passed as separate parameters | (optional) defaults to undefined|
| **format** | [**&#39;json&#39; | &#39;xml&#39; | &#39;vdf&#39;**]**Array<&#39;json&#39; &#124; &#39;xml&#39; &#124; &#39;vdf&#39;>** | The format of the response. Defaults to json | (optional) defaults to undefined|
| **deviceFriendlyName** | [**string**] | (Required) | (optional) defaults to undefined|
| **accountName** | [**string**] | (Required) | (optional) defaults to undefined|
| **encryptedPassword** | [**string**] | (Required) password, RSA encrypted client side | (optional) defaults to undefined|
| **encryptionTimestamp** | [**number**] | (Required) timestamp to map to a key - STime | (optional) defaults to undefined|
| **rememberLogin** | [**boolean**] | (Required) deprecated | (optional) defaults to undefined|
| **platformType** | [**string**] | (Required) | (optional) defaults to undefined|
| **persistence** | [**string**] | whether we are requesting a persistent or an ephemeral session | (optional) defaults to undefined|
| **websiteId** | [**string**] | (EMachineAuthWebDomain) identifier of client requesting auth | (optional) defaults to undefined|
| **deviceDetails** | [**string**] | (Required) User-supplied details about the device attempting to sign in | (optional) defaults to undefined|
| **guardData** | [**string**] | (Required) steam guard data for client login | (optional) defaults to undefined|
| **language** | [**number**] | (Required) | (optional) defaults to undefined|
| **qosLevel** | [**number**] | [ENetQOSLevel] client-specified priority for this auth attempt | (optional) defaults to undefined|


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

# **iAuthenticationServiceBeginAuthSessionViaQRV1Post**
> iAuthenticationServiceBeginAuthSessionViaQRV1Post()


### Example

```typescript
import {
    IAuthenticationServiceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IAuthenticationServiceApi(configuration);

let inputJson: string; //An alternative to the request body; pass arguments as a URL-encoded JSON blob. The \"key\" and \"format\" fields should still be passed as separate parameters (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)
let deviceFriendlyName: string; //(Required) (optional) (default to undefined)
let platformType: string; //(Required) (optional) (default to undefined)
let deviceDetails: string; //(Required) User-supplied details about the device attempting to sign in (optional) (default to undefined)
let websiteId: string; //(EMachineAuthWebDomain) identifier of client requesting auth (optional) (default to undefined)

const { status, data } = await apiInstance.iAuthenticationServiceBeginAuthSessionViaQRV1Post(
    inputJson,
    format,
    deviceFriendlyName,
    platformType,
    deviceDetails,
    websiteId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **inputJson** | [**string**] | An alternative to the request body; pass arguments as a URL-encoded JSON blob. The \&quot;key\&quot; and \&quot;format\&quot; fields should still be passed as separate parameters | (optional) defaults to undefined|
| **format** | [**&#39;json&#39; | &#39;xml&#39; | &#39;vdf&#39;**]**Array<&#39;json&#39; &#124; &#39;xml&#39; &#124; &#39;vdf&#39;>** | The format of the response. Defaults to json | (optional) defaults to undefined|
| **deviceFriendlyName** | [**string**] | (Required) | (optional) defaults to undefined|
| **platformType** | [**string**] | (Required) | (optional) defaults to undefined|
| **deviceDetails** | [**string**] | (Required) User-supplied details about the device attempting to sign in | (optional) defaults to undefined|
| **websiteId** | [**string**] | (EMachineAuthWebDomain) identifier of client requesting auth | (optional) defaults to undefined|


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

# **iAuthenticationServiceGetAuthSessionInfoV1Post**
> iAuthenticationServiceGetAuthSessionInfoV1Post()


### Example

```typescript
import {
    IAuthenticationServiceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IAuthenticationServiceApi(configuration);

let inputJson: string; //An alternative to the request body; pass arguments as a URL-encoded JSON blob. The \"key\" and \"format\" fields should still be passed as separate parameters (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)
let clientId: number; //(Required) client ID from scanned QR Code, used for routing (optional) (default to undefined)

const { status, data } = await apiInstance.iAuthenticationServiceGetAuthSessionInfoV1Post(
    inputJson,
    format,
    clientId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **inputJson** | [**string**] | An alternative to the request body; pass arguments as a URL-encoded JSON blob. The \&quot;key\&quot; and \&quot;format\&quot; fields should still be passed as separate parameters | (optional) defaults to undefined|
| **format** | [**&#39;json&#39; | &#39;xml&#39; | &#39;vdf&#39;**]**Array<&#39;json&#39; &#124; &#39;xml&#39; &#124; &#39;vdf&#39;>** | The format of the response. Defaults to json | (optional) defaults to undefined|
| **clientId** | [**number**] | (Required) client ID from scanned QR Code, used for routing | (optional) defaults to undefined|


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

# **iAuthenticationServiceGetAuthSessionRiskInfoV1Post**
> iAuthenticationServiceGetAuthSessionRiskInfoV1Post()


### Example

```typescript
import {
    IAuthenticationServiceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IAuthenticationServiceApi(configuration);

let inputJson: string; //An alternative to the request body; pass arguments as a URL-encoded JSON blob. The \"key\" and \"format\" fields should still be passed as separate parameters (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)
let clientId: number; //(Required) client ID from scanned QR Code, used for routing (optional) (default to undefined)
let language: number; //(Required) language for optimistic localization of geoloc data (optional) (default to undefined)

const { status, data } = await apiInstance.iAuthenticationServiceGetAuthSessionRiskInfoV1Post(
    inputJson,
    format,
    clientId,
    language
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **inputJson** | [**string**] | An alternative to the request body; pass arguments as a URL-encoded JSON blob. The \&quot;key\&quot; and \&quot;format\&quot; fields should still be passed as separate parameters | (optional) defaults to undefined|
| **format** | [**&#39;json&#39; | &#39;xml&#39; | &#39;vdf&#39;**]**Array<&#39;json&#39; &#124; &#39;xml&#39; &#124; &#39;vdf&#39;>** | The format of the response. Defaults to json | (optional) defaults to undefined|
| **clientId** | [**number**] | (Required) client ID from scanned QR Code, used for routing | (optional) defaults to undefined|
| **language** | [**number**] | (Required) language for optimistic localization of geoloc data | (optional) defaults to undefined|


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

# **iAuthenticationServiceGetPasswordRSAPublicKeyV1Get**
> iAuthenticationServiceGetPasswordRSAPublicKeyV1Get()


### Example

```typescript
import {
    IAuthenticationServiceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IAuthenticationServiceApi(configuration);

let accountName: string; //(Required) user-provided account name to get an RSA key for (optional) (default to undefined)
let inputJson: string; //An alternative to the query string parameters; pass arguments as a URL-encoded JSON blob. The \"key\" and \"format\" fields should still be passed as separate parameters (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iAuthenticationServiceGetPasswordRSAPublicKeyV1Get(
    accountName,
    inputJson,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **accountName** | [**string**] | (Required) user-provided account name to get an RSA key for | (optional) defaults to undefined|
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

# **iAuthenticationServiceNotifyRiskQuizResultsV1Post**
> iAuthenticationServiceNotifyRiskQuizResultsV1Post()


### Example

```typescript
import {
    IAuthenticationServiceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IAuthenticationServiceApi(configuration);

let inputJson: string; //An alternative to the request body; pass arguments as a URL-encoded JSON blob. The \"key\" and \"format\" fields should still be passed as separate parameters (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)
let clientId: number; //(Required) client ID for the auth session, used for routing (optional) (default to undefined)
let results: string; //(Required) Whether or not the user correctly answered each risk quiz question (optional) (default to undefined)
let selectedAction: string; //(Required) The action being taken selected by the user during the quiz (optional) (default to undefined)
let didConfirmLogin: boolean; //(Required) Whether or not the user went on to confirm the login or not in the case of a passed quiz (optional) (default to undefined)

const { status, data } = await apiInstance.iAuthenticationServiceNotifyRiskQuizResultsV1Post(
    inputJson,
    format,
    clientId,
    results,
    selectedAction,
    didConfirmLogin
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **inputJson** | [**string**] | An alternative to the request body; pass arguments as a URL-encoded JSON blob. The \&quot;key\&quot; and \&quot;format\&quot; fields should still be passed as separate parameters | (optional) defaults to undefined|
| **format** | [**&#39;json&#39; | &#39;xml&#39; | &#39;vdf&#39;**]**Array<&#39;json&#39; &#124; &#39;xml&#39; &#124; &#39;vdf&#39;>** | The format of the response. Defaults to json | (optional) defaults to undefined|
| **clientId** | [**number**] | (Required) client ID for the auth session, used for routing | (optional) defaults to undefined|
| **results** | [**string**] | (Required) Whether or not the user correctly answered each risk quiz question | (optional) defaults to undefined|
| **selectedAction** | [**string**] | (Required) The action being taken selected by the user during the quiz | (optional) defaults to undefined|
| **didConfirmLogin** | [**boolean**] | (Required) Whether or not the user went on to confirm the login or not in the case of a passed quiz | (optional) defaults to undefined|


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

# **iAuthenticationServicePollAuthSessionStatusV1Post**
> iAuthenticationServicePollAuthSessionStatusV1Post()


### Example

```typescript
import {
    IAuthenticationServiceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IAuthenticationServiceApi(configuration);

let inputJson: string; //An alternative to the request body; pass arguments as a URL-encoded JSON blob. The \"key\" and \"format\" fields should still be passed as separate parameters (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)
let clientId: number; //(Required) (optional) (default to undefined)
let requestId: string; //(Required) (optional) (default to undefined)
let tokenToRevoke: number; //(Required) If this is set to a token owned by this user, that token will be retired (optional) (default to undefined)

const { status, data } = await apiInstance.iAuthenticationServicePollAuthSessionStatusV1Post(
    inputJson,
    format,
    clientId,
    requestId,
    tokenToRevoke
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **inputJson** | [**string**] | An alternative to the request body; pass arguments as a URL-encoded JSON blob. The \&quot;key\&quot; and \&quot;format\&quot; fields should still be passed as separate parameters | (optional) defaults to undefined|
| **format** | [**&#39;json&#39; | &#39;xml&#39; | &#39;vdf&#39;**]**Array<&#39;json&#39; &#124; &#39;xml&#39; &#124; &#39;vdf&#39;>** | The format of the response. Defaults to json | (optional) defaults to undefined|
| **clientId** | [**number**] | (Required) | (optional) defaults to undefined|
| **requestId** | [**string**] | (Required) | (optional) defaults to undefined|
| **tokenToRevoke** | [**number**] | (Required) If this is set to a token owned by this user, that token will be retired | (optional) defaults to undefined|


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

# **iAuthenticationServiceUpdateAuthSessionWithMobileConfirmationV1Post**
> iAuthenticationServiceUpdateAuthSessionWithMobileConfirmationV1Post()


### Example

```typescript
import {
    IAuthenticationServiceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IAuthenticationServiceApi(configuration);

let inputJson: string; //An alternative to the request body; pass arguments as a URL-encoded JSON blob. The \"key\" and \"format\" fields should still be passed as separate parameters (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)
let version: number; //(Required) version field (optional) (default to undefined)
let clientId: number; //(Required) pending client ID, from scanned QR Code (optional) (default to undefined)
let steamid: number; //(Required) user who wants to login (optional) (default to undefined)
let signature: string; //(Required) HMAC digest over {version,client_id,steamid} via user\\\'s private key (optional) (default to undefined)
let confirm: boolean; //Whether to confirm the login (true) or deny the login (false) (optional) (default to undefined)
let persistence: string; //whether we are requesting a persistent or an ephemeral session (optional) (default to undefined)

const { status, data } = await apiInstance.iAuthenticationServiceUpdateAuthSessionWithMobileConfirmationV1Post(
    inputJson,
    format,
    version,
    clientId,
    steamid,
    signature,
    confirm,
    persistence
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **inputJson** | [**string**] | An alternative to the request body; pass arguments as a URL-encoded JSON blob. The \&quot;key\&quot; and \&quot;format\&quot; fields should still be passed as separate parameters | (optional) defaults to undefined|
| **format** | [**&#39;json&#39; | &#39;xml&#39; | &#39;vdf&#39;**]**Array<&#39;json&#39; &#124; &#39;xml&#39; &#124; &#39;vdf&#39;>** | The format of the response. Defaults to json | (optional) defaults to undefined|
| **version** | [**number**] | (Required) version field | (optional) defaults to undefined|
| **clientId** | [**number**] | (Required) pending client ID, from scanned QR Code | (optional) defaults to undefined|
| **steamid** | [**number**] | (Required) user who wants to login | (optional) defaults to undefined|
| **signature** | [**string**] | (Required) HMAC digest over {version,client_id,steamid} via user\\\&#39;s private key | (optional) defaults to undefined|
| **confirm** | [**boolean**] | Whether to confirm the login (true) or deny the login (false) | (optional) defaults to undefined|
| **persistence** | [**string**] | whether we are requesting a persistent or an ephemeral session | (optional) defaults to undefined|


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

# **iAuthenticationServiceUpdateAuthSessionWithSteamGuardCodeV1Post**
> iAuthenticationServiceUpdateAuthSessionWithSteamGuardCodeV1Post()


### Example

```typescript
import {
    IAuthenticationServiceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IAuthenticationServiceApi(configuration);

let inputJson: string; //An alternative to the request body; pass arguments as a URL-encoded JSON blob. The \"key\" and \"format\" fields should still be passed as separate parameters (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)
let clientId: number; //(Required) pending client ID, from initialized session (optional) (default to undefined)
let steamid: number; //(Required) user who wants to login (optional) (default to undefined)
let code: string; //(Required) confirmation code (optional) (default to undefined)
let codeType: string; //(Required) type of confirmation code (optional) (default to undefined)

const { status, data } = await apiInstance.iAuthenticationServiceUpdateAuthSessionWithSteamGuardCodeV1Post(
    inputJson,
    format,
    clientId,
    steamid,
    code,
    codeType
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **inputJson** | [**string**] | An alternative to the request body; pass arguments as a URL-encoded JSON blob. The \&quot;key\&quot; and \&quot;format\&quot; fields should still be passed as separate parameters | (optional) defaults to undefined|
| **format** | [**&#39;json&#39; | &#39;xml&#39; | &#39;vdf&#39;**]**Array<&#39;json&#39; &#124; &#39;xml&#39; &#124; &#39;vdf&#39;>** | The format of the response. Defaults to json | (optional) defaults to undefined|
| **clientId** | [**number**] | (Required) pending client ID, from initialized session | (optional) defaults to undefined|
| **steamid** | [**number**] | (Required) user who wants to login | (optional) defaults to undefined|
| **code** | [**string**] | (Required) confirmation code | (optional) defaults to undefined|
| **codeType** | [**string**] | (Required) type of confirmation code | (optional) defaults to undefined|


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

