

//example address from bitcoin.
// Private: L4FkVsvM6FLuwJJHzpHJM6fUdG9acX5QqbvtvTSZRtG3Nsa7J8tv
// Public: +
// Address: 1BzFQE9RWjNQEuN2pJTFEHN21LureERhKX



  



const message = "0x70A830C7EffF19c9Dd81Db87107f5Ea5804cbb3F";
const signatureBase64 = "IHe2FvaAsIbIEvb47prSFg3rXNHlE91p2WYtpxIpPA30W6zgvzwc3wQ90nnA12LbL2aKo3a0jjgbN6xM7EOu/hE=";
const btcAddressBase64 = "1BzFQE9RWjNQEuN2pJTFEHN21LureERhKX";

const sig = Buffer.from(signatureBase64, 'base64');
const btcAddress = Buffer.from(btcAddressBase64, 'base64');

//r: 2077b616f680b086c812f6f8ee9ad2160deb5cd1e513dd69d9662da712293c0d
//s: f45bace0bf3c1cdf043dd279c0d762db2f668aa376b48e381b37ac4cec43aefe
//v: 17

const r = sig.subarray(0, 32);
const s = sig.subarray(32,64);
const v = sig[64];


console.log(`r: ${r.toString('hex')}`);
console.log(`s: ${s.toString('hex')}`);
console.log(`v: ${v}`);

//const hash = messageToHashToSign(message);

