DummyShop/
├── package.json          # dependencies + scripts
├── public/
│   └── index.html        # the single HTML page, has empty #root div
└── src/
    ├── index.js           # entry point, renders App into #root
    ├── App.jsx             # root component — holds state that decides List vs Detail screen
    ├── ProductList.jsx     # fetches all products, handles loading/error, renders grid of ProductCards
    ├── ProductCard.jsx     # dumb component, shows one product, forwards clicks up
    ├── ProductDetail.jsx   # fetches one product by id, handles loading/error, shows full detail + star rating
    ├── App.css / index.css # styles
    └── reportWebVitals.js, setupTests.js, App.test.js  # CRA boilerplate, not core app logic
