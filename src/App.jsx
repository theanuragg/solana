import React, { useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

import '@solana/wallet-adapter-react-ui/styles.css';
import RequestAirdrop from './airdrop';
import { ShowSolBalance } from './balance';
import SignMessage from './signmessage';
import SendTokens from './transaction';
import CreateToken from './create'

function App (){
  const network =WalletAdapterNetwork.Devnet;

  const endpoint =useMemo (()=> clusterApiUrl (network),[network]);

  return  (
    <>
      <div className="container"></div>
      <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={[]} autoConnect>
              <WalletModalProvider>
                <div style={{ display: 'flex', justifyContent: "space-between" }}>
                  <WalletMultiButton />
                  <WalletDisconnectButton />
                </div>
                <RequestAirdrop>
                </RequestAirdrop>
                <ShowSolBalance>
                </ShowSolBalance>
                <SignMessage>
                </SignMessage>
                <SendTokens>
                </SendTokens>
                <CreateToken>
                  
                </CreateToken>
                
                
              </WalletModalProvider>
          </WalletProvider>
      </ConnectionProvider>
    </>
  )
}


export default App