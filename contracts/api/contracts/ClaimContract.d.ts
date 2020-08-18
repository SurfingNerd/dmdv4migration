/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

import BN from "bn.js";
import { Contract, ContractOptions } from "web3-eth-contract";
import { EventLog } from "web3-core";
import { EventEmitter } from "events";
import { ContractEvent, Callback, TransactionObject, BlockType } from "./types";

interface EventOptions {
  filter?: object;
  fromBlock?: BlockType;
  topics?: string[];
}

export class ClaimContract extends Contract {
  constructor(
    jsonInterface: any[],
    address?: string,
    options?: ContractOptions
  );
  clone(): ClaimContract;
  methods: {
    balances(arg0: string | number[]): TransactionObject<string>;

    getPublicKeyFromBitcoinSignature(
      hashValue: string | number[],
      r: string | number[],
      s: string | number[],
      v: number | string
    ): TransactionObject<string>;

    PublicKeyToBitcoinAddress(
      a_publicKeyX: string | number[],
      a_publicKeyY: string | number[],
      a_nAddressType: number | string
    ): TransactionObject<string>;

    PublicKeyToEthereumAddress(
      a_publicKeyX: string | number[],
      a_publicKeyY: string | number[]
    ): TransactionObject<string>;

    ValidateSignature(
      _hash: string | number[],
      _v: number | string,
      _r: string | number[],
      _s: string | number[],
      _address: string
    ): TransactionObject<boolean>;

    ECDSAVerify(
      _addressClaiming: string,
      _publicKeyX: string | number[],
      _publicKeyY: string | number[],
      _v: number | string,
      _r: string | number[],
      _s: string | number[]
    ): TransactionObject<boolean>;

    checkSignature(
      _hash: string | number[],
      _r: string | number[],
      _s: string | number[],
      _v: number | string
    ): TransactionObject<string>;

    pubKeyToEthAddress(
      pubKeyX: string | number[],
      pubKeyY: string | number[]
    ): TransactionObject<string>;

    calcHash256(data: string | number[]): TransactionObject<string>;

    calculateAddressString(
      _addr: string,
      _includeAddrChecksum: boolean
    ): TransactionObject<string>;

    createClaimMessage(
      _claimToAddr: string,
      _claimAddrChecksum: boolean
    ): TransactionObject<string>;

    getHashForClaimMessage(
      _claimToAddr: string,
      _claimAddrChecksum: boolean
    ): TransactionObject<string>;

    getEthAddressFromSignature(
      _claimToAddr: string,
      _claimAddrChecksum: boolean,
      _v: number | string,
      _r: string | number[],
      _s: string | number[]
    ): TransactionObject<string>;

    claimMessageMatchesSignature(
      _claimToAddr: string,
      _claimAddrChecksum: boolean,
      _pubKeyX: string | number[],
      _pubKeyY: string | number[],
      _v: number | string,
      _r: string | number[],
      _s: string | number[]
    ): TransactionObject<boolean>;
  };
  events: {
    allEvents: (
      options?: EventOptions,
      cb?: Callback<EventLog>
    ) => EventEmitter;
  };
}
