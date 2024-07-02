## Getting Started

### Preview

![image](https://github.com/KimHungChan/show-browser/assets/25672736/0dda1528-3ca6-402b-a615-3221847fc3e4)


### Quick view via Netlify
https://tv-show-browser-app.netlify.app/
### Getting Started

In the project directory, you should run:

```bash
npm i
```

This will install the npm packages

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Usage

1. Search for a tv show in the searchbar e.g. "boys"
2. Click on a show to navigate to the show details page
3. Have a browse and click to expand cetain details.
4. Click "See All Episodes" to see a full list of the episodes for this show.

### Tests

Added some basic tests with Jest just to showcase how I would approach testing.

```bash
npm run test
```

### App Flow
![image](https://github.com/KimHungChan/show-browser/assets/25672736/ff43082b-0765-4118-a0c7-a08fea124d21)

The above image shows the general flow of the app.

#### Caching
Technically we can agressively call the API since the network does cache the results however we have added some manual caching in order to reduce the number of calls we make. As you can see from the image we store the show data that we click on in client storage and use it for the show/[id] page, however if we refresh the page or type in the url manually we won't have access to the client data anymore. In order to resolve this we use local storage so that we can remember the data even if we refresh. In the case that we never have the data in the first place or it gets deleted we then call for the show data using it's ID which we can get from the url.

#### Features

- Debouncing - Added debouncing for the home page search since we don't want to make a call for every keystroke.
- Conditional Rendering - Won't show sections that have no valid data
- Truncating - Truncate show data that is too big and added a button to show the rest if desired.
- Page Routing - Using Next.js page routing to make easily nested pages e.g /show/[id]/episodes

### Further Improvements and Thoughts
There is really no end to the number of things I could keep adding at this point but this is a good place to stop for now and hopefully the general idea of the app comes across. There are a lot of things to nitpick like certain styling bugs, some performance issues, could add more type usage, more tests etc etc. When I have more time I'd like to improve the styling a bit, maybe add an accordian for the show page so that all the show details can be accessed without excessive scrolling, fix the performance issue on that page and the CLS score is quite bad too. By default I'd like to have something on the home page like "trending shows" but there doesn't seem to be a call for this. Need to also have a big think about how to optimize the use of SSR and decide which components could be left as server components. Netflix and IMDB do some nice tricks but it's easier said than done in such a small app.
