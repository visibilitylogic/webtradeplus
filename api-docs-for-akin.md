- To activate a user's  account make a Put request to this endpoint {BaseURL}/api/users/activate/:userId

- To deactivate a user's account make a Put request to this endpoint {BaseURL}/api/users/deactivate/:userId

- For all list/tables that enables you get all data,you have to pass in the page and limit of data to be contentent in each pages to paginate eg - {BaseURL}/api/users/allUser?page=2&limit=10

- To verify a user's  account make a Put request to this endpoint {BaseURL}/api/users/verify/:userId

- To turn on or off a user's autotrade, make a Put request to this endpoint {BaseURL}/api/users/autotrade/:userId, in the body, pass in autotrade as true or false, it is a boolean, to switch it on or off.. eg {"autoTrade":true}

- To update a user's profile image, make a Put request to this endpoint {BaseURL}/api/users/passporte/:userId, in the body, pass in img as base64 encoded string from your image,.. eg {"img": this should be from your frontend image uploaded as base64}

- To update a user's pulse amount make a Put request to this endpoint {BaseURL}/api/users/pulse/:userId, in the body, pass in the pulseType which is either deposit,profit or bonus. pass in the profitLoss which is either true or false. true is for profit and false is loss. pass in the amount wich is of number data type,.. eg {"pulseType": "deposit", "profitLoss":"true,"amount":20000}.
Note: it will throw an error is during any loss transaction, the wallet amounts to zero.


- To get a single user's  withdrawal hsitory make a get request to this endpoint {BaseURL}/api/users/my-withdrawals/:userId

- To get a single user's  deposit hsitory make a get request to this endpoint {BaseURL}/api/users/deposit-history/:userId

- To set a user's  presence as online or offline make a Put request to this endpoint {BaseURL}/api/users/activate/:userId .
it takes in isOnline in the body as a Boolean{"isOnline":true}

# remember only logged in users can perfor all this activities and mostly available for users who are managers
