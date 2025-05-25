export default async function handler(req, res) {
  const tx = req.query.tx;
  const HELIUS_KEY = "ec6c83de-d88d-4970-9800-80b61fbfcf67";

  if (!tx) {
    return res.status(400).json({ message: "Transaction manquante." });
  }

  const url = `https://mainnet.helius.xyz/v0/transactions/?api-key=${HELIUS_KEY}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ transactionSignatures: [tx] }),
    });

    const json = await response.json();

    if (!Array.isArray(json) || json.length === 0) {
      return res.status(404).json({ message: "Transaction introuvable." });
    }

    return res.status(200).json(json[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Erreur interne.",
      detail: error.message,
    });
  }
}
