import React, { useState, useEffect } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';

// Include Buffer polyfill
import { Buffer } from 'buffer';

export function SendTokens() {
    const wallet = useWallet();
    const { connection } = useConnection();
    const [to, setTo] = useState('');
    const [amount, setAmount] = useState('');

    useEffect(() => {
        // Ensure Buffer is available globally
        if (typeof window !== 'undefined') {
            window.Buffer = Buffer;
        }
    }, []);

    const handleSendTokens = async () => {
        try {
            if (!to || !amount) {
                alert('Please enter both "To" and "Amount".');
                return;
            }

            const lamports = amount * LAMPORTS_PER_SOL;

            const transaction = new Transaction();
            transaction.add(
                SystemProgram.transfer({
                    fromPubkey: wallet.publicKey,
                    toPubkey: new PublicKey(to),
                    lamports: lamports,
                })
            );

            const signature = await wallet.sendTransaction(transaction, connection);
            console.log('Transaction sent:', signature);

            alert(`Sent ${amount} SOL to ${to}`);
        } catch (error) {
            console.error('Error sending transaction:', error);
            alert('Failed to send transaction. Please check console for details.');
        }
    };

    return (
        <div>
            <input
                id="to"
                type="text"
                placeholder="To"
                value={to}
                onChange={(e) => setTo(e.target.value)}
            />
            <input
                id="amount"
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value))}
            />
            <button onClick={handleSendTokens}>Send</button>
        </div>
    );
}

export default SendTokens;
