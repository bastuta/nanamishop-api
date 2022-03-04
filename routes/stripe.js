const router = require('express').Router();
const stripe = require('stripe')('sk_test_51KZFN3KQ8THRdw9TsITbn0dsNPpBXPz0xVNYfc1GmcqkPZY9WQ6lBz5rdc9RVvlA6Z7SEtV1WhVyTaU6vP67JiRT00QZb7sWfR');

router.post('/payment', (req, res) => {
    stripe.charges.create(
        {
            source: req.body.tokenId,
            amount: req.body.amount,
            currency: req.body.currency
        }, 
        (stripeErr, stripeRes) => {
            if(stripeErr) 
            {
                res.status(500).json(stripeErr)
            }
            else
            {
                res.status(200).json(stripeRes);
            }
        }
    );
});

module.exports = router;