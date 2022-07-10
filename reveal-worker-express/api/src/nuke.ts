
import * as dotenv from "dotenv";
import axios from "axios";
import { FanoutClient } from "@glasseaters/hydra-sdk";

import { Connection, Keypair, PublicKey, Transaction } from "@solana/web3.js";
//import { Metaplex } from "@metaplex-foundation/js";
import fs from "fs";
import { getMatchesProgram } from "./contract/matches";

import NodeWallet from "@project-serum/anchor/dist/cjs/nodewallet";

import { Provider } from "@project-serum/anchor";
//var // mod = 0;
//import { PublicKey } from "@solana/web3.js";
let env = "mainnet-beta";
if (fs.existsSync(".env")) {
  const result = dotenv.config();
  if (result.error) {
    throw result.error;
  }
}
let rpcUrl = "https://ssc-dao.genesysgo.net/";

let connection = new Connection(rpcUrl, {
    commitment: "recent",
    confirmTransactionInitialTimeout: 360000,
  });
  const walletKeyPair = Keypair.fromSecretKey(
    new Uint8Array(
      JSON.parse(
        fs.readFileSync("./id.json").toString()
      )
    )
  ); //new Uint8Array(walletKey));
  console.log(`wallet public key: 4${walletKeyPair.publicKey}`);
  setTimeout(async function(){
  const anchorWallet = new NodeWallet(walletKeyPair);
  const anchorProgram = await getMatchesProgram(anchorWallet, env, rpcUrl);
const hydras = await connection.getProgramAccounts(
    new PublicKey("mtchsiT6WoLQ62fwCoiHMCfXJzogtfru4ovY8tXKrjJ"),
   {}
 );
 for (var h of hydras){
    try {
var winOracle = h.pubkey
    const matchInstance = await anchorProgram.fetchMatch(winOracle);
   
    const oracleInstance = await anchorProgram.fetchOracle(winOracle);

    const config = matchInstance.object;
    config.oracleState = oracleInstance.object;

/*
    await anchorProgram.leaveMatch(
        new NodeWallet(walletKeyPair),
        {
          amount: new BN(1000000),
        },
        {
          tokenMint: new PublicKey("rainH85N1vCoerCi4cQ3w6mCf7oYUdrsTFtFzpaRwjL"),
          receiver: walletKeyPair.publicKey,
        },
        {
          winOracle: winOracle,
        }
      );
      
     if (config.authority == walletKeyPair.publicKey.toBase58() || config.authority == walletKeyPair.publicKey){
config.matchState = {"deactivated": true}// = oracleState.finalized = true; 

try {
  setTimeout(async function () {
    console.log(2);
    await anchorProgram.updateMatch(
      {
        matchState: config.matchState || { draft: true },
        tokenEntryValidationRoot: null,
        tokenEntryValidation: config.tokenEntryValidation
          ? config.tokenEntryValidation
          : null,
        winOracleCooldown: new BN(config.winOracleCooldown || 0),
        authority: config.authority
          ? new PublicKey(config.authority)
          : walletKeyPair.publicKey,
        leaveAllowed: config.leaveAllowed,
        joinAllowedDuringStart: config.joinAllowedDuringStart,
        minimumAllowedEntryTime: config.minimumAllowedEntryTime
          ? new BN(config.minimumAllowedEntryTime)
          : null,
      },
      {
        winOracle
      },
      {}
    );
    /*
    await anchorProgram.updateMatchFromOracle(
      {},
      {
        winOracle
      },
      {}
    );
    
  }, 1000);
} catch (err) {
  console.log(err);
} 

try {

    await anchorProgram.drainOracle(
        walletKeyPair,
        {
          seed: winOracle.toBase58(),
          authority: walletKeyPair.publicKey,
        },
        {
          receiver: walletKeyPair.publicKey,
        }
      );
    await anchorProgram.drainMatch(
        {},
        {
          receiver: walletKeyPair.publicKey,
        },
        {
          winOracle
        }
      );
} catch (err){
    console.log(err)
}
}*/
let has = {}
let resp = await axios.get("https://fuckcors2.autist.design/wat2")
for (var ablarg of resp.data.config.oracleState.tokenTransfers){
if (!Object.keys(has).includes(ablarg.from)){
  // @ts-ignore
  has[ablarg.from] = ablarg.amount
}
else {
  // @ts-ignore
  has[ablarg.from]+=ablarg.amount
}
}
console.log(has)
 try {

  const fanout = new PublicKey("ry4Uk5toVJLq7Khavy6SDhwSkHgEhpXCqiGpK5poPsj")
    var fanoutSdk: FanoutClient;
    let connection = new Connection(rpcUrl, "recent")
    const provider = new Provider(connection, anchorWallet, {
      preflightCommitment: 'processed',
    });
    fanoutSdk = new FanoutClient(
      connection,
      provider.wallet
  );
  for (var ablarg2 of Object.keys(has)){
    try {

      const ixs = await fanoutSdk.stakeForTokenMemberInstructions({
        // @ts-ignore
        shares:parseInt(has[ablarg2]) * 0.01,
        fanout: fanout,
        membershipMint: new PublicKey("rainH85N1vCoerCi4cQ3w6mCf7oYUdrsTFtFzpaRwjL"),
        fanoutAuthority: walletKeyPair.publicKey,
        // @ts-ignore
        member: new PublicKey(ablarg2),
        payer: walletKeyPair.publicKey,
        
      });
      const transaction = new Transaction().add(...ixs.instructions);

    transaction.feePayer = walletKeyPair.publicKey;
    transaction.recentBlockhash = (
      await connection.getRecentBlockhash()
    ).blockhash;
    await anchorWallet.signTransaction(transaction);
     connection.sendRawTransaction(
      transaction.serialize(),
      { skipPreflight: false }
    );
  
  } 
  catch (err){
    console.log(err)
  } 
  }

  } catch (err){
      console.log(err)
  }

        } catch (err){
            console.log(err)
        }
 }
},1)