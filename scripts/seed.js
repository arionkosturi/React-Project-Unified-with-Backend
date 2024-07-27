// db = db.getSiblingDB("news");
// use("news");
db.createCollection("categories");

// db.categories.insertMany([
//   {
//     _id: {
//       $oid: "669bcbd46796bc340d83a779",
//     },
//     name: "Science",
//     imgUrl:
//       "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.BKhv7fEsU5uqvLabIsbzLQHaEK%26pid%3DApi&f=1&ipt=fdb42e4a14e702434ddeb9a80e8d8d2f6ddd30ae5d2018847d257b56f21213e8&ipo=images",
//     __v: 0,
//   },
//   {
//     _id: {
//       $oid: "669bcbdc6796bc340d83a77c",
//     },
//     name: "Technology",
//     imgUrl:
//       "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.dl65d1uOap3CWG5J7ldMDwHaE8%26pid%3DApi&f=1&ipt=1d0d1ede5c2f08068187505dd0a77b66529e83841e982677b0a8f87c7e9d6865&ipo=images",
//     __v: 0,
//   },
//   {
//     _id: {
//       $oid: "669bcbe36796bc340d83a77f",
//     },
//     name: "Finance",
//     imgUrl:
//       "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpaperaccess.com%2Ffull%2F1104826.jpg&f=1&nofb=1&ipt=dc243cb4eaf2a587c04b07b3ca27d0395468c3d3281d0ee56cc32560ae722bed&ipo=images",
//     __v: 0,
//   },
//   {
//     _id: {
//       $oid: "669bcbf36796bc340d83a782",
//     },
//     name: "Economy",
//     imgUrl:
//       "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.plFD5FmRmUg_qYnnwcwPEQHaE8%26pid%3DApi&f=1&ipt=9c589a962560eb74e9a271b5ab1b259ef883405bfd10239d7466f34eb2124d24&ipo=images",
//     __v: 0,
//   },
//   {
//     _id: {
//       $oid: "669bcbfa6796bc340d83a785",
//     },
//     name: "Politics",
//     imgUrl:
//       "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.MVXm-BClZ0wfmai0vz6isgHaEc%26pid%3DApi&f=1&ipt=6a1c3990a0ce71b66f3c3fd0d811ccd3120cd12fa472e2e446e271e3ef90b189&ipo=images",
//     __v: 0,
//   },
//   {
//     _id: {
//       $oid: "669bcc006796bc340d83a788",
//     },
//     name: "Opinion",
//     imgUrl:
//       "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.i5h822TX1Ne2HJa813JEJAHaEe%26pid%3DApi&f=1&ipt=fde3367d198403d69f83091e0a87eb221960c23e575cebbf49aa003ecf09d2d2&ipo=images",
//     __v: 0,
//   },
//   {
//     _id: {
//       $oid: "669bcc166796bc340d83a78b",
//     },
//     name: "Lifestyle",
//     imgUrl:
//       "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.Iq83AeAAQlexww07VBVWMQHaEK%26pid%3DApi&f=1&ipt=604fd4ca81afae8b2d0038682d43ced0b9c6756dc33b1cafdf6e4d78af3b33db&ipo=images",
//     __v: 0,
//   },
//   {
//     _id: {
//       $oid: "669bcc2a6796bc340d83a78e",
//     },
//     name: "Health",
//     imgUrl:
//       "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.tbwcOPUw0LCAB1seB89d-QHaEK%26pid%3DApi&f=1&ipt=bfb7f8b3dbe8a89d4f924ff0b95e1964cb53aedc229c4ae5596e503b9493e228&ipo=images",
//     __v: 0,
//   },
//   {
//     _id: {
//       $oid: "669bcc4b6796bc340d83a79b",
//     },
//     name: "US",
//     imgUrl:
//       "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.uJ5b-s4MhZqGBA93TVFC9wHaEK%26pid%3DApi&f=1&ipt=9dda104cbb252326ae61edc73e1b01c80e531452c501b5cdf46c2f700e19e8ae&ipo=images",
//     __v: 0,
//   },
//   {
//     _id: {
//       $oid: "669bccba6796bc340d83a7d2",
//     },
//     name: "Sports",
//     imgUrl:
//       "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.Rw-Ax6KKOanXl74v7KBo7wHaEv%26pid%3DApi&f=1&ipt=8d6de5452b929fcc29dc08aaeac77338d9b00650e9b20a6158681fa427154787&ipo=images",
//     __v: 0,
//   },
//   {
//     _id: {
//       $oid: "66a11219566da0fe8234fa59",
//     },
//     name: "Entertainment",
//     imgUrl:
//       "data:image/jpeg;base64,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",
//     __v: 0,
//   },
//   {
//     _id: {
//       $oid: "66a1124a566da0fe8234fa68",
//     },
//     name: "World",
//     imgUrl:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv_8C3IVnA9uAzgdiQKeWGUW-QuzDFqRow0A&s",
//     __v: 0,
//   },
//   {
//     _id: {
//       $oid: "66a117c253a0171dc2b705c8",
//     },
//     name: "test",
//     imgUrl: "test",
//     __v: 0,
//   },
// ]);

db.categories.insertMany([
  { name: "Alice" },
  { name: "Bob" },
  { name: "Charlie" },
]);
