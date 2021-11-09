# Cryptocurrency-Scraper
- After download code from GH repo, run 'npm install' in a terminal in the 'client' folder.
- Open a new terminal, go to 'api' folder and run 'nodemon cryptocurrency.js'. 
- Run 'npm start' in the previous terminal, if permission error pops up, run 'cd ..' and 'cd client' should solve the problem.

# Questionnaires:
1. Are there any sub-optimal choices( or short cuts taken due to limited time ) in your implementation?
- For the above scenario there are sub-optimal choices.
- When I was scrapping website with Bitcoin and Ethereum, there are only two websites that I found can be analyzed using my implementation. I did not choose Blockchain or Coinbase since I was not able to fetch from this two website. 
- I was also not able to find two prices (buy/sell) on any of the websites, therefore for buying prices, I recommend the website with smaller number on price, and for selling prices, I recomment the website with larger number on price.
2. Is any part of it over-designed? ( It is fine to over-design to showcase your skills as long as you are clear about it)
- There are no over-designed parts.
4. If you have to scale your solution to 100 users/second traffic what changes would you make, if any?
- I will have to set up cloud based architecture with details of huge amount of users. Back-end will not be needed but if I want to achieve a more secure network then both front-end and back-end will be needed.
5. What are some other enhancements you would have made, if you had more time to do this implementation.
- I could make the website more attractive, also I can add historical graph in which it can better help user decide which website they want to spend more time on.
