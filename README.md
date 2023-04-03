# apollos-embeds

Apollo React Embeds are ready-made components that can be easily added to
Webflow or other third-party websites. They provide a convenient way to
integrate features such as authentication, a feature feed, and a banner widget.
By using these pre-built components, Apollos clients can save time and effort
utilizing these components, and can ensure a consistent look and feel across all
their digital products.

# Deployment

The js file used to embed these widgets is hosted on GitHub and picked up by https://www.jsdelivr.com/ automatically as long as the repo is public.

1. Update the package version in the package.json
2. Run `npm run build:widget`
3. Commit and push the new js and css build files to GitHub.
4. Final step `npm publish` you have to be part of the apollosproject organization.

# Embed a widget
How to embed a widget on website.

1. Add a div with a class of `apollos-widget` to your html file that has a `church` and `type` data attribute.
` <div data-church="bayside" data-type="FeatureFeed"  class="apollos-widget" style="max-width: 1180px; padding: 60px; margin: auto; margin-top: 20px"></div>
    <div data-church="bayside" data-type="Auth"  class="apollos-widget"></div>`

1.

