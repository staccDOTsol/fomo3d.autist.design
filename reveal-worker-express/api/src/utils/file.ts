// @ts-nocheck

import { web3 } from "@project-serum/anchor";
import log from "loglevel";
import * as fs from "fs";

export function loadWalletKey(keypair): web3.Keypair {
  if (!keypair || keypair == "") {
    throw new Error("Keypair is required!");
  }
  const loaded = web3.Keypair.fromSecretKey(
    new Uint8Array(JSON.parse(fs.readFileSync(keypair).toString()))
  );
  log.info(`wallet public key:666${loaded.publicKey}`);
  return loaded;
}
