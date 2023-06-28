const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      test: "works",
      latest: null,
      episodes: null,
      podcastDetails: null,
      episodeDetails: null,
    },
    actions: {
      checkValidity: () => {
        const now = new Date()
          .toLocaleDateString()
          .split("/")
          .reverse()
          .join("/");
        
        if (localStorage.getItem("validity")) {
          const result =
            new Date(localStorage.getItem("validity")).getTime() -
            new Date(now).getTime();
          if (Math.round(result / (1000 * 60 * 60 * 24)) !== 0) {
            //returns false if it has been more than 24 hours since last fetch and needs to fetch
            return false;
          }
          //returns true if it doesn't needs to fetch new data
          setStore({ latest: JSON.parse(localStorage.getItem("latest"))});
          return true;
        }
      },
      getLatestPodcast: async () => {
        const resp = await fetch(
          "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json"
        );
        const data = await resp.json();
        setStore({ latest: data.feed });
        localStorage.setItem("latest", JSON.stringify(data.feed));
        localStorage.setItem(
          "validity",
          new Date().toLocaleDateString().split("/").reverse().join("/")
        );
      },
      getPodcastEpisodes: async (id) => {
        const resp = await fetch(
          `https://itunes.apple.com/lookup?id=${id}&media=podcast&entity=podcastEpisode&limit=100`
        );
        const data = await resp.json();
        setStore({ episodes: data.results });
      },
      getPodcastDetails: async (id) => {
        fetch(
          `https://api.allorigins.win/get?url=https://itunes.apple.com/lookup?id=` +
            id
        )
          .then((response) => {
            if (response.ok) return response.json();
            throw new Error("Network response was not ok.");
          })
          .then((data) =>
            setStore({ podcastDetails: JSON.parse(data.contents).results[0] })
          );
      },
      setEpisodeDetails: (ep) => {
        console.log(ep);
        setStore({ episodeDetails: ep });
      },
      getFeed: async (rss) => {
        //console.log("RSS", rss);

        const resp = await fetch("https://jbpod.libsyn.com/applepodcast");
        const { contents } = await resp.text();
        // console.log(await contents);
        const feed = new window.DOMParser().parseFromString(
          contents,
          "text/xml"
        );
        //console.log("FEED", feed);
        const description = feed.querySelectorAll("item");
        //console.log("DESCRIPTION", description);
      },
      duration: (millis) =>
        `${Math.floor((millis / (1000 * 60 * 60)) % 24)}:${Math.floor(
          (millis / (1000 * 60)) % 60
        )}:${Math.floor((millis / 1000) % 60)}`,
      dateFormat: (date) =>
        date
          .substring(0, 10)
          .replaceAll("-", "/")
          .split("/")
          .reverse()
          .join("/"),
    },
  };
};

export default getState;
