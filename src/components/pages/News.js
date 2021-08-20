const News = () => {
  return (
    <div className="news-section">
      <div className="heading">
        <span>Calendar</span>
        <span className="close">
          <svg id="lnr-cross " viewBox="0 0 1024 1024" dash-action="news">
            <title>cross</title>
            <path
              className="path1"
              d="M548.203 537.6l289.099-289.098c9.998-9.998 9.998-26.206 0-36.205-9.997-9.997-26.206-9.997-36.203 0l-289.099 289.099-289.098-289.099c-9.998-9.997-26.206-9.997-36.205 0-9.997 9.998-9.997 26.206 0 36.205l289.099 289.098-289.099 289.099c-9.997 9.997-9.997 26.206 0 36.203 5 4.998 11.55 7.498 18.102 7.498s13.102-2.499 18.102-7.499l289.098-289.098 289.099 289.099c4.998 4.998 11.549 7.498 18.101 7.498s13.102-2.499 18.101-7.499c9.998-9.997 9.998-26.206 0-36.203l-289.098-289.098z"
            />
          </svg>
        </span>
      </div>
      <div className="dash-row tabs">
        <div news-tab="news" className="tab active">
          <svg id="lnr-calendar-full" viewBox="0 0 1024 1024">
            <title>calendar-full</title>
            <path
              className="path1"
              d="M947.2 102.4h-128v-25.6c0-14.138-11.461-25.6-25.6-25.6s-25.6 11.462-25.6 25.6v25.6h-512v-25.6c0-14.138-11.462-25.6-25.6-25.6s-25.6 11.462-25.6 25.6v25.6h-128c-42.347 0-76.8 34.453-76.8 76.8v716.8c0 42.349 34.453 76.8 76.8 76.8h870.4c42.349 0 76.8-34.451 76.8-76.8v-716.8c0-42.347-34.451-76.8-76.8-76.8zM76.8 153.6h128v76.8c0 14.138 11.462 25.6 25.6 25.6s25.6-11.462 25.6-25.6v-76.8h512v76.8c0 14.138 11.461 25.6 25.6 25.6s25.6-11.462 25.6-25.6v-76.8h128c14.115 0 25.6 11.485 25.6 25.6v128h-921.6v-128c0-14.115 11.485-25.6 25.6-25.6zM947.2 921.6h-870.4c-14.115 0-25.6-11.485-25.6-25.6v-537.6h921.6v537.6c0 14.115-11.485 25.6-25.6 25.6z"
            ></path>
            <path
              className="path2"
              d="M384 512h-51.2c-14.138 0-25.6-11.461-25.6-25.6s11.462-25.6 25.6-25.6h51.2c14.138 0 25.6 11.461 25.6 25.6s-11.462 25.6-25.6 25.6z"
            ></path>
            <path
              className="path3"
              d="M537.6 512h-51.2c-14.138 0-25.6-11.461-25.6-25.6s11.462-25.6 25.6-25.6h51.2c14.139 0 25.6 11.461 25.6 25.6s-11.461 25.6-25.6 25.6z"
            ></path>
            <path
              className="path4"
              d="M691.2 512h-51.2c-14.139 0-25.6-11.461-25.6-25.6s11.461-25.6 25.6-25.6h51.2c14.139 0 25.6 11.461 25.6 25.6s-11.461 25.6-25.6 25.6z"
            ></path>
            <path
              className="path5"
              d="M844.8 512h-51.2c-14.139 0-25.6-11.461-25.6-25.6s11.461-25.6 25.6-25.6h51.2c14.139 0 25.6 11.461 25.6 25.6s-11.461 25.6-25.6 25.6z"
            ></path>
            <path
              className="path6"
              d="M230.4 614.4h-51.2c-14.138 0-25.6-11.461-25.6-25.6s11.462-25.6 25.6-25.6h51.2c14.138 0 25.6 11.461 25.6 25.6s-11.462 25.6-25.6 25.6z"
            ></path>
            <path
              className="path7"
              d="M384 614.4h-51.2c-14.138 0-25.6-11.461-25.6-25.6s11.462-25.6 25.6-25.6h51.2c14.138 0 25.6 11.461 25.6 25.6s-11.462 25.6-25.6 25.6z"
            ></path>
            <path
              className="path8"
              d="M537.6 614.4h-51.2c-14.138 0-25.6-11.461-25.6-25.6s11.462-25.6 25.6-25.6h51.2c14.139 0 25.6 11.461 25.6 25.6s-11.461 25.6-25.6 25.6z"
            ></path>
            <path
              className="path9"
              d="M691.2 614.4h-51.2c-14.139 0-25.6-11.461-25.6-25.6s11.461-25.6 25.6-25.6h51.2c14.139 0 25.6 11.461 25.6 25.6s-11.461 25.6-25.6 25.6z"
            ></path>
            <path
              className="path10"
              d="M844.8 614.4h-51.2c-14.139 0-25.6-11.461-25.6-25.6s11.461-25.6 25.6-25.6h51.2c14.139 0 25.6 11.461 25.6 25.6s-11.461 25.6-25.6 25.6z"
            ></path>
            <path
              className="path11"
              d="M230.4 716.8h-51.2c-14.138 0-25.6-11.461-25.6-25.6s11.462-25.6 25.6-25.6h51.2c14.138 0 25.6 11.461 25.6 25.6s-11.462 25.6-25.6 25.6z"
            ></path>
            <path
              className="path12"
              d="M384 716.8h-51.2c-14.138 0-25.6-11.461-25.6-25.6s11.462-25.6 25.6-25.6h51.2c14.138 0 25.6 11.461 25.6 25.6s-11.462 25.6-25.6 25.6z"
            ></path>
            <path
              className="path13"
              d="M537.6 716.8h-51.2c-14.138 0-25.6-11.461-25.6-25.6s11.462-25.6 25.6-25.6h51.2c14.139 0 25.6 11.461 25.6 25.6s-11.461 25.6-25.6 25.6z"
            ></path>
            <path
              className="path14"
              d="M691.2 716.8h-51.2c-14.139 0-25.6-11.461-25.6-25.6s11.461-25.6 25.6-25.6h51.2c14.139 0 25.6 11.461 25.6 25.6s-11.461 25.6-25.6 25.6z"
            ></path>
            <path
              className="path15"
              d="M844.8 716.8h-51.2c-14.139 0-25.6-11.461-25.6-25.6s11.461-25.6 25.6-25.6h51.2c14.139 0 25.6 11.461 25.6 25.6s-11.461 25.6-25.6 25.6z"
            ></path>
            <path
              className="path16"
              d="M230.4 819.2h-51.2c-14.138 0-25.6-11.461-25.6-25.6s11.462-25.6 25.6-25.6h51.2c14.138 0 25.6 11.461 25.6 25.6s-11.462 25.6-25.6 25.6z"
            ></path>
            <path
              className="path17"
              d="M384 819.2h-51.2c-14.138 0-25.6-11.461-25.6-25.6s11.462-25.6 25.6-25.6h51.2c14.138 0 25.6 11.461 25.6 25.6s-11.462 25.6-25.6 25.6z"
            ></path>
            <path
              className="path18"
              d="M537.6 819.2h-51.2c-14.138 0-25.6-11.461-25.6-25.6s11.462-25.6 25.6-25.6h51.2c14.139 0 25.6 11.461 25.6 25.6s-11.461 25.6-25.6 25.6z"
            ></path>
            <path
              className="path19"
              d="M691.2 819.2h-51.2c-14.139 0-25.6-11.461-25.6-25.6s11.461-25.6 25.6-25.6h51.2c14.139 0 25.6 11.461 25.6 25.6s-11.461 25.6-25.6 25.6z"
            ></path>
            <path
              className="path20"
              d="M844.8 819.2h-51.2c-14.139 0-25.6-11.461-25.6-25.6s11.461-25.6 25.6-25.6h51.2c14.139 0 25.6 11.461 25.6 25.6s-11.461 25.6-25.6 25.6z"
            ></path>
          </svg>
        </div>
        <div news-tab="bbc" className="tab">
          <svg className="lnr lnr-earth">
            <use xlinkHref="#lnr-earth" />
          </svg>
        </div>
        <div news-tab="twitter" className="tab">
          <svg
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 310 310"
            style={{ enableBackground: "new 0 0 310 310" }}
            xmlSpace="preserve"
          >
            <g id="XMLID_826_">
              <path
                id="XMLID_827_"
                d="M302.973,57.388c-4.87,2.16-9.877,3.983-14.993,5.463c6.057-6.85,10.675-14.91,13.494-23.73
      c0.632-1.977-0.023-4.141-1.648-5.434c-1.623-1.294-3.878-1.449-5.665-0.39c-10.865,6.444-22.587,11.075-34.878,13.783
      c-12.381-12.098-29.197-18.983-46.581-18.983c-36.695,0-66.549,29.853-66.549,66.547c0,2.89,0.183,5.764,0.545,8.598
      C101.163,99.244,58.83,76.863,29.76,41.204c-1.036-1.271-2.632-1.956-4.266-1.825c-1.635,0.128-3.104,1.05-3.93,2.467
      c-5.896,10.117-9.013,21.688-9.013,33.461c0,16.035,5.725,31.249,15.838,43.137c-3.075-1.065-6.059-2.396-8.907-3.977
      c-1.529-0.851-3.395-0.838-4.914,0.033c-1.52,0.871-2.473,2.473-2.513,4.224c-0.007,0.295-0.007,0.59-0.007,0.889
      c0,23.935,12.882,45.484,32.577,57.229c-1.692-0.169-3.383-0.414-5.063-0.735c-1.732-0.331-3.513,0.276-4.681,1.597
      c-1.17,1.32-1.557,3.16-1.018,4.84c7.29,22.76,26.059,39.501,48.749,44.605c-18.819,11.787-40.34,17.961-62.932,17.961
      c-4.714,0-9.455-0.277-14.095-0.826c-2.305-0.274-4.509,1.087-5.294,3.279c-0.785,2.193,0.047,4.638,2.008,5.895
      c29.023,18.609,62.582,28.445,97.047,28.445c67.754,0,110.139-31.95,133.764-58.753c29.46-33.421,46.356-77.658,46.356-121.367
      c0-1.826-0.028-3.67-0.084-5.508c11.623-8.757,21.63-19.355,29.773-31.536c1.237-1.85,1.103-4.295-0.33-5.998
      C307.394,57.037,305.009,56.486,302.973,57.388z"
              />
            </g>
          </svg>
        </div>
      </div>
      <div className="tabs-details">
        <div news-tab-detail="news">
          {/* TradingView Widget BEGIN */}
          <div className="tradingview-widget-container">
            {/* ref={this.myRef6} - This passed to the tradingview-widget-container above. Not sure what it does. */}
            <div className="tradingview-widget-container__widget" />
            <div
              className="tradingview-widget-copyright"
              style={{ width: "235px" }}
            >
              <a
                href="https://www.tradingview.com/markets/currencies/economic-calendar/"
                rel="noreferrer"
                target="_blank"
              >
                <span className="blue-text" />
              </a>{" "}
            </div>
          </div>
          {/* TradingView Widget END */}
        </div>
        <div news-tab-detail="bbc">
          <div className="bbc-card">
            <span className="lefted text-uppercase font-size-10">
              BBC NEWS-BUSINESS
            </span>
            <span className="righted text-uppercase font-size-10">
              12 minutes ago
            </span>
            <p className="font-size-12">
              Cladding: Extra cash to deal with crisis expected to be announced
            </p>
          </div>
          <div className="bbc-card">
            <span className="lefted text-uppercase font-size-10">
              BBC NEWS-BUSINESS
            </span>
            <span className="righted text-uppercase font-size-10">
              12 minutes ago
            </span>
            <p className="font-size-12">
              Cladding: Extra cash to deal with crisis expected to be announced
            </p>
          </div>
          <div className="bbc-card">
            <span className="lefted text-uppercase font-size-10">
              BBC NEWS-BUSINESS
            </span>
            <span className="righted text-uppercase font-size-10">
              12 minutes ago
            </span>
            <p className="font-size-12">
              Cladding: Extra cash to deal with crisis expected to be announced
            </p>
          </div>
          <div className="bbc-card">
            <span className="lefted text-uppercase font-size-10">
              BBC NEWS-BUSINESS
            </span>
            <span className="righted text-uppercase font-size-10">
              12 minutes ago
            </span>
            <p className="font-size-12">
              Cladding: Extra cash to deal with crisis expected to be announced
            </p>
          </div>
          <div className="bbc-card">
            <span className="lefted text-uppercase font-size-10">
              BBC NEWS-BUSINESS
            </span>
            <span className="righted text-uppercase font-size-10">
              12 minutes ago
            </span>
            <p className="font-size-12">
              Cladding: Extra cash to deal with crisis expected to be announced
            </p>
          </div>
          <div className="bbc-card">
            <span className="lefted text-uppercase font-size-10">
              BBC NEWS-BUSINESS
            </span>
            <span className="righted text-uppercase font-size-10">
              12 minutes ago
            </span>
            <p className="font-size-12">
              Cladding: Extra cash to deal with crisis expected to be announced
            </p>
          </div>
        </div>
        <div news-tab-detail="twitter" />
      </div>
    </div>
  );
};

export default News;
