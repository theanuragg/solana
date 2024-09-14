import React, { useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Keypair, SystemProgram, Transaction } from "@solana/web3.js";

export function CreateToken() {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [tokenMintAddress, setTokenMintAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState({
    name: "",
    symbol: "",
    decimals: "",
    amount: "",
  });

  const handleFormFieldChange = (fieldName, e) => {
    setToken({ ...token, [fieldName]: e.target.value });
  };

  const createToken = async () => {
    if (!publicKey) {
      alert("Please connect your wallet first.");
      return;
    }

    setIsLoading(true);

    try {
      // Create a new keypair for the token
      const mintKeypair = Keypair.generate();

      // Create a simple transaction to create the token (no extra steps like minting or associated accounts)
      const createNewTokenTransaction = new Transaction().add(
        SystemProgram.createAccount({
          fromPubkey: publicKey,
          newAccountPubkey: mintKeypair.publicKey,
          space: 82, // Minimum space for token data
          lamports: 1000000000, // Example rent amount; adjust as necessary
          programId: SystemProgram.programId, // Program responsible for the token
        })
      );

      // Send the transaction
      const signature = await sendTransaction(createNewTokenTransaction, connection, {
        signers: [mintKeypair],
      });

      // Store the created token mint address
      setTokenMintAddress(mintKeypair.publicKey.toString());

      alert(`Token creation successful. Signature: ${signature}`);
    } catch (error) {
      alert("Token creation failed, please try again.");
    }

    setIsLoading(false);
  };

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {tokenMintAddress ? (
        <div>
          <h3>Your Solana Token was created successfully!</h3>
          <p>Token Address: {tokenMintAddress}</p>
          <p>
            View on Solana Explorer:{" "}
            <a
              href={`https://explorer.solana.com/address/${tokenMintAddress}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Explorer Link
            </a>
          </p>
        </div>
      ) : (
        <div>
          <h3>Create Your Solana Token</h3>
          <input
            placeholder="Token Name"
            onChange={(e) => handleFormFieldChange("name", e)}
          />
          <input
            placeholder="Token Symbol"
            onChange={(e) => handleFormFieldChange("symbol", e)}
          />
          <input
            placeholder="Decimals"
            onChange={(e) => handleFormFieldChange("decimals", e)}
          />
          <input
            placeholder="Amount"
            onChange={(e) => handleFormFieldChange("amount", e)}
          />
          <button onClick={createToken}>Create Token</button>
        </div>
      )}
    </div>
  );
}

export default CreateToken;
