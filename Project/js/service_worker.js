//static cache const
const statCache='statv4';
//dynamic cache const
const dynaCache='dynav1';

//storing shell
const assets=['./','css\Bone.css','css\Donations.css','css\Shop.css','css\style_Hair.css','css\style_Nails.css','css\style_Skin.css','img\4219552.webp','img\deepika-padukone_1.jpg','img\funds.jpg', 'img\hair-woman-and-face-logo-and-symbols-free-vector.jpg','img\image-1.webp','img\image-2.jpg','img\image-3.webp','img\image-4.jpg','img\image-5.png','img\image-6.jpeg','img\image-7.jpg','img\image-8.jpg','img\Mobile-manicures-in-London-CND-Shellac-Plexigel-Nails-by-Mets-1920x1080.png','img\Mod.jpg','img\mon.png','img\Nail_1.jpg','img\Nail_2.webp','img\Nail_3.jpeg','img\Nail_4.jpg','img\Nail_5.jpg','img\Nail_6.jpg','img\Nail_7.jpg','img\Nail_8.webp','img\shm.jpg','img\skin_1.webp','img\skin_2.jpg','img\skin_3.jpg','img\skin_4.webp','img\skin_5.jpg','img\skin_6.jpg','img\skin_7.jpg','img\skin_8.jpg','js\Donations.js','js\main.js','js\script.js','js\service_worker.js','js\slideshow.js','manifest\android-icon-36x36.png','manifest\android-icon-48x48.png','manifest\android-icon-72x72.png','manifest\android-icon-96x96.png','manifest\android-icon-144x144.png','manifest\android-icon-192x192.png','manifest\apple-icon-57x57.png','manifest\apple-icon-60x60.png','manifest\apple-icon-72x72.png','manifest\apple-icon-76x76.png','manifest\apple-icon-114x114.png','manifest\apple-icon-120x120.png','manifest\apple-icon-152x152.png','manifest\apple-icon-180x180.png','manifest\apple-icon-precomposed.png','manifest\apple-icon.png','manifest\browserconfig.xml','manifest\favicon-16x16.png','manifest\favicon-32x32.png','manifest\favicon-96x96.png','manifest\favicon.ico','manifest\manifest.json','manifest\ms-icon-70x70.png','manifest\ms-icon-144x144.png','manifest\ms-icon-150x150.png','manifest\ms-icon-310x310.png','Donations.html','hair-woman-and-face-logo-and-symbols-free-vector.jpg','Home.html','Return.html','ShopH.html','ShopN.html','ShopS.html'];

//the install event
self.addEventListener('install',(evt)=>{
    //console.log("Service worker installed.");
    //install event should wait until whatever inside evt.waitUntil() finishes.
    evt.waitUntil(
        //open static cache
        caches.open(statCache)
    .then((cache)=>{
        console.log("Caching assets...");
        //adding all assets in assets array into cache
        cache.addAll(assets);
    })
    );
    
});

//The activate event
self.addEventListener('activate',(evt)=>{
    //console.log("Service worker is active!");
    evt.waitUntil(
        //accessing all versions of caches available currently
        caches.keys()
        .then((keys)=>{
            //console.log(keys);
            //going through the list pf caches, checking whether the cache name is equal to current cache version/s:static and dynamic and getting rid of any old cache versions
            return Promise.all(
                keys.filter(key=>key!==statCache && key!==dynaCache)
                .map(key=>caches.delete(key))
            );

        })
    );
});

//The fetch event handler
self.addEventListener('fetch',(evt)=>{
    //console.log("Fetch event",evt);
    //interrupt the normal request and respond with a custom response
    evt.respondWith(
        //check if the resource exists in cache
        caches.match(evt.request)
        .then((cacheRes)=>{
            //return from cache if it is there in cache. or else fetch from server
            return cacheRes || fetch(evt.request)
            //when fetching from server, add the request and response to dynamic cache to access the resource/s when offline
            .then(fetchRes=>{
                return caches.open(dynaCache)
                .then(cache=>{
                    cache.put(evt.request.url,fetchRes.clone());
                    return fetchRes;
                });
            });
            //returning the fallback page if the resource is not available in any of the caches
        }).catch(()=>{
            //check whether the request url contains .html in it
            if(evt.request.url.indexOf('.html')>-1){
                return caches.match('/Return.html')
            }
            })
    );
})