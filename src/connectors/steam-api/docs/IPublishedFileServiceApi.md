# IPublishedFileServiceApi

All URIs are relative to *https://api.steampowered.com*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**iPublishedFileServiceGetDetailsV1Get**](#ipublishedfileservicegetdetailsv1get) | **GET** /IPublishedFileService/GetDetails/v1 | |
|[**iPublishedFileServiceGetSubSectionDataV1Get**](#ipublishedfileservicegetsubsectiondatav1get) | **GET** /IPublishedFileService/GetSubSectionData/v1 | |
|[**iPublishedFileServiceGetUserFileCountV1Get**](#ipublishedfileservicegetuserfilecountv1get) | **GET** /IPublishedFileService/GetUserFileCount/v1 | |
|[**iPublishedFileServiceGetUserFilesV1Get**](#ipublishedfileservicegetuserfilesv1get) | **GET** /IPublishedFileService/GetUserFiles/v1 | |
|[**iPublishedFileServiceGetUserVoteSummaryV1Get**](#ipublishedfileservicegetuservotesummaryv1get) | **GET** /IPublishedFileService/GetUserVoteSummary/v1 | |
|[**iPublishedFileServiceQueryFilesV1Get**](#ipublishedfileservicequeryfilesv1get) | **GET** /IPublishedFileService/QueryFiles/v1 | |

# **iPublishedFileServiceGetDetailsV1Get**
> iPublishedFileServiceGetDetailsV1Get()


### Example

```typescript
import {
    IPublishedFileServiceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IPublishedFileServiceApi(configuration);

let publishedfileids: number; //(Required) Set of published file Ids to retrieve details for. (optional) (default to undefined)
let includetags: boolean; //(Required) If true, return tag information in the returned details. (optional) (default to undefined)
let includeadditionalpreviews: boolean; //(Required) If true, return preview information in the returned details. (optional) (default to undefined)
let includechildren: boolean; //(Required) If true, return children in the returned details. (optional) (default to undefined)
let includekvtags: boolean; //(Required) If true, return key value tags in the returned details. (optional) (default to undefined)
let includevotes: boolean; //(Required) If true, return vote data in the returned details. (optional) (default to undefined)
let shortDescription: boolean; //(Required) If true, return a short description instead of the full description. (optional) (default to undefined)
let includeforsaledata: boolean; //(Required) If true, return pricing data, if applicable. (optional) (default to undefined)
let includemetadata: boolean; //(Required) If true, populate the metadata field. (optional) (default to undefined)
let language: number; //Specifies the localized text to return. Defaults to English. (optional) (default to undefined)
let returnPlaytimeStats: number; //(Required) Return playtime stats for the specified number of days before today. (optional) (default to undefined)
let appid: number; //(Required) (optional) (default to undefined)
let stripDescriptionBbcode: boolean; //(Required) Strips BBCode from descriptions. (optional) (default to undefined)
let desiredRevision: string; //Return the data for the specified revision. (optional) (default to undefined)
let includereactions: boolean; //If true, then reactions to items will be returned. (optional) (default to undefined)
let adminQuery: boolean; //(Required) Admin tool is doing a query, return hidden items (optional) (default to undefined)
let inputJson: string; //An alternative to the query string parameters; pass arguments as a URL-encoded JSON blob. The \"key\" and \"format\" fields should still be passed as separate parameters (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iPublishedFileServiceGetDetailsV1Get(
    publishedfileids,
    includetags,
    includeadditionalpreviews,
    includechildren,
    includekvtags,
    includevotes,
    shortDescription,
    includeforsaledata,
    includemetadata,
    language,
    returnPlaytimeStats,
    appid,
    stripDescriptionBbcode,
    desiredRevision,
    includereactions,
    adminQuery,
    inputJson,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **publishedfileids** | [**number**] | (Required) Set of published file Ids to retrieve details for. | (optional) defaults to undefined|
| **includetags** | [**boolean**] | (Required) If true, return tag information in the returned details. | (optional) defaults to undefined|
| **includeadditionalpreviews** | [**boolean**] | (Required) If true, return preview information in the returned details. | (optional) defaults to undefined|
| **includechildren** | [**boolean**] | (Required) If true, return children in the returned details. | (optional) defaults to undefined|
| **includekvtags** | [**boolean**] | (Required) If true, return key value tags in the returned details. | (optional) defaults to undefined|
| **includevotes** | [**boolean**] | (Required) If true, return vote data in the returned details. | (optional) defaults to undefined|
| **shortDescription** | [**boolean**] | (Required) If true, return a short description instead of the full description. | (optional) defaults to undefined|
| **includeforsaledata** | [**boolean**] | (Required) If true, return pricing data, if applicable. | (optional) defaults to undefined|
| **includemetadata** | [**boolean**] | (Required) If true, populate the metadata field. | (optional) defaults to undefined|
| **language** | [**number**] | Specifies the localized text to return. Defaults to English. | (optional) defaults to undefined|
| **returnPlaytimeStats** | [**number**] | (Required) Return playtime stats for the specified number of days before today. | (optional) defaults to undefined|
| **appid** | [**number**] | (Required) | (optional) defaults to undefined|
| **stripDescriptionBbcode** | [**boolean**] | (Required) Strips BBCode from descriptions. | (optional) defaults to undefined|
| **desiredRevision** | [**string**] | Return the data for the specified revision. | (optional) defaults to undefined|
| **includereactions** | [**boolean**] | If true, then reactions to items will be returned. | (optional) defaults to undefined|
| **adminQuery** | [**boolean**] | (Required) Admin tool is doing a query, return hidden items | (optional) defaults to undefined|
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

# **iPublishedFileServiceGetSubSectionDataV1Get**
> iPublishedFileServiceGetSubSectionDataV1Get()


### Example

```typescript
import {
    IPublishedFileServiceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IPublishedFileServiceApi(configuration);

let publishedfileid: number; //(Required) (optional) (default to undefined)
let forTableOfContents: boolean; //(Required) (optional) (default to undefined)
let specificSectionid: number; //(Required) (optional) (default to undefined)
let desiredRevision: string; //Return the data for the specified revision. (optional) (default to undefined)
let inputJson: string; //An alternative to the query string parameters; pass arguments as a URL-encoded JSON blob. The \"key\" and \"format\" fields should still be passed as separate parameters (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iPublishedFileServiceGetSubSectionDataV1Get(
    publishedfileid,
    forTableOfContents,
    specificSectionid,
    desiredRevision,
    inputJson,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **publishedfileid** | [**number**] | (Required) | (optional) defaults to undefined|
| **forTableOfContents** | [**boolean**] | (Required) | (optional) defaults to undefined|
| **specificSectionid** | [**number**] | (Required) | (optional) defaults to undefined|
| **desiredRevision** | [**string**] | Return the data for the specified revision. | (optional) defaults to undefined|
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

# **iPublishedFileServiceGetUserFileCountV1Get**
> iPublishedFileServiceGetUserFileCountV1Get()


### Example

```typescript
import {
    IPublishedFileServiceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IPublishedFileServiceApi(configuration);

let steamid: number; //(Required) Steam ID of the user whose files are being requested. (optional) (default to undefined)
let appid: number; //(Required) App Id of the app that the files were published to. (optional) (default to undefined)
let shortcutid: number; //(Optional) Shortcut Id to retrieve published files from. (optional) (default to undefined)
let page: number; //(Optional) Starting page for results. (optional) (default to undefined)
let numperpage: number; //(Optional) The number of results, per page to return. (optional) (default to undefined)
let type: string; //(Optional) Type of files to be returned. (optional) (default to undefined)
let sortmethod: string; //(Optional) Sorting method to use on returned values. (optional) (default to undefined)
let privacy: number; //(Required) (optional) Filter by privacy settings. (optional) (default to undefined)
let requiredtags: string; //(Optional) Tags that must be present on a published file to satisfy the query. (optional) (default to undefined)
let excludedtags: string; //(Optional) Tags that must NOT be present on a published file to satisfy the query. (optional) (default to undefined)
let requiredKvTags: string; //(Required) Required key-value tags to match on. (optional) (default to undefined)
let filetype: number; //(Optional) File type to match files to. (optional) (default to undefined)
let creatorAppid: number; //(Required) App Id of the app that published the files, only matched if specified. (optional) (default to undefined)
let matchCloudFilename: string; //(Required) Match this cloud filename if specified. (optional) (default to undefined)
let cacheMaxAgeSeconds: number; //Allow stale data to be returned for the specified number of seconds. (optional) (default to undefined)
let language: number; //Specifies the localized text to return. Defaults to English. (optional) (default to undefined)
let taggroups: string; //(Optional) At least one of the tags must be present on a published file to satisfy the query. (optional) (default to undefined)
let excludedContentDescriptors: string; //(Optional) Filter out items that have these content descriptors. (optional) (default to undefined)
let adminQuery: boolean; //(Required) Admin tool is doing a query, return hidden items (optional) (default to undefined)
let totalonly: boolean; //(Optional) If true, only return the total number of files that satisfy this query. (optional) (default to undefined)
let idsOnly: boolean; //(Optional) If true, only return the published file ids of files that satisfy this query. (optional) (default to undefined)
let returnVoteData: boolean; //Return vote data (optional) (default to undefined)
let returnTags: boolean; //(Required) Return tags in the file details (optional) (default to undefined)
let returnKvTags: boolean; //Return key-value tags in the file details (optional) (default to undefined)
let returnPreviews: boolean; //(Required) Return preview image and video details in the file details (optional) (default to undefined)
let returnChildren: boolean; //(Required) Return child item ids in the file details (optional) (default to undefined)
let returnShortDescription: boolean; //Populate the short_description field instead of file_description (optional) (default to undefined)
let returnForSaleData: boolean; //(Required) Return pricing information, if applicable (optional) (default to undefined)
let returnMetadata: boolean; //Populate the metadata field (optional) (default to undefined)
let returnPlaytimeStats: number; //(Required) Return playtime stats for the specified number of days before today. (optional) (default to undefined)
let stripDescriptionBbcode: boolean; //(Required) Strips BBCode from descriptions. (optional) (default to undefined)
let returnReactions: boolean; //If true, then reactions to items will be returned. (optional) (default to undefined)
let startindexOverride: number; //(Required) Backwards compatible for the client. (optional) (default to undefined)
let desiredRevision: string; //Return the data for the specified revision. (optional) (default to undefined)
let returnApps: boolean; //(Required) Return list of apps the items belong to (optional) (default to undefined)
let inputJson: string; //An alternative to the query string parameters; pass arguments as a URL-encoded JSON blob. The \"key\" and \"format\" fields should still be passed as separate parameters (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iPublishedFileServiceGetUserFileCountV1Get(
    steamid,
    appid,
    shortcutid,
    page,
    numperpage,
    type,
    sortmethod,
    privacy,
    requiredtags,
    excludedtags,
    requiredKvTags,
    filetype,
    creatorAppid,
    matchCloudFilename,
    cacheMaxAgeSeconds,
    language,
    taggroups,
    excludedContentDescriptors,
    adminQuery,
    totalonly,
    idsOnly,
    returnVoteData,
    returnTags,
    returnKvTags,
    returnPreviews,
    returnChildren,
    returnShortDescription,
    returnForSaleData,
    returnMetadata,
    returnPlaytimeStats,
    stripDescriptionBbcode,
    returnReactions,
    startindexOverride,
    desiredRevision,
    returnApps,
    inputJson,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **steamid** | [**number**] | (Required) Steam ID of the user whose files are being requested. | (optional) defaults to undefined|
| **appid** | [**number**] | (Required) App Id of the app that the files were published to. | (optional) defaults to undefined|
| **shortcutid** | [**number**] | (Optional) Shortcut Id to retrieve published files from. | (optional) defaults to undefined|
| **page** | [**number**] | (Optional) Starting page for results. | (optional) defaults to undefined|
| **numperpage** | [**number**] | (Optional) The number of results, per page to return. | (optional) defaults to undefined|
| **type** | [**string**] | (Optional) Type of files to be returned. | (optional) defaults to undefined|
| **sortmethod** | [**string**] | (Optional) Sorting method to use on returned values. | (optional) defaults to undefined|
| **privacy** | [**number**] | (Required) (optional) Filter by privacy settings. | (optional) defaults to undefined|
| **requiredtags** | [**string**] | (Optional) Tags that must be present on a published file to satisfy the query. | (optional) defaults to undefined|
| **excludedtags** | [**string**] | (Optional) Tags that must NOT be present on a published file to satisfy the query. | (optional) defaults to undefined|
| **requiredKvTags** | [**string**] | (Required) Required key-value tags to match on. | (optional) defaults to undefined|
| **filetype** | [**number**] | (Optional) File type to match files to. | (optional) defaults to undefined|
| **creatorAppid** | [**number**] | (Required) App Id of the app that published the files, only matched if specified. | (optional) defaults to undefined|
| **matchCloudFilename** | [**string**] | (Required) Match this cloud filename if specified. | (optional) defaults to undefined|
| **cacheMaxAgeSeconds** | [**number**] | Allow stale data to be returned for the specified number of seconds. | (optional) defaults to undefined|
| **language** | [**number**] | Specifies the localized text to return. Defaults to English. | (optional) defaults to undefined|
| **taggroups** | [**string**] | (Optional) At least one of the tags must be present on a published file to satisfy the query. | (optional) defaults to undefined|
| **excludedContentDescriptors** | [**string**] | (Optional) Filter out items that have these content descriptors. | (optional) defaults to undefined|
| **adminQuery** | [**boolean**] | (Required) Admin tool is doing a query, return hidden items | (optional) defaults to undefined|
| **totalonly** | [**boolean**] | (Optional) If true, only return the total number of files that satisfy this query. | (optional) defaults to undefined|
| **idsOnly** | [**boolean**] | (Optional) If true, only return the published file ids of files that satisfy this query. | (optional) defaults to undefined|
| **returnVoteData** | [**boolean**] | Return vote data | (optional) defaults to undefined|
| **returnTags** | [**boolean**] | (Required) Return tags in the file details | (optional) defaults to undefined|
| **returnKvTags** | [**boolean**] | Return key-value tags in the file details | (optional) defaults to undefined|
| **returnPreviews** | [**boolean**] | (Required) Return preview image and video details in the file details | (optional) defaults to undefined|
| **returnChildren** | [**boolean**] | (Required) Return child item ids in the file details | (optional) defaults to undefined|
| **returnShortDescription** | [**boolean**] | Populate the short_description field instead of file_description | (optional) defaults to undefined|
| **returnForSaleData** | [**boolean**] | (Required) Return pricing information, if applicable | (optional) defaults to undefined|
| **returnMetadata** | [**boolean**] | Populate the metadata field | (optional) defaults to undefined|
| **returnPlaytimeStats** | [**number**] | (Required) Return playtime stats for the specified number of days before today. | (optional) defaults to undefined|
| **stripDescriptionBbcode** | [**boolean**] | (Required) Strips BBCode from descriptions. | (optional) defaults to undefined|
| **returnReactions** | [**boolean**] | If true, then reactions to items will be returned. | (optional) defaults to undefined|
| **startindexOverride** | [**number**] | (Required) Backwards compatible for the client. | (optional) defaults to undefined|
| **desiredRevision** | [**string**] | Return the data for the specified revision. | (optional) defaults to undefined|
| **returnApps** | [**boolean**] | (Required) Return list of apps the items belong to | (optional) defaults to undefined|
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

# **iPublishedFileServiceGetUserFilesV1Get**
> iPublishedFileServiceGetUserFilesV1Get()


### Example

```typescript
import {
    IPublishedFileServiceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IPublishedFileServiceApi(configuration);

let steamid: number; //(Required) Steam ID of the user whose files are being requested. (optional) (default to undefined)
let appid: number; //(Required) App Id of the app that the files were published to. (optional) (default to undefined)
let shortcutid: number; //(Optional) Shortcut Id to retrieve published files from. (optional) (default to undefined)
let page: number; //(Optional) Starting page for results. (optional) (default to undefined)
let numperpage: number; //(Optional) The number of results, per page to return. (optional) (default to undefined)
let type: string; //(Optional) Type of files to be returned. (optional) (default to undefined)
let sortmethod: string; //(Optional) Sorting method to use on returned values. (optional) (default to undefined)
let privacy: number; //(Required) (optional) Filter by privacy settings. (optional) (default to undefined)
let requiredtags: string; //(Optional) Tags that must be present on a published file to satisfy the query. (optional) (default to undefined)
let excludedtags: string; //(Optional) Tags that must NOT be present on a published file to satisfy the query. (optional) (default to undefined)
let requiredKvTags: string; //(Required) Required key-value tags to match on. (optional) (default to undefined)
let filetype: number; //(Optional) File type to match files to. (optional) (default to undefined)
let creatorAppid: number; //(Required) App Id of the app that published the files, only matched if specified. (optional) (default to undefined)
let matchCloudFilename: string; //(Required) Match this cloud filename if specified. (optional) (default to undefined)
let cacheMaxAgeSeconds: number; //Allow stale data to be returned for the specified number of seconds. (optional) (default to undefined)
let language: number; //Specifies the localized text to return. Defaults to English. (optional) (default to undefined)
let taggroups: string; //(Optional) At least one of the tags must be present on a published file to satisfy the query. (optional) (default to undefined)
let excludedContentDescriptors: string; //(Optional) Filter out items that have these content descriptors. (optional) (default to undefined)
let adminQuery: boolean; //(Required) Admin tool is doing a query, return hidden items (optional) (default to undefined)
let totalonly: boolean; //(Optional) If true, only return the total number of files that satisfy this query. (optional) (default to undefined)
let idsOnly: boolean; //(Optional) If true, only return the published file ids of files that satisfy this query. (optional) (default to undefined)
let returnVoteData: boolean; //Return vote data (optional) (default to undefined)
let returnTags: boolean; //(Required) Return tags in the file details (optional) (default to undefined)
let returnKvTags: boolean; //Return key-value tags in the file details (optional) (default to undefined)
let returnPreviews: boolean; //(Required) Return preview image and video details in the file details (optional) (default to undefined)
let returnChildren: boolean; //(Required) Return child item ids in the file details (optional) (default to undefined)
let returnShortDescription: boolean; //Populate the short_description field instead of file_description (optional) (default to undefined)
let returnForSaleData: boolean; //(Required) Return pricing information, if applicable (optional) (default to undefined)
let returnMetadata: boolean; //Populate the metadata field (optional) (default to undefined)
let returnPlaytimeStats: number; //(Required) Return playtime stats for the specified number of days before today. (optional) (default to undefined)
let stripDescriptionBbcode: boolean; //(Required) Strips BBCode from descriptions. (optional) (default to undefined)
let returnReactions: boolean; //If true, then reactions to items will be returned. (optional) (default to undefined)
let startindexOverride: number; //(Required) Backwards compatible for the client. (optional) (default to undefined)
let desiredRevision: string; //Return the data for the specified revision. (optional) (default to undefined)
let returnApps: boolean; //(Required) Return list of apps the items belong to (optional) (default to undefined)
let inputJson: string; //An alternative to the query string parameters; pass arguments as a URL-encoded JSON blob. The \"key\" and \"format\" fields should still be passed as separate parameters (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iPublishedFileServiceGetUserFilesV1Get(
    steamid,
    appid,
    shortcutid,
    page,
    numperpage,
    type,
    sortmethod,
    privacy,
    requiredtags,
    excludedtags,
    requiredKvTags,
    filetype,
    creatorAppid,
    matchCloudFilename,
    cacheMaxAgeSeconds,
    language,
    taggroups,
    excludedContentDescriptors,
    adminQuery,
    totalonly,
    idsOnly,
    returnVoteData,
    returnTags,
    returnKvTags,
    returnPreviews,
    returnChildren,
    returnShortDescription,
    returnForSaleData,
    returnMetadata,
    returnPlaytimeStats,
    stripDescriptionBbcode,
    returnReactions,
    startindexOverride,
    desiredRevision,
    returnApps,
    inputJson,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **steamid** | [**number**] | (Required) Steam ID of the user whose files are being requested. | (optional) defaults to undefined|
| **appid** | [**number**] | (Required) App Id of the app that the files were published to. | (optional) defaults to undefined|
| **shortcutid** | [**number**] | (Optional) Shortcut Id to retrieve published files from. | (optional) defaults to undefined|
| **page** | [**number**] | (Optional) Starting page for results. | (optional) defaults to undefined|
| **numperpage** | [**number**] | (Optional) The number of results, per page to return. | (optional) defaults to undefined|
| **type** | [**string**] | (Optional) Type of files to be returned. | (optional) defaults to undefined|
| **sortmethod** | [**string**] | (Optional) Sorting method to use on returned values. | (optional) defaults to undefined|
| **privacy** | [**number**] | (Required) (optional) Filter by privacy settings. | (optional) defaults to undefined|
| **requiredtags** | [**string**] | (Optional) Tags that must be present on a published file to satisfy the query. | (optional) defaults to undefined|
| **excludedtags** | [**string**] | (Optional) Tags that must NOT be present on a published file to satisfy the query. | (optional) defaults to undefined|
| **requiredKvTags** | [**string**] | (Required) Required key-value tags to match on. | (optional) defaults to undefined|
| **filetype** | [**number**] | (Optional) File type to match files to. | (optional) defaults to undefined|
| **creatorAppid** | [**number**] | (Required) App Id of the app that published the files, only matched if specified. | (optional) defaults to undefined|
| **matchCloudFilename** | [**string**] | (Required) Match this cloud filename if specified. | (optional) defaults to undefined|
| **cacheMaxAgeSeconds** | [**number**] | Allow stale data to be returned for the specified number of seconds. | (optional) defaults to undefined|
| **language** | [**number**] | Specifies the localized text to return. Defaults to English. | (optional) defaults to undefined|
| **taggroups** | [**string**] | (Optional) At least one of the tags must be present on a published file to satisfy the query. | (optional) defaults to undefined|
| **excludedContentDescriptors** | [**string**] | (Optional) Filter out items that have these content descriptors. | (optional) defaults to undefined|
| **adminQuery** | [**boolean**] | (Required) Admin tool is doing a query, return hidden items | (optional) defaults to undefined|
| **totalonly** | [**boolean**] | (Optional) If true, only return the total number of files that satisfy this query. | (optional) defaults to undefined|
| **idsOnly** | [**boolean**] | (Optional) If true, only return the published file ids of files that satisfy this query. | (optional) defaults to undefined|
| **returnVoteData** | [**boolean**] | Return vote data | (optional) defaults to undefined|
| **returnTags** | [**boolean**] | (Required) Return tags in the file details | (optional) defaults to undefined|
| **returnKvTags** | [**boolean**] | Return key-value tags in the file details | (optional) defaults to undefined|
| **returnPreviews** | [**boolean**] | (Required) Return preview image and video details in the file details | (optional) defaults to undefined|
| **returnChildren** | [**boolean**] | (Required) Return child item ids in the file details | (optional) defaults to undefined|
| **returnShortDescription** | [**boolean**] | Populate the short_description field instead of file_description | (optional) defaults to undefined|
| **returnForSaleData** | [**boolean**] | (Required) Return pricing information, if applicable | (optional) defaults to undefined|
| **returnMetadata** | [**boolean**] | Populate the metadata field | (optional) defaults to undefined|
| **returnPlaytimeStats** | [**number**] | (Required) Return playtime stats for the specified number of days before today. | (optional) defaults to undefined|
| **stripDescriptionBbcode** | [**boolean**] | (Required) Strips BBCode from descriptions. | (optional) defaults to undefined|
| **returnReactions** | [**boolean**] | If true, then reactions to items will be returned. | (optional) defaults to undefined|
| **startindexOverride** | [**number**] | (Required) Backwards compatible for the client. | (optional) defaults to undefined|
| **desiredRevision** | [**string**] | Return the data for the specified revision. | (optional) defaults to undefined|
| **returnApps** | [**boolean**] | (Required) Return list of apps the items belong to | (optional) defaults to undefined|
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

# **iPublishedFileServiceGetUserVoteSummaryV1Get**
> iPublishedFileServiceGetUserVoteSummaryV1Get()


### Example

```typescript
import {
    IPublishedFileServiceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IPublishedFileServiceApi(configuration);

let publishedfileids: number; //(Required) (optional) (default to undefined)
let inputJson: string; //An alternative to the query string parameters; pass arguments as a URL-encoded JSON blob. The \"key\" and \"format\" fields should still be passed as separate parameters (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iPublishedFileServiceGetUserVoteSummaryV1Get(
    publishedfileids,
    inputJson,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **publishedfileids** | [**number**] | (Required) | (optional) defaults to undefined|
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

# **iPublishedFileServiceQueryFilesV1Get**
> iPublishedFileServiceQueryFilesV1Get()


### Example

```typescript
import {
    IPublishedFileServiceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IPublishedFileServiceApi(configuration);

let queryType: number; //(Required) enumeration EPublishedFileQueryType in clientenums.h (optional) (default to undefined)
let page: number; //(Required) Current page (optional) (default to undefined)
let cursor: string; //(Required) Cursor to paginate through the results (set to \'*\' for the first request).  Prefer this over using the page parameter, as it will allow you to do deep pagination.  When used, the page parameter will be ignored. (optional) (default to undefined)
let numperpage: number; //(Optional) The number of results, per page to return. (optional) (default to undefined)
let creatorAppid: number; //(Required) App that created the files (optional) (default to undefined)
let appid: number; //(Required) App that consumes the files (optional) (default to undefined)
let requiredtags: string; //(Required) Tags to match on. See match_all_tags parameter below (optional) (default to undefined)
let excludedtags: string; //(Optional) Tags that must NOT be present on a published file to satisfy the query. (optional) (default to undefined)
let matchAllTags: boolean; //If true, then items must have all the tags specified, otherwise they must have at least one of the tags. (optional) (default to undefined)
let requiredFlags: string; //(Required) Required flags that must be set on any returned items (optional) (default to undefined)
let omittedFlags: string; //(Required) Flags that must not be set on any returned items (optional) (default to undefined)
let searchText: string; //(Required) Text to match in the item\'s title or description (optional) (default to undefined)
let filetype: number; //(Required) EPublishedFileInfoMatchingFileType (optional) (default to undefined)
let childPublishedfileid: number; //(Required) Find all items that reference the given item. (optional) (default to undefined)
let days: number; //(Required) If query_type is k_PublishedFileQueryType_RankedByTrend, then this is the number of days to get votes for [1,7]. (optional) (default to undefined)
let includeRecentVotesOnly: boolean; //(Required) If query_type is k_PublishedFileQueryType_RankedByTrend, then limit result set just to items that have votes within the day range given (optional) (default to undefined)
let cacheMaxAgeSeconds: number; //Allow stale data to be returned for the specified number of seconds. (optional) (default to undefined)
let language: number; //Language to search in and also what gets returned. Defaults to English. (optional) (default to undefined)
let requiredKvTags: string; //(Required) Required key-value tags to match on. (optional) (default to undefined)
let taggroups: string; //(Optional) At least one of the tags must be present on a published file to satisfy the query. (optional) (default to undefined)
let dateRangeCreated: string; //(Optional) Filter to items created within this range. (optional) (default to undefined)
let dateRangeUpdated: string; //(Optional) Filter to items updated within this range. (optional) (default to undefined)
let excludedContentDescriptors: string; //(Optional) Filter out items that have these content descriptors. (optional) (default to undefined)
let adminQuery: boolean; //(Required) Admin tool is doing a query, return hidden items (optional) (default to undefined)
let totalonly: boolean; //(Optional) If true, only return the total number of files that satisfy this query. (optional) (default to undefined)
let idsOnly: boolean; //(Optional) If true, only return the published file ids of files that satisfy this query. (optional) (default to undefined)
let returnVoteData: boolean; //(Required) Return vote data (optional) (default to undefined)
let returnTags: boolean; //(Required) Return tags in the file details (optional) (default to undefined)
let returnKvTags: boolean; //(Required) Return key-value tags in the file details (optional) (default to undefined)
let returnPreviews: boolean; //(Required) Return preview image and video details in the file details (optional) (default to undefined)
let returnChildren: boolean; //(Required) Return child item ids in the file details (optional) (default to undefined)
let returnShortDescription: boolean; //(Required) Populate the short_description field instead of file_description (optional) (default to undefined)
let returnForSaleData: boolean; //(Required) Return pricing information, if applicable (optional) (default to undefined)
let returnMetadata: boolean; //Populate the metadata (optional) (default to undefined)
let returnPlaytimeStats: number; //(Required) Return playtime stats for the specified number of days before today. (optional) (default to undefined)
let returnDetails: boolean; //(Required) By default, if none of the other \'return_*\' fields are set, only some voting details are returned. Set this to true to return the default set of details. (optional) (default to undefined)
let stripDescriptionBbcode: boolean; //(Required) Strips BBCode from descriptions. (optional) (default to undefined)
let desiredRevision: string; //Return the data for the specified revision. (optional) (default to undefined)
let returnReactions: boolean; //If true, then reactions to items will be returned. (optional) (default to undefined)
let inputJson: string; //An alternative to the query string parameters; pass arguments as a URL-encoded JSON blob. The \"key\" and \"format\" fields should still be passed as separate parameters (optional) (default to undefined)
let format: 'json' | 'xml' | 'vdf'; //The format of the response. Defaults to json (optional) (default to undefined)

const { status, data } = await apiInstance.iPublishedFileServiceQueryFilesV1Get(
    queryType,
    page,
    cursor,
    numperpage,
    creatorAppid,
    appid,
    requiredtags,
    excludedtags,
    matchAllTags,
    requiredFlags,
    omittedFlags,
    searchText,
    filetype,
    childPublishedfileid,
    days,
    includeRecentVotesOnly,
    cacheMaxAgeSeconds,
    language,
    requiredKvTags,
    taggroups,
    dateRangeCreated,
    dateRangeUpdated,
    excludedContentDescriptors,
    adminQuery,
    totalonly,
    idsOnly,
    returnVoteData,
    returnTags,
    returnKvTags,
    returnPreviews,
    returnChildren,
    returnShortDescription,
    returnForSaleData,
    returnMetadata,
    returnPlaytimeStats,
    returnDetails,
    stripDescriptionBbcode,
    desiredRevision,
    returnReactions,
    inputJson,
    format
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **queryType** | [**number**] | (Required) enumeration EPublishedFileQueryType in clientenums.h | (optional) defaults to undefined|
| **page** | [**number**] | (Required) Current page | (optional) defaults to undefined|
| **cursor** | [**string**] | (Required) Cursor to paginate through the results (set to \&#39;*\&#39; for the first request).  Prefer this over using the page parameter, as it will allow you to do deep pagination.  When used, the page parameter will be ignored. | (optional) defaults to undefined|
| **numperpage** | [**number**] | (Optional) The number of results, per page to return. | (optional) defaults to undefined|
| **creatorAppid** | [**number**] | (Required) App that created the files | (optional) defaults to undefined|
| **appid** | [**number**] | (Required) App that consumes the files | (optional) defaults to undefined|
| **requiredtags** | [**string**] | (Required) Tags to match on. See match_all_tags parameter below | (optional) defaults to undefined|
| **excludedtags** | [**string**] | (Optional) Tags that must NOT be present on a published file to satisfy the query. | (optional) defaults to undefined|
| **matchAllTags** | [**boolean**] | If true, then items must have all the tags specified, otherwise they must have at least one of the tags. | (optional) defaults to undefined|
| **requiredFlags** | [**string**] | (Required) Required flags that must be set on any returned items | (optional) defaults to undefined|
| **omittedFlags** | [**string**] | (Required) Flags that must not be set on any returned items | (optional) defaults to undefined|
| **searchText** | [**string**] | (Required) Text to match in the item\&#39;s title or description | (optional) defaults to undefined|
| **filetype** | [**number**] | (Required) EPublishedFileInfoMatchingFileType | (optional) defaults to undefined|
| **childPublishedfileid** | [**number**] | (Required) Find all items that reference the given item. | (optional) defaults to undefined|
| **days** | [**number**] | (Required) If query_type is k_PublishedFileQueryType_RankedByTrend, then this is the number of days to get votes for [1,7]. | (optional) defaults to undefined|
| **includeRecentVotesOnly** | [**boolean**] | (Required) If query_type is k_PublishedFileQueryType_RankedByTrend, then limit result set just to items that have votes within the day range given | (optional) defaults to undefined|
| **cacheMaxAgeSeconds** | [**number**] | Allow stale data to be returned for the specified number of seconds. | (optional) defaults to undefined|
| **language** | [**number**] | Language to search in and also what gets returned. Defaults to English. | (optional) defaults to undefined|
| **requiredKvTags** | [**string**] | (Required) Required key-value tags to match on. | (optional) defaults to undefined|
| **taggroups** | [**string**] | (Optional) At least one of the tags must be present on a published file to satisfy the query. | (optional) defaults to undefined|
| **dateRangeCreated** | [**string**] | (Optional) Filter to items created within this range. | (optional) defaults to undefined|
| **dateRangeUpdated** | [**string**] | (Optional) Filter to items updated within this range. | (optional) defaults to undefined|
| **excludedContentDescriptors** | [**string**] | (Optional) Filter out items that have these content descriptors. | (optional) defaults to undefined|
| **adminQuery** | [**boolean**] | (Required) Admin tool is doing a query, return hidden items | (optional) defaults to undefined|
| **totalonly** | [**boolean**] | (Optional) If true, only return the total number of files that satisfy this query. | (optional) defaults to undefined|
| **idsOnly** | [**boolean**] | (Optional) If true, only return the published file ids of files that satisfy this query. | (optional) defaults to undefined|
| **returnVoteData** | [**boolean**] | (Required) Return vote data | (optional) defaults to undefined|
| **returnTags** | [**boolean**] | (Required) Return tags in the file details | (optional) defaults to undefined|
| **returnKvTags** | [**boolean**] | (Required) Return key-value tags in the file details | (optional) defaults to undefined|
| **returnPreviews** | [**boolean**] | (Required) Return preview image and video details in the file details | (optional) defaults to undefined|
| **returnChildren** | [**boolean**] | (Required) Return child item ids in the file details | (optional) defaults to undefined|
| **returnShortDescription** | [**boolean**] | (Required) Populate the short_description field instead of file_description | (optional) defaults to undefined|
| **returnForSaleData** | [**boolean**] | (Required) Return pricing information, if applicable | (optional) defaults to undefined|
| **returnMetadata** | [**boolean**] | Populate the metadata | (optional) defaults to undefined|
| **returnPlaytimeStats** | [**number**] | (Required) Return playtime stats for the specified number of days before today. | (optional) defaults to undefined|
| **returnDetails** | [**boolean**] | (Required) By default, if none of the other \&#39;return_*\&#39; fields are set, only some voting details are returned. Set this to true to return the default set of details. | (optional) defaults to undefined|
| **stripDescriptionBbcode** | [**boolean**] | (Required) Strips BBCode from descriptions. | (optional) defaults to undefined|
| **desiredRevision** | [**string**] | Return the data for the specified revision. | (optional) defaults to undefined|
| **returnReactions** | [**boolean**] | If true, then reactions to items will be returned. | (optional) defaults to undefined|
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

