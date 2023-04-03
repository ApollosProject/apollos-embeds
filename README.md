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

***

_⚠️  React needs to be imported in every file it is used, otherwise the js build file will error when you embed it in your website._
