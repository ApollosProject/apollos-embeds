# Apollos Embeds

Apollo React Embeds are pre-built components that can be easily added to third-party websites, such as Webflow. These components provide a convenient way to integrate features such as authentication, a feature feed, and a banner widget, and ensure a consistent look and feel across all digital products.

# Deployment

Follow the steps below to deploy your apollos-embeds:

1. Update the package version in the `package.json` file.
2. Run `npm run build:widget` to build the new version of the widget.
3. Commit and push the new JS and CSS build files to GitHub.
4. Finally, run `npm publish`. Note that you need to be a member of the apollosproject organization to publish.

The JS file used to embed these widgets is hosted on GitHub and picked up by [jsdelivr.com](https://www.jsdelivr.com/) automatically, as long as the repository is public.

That's it! Your updated version of the apollos-embeds will be available for use.

_⚠️  React needs to be imported in every file it is used, otherwise the js build file will error when you embed it in your website._

***

# Using Embeds in Webflow

## 1. Adding the Script Tags:

Copy the following script tags into your Webflow website. In your Dashboard, you should see the tab 'Custom Code'. Scroll to the bottom and paste the following script tags in the Footer Code block:
html
```
<link href="https://cdn.jsdelivr.net/npm/@apollosproject/apollos-embeds@0.0.7/widget/index.css" rel="stylesheet"/>
<script src="https://cdn.jsdelivr.net/npm/@apollosproject/apollos-embeds@0.0.7/widget/index.js"></script>
```

<img width="1209" alt="image" src="https://user-images.githubusercontent.com/2528817/231846873-a20da2d3-b571-4036-9bc5-7373a0042f85.png">

_⚠️ As new versions of the embeds are published, you will have to update the version number in your script tags. So, the 0.0.7 part of the URLs will increment._

## 2. Adding the Embed Divs:

Under the design section of your Webflow website, you need to add a div for each embed you want on your site. Currently, there are two embeds available - 'Auth' and 'FeatureFeed'. You will probably need both of these embeds, so make two divs.

## 3. Adding the `apollos-widget` Class:

Add the class `apollos-widget` to both of those divs. This is necessary for the embeds to function properly.

<img width="935" alt="image" src="https://user-images.githubusercontent.com/2528817/231847323-53430bca-f2fd-4d2c-b7ee-90948fb694b5.png">

## 4. Adding Custom Attributes:
To control which embed shows up in which div and what church content is displayed, we use 'data-attributes' or 'Custom attributes' in Webflow.

For the 'Auth' embed, add `data-type="Auth"` and `data-church=[INSERT_CHURCH_SLUG_HERE]` as custom attributes. Here's an example for Bayside:

```
<div class="apollos-widget" data-type="Auth" data-church="bayside"> </div>
```

<img width="933" alt="image" src="https://user-images.githubusercontent.com/2528817/231847542-aa13eb07-2d7f-400b-bec5-3983ef3ac559.png">

For the 'FeatureFeed' embed, which displays the church's content, add `data-type="FeatureFeed"` and `data-church=[INSERT_CHURCH_SLUG_HERE]` as custom attributes. Here's an example for Bayside:

```
<div class="apollos-widget" data-type="FeatureFeed" data-church="bayside"> </div>
```

<img width="928" alt="image" src="https://user-images.githubusercontent.com/2528817/231847773-9698dc62-3ca8-4814-ad33-63204fb5f625.png">


_⚠️ Make sure to replace [INSERT_CHURCH_SLUG_HERE] with your church's unique identifier, or 'slug'._

### Disabling Caching for Local Testing

For local development and testing purposes, you might want to disable caching to ensure you're receiving the latest responses directly from the API. To do this, please refer to the Apollo client configuration file:

[../packages/web-shared/client/apollosApiLink.js](../packages/web-shared/client/apollosApiLink.js)

In this file, locate the header configuration within the `apollosApiLink` function and uncomment the following line:

```javascript
// 'x-cache-me-not': 1,


### Options

| data-type      |
|----------------|
| Auth           |
| FeatureFeed    |

| data-church               |
|---------------------------|
| apollos_demo              | 
| bayside                   | 
| cedar_creek               |
| celebration               |
| chase_oaks                |
| christ_fellowship         |
| city_first                |
| community_christian       |
| crossings_community_church|
| crossroads_kids_club      |
| crossroads_tv             |
| default                   |
| eastview                  |
| eleven22                  |
| fairhaven                 |
| fake                      |
| fake_dag_church           |
| fellowship_greenville     |
| fellowship_nwa            |
| hope_in_real_life         |
| king_of_kings             |
| lcbc                      |
| liquid_church             |
| newspring                 |
| oakcliff                  |
| real_life                 |
| river_valley              |
| try_grace                 |
| willow_creek              |
| woodmen                   |
| ymca_gc                   |


***


