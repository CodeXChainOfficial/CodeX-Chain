#!/bin/bash

# Path to the JSON configuration file
CONFIG_FILE="./token_config.json"

# Read the JSON configuration file
configurations=$(cat $CONFIG_FILE)

# Loop through each token configuration
for config in $(echo "${configurations}" | jq -c '.tokens[]'); do
  logo=$(echo $config | jq -r '.logo')
  name=$(echo $config | jq -r '.name')
  symbol=$(echo $config | jq -r '.symbol')
  decimals=$(echo $config | jq -r '.decimals')
  totalSupply=$(echo $config | jq -r '.totalSupply')
  owner=$(echo $config | jq -r '.owner')
  fee=$(echo $config | jq -r '.fee')

  # Check if the canister already exists in dfx.json
  if ! jq -e --arg symbol "token_$symbol" '.canisters | has($symbol)' dfx.json &>/dev/null; then
    # Add the new canister configuration to dfx.json
    echo "Adding token_${symbol} to dfx.json..."
    cat dfx.json | jq --arg symbol "token_$symbol" '.canisters += {($symbol): {"main": "src/token.mo"}}' > dfx.tmp
    mv dfx.tmp dfx.json

    # Execute dfx commands to create and install the new canister
    dfx canister create token_${symbol}
    dfx build
    dfx canister install token_${symbol} --argument="(\"$logo\", \"$name\", \"$symbol\", $decimals, $totalSupply, principal \"$owner\", $fee)"
    dfx deploy
  else
    echo "Canister for symbol $symbol already exists in dfx.json. Skipping..."
  fi
done

configurations=$(cat $CONFIG_FILE)

# List to keep track of processed symbols
processed_symbols=()
canister_info=""

# Loop through each token configuration
for config in $(echo "${configurations}" | jq -c '.tokens[]'); do
  symbol=$(echo $config | jq -r '.symbol')
  canister_id=$(dfx canister id "token_$symbol")
  echo "Symbol: $symbol, Canister ID: $canister_id"
  canister_info="${canister_info}Symbol: $symbol, Canister ID: $canister_id\n"
done

# Remove duplicates from canister_info
unique_canister_info=$(echo -e "$canister_info" | sort | uniq)

# Send the unique canister info to your server using curl
curl -X POST -H "Content-Type: application/json" -d "{\"canisterInfo\": \"$unique_canister_info\"}" http://your-server-address:5004/api/scriptInfo