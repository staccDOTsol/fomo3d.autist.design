import React, {useContext, useEffect, useState} from "react";
import {Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction} from "@solana/web3.js";
import {useAnchorWallet, useConnection, useWallet} from "@solana/wallet-adapter-react";

import {styled} from '@mui/material/styles';
import {WalletDialogButton} from "@solana/wallet-adapter-material-ui";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import {Button, FilledInput, FormControl, InputAdornment, InputLabel} from "@mui/material";
import axios from "axios";
import { getMatchesProgram } from "./contract/matches";
import { Provider, BN, getProvider, setProvider, web3 } from "@project-serum/anchor";

import { getOracle } from "./utils/pda";
import { TokenType } from "./state/matches";
import { sendTransactionWithRetryWithKeypair } from "./transactions";
let blabla
const ConnectButton = styled(WalletDialogButton)``;
// @ts-ignore
const Item = styled(Paper)(({theme}) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

enum Stage {
  PreBet,
  RevealPending
}
let rpcUrl = "https://solana--mainnet.datahub.figment.io/apikey/24c64e276fc5db6ff73da2f59bac40f2"

const Home = () => {

  const [balance, setBalance] = useState<number>();
  const [bet, setBet] = useState<number>(0.001);
  const wallet = useAnchorWallet();
  const wallet2 = useWallet();

  const [stage, setStage] = useState<Stage>(Stage.PreBet);
  const [uuid, setUuid] = useState<string | null>(null);
  const [msg, setMsg] = useState<string>("");

  const setBetAmount = (e: any) => {
    try {
      const num = parseFloat(e.target.value);
      if (num >= 0.138) {
        setBet(0.138);
      } else if (num <= 0.001) {
        setBet(0.001);
      } else {
        setBet(num);
      }
    } catch (e) {
    }
  }

  const initStage = async () => {
    if (!wallet) return;
    if (!bet) return;
    if (!balance) return;

    setMsg('');
    setStage(Stage.RevealPending);
    /*
    const instructions = [];
    const localUuid = uuidv4().slice(0, 8);
    setUuid(localUuid);
    instructions.push(await initializeCoin(wallet, house, localUuid));
    instructions.push(await mintCoin(wallet, bet, localUuid));
    const txn = await sendTransactionWithRetryWithKeypair(solConnection, wallet, instructions, [], "confirmed", false);
    */
   console.log({
    player: wallet.publicKey.toBase58(),
    risk: bet * 10 ** 9,
    
   // uuid: localUuid,
    env: "mainnet-beta"
  } )
    
    const resp = await axios.get('https://www.autist.design/join', {//'https://warm-river-90393.herokuapp.com/reveal', {
      params: {
        player: wallet.publicKey.toBase58(),
        risk: bet  * 10 ** 9,
        
       // uuid: localUuid,
        env: "mainnet-beta"
      } 
    });
    const config = resp.data
    console.log(config)
 //  const config = {"winOracle":null,"matchState":{"initialized":true},"winOracleCooldown":10,"space":300,"minimumAllowedEntryTime":null,"tokenEntryValidation":null,"authority":"JARehRjGUkkEShpjzfuV4ERJS25j8XhamL776FAktNGm","leaveAllowed":false,"joinAllowedDuringStart":false,"oracleState":{"seed":"52YkYFXbarQx4FKZjhghoFkfbbsVUqucsnmGhq94WxP1","authority":"JARehRjGUkkEShpjzfuV4ERJS25j8XhamL776FAktNGm","finalized":false,"tokenTransferRoot":null,"tokenTransfers":[]},"tokensToJoin":[{"mint":"DuYjPmjmWnYsuAhGU5RXceUoDMB1Nfonf8GkpQYzUUJU","amount":1,"sourceType":1,"index":1,"validationProgram":"nameAxQRRBnd4kLfsVoZBBXfrByZdZTkh8mULLxLyqV"}]}
//    console.log(resp)
setProvider(new Provider(connection, wallet, Provider.defaultOptions()));
// @ts-ignore
    const anchorProgram = await getMatchesProgram(wallet, 'mainnet-beta', rpcUrl);
    let index = 0
   
      const setup = config.tokensToJoin[index];
    let hm =  await anchorProgram.joinMatch(
        {
          amount: new BN(setup.amount),
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
          winOracle:  (
                await getOracle(
                  new web3.PublicKey(config.oracleState.seed),
 new web3.PublicKey(config.oracleState.authority)
                )
              )[0],
          sourceType: setup.sourceType as TokenType,
          index:new BN(setup.index),
        }
      );     
      // @ts-ignore
      
      const transaction = new web3.Transaction().add(...hm.instructions);
      transaction.feePayer = wallet.publicKey;
      transaction.recentBlockhash = (await connection.getRecentBlockhash()).blockhash;
      // @ts-ignore
     await transaction.sign(...hm.signers)
    await  wallet.signTransaction(transaction)
      const transactionSignature = await connection.sendRawTransaction(
        transaction.serialize(),
        { skipPreflight: false }
      );
    
    let winOracle = (
          await getOracle(
            new web3.PublicKey(config.oracleState.seed),
            config.oracleState.authority
              ? new web3.PublicKey(config.oracleState.authority)
              : wallet.publicKey
          )
        )[0];
      setInterval(async function(){
        const oracleInstance = await anchorProgram.fetchOracle(winOracle);

        if (!Stage.PreBet){
          console.log(oracleInstance.object)
var tfer = oracleInstance.object.tokenTransfers[0];

if (tfer){

  try {
  const transaction2 = new web3.Transaction()


for (var ablarg in oracleInstance.object.tokenTransfers){

  var tfer = oracleInstance.object.tokenTransfers[ablarg];

// @ts-ignore
tfer.from = new PublicKey(tfer.from)
// @ts-ignore
tfer.to = new PublicKey(tfer.to)
// @ts-ignore
tfer.from = new PublicKey(tfer.from)
  if (!oracleInstance.object.finalized && tfer.from== wallet.publicKey.toBase58()){
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
  // @ts-ignore
  let instructions138 = aha2.instructions
transaction2.add(...instructions138);
// @ts-ignore
if (aha2.signers.length > 0){
  // @ts-ignore
  await transaction2.sign(...aha2.signers)
 }
  }
  // @ts-ignore
  transaction2.feePayer = wallet.publicKey
  // @ts-ignore
  transaction2.recentBlockhash = (await connection.getRecentBlockhash()).blockhash;

await  wallet.signTransaction(transaction2)
  
 var aha = await anchorProgram.leaveMatch(
    {
      amount: new BN(setup.amount),
    },
    {
      tokenMint: new web3.PublicKey(setup.mint),
      receiver: wallet.publicKey,
    },
    {
      winOracle: config.winOracle
        ? new web3.PublicKey(config.winOracle)
        : (
            await getOracle(
              new web3.PublicKey(config.oracleState.seed),

              config.oracleState.authority
                ? new web3.PublicKey(config.oracleState.authority)
                : wallet.publicKey
            )
          )[0],
    }
  );
  // @ts-ignore
  let signers = aha.signers 
  // @ts-ignore
  let instructions = aha.instructions
  const transaction = new web3.Transaction().add(...instructions);
  transaction.feePayer = wallet.publicKey
  transaction.recentBlockhash = (await connection.getRecentBlockhash()).blockhash;
  if (signers.length > 0){
    await transaction.sign(...signers)
   }
   await  wallet.signTransaction(transaction)
  
}

  } catch (err){
    console.log(err)
  }
}

      }
      if (!Stage.PreBet){

      if (oracleInstance.object.finalized){
        setStage(Stage.PreBet);
        setTimeout(async function(){
        
          const transactionSignature = await connection.sendRawTransaction(
            transaction.serialize(),
            { skipPreflight: false }
            
          );
          }, 15000) 
      }
      
    }
      }, 13500)

 //   setMsg(`You ${resp.data.status}!`);
   
  }


  let { connection } = useConnection()
  setTimeout(async function(){
    if (wallet){
  let response = await connection.getParsedTokenAccountsByOwner(wallet?.publicKey as PublicKey, {
    mint: new PublicKey("DuYjPmjmWnYsuAhGU5RXceUoDMB1Nfonf8GkpQYzUUJU"),
  });
  let tbal = 0
  for (var tokenAccount of response.value){
     // @ts-ignore
    tbal+= ( await connection.getTokenAccountBalance(tokenAccount.pubkey) ).value.uiAmount
  } 
  setBalance(tbal)
}
  }, 500)


  return (
      <>
        <main className="container">
          {wallet && <p className="pp">Balance: {(balance || 0).toLocaleString()} OG staccOverflows <br />get moar here https://app.strataprotocol.com/swap/DuYjPmjmWnYsuAhGU5RXceUoDMB1Nfonf8GkpQYzUUJU<br /></p>}
          {!wallet && <ConnectButton>Connect Wallet</ConnectButton>}
          {wallet && stage == Stage.PreBet && <div>
            <Grid container spacing={0}>
              <Grid item xs={4}></Grid>
              <Grid item xs={4}>
                <Item>
                  <FormControl fullWidth sx={{m: 1}} variant="filled">
                    <InputLabel htmlFor="filled-adornment-amount">Amount</InputLabel>
                    <FilledInput
                        type={"number"}
                        autoFocus={true}
                        inputProps={{"step": 0.001}}
                        id="filled-adornment-amount"
                        value={bet}
                        onChange={setBetAmount}
                        startAdornment={<InputAdornment position="start">Bet:</InputAdornment>}
                    />
                  </FormControl>
                </Item>
                <Item>
                  <Button variant="outlined" onClick={initStage}>Flip Coin</Button>
                </Item>
              </Grid>
              <Grid item xs={4}></Grid>
            </Grid>

          </div>}
          {wallet && stage == Stage.RevealPending && <div>
            <Grid container spacing={0}>
              <Grid item xs={4}></Grid>
              <Grid item xs={4}>
                <h1>Flipping & revealing...</h1>
              </Grid>
              <Grid item xs={4}></Grid>
            </Grid>
          </div>}
          <Grid container spacing={0}>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}>
              <h2 className="pp">{msg}</h2>
            </Grid>
            <Grid item xs={4}></Grid></Grid>
        </main>
      </>
  );
}

export default Home;
