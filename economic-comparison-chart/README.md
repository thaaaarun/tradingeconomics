This is a simple Single Page Application to demonstrate the use of the Trading Economics API. 
Built with NextJS, React and TypeScript. This web app allows you to compare historical economic data between two countries. 
Data is usually cached for an hour, to reduce API requests, so use the refresh button if you're expecting new data. 

Navigate into the directory `economic-comparison-chart`. 
You must set an environment variable `TRADING_ECONOMICS_API_KEY` with your API Key, in a file called `env.local`.
If it doesn't exist, create it! 

```bash
## Setup and Run 
npm run setup
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
