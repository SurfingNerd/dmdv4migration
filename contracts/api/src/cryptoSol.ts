
import Web3 from 'web3';
import ClaimContract from '../contracts/ClaimContract';
import { ensure0x, stringToUTF8Hex } from './cryptoHelpers';
import { BN } from 'ethereumjs-util';
import { CryptoJS } from './cryptoJS';
import { hexToBuf } from './cryptoHelpers';
import { bufferToHex } from 'ethereumjs-util';
/**
 * Crypto functions used in this project implemented in Soldity.
 */
export class CryptoSol {
  
  public cryptoJS = new CryptoJS();
  
  private logDebug: boolean = false; 


  public constructor(public web3Instance: Web3, public instance : ClaimContract.ClaimContract) {
    
    if (instance === undefined || instance === null) {
      throw Error("Claim contract must be defined!!");
    }

  }

  public setLogDebug(value: boolean) {
    this.logDebug = value;
    this.cryptoJS.setLogDebug(value);
  }

  private log(message: string, ...params: any[]) {
    if (this.logDebug) {
      console.log(message, ...params);
    }
  }


  public addressToHashToSign(address: string) {

  }

  /**
   * Retrieves the message that is used for hashing in bitcoin. (enpacking it with the Envolope)
   * see also: https://bitcoin.stackexchange.com/questions/77324/how-are-bitcoin-signed-messages-generated
   * @param address Ethereum style address, include checksum information.
   */
  public async addressToClaimMessage(address: string, postfix: string = '') : Promise<string> {

    const postfixHex = stringToUTF8Hex(postfix);
    const claimMessage =  await this.instance.methods.createClaimMessage(address, true, postfixHex).call();
    this.log('Claim Message:');
    this.log(claimMessage);
    return claimMessage;
  }

  public async messageToHash(messageString: string) {

    const buffer = Buffer.from(messageString, 'utf-8');
    const hash =  await this.instance.methods.calcHash256(buffer.toString('hex')).call();
    this.log('messageToHash');
    this.log(hash);
    return hash;
  }


  public async claimMessageMatchesSignature(
    claimToAddress: string,
    addressContainsChecksum: boolean,
    postfix: string,
    pubkeyX: string,
    pubkeyY: string,
    sigV: string,
    sigR: string,
    sigS: string) :
    Promise<boolean>
    {
      const result = 
        await this.instance.methods.claimMessageMatchesSignature(
          claimToAddress, 
          addressContainsChecksum,
          stringToUTF8Hex(postfix),
          ensure0x(pubkeyX),
          ensure0x(pubkeyY),
          ensure0x(sigV),
          ensure0x(sigR),
          ensure0x(sigS)).call();
      this.log('Claim Result: ', result);
      return result;
    }

    public async getEthAddressFromSignature(
      claimToAddress: string,
      addressContainsChecksum: boolean,
      postfix: string,
      sigV: string,
      sigR: string | Buffer,
      sigS: string | Buffer) 
      : Promise<string> {

      return this.instance.methods.getEthAddressFromSignature(
        claimToAddress, 
        addressContainsChecksum,
        stringToUTF8Hex(postfix),
        ensure0x(sigV),
        ensure0x(sigR), 
        ensure0x(sigS)
      ).call();
    }

    /**
     * returns the essential part of a Bitcoin-style legacy compressed address associated with the given ECDSA public key
     * @param x X coordinate of the ECDSA public key
     * @param y Y coordinate of the ECDSA public key
     * @returns Hex string holding the essential part of the legacy compressed address associated with the given ECDSA public key
     */
    async publicKeyToBitcoinAddressEssential(x: BN, y: BN) : Promise<string> {
      const legacyCompressedEnumValue = 1;
      return this.instance.methods.publicKeyToBitcoinAddress(
        '0x' + x.toString('hex'),
        '0x' + y.toString('hex'), legacyCompressedEnumValue).call();
    }

    async publicKeyToBitcoinAddress(x: BN, y: BN, addressPrefix: string) {
      const essentialPart = await this.publicKeyToBitcoinAddressEssential(x, y);
      return this.cryptoJS.bitcoinAddressEssentialToFullQualifiedAddress(essentialPart, addressPrefix);
    }

    public async pubKeyToEthAddress(x: string, y: string) {
      return this.instance.methods.pubKeyToEthAddress(x, y).call();
    }

    public async prefixString() {

      const bytes = await this.instance.methods.prefixStr().call();
      const buffer = hexToBuf(bytes);
      return new TextDecoder("utf-8").decode(buffer);

      //return stringToUTF8Hex
    }

    public async addBalance(dmdV3Address: string, value: string) {

      const accounts = await this.web3Instance.eth.getAccounts();
      const fromAccount = accounts[0];
      const ripe = this.cryptoJS.dmdAddressToRipeResult(dmdV3Address);
      await this.instance.methods.addBalance(ensure0x(ripe)).send({ value: value, from: fromAccount});
    }

    public async getBalance(dmdV3Address: string) {

      const ripe = this.cryptoJS.dmdAddressToRipeResult(dmdV3Address);
      return await this.instance.methods.balances(ensure0x(ripe)).call();
    }

    public async getContractBalance() {

      return await this.web3Instance.eth.getBalance(this.instance.options.address);
    }
  
}
