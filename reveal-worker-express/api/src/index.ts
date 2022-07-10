import express, { Request, Response } from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { handleRequest } from "./coin-flip/handler";
import { Keypair } from "@solana/web3.js";
//import { Metaplex } from "@metaplex-foundation/js";

import fs from "fs";
import { getMatchesProgram } from "./contract/matches";
import { BN, web3 } from "@project-serum/anchor";
import { getOracle } from "./utils/pda";
import NodeWallet from "@project-serum/anchor/dist/cjs/nodewallet";
//import { PublicKey } from "@solana/web3.js";
var bodyParser = require("body-parser");
let env = "mainnet-beta";
if (fs.existsSync(".env")) {
  const result = dotenv.config();
  if (result.error) {
    throw result.error;
  }
}

const app = express();
app.use(bodyParser());
app.use(cors());

app.get("/", (_: Request, res: Response) => {
  res.send({
    message:
      "Dont forget to tip https://twitter.com/STACCoverflow ; hey silly u are in the wrong place :) go to the one without the prepended  www. ha \n you are lookin for https://fomo3d.autist.design catch y'all on da fomo",
  });
});

app.get("/api", (_: Request, res: Response) => {
  res.send({ message: "api is connected" });
});
app.get("/wat", async (_: Request, res: Response) => {
  let tconfig = config ;
  tconfig.oracleState.tokenTransfers = []
res.send({template:tconfig, winnerlol, wenEnd, thePot})

})

