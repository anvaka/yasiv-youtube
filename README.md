# [yasiv-youtube](https://yasiv.com/youtube)

This is a very simple project, that renders graph of related YouTube videos:

[![yasiv-youtube](http://i.imgur.com/c4JaAPn.gif)](https://yasiv.com/youtube)

[video](https://www.youtube.com/watch?v=0YMc4ue29PU)

# How?

It's built on top of:

* [ngraph.graph](https://github.com/anvaka/ngraph.graph) - to store graph
* [ngraph.forcelayout](https://github.com/anvaka/ngraph.forcelayout) - to produce layout at runtime
* [query-state](https://github.com/anvaka/query-state) - to map query string to search term
* [panzoom](https://github.com/anvaka/panzoom) - for interactive SVG manipulation

The graph is rendered with SVG, but I'm using vue.js to provide higher level API for elements construction. I had to fall back to native javascript positions manipulation, because reactive properties of vue produced choppy rendering. See code here: [GraphView](https://github.com/anvaka/yasiv-youtube/blob/master/src/components/GraphView.vue).

The data is fetched with plain ajax request from [YouTube API](https://developers.google.com/youtube/v3/docs/)

Please feel free to contribute and let me know what you think!

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# Thanks!

I hope you like it. Thank you for dedicating your time to read this thing :).

# License

MIT
