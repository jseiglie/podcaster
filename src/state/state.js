const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      corsProxy: "https://cors.eu.org/",
      latest: null,
      episodes: null,
      podcastDetails: null,
      episodeDetails: null,
      description: null
    },
    actions: {
      checkValidity: (item, pod_id = 0) => {
        const now = new Date()
          .toLocaleDateString()
          .split("/")
          .reverse()
          .join("/");
        //checks for time of last fetch for latest podcasts
        if (item === "latest") {
          //console.log(JSON.parse(localStorage.getItem("latest")));
          if (localStorage.getItem("latest")) {
            const result =
              new Date(
                JSON.parse(localStorage.getItem("latest")).validity
              ).getTime() - new Date(now).getTime();
            if (Math.round(result / (1000 * 60 * 60 * 24)) !== 0) {
              //returns false if it has been more than 24 hours since last fetch and needs to fetch
              return false;
            } else {
              //returns true if it doesn't needs to fetch new data
              //console.log("setStorage validity check", JSON.parse(localStorage.getItem("latest")).data)
              setStore({
                latest: JSON.parse(localStorage.getItem("latest")).data,
              });
              return true;
            }
          }
        }
        //checks for time of last fetch of selected podcast episodes
        if (item === "podcast") {
          // console.log(pod_id);
          // console.log(
          //   "podcastDetails",
          //   getStore().podcastDetails

          //   //JSON.parse(localStorage.getItem("podcastDetails")).validity
          // );

          //   if (localStorage.getItem(getStore().podcastDetails)) {
          //     const result =
          //       new Date(
          //         JSON.parse(localStorage.getItem("a")).validity
          //       ).getTime() - new Date(now).getTime();
          //   if (Math.round(result / (1000 * 60 * 60 * 24)) !== 0) {
          //     //returns false if it has been more than 24 hours since last fetch and needs to fetch
          //     return false;
          //   }
          //   //returns true if it doesn't needs to fetch new data
          //   setStore({ latest: JSON.parse(localStorage.getItem("latest")) });
          //   return true;
          // }
        }
        if (item === "episode") {
          // console.log(
          //   "-----------------------------------------------------------------",
          //   getStore().episodes
          // );
          console.log(
            JSON.parse(localStorage.getItem("podcastDetails"))
            //JSON.parse(localStorage.getItem("podcastDetails")).validity
          );

          if (localStorage.getItem("podcastDetails")) {
            const result =
              new Date(
                JSON.parse(localStorage.getItem("a")).validity
              ).getTime() - new Date(now).getTime();
            if (Math.round(result / (1000 * 60 * 60 * 24)) !== 0) {
              //returns false if it has been more than 24 hours since last fetch and needs to fetch
              return false;
            }
            //returns true if it doesn't needs to fetch new data
            setStore({ latest: JSON.parse(localStorage.getItem("latest")) });
            return true;
          }
        }
      },
      getLatestPodcast: async () => {
        const resp = await fetch(
          "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json"
        );
        const data = await resp.json();

        setStore({ latest: await data.feed });
        localStorage.setItem(
          "latest",
          JSON.stringify({
            data: await data.feed,
            validity: new Date()
              .toLocaleDateString()
              .split("/")
              .reverse()
              .join("/"),
          })
        );
      },
      getPodcastEpisodes: async (id) => {
        const resp = await fetch(
          `https://itunes.apple.com/lookup?id=${id}&media=podcast&entity=podcastEpisode&limit=100`
        );
        const data = await resp.json();
        setStore({ episodes: data.results });
      },
      getPodcastDetails: (id) => {
        fetch(
          `https://api.allorigins.win/get?url=https://itunes.apple.com/lookup?id=` +
            id
        )
          .then((response) => {
            if (response.ok) return response.json();
            throw new Error("Network response was not ok.");
          })
          .then((data) => {
            setStore({
              podcastDetails: {
                data: JSON.parse(data.contents).results[0],
                validity: new Date()
                  .toLocaleDateString()
                  .split("/")
                  .reverse()
                  .join("/"),
              },
            });

            localStorage.setItem(
              id.toString(),
              JSON.stringify({
                data: getStore().podcastDetails.data,
                validity: new Date()
                  .toLocaleDateString()
                  .split("/")
                  .reverse()
                  .join("/"),
              })
            );
          });
      },
      setEpisodeDetails: (ep) => {
       // console.log("-----------------ep ", ep);
        setStore({
          episodeDetails: {
            trackId: ep.trackId,
            data: ep,
            validity: new Date()
              .toLocaleDateString()
              .split("/")
              .reverse()
              .join("/"),
          },
        });
        localStorage.setItem(
          ep.trackId.toString(),
          JSON.stringify({
            trackId: ep.trackId,
            data: JSON.stringify(ep),
            validity: new Date()
              .toLocaleDateString()
              .split("/")
              .reverse()
              .join("/"),
          })
        );
      },
      clearDescription: () =>{
        setStore({description: null})
      },
      getFeed: async (url) => {
        const corsProxy = "https://cors.eu.org/";
        //console.log(getStore().episodes)
        fetch(corsProxy +  url)
          .then((res) =>
            res
              .text()
              // .then((data) => console.info("data", data))
              .then((str) =>
                new window.DOMParser().parseFromString(str, "text/xml")
              )
              .then((feed) => {
                const items = feed.querySelectorAll("description");
                setStore({description: items[0].childNodes[0].wholeText}) 
                let html = ``;  
                // items.forEach((el) => {
                //  // console.log(el);
                //   //console.log(el.querySelector("description"))
                //   // html += `
                //   //                                         <article>
                //   //                                         <p>${
                //   //                                           el.querySelector(
                //   //                                             "title"
                //   //                                           ).innerHTML
                //   //                                         }</p>
                //   //                                           <img src="${
                //   //                                             el.querySelector(
                //   //                                               "link"
                //   //                                             ).innerHTML
                //   //                                           }/image/large.png" alt="">
                //   //                                           <h2>
                //   //                                             <a href="${
                //   //                                               el.querySelector(
                //   //                                                 "link"
                //   //                                               ).innerHTML
                //   //                                             }" target="_blank" rel="noopener">
                //   //                                               ${
                //   //                                                 el.querySelector(
                //   //                                                   "title"
                //   //                                                 ).innerHTML
                //   //                                               }
                //   //                                             </a>
                //   //                                           </h2>
                //   //                                         </article>
                //   //                                       `;
                // });
                //document.body.insertAdjacentHTML("beforeend", html);
              })
             
          )
          .catch((err) => console.warn("res err", err))
          .finally(() => console.info("res complete"));
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