app.get("/wat2", async (_: Request, res: Response) => {
  let tconfig = config ;
  let has = []
  for (var ablarg of tconfig.oracleState.tokenTransfers){
    // @ts-ignore
has.push({from: ablarg.from, amount: ablarg.amount})
  }
  // @ts-ignore
  tconfig.oracleState.tokenTransfers = has
res.send({template:tconfig, winnerlol, wenEnd, thePot})

})
app.get("/becomeWinner", async (req: Request, res: Response) => {
  try {

    if (parseFloat(req.query.risk as string) >= config.tokensToJoin[0].amount * 0.985){
      config.tokensToJoin[0].amount = Math.floor(parseInt(req.query.risk as string)) 
      setTimeout(async function(){
      config.tokensToJoin[0].amount = Math.floor(parseInt(req.query.risk as string)) * 1.01 
      }, 10222)
      console.log("gud");
      const walletKeyPair = Keypair.fromSecretKey(
        new Uint8Array(
          JSON.parse(
            fs.readFileSync("../reveal-worker-express/id.json").toString()
          )
        )
      ); //new Uint8Array(walletKey));
      const anchorWallet = new NodeWallet(walletKeyPair);
      console.log(`wallet public key:3 ${walletKeyPair.publicKey}`);
      console.log("joinnnnin");
      const anchorProgram = await getMatchesProgram(anchorWallet, env, rpcUrl);


      try {
        setTimeout(async function(){
          /*
      const ixs = await fanoutSdk.stakeForTokenMemberInstructions({
        shares,//parseInt(req.query.risk as string) * 0.01,
        fanout: fanout,
        membershipMint: new PublicKey("rainH85N1vCoerCi4cQ3w6mCf7oYUdrsTFtFzpaRwjL"),
        fanoutAuthority: walletKeyPair.publicKey,
        member: new PublicKey(req.query.player as string),
        payer: walletKeyPair.publicKey,
        
      });
      const transaction = new web3.Transaction().add(...ixs.instructions);

    transaction.feePayer = walletKeyPair.publicKey;
    transaction.recentBlockhash = (
      await connection.getRecentBlockhash()
    ).blockhash;
    await anchorWallet.signTransaction(transaction);
     connection.sendRawTransaction(
      transaction.serialize(),
      { skipPreflight: false }
    );*/
     }, 90000)
      } catch (err){
        console.log(err)
      }
      console.log("bla");
      setTimeout(async function () {
        try {
          const winOracle = (
            await getOracle(
              new web3.PublicKey(config.oracleState.seed),

              config.oracleState.authority
                ? new web3.PublicKey(config.oracleState.authority)
                : walletKeyPair.publicKey
            )
          )[0];

          const matchInstance = await anchorProgram.fetchMatch(winOracle);
          const u = matchInstance.object;
          console.log(u.tokenTypesAdded.toNumber())
try {
                console.log(u);


                  config.oracleState.tokenTransfers.push(
                    {
                      // auth 0; hydra 102% ; 198% player
                      // @ts-ignore
                      from: req.query.player,
                      // @ts-ignore
                      to: req.query.player,
                      // @ts-ignore
                      tokenTransferType: { normal: true },

                      // @ts-ignore
                      mint: "rainH85N1vCoerCi4cQ3w6mCf7oYUdrsTFtFzpaRwjL",
                      // @ts-ignore
                      amount: config.tokensToJoin[0].amount ,
                    }
                  )
                var hmblarg = 0;
                for (var blarg of config.oracleState.tokenTransfers) {
                  if (blarg) {
                    // @ts-ignore
                    console.log(blarg.amount);
                    // @ts-ignore
                    hmblarg += blarg.amount;
                  }
                }
             //   config.space+=138
                console.log(hmblarg / 10 ** 5);


                console.log(config.oracleState.tokenTransfers.length);
                winnerlol = req.query.player as string
                wenEnd = new Date().getTime() + 1000 * 60 * 60 * 24
                thePot+=parseInt(req.query.risk as string)
/*
                // var done = false;
                if (true) {
                  try {
                    await anchorProgram.createOrUpdateOracle({
                      seed: config.oracleState.seed,
                      authority: config.oracleState.authority
                        ? new web3.PublicKey(config.oracleState.authority)
                        : walletKeyPair.publicKey,
                      tokenTransferRoot: config.oracleState.tokenTransferRoot,
                      tokenTransfers: config.oracleState.tokenTransfers,
                      space: config.space ? new BN(config.space) : new BN(500),
                      finalized: config.oracleState.finalized,
                    });
                    

                    await anchorProgram.updateMatchFromOracle(
                      {},
                      {
                        winOracle: config.winOracle
                          ? new web3.PublicKey(config.winOracle)
                          : (
                              await getOracle(
                                new web3.PublicKey(config.oracleState.seed),
  
                                config.oracleState.authority
                                  ? new web3.PublicKey(
                                      config.oracleState.authority
                                    )
                                  : walletKeyPair.publicKey
                              )
                            )[0],
                      },
                      {}
                    );
                  } catch (err) {
                    console.log(err);
                  }
                }
                */

              } catch (err) {
                console.log(err);
              }
            
          
        } catch (err) {
          console.log(err);
        }
      }, 32000);
      
      res.send(config);
    } else {
      res.send(500);
    }
    
  } catch (err) {
    console.log(err);
  }
  fs.writeFileSync("./thisiscool.json", JSON.stringify(config))
});

let winnerlol: string
let wenEnd: number = new Date().getTime() + 1000 * 60 * 60 * 24
let thePot: number = 0
app.get("/reveal", async (req: express.Request, res: express.Response) => {
  res.header("Access-Control-Allow-Origin", "https://fair3d.me");
  // @ts-ignore
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
  );
  // @ts-ignore
  res.json(
    // @ts-ignore
    await handleRequest(req.query.player, req.query.uuid, req.query.env)
  );
});
let config = {
  winOracle: null,
  matchState: { initialized: true },
  winOracleCooldown: 0,
  space: 500,
  minimumAllowedEntryTime: null,
  tokenEntryValidation: null,
  authority: "JARehRjGUkkEShpjzfuV4ERJS25j8XhamL776FAktNGm",
  leaveAllowed: true,
  joinAllowedDuringStart: true,
  oracleState: {
    seed: new Keypair().publicKey.toBase58(),
    authority: "JARehRjGUkkEShpjzfuV4ERJS25j8XhamL776FAktNGm",
    finalized: false,
    tokenTransferRoot: null,
    tokenTransfers: [],
  },
  tokensToJoin: [
    {
      mint: "rainH85N1vCoerCi4cQ3w6mCf7oYUdrsTFtFzpaRwjL",
      amount: 1 * 10 ** 5,
      sourceType: 1,
      index: 1,
      validationProgram: "nameAxQRRBnd4kLfsVoZBBXfrByZdZTkh8mULLxLyqV",
    },
  ],
};
config =  JSON.parse(fs.readFileSync("./thisiscool.json").toString())
let rpcUrl = "https://ssc-dao.genesysgo.net/";

