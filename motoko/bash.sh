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

  # Update dfx.json for the current token
  cat dfx.json | jq --arg symbol "token_$symbol" '.canisters += {($symbol): {"main": "src/token.mo"}}' > dfx.tmp
  mv dfx.tmp dfx.json

  # Execute dfx commands to create and install the canister
  dfx canister create token_${symbol}
  dfx build
  dfx canister install token_${symbol} --argument="(\"$logo\", \"$name\", \"$symbol\", $decimals, $totalSupply, principal \"$owner\", $fee)"
  dfx deploy
done
