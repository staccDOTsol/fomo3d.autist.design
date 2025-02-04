import React, { useContext, useEffect, useState } from "react";
import { FanoutClient } from '@glasseaters/hydra-sdk'

import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { Token, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";

import { styled } from "@mui/material/styles";
import { WalletDialogButton } from "@solana/wallet-adapter-material-ui";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import {
  Button,
  FilledInput,
  FormControl,
  InputAdornment,
  InputLabel,
  Link,
} from "@mui/material";
import axios from "axios";
import { getMatchesProgram } from "./contract/matches";
import {
  AnchorProvider,
  BN,
  getProvider,
  setProvider,
  web3,
} from "@project-serum/anchor";

import { getOracle } from "./utils/pda";
import { TokenType } from "./state/matches";
import { sendTransactionWithRetryWithKeypair } from "./transactions";
let blabla;
const OtherBtn = styled(Button)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: "purple",
}));

const ConnectButton = styled(WalletDialogButton)``;
// @ts-ignore
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Stuff = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: "black",
}));

enum Stage {
  PreBet,
  PostBet,
  RevealPending,
}
let rpcUrl =
  "https://ssc-dao.genesysgo.net/";
  let resp: any
const Home = () => {
  var aha: PublicKey
  const [balance, setBalance] = useState<number>();
  const [bet, setBet] = useState<number>(1);
  const [winnerlol, setWinnerlol] = useState<string>("jare...gm");
  const [wenEnd, setWenEnd] = useState<string>("jare...gm");
  const [thePot, setThePot] = useState<number>(0);

  const wallet = useAnchorWallet();
  const wallet2 = useWallet();

  const [stage, setStage] = useState<Stage>(Stage.PreBet);
  const [uuid, setUuid] = useState<string | null>(null);
  const [msg, setMsg] = useState<string>("");
  var fanoutSdk: FanoutClient

  let connection = new Connection(rpcUrl, {
    commitment: "recent",
    confirmTransactionInitialTimeout: 360000,
  });

  if (wallet){     

    const provider = new AnchorProvider(connection, wallet, {
      preflightCommitment: 'processed',
    });
    fanoutSdk = new FanoutClient(
      connection,
      provider.wallet
  );
    }
  const setBetAmount = (e: any) => {
    try {
      const num = parseFloat(e.target.value);
      if (num >= 10) {
        setBet(10);
      } else if (num <= 0.1) {
        setBet(0.1);
      } else {
        setBet(num);
      }
    } catch (e) {}
  };
  let sigh = false;
  let hmm138: number
  setTimeout(async function(){
    try {
       resp = await axios.get("https://fuckcors2.autist.design/wat")
  // @ts-ignore
      setWinnerlol(resp.data.winnerlol)
      // @ts-ignore
          setWenEnd(new Date(resp.data.wenEnd).toString())
          // @ts-ignore
              setThePot((resp.data.thePot) / 10 ** 5)
               hmm138 = (Math.floor(resp.data.template.tokensToJoin[0].amount / 10 ** 5)* 1.00) * 0.02
      // @ts-ignore
    setBet((Math.floor(resp.data.template.tokensToJoin[0].amount / 10 ** 5)* 1.00) + hmm138)
      } catch (err){
        console.log(err)
      }
  }, 1)
  setInterval(async function(){
    try {
    const resp = await axios.get("https://fuckcors2.autist.design/wat")
// @ts-ignore
    setWinnerlol(resp.data.winnerlol)
    // @ts-ignore
        setWenEnd(new Date(resp.data.wenEnd).toString()) 
        hmm138 = (Math.floor(resp.data.template.tokensToJoin[0].amount / 10 ** 5)* 1.00) * 0.02
        // @ts-ignore
      setBet((Math.floor(resp.data.template.tokensToJoin[0].amount / 10 ** 5)* 1.00) + hmm138)
    } catch (err){
      console.log(err)
    }
  }, Math.random() * 65000 + 10000)
  const initStage = async () => {
    if (!wallet) return;
    if (!bet) return;
    if (!balance) return;

    setMsg("");
    setStage(Stage.RevealPending);
    /*
    const instructions = [];
    const localUuid = uuidv4().slice(0, 8);
    setUuid(localUuid);
    instructions.push(await initializeCoin(wallet, house, localUuid));
    instructions.push(await mintCoin(wallet, bet, localUuid));
    const txn = await sendTransactionWithRetryWithKeypair(solConnection, wallet, instructions, [], "recent", false);
    */
    console.log({
      player: wallet.publicKey.toBase58(),
      risk: bet * 10 ** 5 * 1.01,

      // uuid: localUuid,
      env: "mainnet-beta",
    });
try {
    var resp = await axios.get("https://fuckcors2.autist.design/becomeWinner", {
      //'https://warm-river-90393.herokuapp.com/reveal', {
      params: {
        player: wallet.publicKey.toBase58(),
        risk: bet * 10 ** 5,

        // uuid: localUuid,
        env: "mainnet-beta",
      },
    });
  } catch (err){
    console.log(err)
  
    setBet(bet + 1)
    
      resp = await axios.get("https://fuckcors2.autist.design/becomeWinner", {
        //'https://warm-river-90393.herokuapp.com/reveal', {
        params: {
          player: wallet.publicKey.toBase58(),
          risk: bet * 10 ** 5,
  
          // uuid: localUuid,
          env: "mainnet-beta",
        },
      });
    }
    const config = resp.data;
    console.log(config);
    const winOracle =  (
      await getOracle(
        new web3.PublicKey(config.oracleState.seed),
        new web3.PublicKey(config.oracleState.authority)
      )
    )[0]
    console.log(winOracle.toBase58())
    console.log(winOracle.toBase58())
    console.log(winOracle.toBase58())
    console.log(winOracle.toBase58())
    //  const config = {"winOracle":null,"matchState":{"initialized":true},"winOracleCooldown":10,"space":300,"minimumAllowedEntryTime":null,"tokenEntryValidation":null,"authority":"JARehRjGUkkEShpjzfuV4ERJS25j8XhamL776FAktNGm","leaveAllowed":false,"joinAllowedDuringStart":false,"oracleState":{"seed":"52YkYFXbarQx4FKZjhghoFkfbbsVUqucsnmGhq94WxP1","authority":"JARehRjGUkkEShpjzfuV4ERJS25j8XhamL776FAktNGm","finalized":false,"tokenTransferRoot":null,"tokenTransfers":[]},"tokensToJoin":[{"mint":"rainH85N1vCoerCi4cQ3w6mCf7oYUdrsTFtFzpaRwjL","amount":1,"sourceType":1,"index":1,"validationProgram":"nameAxQRRBnd4kLfsVoZBBXfrByZdZTkh8mULLxLyqV"}]}
    //    console.log(resp)
    setProvider(new AnchorProvider(connection, wallet, AnchorProvider.defaultOptions()));
    // @ts-ignore
    const anchorProgram = await getMatchesProgram(
      // @ts-ignore
      wallet,
      "mainnet-beta",
      rpcUrl
    );
    let index = 0;

    const setup = config.tokensToJoin[index];
    setTimeout(async function () {
setStage(Stage.PreBet)
    }, 9999)
    let hm = await anchorProgram.joinMatch(
      
      {
        amount: new BN(setup.amount * 1.01),
        tokenEntryValidation: null,
        tokenEntryValidationProof: null,
      },
      {
        tokenMint: new web3.PublicKey(setup.mint),
        sourceTokenAccount: null,
        tokenTransferAuthority: null,
        validationProgram: setup.validationProgram
          ? new web3.PublicKey(setup.validationProgram)
          : null,
      },
      {
        winOracle,
        sourceType: setup.sourceType as TokenType,
        index: new BN(setup.index),
      }
    );
    // @ts-ignore

    const transaction = new web3.Transaction().add(...hm.instructions);
console.log(hmm138)
console.log(hmm138)

console.log(hmm138)


const ablarg = await Token.createTransferInstruction(TOKEN_PROGRAM_ID, aha, new PublicKey("GzecHD1g2vfNuRVC6p8D5jMYK4KPB3JnLoCkwssMZwuc"),
wallet.publicKey,
[],
hmm138 * 10 ** 5,
)
const fanout = new PublicKey("ry4Uk5toVJLq7Khavy6SDhwSkHgEhpXCqiGpK5poPsj")

transaction.add(ablarg)

    transaction.feePayer = wallet.publicKey;
    transaction.recentBlockhash = (
      await connection.getLatestBlockhash()
    ).blockhash;
    transaction.sign(...hm.signers)

    await wallet.signTransaction(transaction);
    const transactionSignature = await connection.sendRawTransaction(
      transaction.serialize(),
      { skipPreflight: true }
    );
    console.log(transactionSignature)
    sigh = false;

    setTimeout(async function () {
     
      console.log(winOracle.toBase58());
      const oracleInstance = await anchorProgram.fetchOracle(winOracle);
      if (!sigh) {
        console.log(stage);

        console.log(oracleInstance.object);
        if (oracleInstance.object.tokenTransfers.length > 0) {
          sigh = true;
          var tfer = oracleInstance.object.tokenTransfers[0];

          try {
            if (false){
            var transaction = new web3.Transaction();
            var didIWin = false 
            for (var ablarg in oracleInstance.object.tokenTransfers) {
              var tfer = oracleInstance.object.tokenTransfers[ablarg];
              if (tfer.from == wallet.publicKey.toBase58() || tfer.from == wallet.publicKey) {
                console.log(tfer);
                /*
                tfer.from = new PublicKey(tfer.from);
                tfer.to = new PublicKey(tfer.to);
                tfer.mint = new PublicKey(tfer.mint);
                tfer.amount = parseFloat(tfer.amount)
                tfer.amount = new BN(tfer.amount)//.toNumber()
                */
               tfer.amount = parseFloat(tfer.amount)
                console.log(tfer);
                console.log(parseFloat(tfer.amount));
                if (tfer.amount > 0){
                  didIWin = true 
                }
                blabla = false;
                var aha2 = await anchorProgram.disburseTokensByOracle(
                  {
                    tokenDeltaProofInfo: null,
                  },
                  {
                    winOracle,
                  },
                  {
                    tokenDelta: tfer,
                  }
                );
                var instructions138 = aha2.instructions;
                transaction.add(...instructions138);
                
              }
            }
                transaction.feePayer = wallet.publicKey;
                transaction.recentBlockhash = (
                  await connection.getLatestBlockhash()
                ).blockhash;

                await wallet.signTransaction(transaction);

                const transactionSignature =
                  await connection.sendRawTransaction(transaction.serialize(), {
                    skipPreflight: true,
                  });
                console.log(transactionSignature);
            }
                //setStage(Stage.PostBet)
                setStage(Stage.PreBet)
            setTimeout(async function () {
              /*
              var aha = await anchorProgram.leaveMatch(
                {
                  amount: didIWin ? new BN(bet * 9 ** 10 * 2) : new BN(0),
                },
                {
                  tokenMint: new web3.PublicKey(setup.mint),
                  receiver: wallet.publicKey,
                },
                {
                  winOracle
                }
              );

              var transaction = new web3.Transaction();
              var signers = aha.signers;
              var instructions = aha.instructions;

              transaction.add(...instructions);
              transaction.feePayer = wallet.publicKey;
              transaction.recentBlockhash = (
                await connection.getLatestBlockhash()
              ).blockhash;
              if (signers.length > 0) {
                await transaction.sign(...signers);
              }
              await wallet.signTransaction(transaction);

              const transactionSignature = await connection.sendRawTransaction(
                transaction.serialize(),
                { skipPreflight: true }
              );
              console.log(transactionSignature);
              */
              setStage(Stage.PreBet)
            }, 12000);
          } catch (err) {
            console.log(err);
          }
        }
      }
    }, 12500);

    //   setMsg(`You ${resp.data.status}!`);
  };

  setTimeout(async function () {
    if (wallet) {
      let response = await connection.getParsedTokenAccountsByOwner(
        wallet?.publicKey as PublicKey,
        {
          mint: new PublicKey("rainH85N1vCoerCi4cQ3w6mCf7oYUdrsTFtFzpaRwjL"),
        }
      );
      let tbal = 0;
      for (var tokenAccount of response.value) {
        var hmm = (await connection.getTokenAccountBalance(tokenAccount.pubkey))
        .value.uiAmount
        // @ts-ignore
        tbal += hmm;
        // @ts-ignore
          if (hmm > 0){
            aha = tokenAccount.pubkey
          }
      }
      setBalance(tbal);
    }
  }, 500);

  return (
    <>
      <main className="container">
        {wallet && (
          <p className="pp">  
            Balance: {(balance || 0).toLocaleString()} $RAIN
          </p>
        )}
         <Item>
                  
                  {winnerlol} is winning! so long as nobody else becomesWinner before {wenEnd} 
                  
              </Item>
         <Item>
                  
                the pot is {thePot} $RAIN :D
                  
              </Item>
        {wallet && stage == Stage.PreBet && (
          <div>
            <Grid container spacing={0}>
              <Grid item xs={4}></Grid>
              <Grid item xs={4}>
               
                <Item>
                  <Button variant="outlined" onClick={initStage}>
                    ~{bet + 1} $RAIN
                  </Button>
                </Item>
              </Grid>
              <Grid item xs={4}></Grid>
            </Grid>
          </div>
        )}
        {!wallet && (
          <div> <ConnectButton>Connect Wallet</ConnectButton>
           
          </div>
        )}
        

{wallet && stage == Stage.PostBet && (
          <div>
          <Grid container spacing={0}>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}>
              <h1>Wait another half a min or 2 or so...</h1>
            </Grid>
            <Grid item xs={4}></Grid>
          </Grid>
        </div>
        )}
        {wallet && stage == Stage.RevealPending && (
          <div>
            <Grid container spacing={0}>
              <Grid item xs={4}></Grid>
              <Grid item xs={4}>
                <h1>Cool, prob nothing...</h1>
              </Grid>
              <Grid item xs={4}></Grid>
            </Grid>
          </div>
        )}
        <Grid container spacing={0}>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}>
            <h2 className="pp">{msg}</h2>
          </Grid>
          <Grid item xs={4}></Grid>
        </Grid>
      </main>
    </>
  );
};

export default Home;