setTimeout(async function () {
  try {

      //const walletKeyPair = loadWalletKey('../reveal-worker-express/id.json');
      const walletKeyPair = Keypair.fromSecretKey(
        new Uint8Array(
          JSON.parse(
            fs.readFileSync("../reveal-worker-express/id.json").toString()
          )
        )
      ); //new Uint8Array(walletKey));
      console.log(`wallet public key: 4${walletKeyPair.publicKey}`);
      const anchorWallet = new NodeWallet(walletKeyPair);

      const anchorProgram = await getMatchesProgram(anchorWallet, env, rpcUrl);

      console.log("a");
        await anchorProgram.createOrUpdateOracle({
          seed: config.oracleState.seed,
          authority: config.oracleState.authority
            ? new web3.PublicKey(config.oracleState.authority)
            : walletKeyPair.publicKey,
          tokenTransferRoot: config.oracleState.tokenTransferRoot,
          tokenTransfers: config.oracleState.tokenTransfers,
          space: config.space ? new BN(config.space) : new BN(500),
          finalized: config.oracleState.finalized,
        });
        console.log("b");
        await anchorProgram.createMatch(
          {
            winOracle: config.winOracle
              ? new web3.PublicKey(config.winOracle)
              : (
                  await getOracle(
                    new web3.PublicKey(config.oracleState.seed),

                    config.oracleState.authority
                      ? new web3.PublicKey(config.oracleState.authority)
                      : walletKeyPair.publicKey
                  )
                )[0],
            matchState: config.matchState || { draft: true },
            tokenEntryValidationRoot: null,
            tokenEntryValidation: config.tokenEntryValidation
              ? config.tokenEntryValidation
              : null,
            winOracleCooldown: new BN(config.winOracleCooldown || 0),
            authority: config.authority
              ? new web3.PublicKey(config.authority)
              : walletKeyPair.publicKey,
            space: config.space ? new BN(config.space) : new BN(500),
            leaveAllowed: config.leaveAllowed,
            joinAllowedDuringStart: config.joinAllowedDuringStart,
            minimumAllowedEntryTime: config.minimumAllowedEntryTime
              ? new BN(config.minimumAllowedEntryTime)
              : null,
          },
          {},
          config.oracleState
        );
   // @ts-ignore
   
  config.matchState = { initialized: true };

  await anchorProgram.updateMatch(
    {
      matchState: config.matchState || { draft: true },
      tokenEntryValidationRoot: null,
      tokenEntryValidation: config.tokenEntryValidation
        ? config.tokenEntryValidation
        : null,
      winOracleCooldown: new BN(config.winOracleCooldown || 0),
      authority: config.authority
        ? new web3.PublicKey(config.authority)
        : walletKeyPair.publicKey,
      leaveAllowed: config.leaveAllowed,
      joinAllowedDuringStart: config.joinAllowedDuringStart,
      minimumAllowedEntryTime: config.minimumAllowedEntryTime
        ? new BN(config.minimumAllowedEntryTime)
        : null,
    },
    {
      winOracle: config.winOracle
        ? new web3.PublicKey(config.winOracle)
        : (
            await getOracle(
              new web3.PublicKey(config.oracleState.seed),

              config.oracleState.authority
                ? new web3.PublicKey(config.oracleState.authority)
                : walletKeyPair.publicKey
            )
          )[0],
    },
    {}
  );
  console.log(138)
      } catch (err) {
        if (err.toString().indexOf("already been processed") == -1) {
          console.log(err);
        }
      }
  
}, 500);
// @ts-ignore to fix this, add .env
app.listen(process.env.PORT || 4000, () => {
  console.log("Server is running " + process.env.PORT );
});
