import styled from "@emotion/styled";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "./components/FormInput";
import FormTextarea from "./components/FormTextarea";
import ImageInput from "./components/ImageInput";
import RadioInput from "./components/RadioInput";
import ChainSelector from "./components/ChainSelector";
import { media } from "@/shared/styles/media";
import { Button, FormControl, InputLabel, MenuItem, Select, Tabs, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination } from '@mui/material';
import SelectedChains from "./components/SelectedChains";
import WalletList from "./components/WalletList";
import WalletVotingPower from "./components/WalletVotingPower";
import CreateDAO from "./components/CreateDAO";
import { useLaunchPadForm } from "../../../launchpad/data/useLaunchPad"
import { useNavigate } from "react-router-dom";
import { LaunchPadFormData, LaunchPadFormSchema, LaunchpadRoutes } from '../../../launchpad/constants'
import React, { Key, useEffect, useState } from "react";
import { Container, Grid } from '@mui/material';
import ERC20Item from './card';
import { FormInputStyle } from "./styles/form";
import Web3, { Bytes } from "web3";
import MyTokenContractABI from "./MyToken.json";
import axios from "axios"; // Import Axios for making HTTP requests
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Modal from "@mui/material";

import { BrowserProvider, ethers, parseEther, parseUnits } from "ethers"

// The pkg.exports provides granular access
import { InfuraProvider } from "ethers/providers"

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const modalStyle = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 50, 0.15)', // Dark blue with 15% transparency
    backdropFilter: 'blur(8px)', // Apply background blur
  },
  content: {
    width: '300px',
    height: '200px',
    margin: 'auto', // Center the modal
    background: 'transparent', // Transparent background
    border: '2px solid lightblue', // Border color and width
    borderRadius: '8px',
    padding: '20px',
    display: 'grid',
     gridTemplateColumns: 'center' ,
    alignItems: 'center',
    justifyContent: 'center', // Center title and button
    color: 'white', // Text color
    fontSize: '24px', // Text size
    gap: '30px', // Space between title and button
    marginTop: '20px', // Space from top

  },
};

const infuraRpcUrl =
  "https://mainnet.infura.io/v3/5f3224c8075b407fa38911977320235b";

declare global {
  interface Window {
    ethereum?: any; // Replace 'any' with the appropriate type if known
  }
}



let networkInfo;

export default function ERC20Standard() {
  const [canisterInfo, setCanisterInfo] = useState('');

 
  
  const [selectedMainnetNetwork, setSelectedMainnetNetwork] =
    useState("MainNet");
  const [selectedTestnetNetwork, setSelectedTestnetNetwork] =
    useState("TestNet");
  const [userAddress, setUserAddress] = useState<string | null>(null);
  const [web3, setWeb3] = useState<Web3 | null>(null); // Declare web3 using useState
  const [chainId, setChainId] = useState<string>(""); // Add state for chainId
  const [selectedRpcUrl, setSelectedRpcUrl] = useState<string>(""); // Declare selectedRpcUrl state
  const [deployedTokens, setDeployedTokens] = useState([]);

  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [decimals, setDecimals] = useState("");
  const [totalSupply, setTotalSupply] = useState("");
  const [selectedNetwork, setSelectedNetwork] = useState(null);
  const [contract, setContract] = useState(null);
 
 
  
  const convertToAbiItemArray = (abi: any) => {
    if (Array.isArray(abi)) {
      return abi;
    } else if (abi && typeof abi === "object") {
      return [abi];
    }
    return [];
  };
  const abiArray = convertToAbiItemArray(MyTokenContractABI);

    const [selectedToken, setSelectedToken] = useState(null);
    const [selectedFunction, setSelectedFunction] = useState(null);
    const [deploymentStep, setDeploymentStep] = useState(0);
    const [functionInputs, setFunctionInputs] = useState<{ name: string; type: string; value: string }[]>([]);
const [functionOutputs, setFunctionOutputs] = useState<{ name: string; type: string; value: string }[]>([]);


      const handleSelectToken = (token, index) => {
        setSelectedTokenIndex(index);
        setSelectedToken(token);
        setSelectedFunction(null); // Reset selected function when a new token is selected
        setFunctionInputs([]); // Reset function inputs
        setFunctionOutputs([]); // Reset function outputs
      };
    
  
      const handleSelectFunction = (func) => {
        setSelectedFunction(func);
        setFunctionInputs(func.inputs.map((input) => ({ name: input.name, type: input.type, value: '' })));
        setFunctionOutputs([]);
      
      
      };
      const [loading, setLoading] = useState(false);

const handleCallFunction = async () => {
  
  setLoading(true);


  if (!selectedToken || !selectedToken.Taddress) {
    console.error('Selected token or token address is not defined.', selectedToken,selectedToken.Taddress );
    return;
  }
const infuraRpcUrl =
"https://sepolia.infura.io/v3/40b6ee6a88f44480b3ae89b1183df7ed";

const infuraProvider = new ethers.JsonRpcProvider(infuraRpcUrl);


// Connect to MetaMask wallet
await window.ethereum.enable();
const metaMaskProvider = new ethers.BrowserProvider(window.ethereum);
  const abi = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_defaultAdmin",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_symbol",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_totalSupply",
          "type": "uint256"
        },
        {
          "internalType": "uint8",
          "name": "_decimals",
          "type": "uint8"
        },
        {
          "internalType": "uint256",
          "name": "_initialDeploymentFee",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "burn",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_account",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "burnFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "string",
          "name": "prevURI",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "newURI",
          "type": "string"
        }
      ],
      "name": "ContractURIUpdated",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "subtractedValue",
          "type": "uint256"
        }
      ],
      "name": "decreaseAllowance",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "addedValue",
          "type": "uint256"
        }
      ],
      "name": "increaseAllowance",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "mintTo",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes[]",
          "name": "data",
          "type": "bytes[]"
        }
      ],
      "name": "multicall",
      "outputs": [
        {
          "internalType": "bytes[]",
          "name": "results",
          "type": "bytes[]"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "prevOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnerUpdated",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "deadline",
          "type": "uint256"
        },
        {
          "internalType": "uint8",
          "name": "v",
          "type": "uint8"
        },
        {
          "internalType": "bytes32",
          "name": "r",
          "type": "bytes32"
        },
        {
          "internalType": "bytes32",
          "name": "s",
          "type": "bytes32"
        }
      ],
      "name": "permit",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_uri",
          "type": "string"
        }
      ],
      "name": "setContractURI",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_newOwner",
          "type": "address"
        }
      ],
      "name": "setOwner",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "mintedTo",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "quantityMinted",
          "type": "uint256"
        }
      ],
      "name": "TokensMinted",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "withdrawDeploymentFee",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        }
      ],
      "name": "allowance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "contractURI",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "decimals",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "deploymentFee",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "deploymentFeeCollector",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "DOMAIN_SEPARATOR",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "nonces",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];
  const signer = await metaMaskProvider.getSigner();
  const provider = new ethers.BrowserProvider(window.ethereum);
  const contract = new ethers.Contract(selectedToken.Taddress, abi, signer);

  try {
    // Ensure contractAddress and contractABI are defined
    if (!contract || !abi) {
      console.error('Contract address or ABI is not defined.');
      return;
    }

    console.log('Selected Function Name:', selectedFunction.name);
    console.log('Contract ABI:', contract.interface.format());
    console.log('TokenAddress:', selectedToken.Taddress);

    if (contract && selectedFunction.name) {
      const args: any[] = functionInputs.map((input) => input.value);

      try {
        const result = await contract[selectedFunction.name](...args);

        console.log(result);
       setFunctionOutputs([{
  name: selectedFunction.name,
  value: result !== undefined ? result : 'N/A',
  // Assuming you want to keep the type from the selectedFunction.outputs
  type: selectedFunction.outputs.length > 0 ? selectedFunction.outputs[0].type : 'N/A',
}]);
        
        console.log('Outputs:', outputs);

        setFunctionOutputs(outputs);
      } catch (error) {
        console.error('Error calling function:', error);
      }
    }
  } catch (error) {
    console.error('Error creating contract instance:', error);
  }
};
 


  const contractAddress = selectedToken ? selectedToken.address : null;

  useEffect(() => {
    if (web3 && abiArray) {
      const newContract = new web3.eth.Contract(abiArray, contractAddress);
      setContract(newContract);
    }
  }, [web3, abiArray, contractAddress]);
 

  const networkOptions = {
    mainnet: {
      label: "Mainnet",
      options: [
        {
          label: "Ethereum",
          chainId: "0x1", // Ethereum Mainnet
          rpcUrl:
            "https://mainnet.infura.io/v3/5f3224c8075b407fa38911977320235b",
            logo: "./IconImage/img_frame371062_1.png", // Add the path to the Goerli logo
            nativeToken: "ETH", // Native token of Ethereum

        },
        {
          label: "OneLedger-Mainnet",
          chainId: "0x1294f7c2", // Ethereum Mainnet
          rpcUrl: 'https://frankenstein-rpc.oneledger.network	',
          logo: "./IconImage/img_frame371062_22.png", // Add the path to the Goerli logo
          nativeToken: "OLT", // Native token of Arbitrum

        },
        {
          label: "Linea",
          chainId: "0xe708", // Ethereum Mainnet
          rpcUrl:
            "https://linea-mainnet.infura.io/v3/5f3224c8075b407fa38911977320235b",
            logo: "./IconImage/img_frame371062_1.png", // Add the path to the Goerli logo
            nativeToken: "ETH", // Native token of Linea

        },
        {
          label: "Polygon",
          chainId: "0x89", // Ethereum Mainnet
          rpcUrl:
            "https://polygon-mainnet.infura.io/v3/5f3224c8075b407fa38911977320235b",
            logo: "./IconImage/img_frame371062_1.png", // Add the path to the Goerli logo
            nativeToken: "MATIC", // Native token of Polygon

        },
        {
          label: "Optimism",
          chainId: "0x12c", // Ethereum Mainnet
          rpcUrl:
            "https://optimism-mainnet.infura.io/v3/5f3224c8075b407fa38911977320235b",
            logo: "./IconImage/img_frame371062_1.png", // Add the path to the Goerli logo
            nativeToken: "ETH", // Native token of Arbitrum

        },
        {
          label: "Arbitrum",
          chainId: "0xa4b1", // Ethereum Mainnet
          rpcUrl:
            "https://arbitrum-mainnet.infura.io/v3/5f3224c8075b407fa38911977320235b",
            logo: "./IconImage/img_frame371062_1.png", // Add the path to the Goerli logo
            nativeToken: "ETH", // Native token of Arbitrum

        },

        {
          label: "Avalanche",
          chainId: "0xa86a", // Ethereum Mainnet
          rpcUrl:
            "https://avalanche-mainnet.infura.io/v3/5f3224c8075b407fa38911977320235b",
            logo: "./IconImage/img_frame371062_1.png", // Add the path to the Goerli logo
            nativeToken: "AVAX", // Native token of Avalanche

        },
        {
          label: "Near",
          chainId: "0x4e454152", // Ethereum Mainnet
          rpcUrl:
            "https://near-mainnet.infura.io/v3/5f3224c8075b407fa38911977320235b",
            logo: "./IconImage/img_frame371062_1.png", // Add the path to the Goerli logo
            nativeToken: "NEAR", // Native token of Near

        },
        {
          label: "Aurora",
          chainId: "0x4e454152", // Ethereum Mainnet
          rpcUrl:
            "https://aurora-mainnet.infura.io/v3/5f3224c8075b407fa38911977320235b",
            logo: "./IconImage/img_frame371062_1.png", // Add the path to the Goerli logo
            nativeToken: "AETH", // Native token of Aurora

        },

        {
          label: "Celo",
          chainId: "0xa4ec", // Ethereum Mainnet
          rpcUrl:
            "https://celo-mainnet.infura.io/v3/5f3224c8075b407fa38911977320235b",
            logo: "IconImage/img_frame371062_1.png", // Add the path to the Goerli logo
            nativeToken: "CELO", // Native token of Celo

        },
      ],
    },
    testnet: {
      label: "Testnet",
      options: [
        {
          label: "Eth-Goerli",
          chainId: "0x5", // Goerli Testnet

          rpcUrl:
            "https://goerli.infura.io/v3/5f3224c8075b407fa38911977320235b",
            logo: "./IconImage/img_frame371062_48x48.png", // Add the path to the Goerli logo
            nativeToken: "ETH", // Native token of Arbitrum

        },
        {
          label: "Arthera-TestNet",
          chainId: "0x2803", // Ethereum Mainnet
          rpcUrl: "https://rpc-test.arthera.net",
          logo: "./IconImage/img_frame371062_22.png", // Add the path to the Goerli logo
          nativeToken: "AA", // Native token of Arbitrum

        },
        {
          label: "OneLedger-TestNet",
          chainId: "0xfb4d255f", // Ethereum Mainnet
          rpcUrl: 'https://frankenstein-rpc.oneledger.network	',
          logo: "./IconImage/img_frame371062_22.png", // Add the path to the Goerli logo
          nativeToken: "OLT", // Native token of Arbitrum

        },
        {
          label: "Eth-Sepolia",
          chainId: "0xaa36a7", // Ethereum Mainnet
          rpcUrl:
            "https://sepolia.infura.io/v3/5f3224c8075b407fa38911977320235b",
            logo: "./IconImage/img_frame371062_48x48.png", // Add the path to the Goerli logo
            nativeToken: "ETH", // Native token of Arbitrum

        },
        {
          label: "Poly-Mumbai",
          chainId: "0x13881", // Ethereum Mainnet
          rpcUrl:
            "https://polygon-mumbai.infura.io/v3/5f3224c8075b407fa38911977320235b",
            logo: "./IconImage/img_frame371062_1.png", // Add the path to the Goerli logo
            nativeToken: "MATIC", // Native token of Polygon

        },
        {
          label: "Opt-Goerli",
          chainId: "0x1a4", // Ethereum Mainnet
          rpcUrl:
            "https://optimism-goerli.infura.io/v3/5f3224c8075b407fa38911977320235b",
            logo: "./IconImage/img_frame371062_7.png", // Add the path to the Goerli logo
            nativeToken: "ETH", // Native token of Arbitrum

        },
        {
          label: "Arb-Goerli",
          chainId: "0x6f70", // Ethereum Mainnet
          rpcUrl:
            "https://arbitrum-goerli.infura.io/v3/5f3224c8075b407fa38911977320235b",
            logo: "./IconImage/img_frame371062_8.png", // Add the path to the Goerli logo
            nativeToken: "ETH", // Native token of Arbitrum

        },
        {
          label: "Avax-Fuji",
          chainId: "0xa869", // Ethereum Mainnet
          rpcUrl:
            "https://avalanche-fuji.infura.io/v3/5f3224c8075b407fa38911977320235b",
            logo: "./IconImage/img_frame371062_9.png", // Add the path to the Goerli logo
            nativeToken: "AVAX", // Native token of Avalanche

        },  
        {
          label: "Near-Testnet",
          chainId: "0x4e454153", // Ethereum Mainnet
          rpcUrl:
            "https://near-testnet.infura.io/v3/5f3224c8075b407fa38911977320235b",
            logo: "./IconImage/img_frame371062_28.png", // Add the path to the Goerli logo
            nativeToken: "NEAR", // Native token of Near

        },
        {
          label: "Aurora-Testnet",
          chainId: "0x4e454153", // Ethereum Mainnet
          rpcUrl:
            "https://aurora-testnet.infura.io/v3/5f3224c8075b407fa38911977320235b",
            logo: "./IconImage/img_frame371062_1.png", // Add the path to the Goerli logo
            nativeToken: "ETH", // Native token of Aurora

        },
        {
          label: "Celo-Alfajores",
          chainId: "0xaef3", // Ethereum Mainnet

          rpcUrl:
            "https://celo-alfajores.infura.io/v3/5f3224c8075b407fa38911977320235b",
            logo: "./IconImage/img_frame371062_1.png", // Add the path to the Goerli logo
            nativeToken: "CELO", // Native token of Celo

        },
      ],
    },
  };

  useEffect(() => {
    const web3Instance = new Web3(selectedRpcUrl);
    setWeb3(web3Instance);

    // Request account access
    if (window.ethereum) {
      window.ethereum
        .enable()
        .then((accounts: string | any[]) => {
          if (accounts.length > 0) {
            const address = accounts[0];
            setUserAddress(address);
            console.log("User Address:", address);
          } else {
            console.error("No accounts found.");
          }
        })
        .catch((error: any) => {
          console.error("Error fetching user address:", error);
        });
    }
    const category = 'ERC20Standard'; // Replace with the desired category
    const walletAddress = userAddress; // Replace with the user's wallet address
    
    axios.get(`http://localhost:5004/api/getDeployedTokens?category=${category}&walletAddress=${walletAddress}`)
      .then(response => {
        const storedTokens = response.data.deployedTokens;
        console.log(storedTokens);
        setDeployedTokens(response.data.deployedTokens);
    
      })
      .catch(error => {
        console.error(error);
      }); 
  }, [selectedRpcUrl]);

  // Handle mainnet network change
  const handleMainnetNetworkChange = (value: string) => {

    const newSelectedMainnetNetwork = value;
    const newSelectedMainnetRpcUrl = networkOptions.mainnet.options.find(
      (option) => option.label === newSelectedMainnetNetwork
    )?.rpcUrl;
    const newSelectedMainnetCHainId = networkOptions.mainnet.options.find(
      (option) => option.label === newSelectedMainnetNetwork
    )?.chainId;

    setSelectedMainnetNetwork(newSelectedMainnetNetwork);

    if (newSelectedMainnetRpcUrl) {
      setSelectedRpcUrl(newSelectedMainnetRpcUrl);
      console.log("selectedRpcUrl:", newSelectedMainnetRpcUrl);
      console.log("selectedNetwork:", newSelectedMainnetNetwork);
      networkInfo=newSelectedMainnetNetwork;
      connectToNetwork(newSelectedMainnetCHainId);
    }
  };

  // Handle testnet network change
  const handleTestnetNetworkChange = (value: string) => {
    const newSelectedTestnetNetwork = value;
    const newSelectedTestnetRpcUrl = networkOptions.testnet.options.find(
      (option) => option.label === newSelectedTestnetNetwork
    )?.rpcUrl;
    setSelectedTestnetNetwork(newSelectedTestnetNetwork);

    const newSelectedTestnetchainID = networkOptions.testnet.options.find(
      (option) => option.label === newSelectedTestnetNetwork
    )?.chainId;

    if (newSelectedTestnetRpcUrl) {
      setSelectedRpcUrl(newSelectedTestnetRpcUrl);
      console.log("selectedRpcUrl:", newSelectedTestnetRpcUrl);
      console.log("selectedNetwork:", newSelectedTestnetNetwork);
      setChainId(newSelectedTestnetNetwork); // Set the chainId based on the selected network
      networkInfo=newSelectedTestnetNetwork;
      connectToNetwork(newSelectedTestnetchainID);
    }
  };

  const connectToNetwork = async (chainId: string) => {
    if (window.ethereum) {
      try {
        // Request to switch to the desired network
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId }], // Pass the desired chainId to switch to
        });

        // Network switch was successful
        console.log("Switched to the desired network.");

        // You can add additional logic here to handle the switched network
        // For example, you can update the user interface or perform network-specific tasks.
      } catch (error) {
        // Handle errors, e.g., user rejected the request or the network switch failed
        console.error("Error switching network:", error);
      }
    } else {
      // Ethereum provider not available (e.g., MetaMask not installed)
      console.error("Ethereum provider not available.");
    }
    const infuraProvider = new ethers.JsonRpcProvider(infuraRpcUrl);


    // Connect to MetaMask wallet
    await window.ethereum.enable();
    const metaMaskProvider = new ethers.BrowserProvider(window.ethereum);
    const signer = await metaMaskProvider.getSigner();
    console.log("singer", signer)
    const category = 'ERC20Standard'; // Replace with the desired category
    const walletAddress = await signer.getAddress(); // Replace with the user's wallet address
    
    axios.get(`http://localhost:5004/api/getDeployedTokens?category=${category}&walletAddress=${walletAddress}`)
      .then(response => {
        const storedTokens = response.data.deployedTokens;
        console.log(storedTokens);
        setDeployedTokens(response.data.deployedTokens);
    
      })
      .catch(error => {
        console.error(error);
      });
  };
    


  const navigate = useNavigate();
  const [formData, setFormData] = useLaunchPadForm();

  const { control } = useForm<LaunchPadFormData>({
    defaultValues: formData,
    resolver: zodResolver(LaunchPadFormSchema),
  });

  const onSubmit = (data: LaunchPadFormData) => {
    setFormData(data);
  };
 

  const Modal = ({ isOpen, onClose, content }) => {
    return (
      <div style={{ display: isOpen ? 'block' : 'none', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 999 }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#1a1a1a', padding: '20px', borderRadius: '8px', maxWidth: '400px', color: '#fff' }}>
          {content}
          <button style={{ color: '#fff', background: 'transparent', border: '1px solid #fff', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }} onClick={onClose}>Close</button>
        </div>
      </div>
    );
  };
  const [isModalOpen, setIsModalOpen] = useState(false);


  async function deployToken() {

    setIsModalOpen(true);

    setDeploymentStep(1);
    console.log('name',name);
    console.log('symbol',symbol);
    console.log('totalSupply',totalSupply);

    console.log('decimals',decimals);


    if (!name || !symbol || !totalSupply || !decimals) {
      console.error(
        "Please provide valid values for tokenName, tokenSymbol, initialSupply, and decimal."
      );
      return;
    }


    const web3Instance = new Web3(selectedRpcUrl);
    setWeb3(web3Instance);
  
    if (window.ethereum) {
      const accounts = await window.ethereum.enable();
  
      window.ethereum
        .enable()
        .then((accounts: string | any[]) => {
          if (accounts.length > 0) {
            const address = accounts[0];
            setUserAddress(address);
            console.log("User Address stage 2:", address);
          } else {
            console.error("No accounts found. (step2)");
          }
        })
        .catch((error: any) => {
          console.error("Error fetching user address:", error);
        });
    }

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const userAddress = accounts[0]; // Get the user's address
  
    console.log("accounts:", accounts);
    console.log("userAddress:", userAddress);
    const deploymentFee = web3.utils.toWei("0.001", "ether"); // Set your deployment fee


   
  
  const MyTokenContractData =
    "6101006040527f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c960e0908152503480156200003957600080fd5b5060405162004c8c38038062004c8c83398181016040528101906200005f9190620007f9565b84848181816005908162000074919062000b14565b50806006908162000086919062000b14565b5050504660a081815250503073ffffffffffffffffffffffffffffffffffffffff1660c08173ffffffffffffffffffffffffffffffffffffffff1681525050620000d56200021760201b60201c565b6080818152505050506000831162000124576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016200011b9062000c82565b60405180910390fd5b60128260ff1611156200016e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620001659062000cf4565b60405180910390fd5b6200019e868360ff16600a62000185919062000e99565b8562000192919062000eea565b620002a560201b60201c565b620001af866200041e60201b60201c565b732057237aaf18f6f72552bed5733c68433bba100e600860006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508060098190555050505050505062001099565b60007f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f6200024a620004e460201b60201c565b805190602001207fc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc646306040516020016200028a95949392919062000f72565b60405160208183030381529060405280519060200120905090565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff160362000317576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016200030e906200101f565b60405180910390fd5b6200032b600083836200057e60201b60201c565b80600460008282546200033f919062001041565b9250508190555080600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825462000397919062001041565b925050819055508173ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051620003fe91906200107c565b60405180910390a36200041a600083836200058360201b60201c565b5050565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8292fce18fa69edf4db7b94ea2e58241df0ae57f97e0a6c9b29067028bf92d7660405160405180910390a35050565b606060058054620004f5906200090d565b80601f016020809104026020016040519081016040528092919081815260200182805462000523906200090d565b8015620005745780601f10620005485761010080835404028352916020019162000574565b820191906000526020600020905b8154815290600101906020018083116200055657829003601f168201915b5050505050905090565b505050565b505050565b6000604051905090565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000620005c9826200059c565b9050919050565b620005db81620005bc565b8114620005e757600080fd5b50565b600081519050620005fb81620005d0565b92915050565b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b62000656826200060b565b810181811067ffffffffffffffff821117156200067857620006776200061c565b5b80604052505050565b60006200068d62000588565b90506200069b82826200064b565b919050565b600067ffffffffffffffff821115620006be57620006bd6200061c565b5b620006c9826200060b565b9050602081019050919050565b60005b83811015620006f6578082015181840152602081019050620006d9565b60008484015250505050565b6000620007196200071384620006a0565b62000681565b90508281526020810184848401111562000738576200073762000606565b5b62000745848285620006d6565b509392505050565b600082601f83011262000765576200076462000601565b5b81516200077784826020860162000702565b91505092915050565b6000819050919050565b620007958162000780565b8114620007a157600080fd5b50565b600081519050620007b5816200078a565b92915050565b600060ff82169050919050565b620007d381620007bb565b8114620007df57600080fd5b50565b600081519050620007f381620007c8565b92915050565b60008060008060008060c0878903121562000819576200081862000592565b5b60006200082989828a01620005ea565b965050602087015167ffffffffffffffff8111156200084d576200084c62000597565b5b6200085b89828a016200074d565b955050604087015167ffffffffffffffff8111156200087f576200087e62000597565b5b6200088d89828a016200074d565b9450506060620008a089828a01620007a4565b9350506080620008b389828a01620007e2565b92505060a0620008c689828a01620007a4565b9150509295509295509295565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806200092657607f821691505b6020821081036200093c576200093b620008de565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b600060088302620009a67fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8262000967565b620009b2868362000967565b95508019841693508086168417925050509392505050565b6000819050919050565b6000620009f5620009ef620009e98462000780565b620009ca565b62000780565b9050919050565b6000819050919050565b62000a1183620009d4565b62000a2962000a2082620009fc565b84845462000974565b825550505050565b600090565b62000a4062000a31565b62000a4d81848462000a06565b505050565b5b8181101562000a755762000a6960008262000a36565b60018101905062000a53565b5050565b601f82111562000ac45762000a8e8162000942565b62000a998462000957565b8101602085101562000aa9578190505b62000ac162000ab88562000957565b83018262000a52565b50505b505050565b600082821c905092915050565b600062000ae96000198460080262000ac9565b1980831691505092915050565b600062000b04838362000ad6565b9150826002028217905092915050565b62000b1f82620008d3565b67ffffffffffffffff81111562000b3b5762000b3a6200061c565b5b62000b4782546200090d565b62000b5482828562000a79565b600060209050601f83116001811462000b8c576000841562000b77578287015190505b62000b83858262000af6565b86555062000bf3565b601f19841662000b9c8662000942565b60005b8281101562000bc65784890151825560018201915060208501945060208101905062000b9f565b8683101562000be6578489015162000be2601f89168262000ad6565b8355505b6001600288020188555050505b505050505050565b600082825260208201905092915050565b7f546f74616c20737570706c79206d75737420626520677265617465722074686160008201527f6e207a65726f0000000000000000000000000000000000000000000000000000602082015250565b600062000c6a60268362000bfb565b915062000c778262000c0c565b604082019050919050565b6000602082019050818103600083015262000c9d8162000c5b565b9050919050565b7f446563696d616c73206d757374206265203138206f72206c6573730000000000600082015250565b600062000cdc601b8362000bfb565b915062000ce98262000ca4565b602082019050919050565b6000602082019050818103600083015262000d0f8162000ccd565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60008160011c9050919050565b6000808291508390505b600185111562000da45780860481111562000d7c5762000d7b62000d16565b5b600185161562000d8c5780820291505b808102905062000d9c8562000d45565b945062000d5c565b94509492505050565b60008262000dbf576001905062000e92565b8162000dcf576000905062000e92565b816001811462000de8576002811462000df35762000e29565b600191505062000e92565b60ff84111562000e085762000e0762000d16565b5b8360020a91508482111562000e225762000e2162000d16565b5b5062000e92565b5060208310610133831016604e8410600b841016171562000e635782820a90508381111562000e5d5762000e5c62000d16565b5b62000e92565b62000e72848484600162000d52565b9250905081840481111562000e8c5762000e8b62000d16565b5b81810290505b9392505050565b600062000ea68262000780565b915062000eb38362000780565b925062000ee27fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff848462000dad565b905092915050565b600062000ef78262000780565b915062000f048362000780565b925082820262000f148162000780565b9150828204841483151762000f2e5762000f2d62000d16565b5b5092915050565b6000819050919050565b62000f4a8162000f35565b82525050565b62000f5b8162000780565b82525050565b62000f6c81620005bc565b82525050565b600060a08201905062000f89600083018862000f3f565b62000f98602083018762000f3f565b62000fa7604083018662000f3f565b62000fb6606083018562000f50565b62000fc5608083018462000f61565b9695505050505050565b7f45524332303a206d696e7420746f20746865207a65726f206164647265737300600082015250565b600062001007601f8362000bfb565b9150620010148262000fcf565b602082019050919050565b600060208201905081810360008301526200103a8162000ff8565b9050919050565b60006200104e8262000780565b91506200105b8362000780565b925082820190508082111562001076576200107562000d16565b5b92915050565b600060208201905062001093600083018462000f50565b92915050565b60805160a05160c05160e051613bb9620010d36000396000610f77015260006106360152600061068c015260006106b50152613bb96000f3fe608060405234801561001057600080fd5b50600436106101735760003560e01c806379cc6790116100de578063a457c2d711610097578063d505accf11610071578063d505accf14610460578063dd62ed3e1461047c578063e8a3d485146104ac578063f2cff57f146104ca57610173565b8063a457c2d7146103d0578063a9059cbb14610400578063ac9650d81461043057610173565b806379cc67901461030e5780637ecebe001461032a5780638da5cb5b1461035a5780638f03181814610378578063938e3d7b1461039657806395d89b41146103b257610173565b80633644e515116101305780633644e5151461024e578063395093511461026c57806342966c681461029c578063449a52f8146102b85780634a641b98146102d457806370a08231146102de57610173565b806306fdde0314610178578063095ea7b31461019657806313af4035146101c657806318160ddd146101e257806323b872dd14610200578063313ce56714610230575b600080fd5b6101806104e8565b60405161018d919061222b565b60405180910390f35b6101b060048036038101906101ab91906122f5565b61057a565b6040516101bd9190612350565b60405180910390f35b6101e060048036038101906101db919061236b565b61059d565b005b6101ea6105f0565b6040516101f791906123a7565b60405180910390f35b61021a600480360381019061021591906123c2565b6105fa565b6040516102279190612350565b60405180910390f35b610238610629565b6040516102459190612431565b60405180910390f35b610256610632565b6040516102639190612465565b60405180910390f35b610286600480360381019061028191906122f5565b6106e9565b6040516102939190612350565b60405180910390f35b6102b660048036038101906102b19190612480565b610793565b005b6102d260048036038101906102cd91906122f5565b6107eb565b005b6102dc610883565b005b6102f860048036038101906102f3919061236b565b610a78565b60405161030591906123a7565b60405180910390f35b610328600480360381019061032391906122f5565b610ac1565b005b610344600480360381019061033f919061236b565b610b92565b60405161035191906123a7565b60405180910390f35b610362610be2565b60405161036f91906124bc565b60405180910390f35b610380610c0c565b60405161038d91906124bc565b60405180910390f35b6103b060048036038101906103ab919061260c565b610c32565b005b6103ba610c85565b6040516103c7919061222b565b60405180910390f35b6103ea60048036038101906103e591906122f5565b610d17565b6040516103f79190612350565b60405180910390f35b61041a600480360381019061041591906122f5565b610e01565b6040516104279190612350565b60405180910390f35b61044a600480360381019061044591906126b5565b610e24565b6040516104579190612819565b60405180910390f35b61047a60048036038101906104759190612893565b610f30565b005b61049660048036038101906104919190612935565b61107a565b6040516104a391906123a7565b60405180910390f35b6104b4611101565b6040516104c1919061222b565b60405180910390f35b6104d261118f565b6040516104df91906123a7565b60405180910390f35b6060600580546104f7906129a4565b80601f0160208091040260200160405190810160405280929190818152602001828054610523906129a4565b80156105705780601f1061054557610100808354040283529160200191610570565b820191906000526020600020905b81548152906001019060200180831161055357829003601f168201915b5050505050905090565b600080610585611195565b905061059281858561119d565b600191505092915050565b6105a5611366565b6105e4576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105db90612a21565b60405180910390fd5b6105ed816113a3565b50565b6000600454905090565b600080610605611195565b9050610612858285611469565b61061d8585856114f5565b60019150509392505050565b60006012905090565b60007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff163073ffffffffffffffffffffffffffffffffffffffff161480156106ae57507f000000000000000000000000000000000000000000000000000000000000000046145b156106db577f000000000000000000000000000000000000000000000000000000000000000090506106e6565b6106e3611777565b90505b90565b6000806106f4611195565b9050610788818585600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546107839190612a70565b61119d565b600191505092915050565b8061079d33610a78565b10156107de576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107d590612af0565b60405180910390fd5b6107e833826117fb565b50565b6107f36119d3565b610832576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161082990612b5c565b60405180910390fd5b60008103610875576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161086c90612bc8565b60405180910390fd5b61087f8282611a22565b5050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610913576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161090a90612a21565b60405180910390fd5b600060095411610958576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161094f90612c34565b60405180910390fd5b60095447101561099d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161099490612ca0565b60405180910390fd5b6000600860009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166009546040516109e790612cf1565b60006040518083038185875af1925050503d8060008114610a24576040519150601f19603f3d011682016040523d82523d6000602084013e610a29565b606091505b5050905080610a6d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a6490612d52565b60405180910390fd5b600060098190555050565b6000600260008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b610ac9611b82565b610b08576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610aff90612dbe565b60405180910390fd5b80610b1283610a78565b1015610b53576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b4a90612af0565b60405180910390fd5b600081610b60843361107a565b610b6a9190612dde565b9050610b788333600061119d565b610b8383338361119d565b610b8d83836117fb565b505050565b6000610bdb600760008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020611bbf565b9050919050565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b600860009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b610c3a611bcd565b610c79576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c7090612a21565b60405180910390fd5b610c8281611c0a565b50565b606060068054610c94906129a4565b80601f0160208091040260200160405190810160405280929190818152602001828054610cc0906129a4565b8015610d0d5780601f10610ce257610100808354040283529160200191610d0d565b820191906000526020600020905b815481529060010190602001808311610cf057829003601f168201915b5050505050905090565b600080610d22611195565b90506000600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905083811015610de8576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ddf90612e84565b60405180910390fd5b610df5828686840361119d565b60019250505092915050565b600080610e0c611195565b9050610e198185856114f5565b600191505092915050565b60608282905067ffffffffffffffff811115610e4357610e426124e1565b5b604051908082528060200260200182016040528015610e7657816020015b6060815260200190600190039081610e615790505b50905060005b83839050811015610f2957610ef830858584818110610e9e57610e9d612ea4565b5b9050602002810190610eb09190612ee2565b8080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f82011690508083019250505050505050611ce5565b828281518110610f0b57610f0a612ea4565b5b60200260200101819052508080610f2190612f45565b915050610e7c565b5092915050565b83421115610f73576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610f6a90612fd9565b60405180910390fd5b60007f0000000000000000000000000000000000000000000000000000000000000000888888610fa28c611d12565b89604051602001610fb896959493929190612ff9565b6040516020818303038152906040528051906020012090506000610fe3610fdd610632565b83611d70565b90506000610ff382878787611db1565b90508973ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614611063576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161105a906130a6565b60405180910390fd5b61106e8a8a8a61119d565b50505050505050505050565b6000600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b6000805461110e906129a4565b80601f016020809104026020016040519081016040528092919081815260200182805461113a906129a4565b80156111875780601f1061115c57610100808354040283529160200191611187565b820191906000526020600020905b81548152906001019060200180831161116a57829003601f168201915b505050505081565b60095481565b600033905090565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff160361120c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161120390613138565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff160361127b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611272906131ca565b60405180910390fd5b80600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9258360405161135991906123a7565b60405180910390a3505050565b6000611370610be2565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614905090565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8292fce18fa69edf4db7b94ea2e58241df0ae57f97e0a6c9b29067028bf92d7660405160405180910390a35050565b6000611475848461107a565b90507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff81146114ef57818110156114e1576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016114d890613236565b60405180910390fd5b6114ee848484840361119d565b5b50505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603611564576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161155b906132c8565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036115d3576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016115ca9061335a565b60405180910390fd5b6115de838383611ddc565b6000600260008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905081811015611665576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161165c906133ec565b60405180910390fd5b818103600260008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555081600260008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546116fa9190612a70565b925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8460405161175e91906123a7565b60405180910390a3611771848484611de1565b50505050565b60007f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f6117a26104e8565b805190602001207fc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc646306040516020016117e095949392919061340c565b60405160208183030381529060405280519060200120905090565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff160361186a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611861906134d1565b60405180910390fd5b61187682600083611ddc565b6000600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050818110156118fd576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016118f490613563565b60405180910390fd5b818103600260008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555081600460008282546119559190612dde565b92505081905550600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040516119ba91906123a7565b60405180910390a36119ce83600084611de1565b505050565b60006119dd610be2565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16148015611a1d575066038d7ea4c6800034145b905090565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603611a91576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611a88906135cf565b60405180910390fd5b611a9d60008383611ddc565b8060046000828254611aaf9190612a70565b9250508190555080600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254611b059190612a70565b925050819055508173ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051611b6a91906123a7565b60405180910390a3611b7e60008383611de1565b5050565b6000611b8c610be2565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614905090565b600081600001549050919050565b6000611bd7610be2565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614905090565b6000808054611c18906129a4565b80601f0160208091040260200160405190810160405280929190818152602001828054611c44906129a4565b8015611c915780601f10611c6657610100808354040283529160200191611c91565b820191906000526020600020905b815481529060010190602001808311611c7457829003601f168201915b505050505090508160009081611ca7919061379b565b507fc9c7c3fe08b88b4df9d4d47ef47d2c43d55c025a0ba88ca442580ed9e7348a168183604051611cd992919061386d565b60405180910390a15050565b6060611d0a8383604051806060016040528060278152602001613b5d60279139611de6565b905092915050565b600080600760008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000209050611d5f81611bbf565b9150611d6a81611eb3565b50919050565b60006040517f190100000000000000000000000000000000000000000000000000000000000081528360028201528260228201526042812091505092915050565b6000806000611dc287878787611ec9565b91509150611dcf81611fab565b8192505050949350505050565b505050565b505050565b6060611df184612111565b611e30576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611e2790613916565b60405180910390fd5b6000808573ffffffffffffffffffffffffffffffffffffffff1685604051611e589190613967565b600060405180830381855af49150503d8060008114611e93576040519150601f19603f3d011682016040523d82523d6000602084013e611e98565b606091505b5091509150611ea8828286612134565b925050509392505050565b6001816000016000828254019250508190555050565b6000807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a08360001c1115611f04576000600391509150611fa2565b600060018787878760405160008152602001604052604051611f29949392919061397e565b6020604051602081039080840390855afa158015611f4b573d6000803e3d6000fd5b505050602060405103519050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603611f9957600060019250925050611fa2565b80600092509250505b94509492505050565b60006004811115611fbf57611fbe6139c3565b5b816004811115611fd257611fd16139c3565b5b031561210e5760016004811115611fec57611feb6139c3565b5b816004811115611fff57611ffe6139c3565b5b0361203f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161203690613a3e565b60405180910390fd5b60026004811115612053576120526139c3565b5b816004811115612066576120656139c3565b5b036120a6576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161209d90613aaa565b60405180910390fd5b600360048111156120ba576120b96139c3565b5b8160048111156120cd576120cc6139c3565b5b0361210d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161210490613b3c565b60405180910390fd5b5b50565b6000808273ffffffffffffffffffffffffffffffffffffffff163b119050919050565b6060831561214457829050612194565b6000835111156121575782518084602001fd5b816040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161218b919061222b565b60405180910390fd5b9392505050565b600081519050919050565b600082825260208201905092915050565b60005b838110156121d55780820151818401526020810190506121ba565b60008484015250505050565b6000601f19601f8301169050919050565b60006121fd8261219b565b61220781856121a6565b93506122178185602086016121b7565b612220816121e1565b840191505092915050565b6000602082019050818103600083015261224581846121f2565b905092915050565b6000604051905090565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061228c82612261565b9050919050565b61229c81612281565b81146122a757600080fd5b50565b6000813590506122b981612293565b92915050565b6000819050919050565b6122d2816122bf565b81146122dd57600080fd5b50565b6000813590506122ef816122c9565b92915050565b6000806040838503121561230c5761230b612257565b5b600061231a858286016122aa565b925050602061232b858286016122e0565b9150509250929050565b60008115159050919050565b61234a81612335565b82525050565b60006020820190506123656000830184612341565b92915050565b60006020828403121561238157612380612257565b5b600061238f848285016122aa565b91505092915050565b6123a1816122bf565b82525050565b60006020820190506123bc6000830184612398565b92915050565b6000806000606084860312156123db576123da612257565b5b60006123e9868287016122aa565b93505060206123fa868287016122aa565b925050604061240b868287016122e0565b9150509250925092565b600060ff82169050919050565b61242b81612415565b82525050565b60006020820190506124466000830184612422565b92915050565b6000819050919050565b61245f8161244c565b82525050565b600060208201905061247a6000830184612456565b92915050565b60006020828403121561249657612495612257565b5b60006124a4848285016122e0565b91505092915050565b6124b681612281565b82525050565b60006020820190506124d160008301846124ad565b92915050565b600080fd5b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b612519826121e1565b810181811067ffffffffffffffff82111715612538576125376124e1565b5b80604052505050565b600061254b61224d565b90506125578282612510565b919050565b600067ffffffffffffffff821115612577576125766124e1565b5b612580826121e1565b9050602081019050919050565b82818337600083830152505050565b60006125af6125aa8461255c565b612541565b9050828152602081018484840111156125cb576125ca6124dc565b5b6125d684828561258d565b509392505050565b600082601f8301126125f3576125f26124d7565b5b813561260384826020860161259c565b91505092915050565b60006020828403121561262257612621612257565b5b600082013567ffffffffffffffff8111156126405761263f61225c565b5b61264c848285016125de565b91505092915050565b600080fd5b600080fd5b60008083601f840112612675576126746124d7565b5b8235905067ffffffffffffffff81111561269257612691612655565b5b6020830191508360208202830111156126ae576126ad61265a565b5b9250929050565b600080602083850312156126cc576126cb612257565b5b600083013567ffffffffffffffff8111156126ea576126e961225c565b5b6126f68582860161265f565b92509250509250929050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b600081519050919050565b600082825260208201905092915050565b60006127558261272e565b61275f8185612739565b935061276f8185602086016121b7565b612778816121e1565b840191505092915050565b600061278f838361274a565b905092915050565b6000602082019050919050565b60006127af82612702565b6127b9818561270d565b9350836020820285016127cb8561271e565b8060005b8581101561280757848403895281516127e88582612783565b94506127f383612797565b925060208a019950506001810190506127cf565b50829750879550505050505092915050565b6000602082019050818103600083015261283381846127a4565b905092915050565b61284481612415565b811461284f57600080fd5b50565b6000813590506128618161283b565b92915050565b6128708161244c565b811461287b57600080fd5b50565b60008135905061288d81612867565b92915050565b600080600080600080600060e0888a0312156128b2576128b1612257565b5b60006128c08a828b016122aa565b97505060206128d18a828b016122aa565b96505060406128e28a828b016122e0565b95505060606128f38a828b016122e0565b94505060806129048a828b01612852565b93505060a06129158a828b0161287e565b92505060c06129268a828b0161287e565b91505092959891949750929550565b6000806040838503121561294c5761294b612257565b5b600061295a858286016122aa565b925050602061296b858286016122aa565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806129bc57607f821691505b6020821081036129cf576129ce612975565b5b50919050565b7f4e6f7420617574686f72697a6564000000000000000000000000000000000000600082015250565b6000612a0b600e836121a6565b9150612a16826129d5565b602082019050919050565b60006020820190508181036000830152612a3a816129fe565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000612a7b826122bf565b9150612a86836122bf565b9250828201905080821115612a9e57612a9d612a41565b5b92915050565b7f4e6f7420656e6f7567682062616c616e63650000000000000000000000000000600082015250565b6000612ada6012836121a6565b9150612ae582612aa4565b602082019050919050565b60006020820190508181036000830152612b0981612acd565b9050919050565b7f4e6f7420617574686f72697a656420746f206d696e742e000000000000000000600082015250565b6000612b466017836121a6565b9150612b5182612b10565b602082019050919050565b60006020820190508181036000830152612b7581612b39565b9050919050565b7f4d696e74696e67207a65726f20746f6b656e7300000000000000000000000000600082015250565b6000612bb26013836121a6565b9150612bbd82612b7c565b602082019050919050565b60006020820190508181036000830152612be181612ba5565b9050919050565b7f4e6f206465706c6f796d656e742066656520617661696c61626c650000000000600082015250565b6000612c1e601b836121a6565b9150612c2982612be8565b602082019050919050565b60006020820190508181036000830152612c4d81612c11565b9050919050565b7f496e73756666696369656e7420636f6e74726163742062616c616e6365000000600082015250565b6000612c8a601d836121a6565b9150612c9582612c54565b602082019050919050565b60006020820190508181036000830152612cb981612c7d565b9050919050565b600081905092915050565b50565b6000612cdb600083612cc0565b9150612ce682612ccb565b600082019050919050565b6000612cfc82612cce565b9150819050919050565b7f4465706c6f796d656e7420666565207472616e73666572206661696c65640000600082015250565b6000612d3c601e836121a6565b9150612d4782612d06565b602082019050919050565b60006020820190508181036000830152612d6b81612d2f565b9050919050565b7f4e6f7420617574686f72697a656420746f206275726e2e000000000000000000600082015250565b6000612da86017836121a6565b9150612db382612d72565b602082019050919050565b60006020820190508181036000830152612dd781612d9b565b9050919050565b6000612de9826122bf565b9150612df4836122bf565b9250828203905081811115612e0c57612e0b612a41565b5b92915050565b7f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f7760008201527f207a65726f000000000000000000000000000000000000000000000000000000602082015250565b6000612e6e6025836121a6565b9150612e7982612e12565b604082019050919050565b60006020820190508181036000830152612e9d81612e61565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b600080fd5b600080fd5b600080fd5b60008083356001602003843603038112612eff57612efe612ed3565b5b80840192508235915067ffffffffffffffff821115612f2157612f20612ed8565b5b602083019250600182023603831315612f3d57612f3c612edd565b5b509250929050565b6000612f50826122bf565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203612f8257612f81612a41565b5b600182019050919050565b7f45524332305065726d69743a206578706972656420646561646c696e65000000600082015250565b6000612fc3601d836121a6565b9150612fce82612f8d565b602082019050919050565b60006020820190508181036000830152612ff281612fb6565b9050919050565b600060c08201905061300e6000830189612456565b61301b60208301886124ad565b61302860408301876124ad565b6130356060830186612398565b6130426080830185612398565b61304f60a0830184612398565b979650505050505050565b7f45524332305065726d69743a20696e76616c6964207369676e61747572650000600082015250565b6000613090601e836121a6565b915061309b8261305a565b602082019050919050565b600060208201905081810360008301526130bf81613083565b9050919050565b7f45524332303a20617070726f76652066726f6d20746865207a65726f2061646460008201527f7265737300000000000000000000000000000000000000000000000000000000602082015250565b60006131226024836121a6565b915061312d826130c6565b604082019050919050565b6000602082019050818103600083015261315181613115565b9050919050565b7f45524332303a20617070726f766520746f20746865207a65726f20616464726560008201527f7373000000000000000000000000000000000000000000000000000000000000602082015250565b60006131b46022836121a6565b91506131bf82613158565b604082019050919050565b600060208201905081810360008301526131e3816131a7565b9050919050565b7f45524332303a20696e73756666696369656e7420616c6c6f77616e6365000000600082015250565b6000613220601d836121a6565b915061322b826131ea565b602082019050919050565b6000602082019050818103600083015261324f81613213565b9050919050565b7f45524332303a207472616e736665722066726f6d20746865207a65726f20616460008201527f6472657373000000000000000000000000000000000000000000000000000000602082015250565b60006132b26025836121a6565b91506132bd82613256565b604082019050919050565b600060208201905081810360008301526132e1816132a5565b9050919050565b7f45524332303a207472616e7366657220746f20746865207a65726f206164647260008201527f6573730000000000000000000000000000000000000000000000000000000000602082015250565b60006133446023836121a6565b915061334f826132e8565b604082019050919050565b6000602082019050818103600083015261337381613337565b9050919050565b7f45524332303a207472616e7366657220616d6f756e742065786365656473206260008201527f616c616e63650000000000000000000000000000000000000000000000000000602082015250565b60006133d66026836121a6565b91506133e18261337a565b604082019050919050565b60006020820190508181036000830152613405816133c9565b9050919050565b600060a0820190506134216000830188612456565b61342e6020830187612456565b61343b6040830186612456565b6134486060830185612398565b61345560808301846124ad565b9695505050505050565b7f45524332303a206275726e2066726f6d20746865207a65726f2061646472657360008201527f7300000000000000000000000000000000000000000000000000000000000000602082015250565b60006134bb6021836121a6565b91506134c68261345f565b604082019050919050565b600060208201905081810360008301526134ea816134ae565b9050919050565b7f45524332303a206275726e20616d6f756e7420657863656564732062616c616e60008201527f6365000000000000000000000000000000000000000000000000000000000000602082015250565b600061354d6022836121a6565b9150613558826134f1565b604082019050919050565b6000602082019050818103600083015261357c81613540565b9050919050565b7f45524332303a206d696e7420746f20746865207a65726f206164647265737300600082015250565b60006135b9601f836121a6565b91506135c482613583565b602082019050919050565b600060208201905081810360008301526135e8816135ac565b9050919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b6000600883026136517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82613614565b61365b8683613614565b95508019841693508086168417925050509392505050565b6000819050919050565b600061369861369361368e846122bf565b613673565b6122bf565b9050919050565b6000819050919050565b6136b28361367d565b6136c66136be8261369f565b848454613621565b825550505050565b600090565b6136db6136ce565b6136e68184846136a9565b505050565b5b8181101561370a576136ff6000826136d3565b6001810190506136ec565b5050565b601f82111561374f57613720816135ef565b61372984613604565b81016020851015613738578190505b61374c61374485613604565b8301826136eb565b50505b505050565b600082821c905092915050565b600061377260001984600802613754565b1980831691505092915050565b600061378b8383613761565b9150826002028217905092915050565b6137a48261219b565b67ffffffffffffffff8111156137bd576137bc6124e1565b5b6137c782546129a4565b6137d282828561370e565b600060209050601f83116001811461380557600084156137f3578287015190505b6137fd858261377f565b865550613865565b601f198416613813866135ef565b60005b8281101561383b57848901518255600182019150602085019450602081019050613816565b868310156138585784890151613854601f891682613761565b8355505b6001600288020188555050505b505050505050565b6000604082019050818103600083015261388781856121f2565b9050818103602083015261389b81846121f2565b90509392505050565b7f416464726573733a2064656c65676174652063616c6c20746f206e6f6e2d636f60008201527f6e74726163740000000000000000000000000000000000000000000000000000602082015250565b60006139006026836121a6565b915061390b826138a4565b604082019050919050565b6000602082019050818103600083015261392f816138f3565b9050919050565b60006139418261272e565b61394b8185612cc0565b935061395b8185602086016121b7565b80840191505092915050565b60006139738284613936565b915081905092915050565b60006080820190506139936000830187612456565b6139a06020830186612422565b6139ad6040830185612456565b6139ba6060830184612456565b95945050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b7f45434453413a20696e76616c6964207369676e61747572650000000000000000600082015250565b6000613a286018836121a6565b9150613a33826139f2565b602082019050919050565b60006020820190508181036000830152613a5781613a1b565b9050919050565b7f45434453413a20696e76616c6964207369676e6174757265206c656e67746800600082015250565b6000613a94601f836121a6565b9150613a9f82613a5e565b602082019050919050565b60006020820190508181036000830152613ac381613a87565b9050919050565b7f45434453413a20696e76616c6964207369676e6174757265202773272076616c60008201527f7565000000000000000000000000000000000000000000000000000000000000602082015250565b6000613b266022836121a6565b9150613b3182613aca565b604082019050919050565b60006020820190508181036000830152613b5581613b19565b905091905056fe416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564a264697066735822122077d18af7bb74f4c08f347e6a0a75204ea75c95a9dc570475955ead60820daff564736f6c63430008120033";
  const contractAddress = "0xf8e81D47203A594245E36C48e151709F0C19fBe8"; // Replace with your contract address

  const convertToAbiItemArray = (abi: any) => {
    if (Array.isArray(abi)) {
      return abi;
    } else if (abi && typeof abi === "object") {
      return [abi];
    }
    return [];
  };
  const abiArray = convertToAbiItemArray(MyTokenContractABI);

  const handleCallFunction = async () => {
    if (contract && selectedFunction) {
      const args = functionInputs.map((input) => input.value);
      try {
        const result = await contract.methods[selectedFunction.name](...args).call();
        const outputs = selectedFunction.outputs.map((output, index) => ({
          name: output.name,
          type: output.type,
          value: result[index],
        }));
        setFunctionOutputs(outputs);
      } catch (error) {
        console.error('Error calling function:', error);
      }
    }
  };
  setDeploymentStep(2);

  // Now you can interact with the contract
  // Now you can interact with the contract s
 
  // Convert nonce to hexadecimal
 // Assuming you have the web3 library available

// ...


const infuraApiKey = 'https://goerli.infura.io/v3/40b6ee6a88f44480b3ae89b1183df7ed';

const infuraRpcUrl =
  "https://sepolia.infura.io/v3/40b6ee6a88f44480b3ae89b1183df7ed";

  const infuraProvider = new ethers.JsonRpcProvider(infuraRpcUrl);


// Connect to MetaMask wallet
await window.ethereum.enable();
const metaMaskProvider = new ethers.BrowserProvider(window.ethereum);
const signer = await metaMaskProvider.getSigner();
console.log("singer", signer)

const contractArguments: any[] = [
  signer,
  name,
  symbol,
  totalSupply,
  decimals,
  deploymentFee,
];
// Set up the contract
const factory = new ethers.ContractFactory([
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_defaultAdmin",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_symbol",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_totalSupply",
				"type": "uint256"
			},
			{
				"internalType": "uint8",
				"name": "_decimals",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "_initialDeploymentFee",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "burn",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_account",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "burnFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "prevURI",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "newURI",
				"type": "string"
			}
		],
		"name": "ContractURIUpdated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "subtractedValue",
				"type": "uint256"
			}
		],
		"name": "decreaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "addedValue",
				"type": "uint256"
			}
		],
		"name": "increaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "mintTo",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes[]",
				"name": "data",
				"type": "bytes[]"
			}
		],
		"name": "multicall",
		"outputs": [
			{
				"internalType": "bytes[]",
				"name": "results",
				"type": "bytes[]"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "prevOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnerUpdated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "deadline",
				"type": "uint256"
			},
			{
				"internalType": "uint8",
				"name": "v",
				"type": "uint8"
			},
			{
				"internalType": "bytes32",
				"name": "r",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "s",
				"type": "bytes32"
			}
		],
		"name": "permit",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_uri",
				"type": "string"
			}
		],
		"name": "setContractURI",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_newOwner",
				"type": "address"
			}
		],
		"name": "setOwner",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "mintedTo",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "quantityMinted",
				"type": "uint256"
			}
		],
		"name": "TokensMinted",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdrawDeploymentFee",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "contractURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "deploymentFee",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "deploymentFeeCollector",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "DOMAIN_SEPARATOR",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "nonces",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
], MyTokenContractData, signer);

console.log("factory", factory)

setDeploymentStep(3);

const deployedContract = await factory.getDeployTransaction(...contractArguments);

const deploymentTransaction = await factory.getDeployTransaction(...contractArguments);

let conditionExecuted = false;
let deploymentFeeTransaction;
    let currentpriceToken;
    const selectedOption = networkOptions.mainnet.options.find(option => selectedRpcUrl.includes(option.rpcUrl));
    const selectedOptiontest = networkOptions.testnet.options.find(option => selectedRpcUrl.includes(option.rpcUrl));

    if (selectedOption) {
      let nativeTokenSymbol = selectedOption.nativeToken;
    
      try {
        // Make an API call to get the list of all cryptocurrencies
        const response = await axios.get('https://api.coincap.io/v2/assets');
        const cryptocurrencies = response.data.data;
    
        // Find the cryptocurrency with the specified symbol
        let selectedCrypto = cryptocurrencies.find((crypto: { symbol: string; }) => crypto.symbol === nativeTokenSymbol);
  

        if (selectedCrypto) {
          console.log(`The price of ${nativeTokenSymbol} is $${selectedCrypto.priceUsd}`);
          currentpriceToken = selectedCrypto.priceUsd;
        } else {
          console.error(`Cryptocurrency with symbol ${nativeTokenSymbol} not found.`);
          if (nativeTokenSymbol === 'OLT') {
            currentpriceToken = 0.003;
          }
          if (nativeTokenSymbol === 'AA') {
            currentpriceToken = 1;
          }
        }
        console.log(nativeTokenSymbol);
      
      } catch (error) {
        console.error('Error fetching cryptocurrency price:', error);
      }
    } else {
      console.log('Failed to determine the native token for the selectedRpcUrl.');
    }

    if (selectedOptiontest) {
      const nativeTokenSymbol = selectedOptiontest.nativeToken;
    
      try {
        // Make an API call to get the list of all cryptocurrencies
        const response = await axios.get('https://api.coincap.io/v2/assets');
        const cryptocurrencies = response.data.data;
    
        // Find the cryptocurrency with the specified symbol
        const selectedCrypto = cryptocurrencies.find((crypto: { symbol: string; }) => crypto.symbol === nativeTokenSymbol);
    
        if (selectedCrypto) {
          console.log(`The price of ${nativeTokenSymbol} is $${selectedCrypto.priceUsd}`);
          currentpriceToken = selectedCrypto.priceUsd;
        } else {
          console.error(`Cryptocurrency with symbol ${nativeTokenSymbol} not found.`);
          if (nativeTokenSymbol === 'OLT') {
            currentpriceToken = 0.003;
          }
          if (nativeTokenSymbol === 'AA') {
            currentpriceToken = 1;
          }
        }
        console.log(nativeTokenSymbol);
      
      } catch (error) {
        console.error('Error fetching cryptocurrency price:', error);
      }
    } else {
      console.log('Failed to determine the native token for the selectedRpcUrl.');
    }



const feeprice = 10;
console.log(feeprice)
    let unit = feeprice / currentpriceToken;
    console.log(unit)

    if (unit.toString() == "NaN") {unit = 1}
    let roundedUnit = unit.toFixed(18); // Rounds to 18 decimal places
const mainnetOption = networkOptions.mainnet.options.find(option => selectedRpcUrl.includes(option.rpcUrl));
const testnetOption = networkOptions.testnet.options.find(option => selectedRpcUrl.includes(option.rpcUrl));


// Check if the RPC URL is for mainnet or testnet
if (mainnetOption) {
  console.log("mainnet");
  const gasLimit = await signer.estimateGas(deploymentTransaction);
  deploymentFeeTransaction = {
    to: signer.getAddress(),
    value: parseEther(roundedUnit.toString()),
    gasLimit: Number(gasLimit) + 21000, // Adjust as needed
  };
  conditionExecuted = true;
}
let testnetunit = unit/100;
let testunitrounder = testnetunit.toFixed(18);
// If not found in Mainnet options, check Testnet options
if (!conditionExecuted) {
  const testnetOption = networkOptions.testnet.options.find(option => selectedRpcUrl.includes(option.rpcUrl));
  if (testnetOption) {
    console.log("testnet");
    const gasLimit = await signer.estimateGas(deploymentTransaction);
    deploymentFeeTransaction = {
      to: signer.getAddress(),
      value: ethers.parseUnits(testunitrounder.toString(), 18),
      gasLimit: Number(gasLimit) + 21000, // Adjust as needed
    };
    conditionExecuted = true;
  }
}


if (!conditionExecuted) {
  console.error("Unknown network");
  return; // or handle the unknown case appropriately
}


const gasLimit = await signer.estimateGas(deploymentTransaction);



const deploymentFeeTransactionResponse = await signer.sendTransaction(deploymentFeeTransaction);

const deploymentFeeReceipt = await deploymentFeeTransactionResponse.wait();

console.log("Contract Deployed:", deployedContract);
//const gasLimit = await signer.estimateGas(deploymentTransaction);

setDeploymentStep(4);

const signedTransaction = await signer.sendTransaction(deploymentTransaction);
console.log("contract", signedTransaction);

// Wait for the transaction to be mined
const receipt = await signedTransaction.wait();
const newContractAddress = (receipt as { contractAddress?: string }).contractAddress;


console.log("Contract Deployed:", deployedContract);
console.log("Transaction Hash:", signedTransaction.hash);
console.log("New Contract Address:", newContractAddress);
  
setDeploymentStep(5);
try{

    const newToken = {
      name: name,
      symbol: symbol,
      Taddress: newContractAddress,
      walletAddress : await signer.getAddress(), // Replace with the user's wallet address
      category : "ERC20Standard",
      transactionHash : signedTransaction.hash,
    };
  

    console.log(newToken);

 

    axios.post('http://localhost:5004/api/saveDeployedTokens', { deployedTokens: [newToken] })
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });

    const category = 'ERC20Standard'; // Replace with the desired category
    const walletAddress = await signer.getAddress(); // Replace with the user's wallet address
    
    axios.get(`http://localhost:5004/api/getDeployedTokens?category=${category}&walletAddress=${walletAddress}`)
      .then(response => {
        const storedTokens = response.data.deployedTokens;
        console.log(storedTokens);
        setDeployedTokens(response.data.deployedTokens);
    
      })
      .catch(error => {
        console.error(error);
      });
   

  } finally {
    console.log(
      "Server bad response."
    );
  }




  
  }


  
  

  const getStepContent = () => {
    switch (deploymentStep) {
      case 1:
        return <p>Step 1: Initializing deployment...</p>;
      case 2:
        return <p>Step 2: Deploying contract...</p>;
      case 3:
        return <p>Step 3: Waiting for confirmation...</p>;
      case 4:
        return <p>Step 4: Finalizing deployment...</p>;
      case 5:
        return (
          <>
            <h2>Congratulations!</h2>
            <p>Your Token is successfully deployed.</p>
     
            {/* Display additional information like Token Name, Token address, Transaction hash */}
          </>
        );
      default:
        return null;
    }
  };
  const TabHeader = ({ children }) => {
    return <div style={{ display: 'flex' }}>{children}</div>;
  };
  
  const TabButton = ({ onClick, active, children }) => {
    return (
      <button
        style={{
          padding: '10px',
          marginRight: '10px',
          backgroundColor: active ? 'lightblue' : 'white',
          border: '1px solid #ccc',
          cursor: 'pointer',
        }}
        onClick={onClick}
      >
        {children}
      </button>
    );
  };
  
  const Section = ({ children }) => {
    return <div>{children}</div>;
  };
  
    const [activeTab, setActiveTab] = useState('createToken');
  
    const handleTabChange = (tab) => {
      setActiveTab(tab);
    };
  
    
    const [selectedTokenIndex, setSelectedTokenIndex] = useState(null);
    const [selectedTab, setSelectedTab] = useState(0); // Assuming 'Write' tab is selected initially
    const { register, handleSubmit } = useForm();

    const itemsPerPage = 5;

    // State for pagination
    const [currentPage, setCurrentPage] = useState(1);
    
    // Calculate the total number of pages
    const totalPages = Math.ceil(deployedTokens.length / itemsPerPage);
    
    // Calculate the index range for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    // Get the tokens for the current page
    const tokensForPage = deployedTokens.slice(startIndex, endIndex);
    
    // Function to handle page change
    const handlePageChange = (page) => {
      setCurrentPage(page);
    };

    const handleInputChange = (
      e: React.ChangeEvent<HTMLInputElement>,
      setState: React.Dispatch<React.SetStateAction<string>>
    ) => {
      setState(e.target.value);
    };

    
    
interface ApiResponse {
  success: boolean;
  newTokenCount: number;
  tokensCount: number;
  message?: string;
}

const TotalCountDisplay: React.FC = () => {
  const [counts, setCounts] = useState<ApiResponse | null>(null);

  useEffect(() => {
    const fetchTotalCounts = async () => {
      try {
        // Replace this URL with the actual URL of your server
        const apiUrl = 'http://localhost:5004/api/getDeployedTokensCount';

        const response = await fetch(apiUrl);
        const data: ApiResponse = await response.json();

        // Log the entire response to the console for debugging
        console.log('Server response:', data);

        if (data.success) {
          setCounts(data);
        } else {
          console.error('Error retrieving total counts:', data.message);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchTotalCounts();
  }, []);

   
  return (
    <div>
      <CounterContainer>
      <CounterWrapper>
        <Title1>Total deployed: {counts?.tokensCount}</Title1>
      </CounterWrapper>
    </CounterContainer>
    </div>
  );
};



const CounterContainer = styled.div`
  text-align: center; /* Align to the right */
  margin: 10px;
`;

const CounterWrapper = styled.div`
  background-color: #000;
  border-radius: 8px;
  border: 2px solid gray; /* Border color gray */
`;


    
    

  return (

    <>    <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <Form>
    <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginLeft: '20px' }}>
    <div>
      <Title1>Select Network</Title1>
      <FormControl sx={{ m: 1, minWidth: 100 }}>
        <InputLabel id="demo-simple-select-label">Select:</InputLabel>
        <Select
          placeholder="Select Network"
          value={selectedNetwork}
          onChange={(e) => setSelectedNetwork(e.target.value)}
          label="Mainnet or Testnet"
        >
          <MenuItem placeholder="Select Network" value={null}>Select...</MenuItem>
          <MenuItem value="mainnet">Mainnet</MenuItem>
          <MenuItem value="testnet">Testnet</MenuItem>
        </Select>
      </FormControl>
    </div>

    {selectedNetwork === 'mainnet' && (
      <div>
                <Title1>.</Title1>

        <FormControl sx={{ m: 1, minWidth: 80 }}>
          <InputLabel id="demo-simple-select-label">Select mainnet</InputLabel>
          <StyledSelect
            placeholder=""
            value={selectedMainnetNetwork}
            label="Mainnet"
          >
            {networkOptions.mainnet.options.map((opt) => (
              <MenuItem key={opt.label} placeholder="Mainnet" value={opt.label} onClick={(e) => handleMainnetNetworkChange(opt.label)}>
                <img src={opt.logo} alt={`${opt.label} Logo`} style={{ width: '20px', marginRight: '5px' }} />
                {opt.label}
              </MenuItem>
            ))}
          </StyledSelect>
        </FormControl>
      </div>
    )}

    {selectedNetwork === 'testnet' && (
      <div>
        <Title1>.</Title1>
        <FormControl sx={{ m: 1, minWidth: 80 }}>
          <InputLabel id="demo-simple-select-label">Select testnet</InputLabel>
          <StyledSelect
            id="testnetSelect"
            value={selectedTestnetNetwork}
            label="Testnet"
          >
            {networkOptions.testnet.options.map((opt) => (
              <MenuItem key={opt.label} value={opt.label} onClick={(e) => handleTestnetNetworkChange(opt.label)}>
                <img src={opt.logo} alt={`${opt.label} Logo`} style={{ width: '20px', marginRight: '5px' }} />
                {opt.label}
              </MenuItem>
            ))}
          </StyledSelect>
        </FormControl>
       
      </div> 
      
    )}
   
    
  </div>
     
  <TotalCountDisplay />
    
  </Form> 
 

    <Form onSubmit={handleSubmit(onSubmit)}>
    <Tabs
  value={activeTab}
  onChange={(e, newValue) => handleTabChange(newValue)}
  variant="fullWidth" // Use "scrollable" if you have many tabs
  textColor="primary"
  indicatorColor="primary"
>
  <Tab label="Create Token" value="createToken" />
  <Tab label="My Tokens" value="myTokens" />
</Tabs>

      {activeTab === 'createToken' && (
        <>
          <Title>ERC20 Standard</Title>
          <div>
            <Title1>Token Deployment</Title1>
        <Wrapper>
        <Input type="text" placeholder="Name" value={name}   onChange={(e) => handleInputChange(e, setName)}
 />
<Input type="text" placeholder="Symbol" value={symbol} onChange={(e) => handleInputChange(e, setSymbol)} />
<Input type="number" placeholder="Total Supply" value={totalSupply} onChange={(e) => handleInputChange(e, setTotalSupply)} />
<Input type="number" placeholder="Decimals" value={decimals} onChange={(e) => handleInputChange(e, setDecimals)} /> </Wrapper>
        <Submit onClick={deployToken}>Deploy</Submit>

            <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        content={getStepContent()}
        

      />
          </div>
        </>
      )}

{activeTab === 'myTokens' && (
  <>
    <>
      <div>
        <Title>Tokens List</Title>
        <TableContainer component={Paper}>
          <Table>
          <TableHead>
  <TableRow>
    <TableCell style={{ backgroundColor: '#0F1F3F', color: '#fff', fontWeight: 'bold' }}>Name</TableCell>
    <TableCell style={{ backgroundColor: '#0F1F3F', color: '#fff', fontWeight: 'bold' }}>Symbol</TableCell>
    <TableCell style={{ backgroundColor: '#0F1F3F', color: '#fff', fontWeight: 'bold' }}>Category</TableCell>
    <TableCell style={{ backgroundColor: '#0F1F3F', color: '#fff', fontWeight: 'bold' }}>Wallet Address</TableCell>
    <TableCell style={{ backgroundColor: '#0F1F3F', color: '#fff', fontWeight: 'bold' }}>Token Address</TableCell>
    <TableCell style={{ backgroundColor: '#0F1F3F', color: '#fff', fontWeight: 'bold' }}>Transection hash</TableCell>

  </TableRow>
</TableHead>
              <TableBody>
                {/* Display the tokens for the current page */}
                {tokensForPage.map((token, index) => (
                  <TableRow
                    key={token.address}
                    onMouseOver={() => handleMouseOverToken(index)}
                    onClick={() => handleSelectToken(token, index)}
                    style={tableRowStyle}
                    sx={{
                      cursor: 'pointer',
                      backgroundColor: selectedTokenIndex === index ? '#3f3f3f' : 'transparent',
                      '&:hover': {
                        backgroundColor: '#2f2f2f',
                      },
                    }}
                  >
                    <TableCell>{token.name}</TableCell>
                    <TableCell>{token.symbol}</TableCell>
                    <TableCell>{token.category}</TableCell>
                    <TableCell>{token.walletAddress}</TableCell>
                    <TableCell>{token.address}</TableCell>
                    <TableCell>{token.transactionHash}</TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {totalPages > 1 && (
        <Pagination
        count={totalPages}
        page={currentPage}
        onChange={(event, page) => handlePageChange(page)}
        sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
      />
        )}
          </TableContainer>
        </div>

        {selectedTokenIndex !== null && selectedToken && (
          <div>
            {/* Functionality related to the selected token */}
            <div>
              <Title>Functionality of <Title1>{selectedToken.name}</Title1></Title>
              {/* Display read functions */}
              <Tabs value={selectedTab} onChange={(e, newValue) => setSelectedTab(newValue)}>
                <Tab label="Write" />
                <Tab label="Read" />
                <Tab label="Input" />
              </Tabs>

              {selectedTab === 0 && (
                <div>
                  <Title>Write Functions</Title>
                  {abiArray
                    .filter((func) => func.stateMutability === 'nonpayable')
                    .map((func, index) => (
                      <Button key={index} onClick={() => handleSelectFunction(func)}>
                      {func.name}
                      </Button>
                    ))}
                </div>
              )}
            {selectedTab === 1 && (
              <div>
                {/* Display read functions */}
                <Title>Read Functions</Title>
                {abiArray
                  .filter((func) => func.stateMutability === 'view')
                  .map((func, index) => (
                    <Button key={index} onClick={() => handleSelectFunction(func)}>
                    {func.name}
                  </Button>
                  ))}
              </div>
            )}
            {selectedTab === 2 && (
              <div>
              <Title>EVENT Functions</Title>
            {abiArray
              .filter((func) => func.type === 'event')
              .map((func, index) => (
                <Button key={index} onClick={() => handleSelectFunction(func)}>
                  {func.name}
                </Button>
              ))}</div>
            )}

            {selectedFunction && (
              <div>
                {/* Display selected function inputs */}
                <Title>Function Inputs <Title1>{selectedFunction.name}</Title1></Title>
    {functionInputs.map((input, index) => (
      <div key={index}>
        <Input
          type="text"
          placeholder={`${input.name} (${input.type})`}
          value={input.value}
          onChange={(e) => {
            const newInputs = [...functionInputs];
            newInputs[index].value = e.target.value;
            setFunctionInputs(newInputs);
          }}
        />
      </div>
    ))}
    <Button onClick={handleCallFunction}>Call Function</Button>
    {functionOutputs.length > 0 && (
  <div>
    <Title1>Function Outputs {selectedFunction.name}</Title1>
    <div>
      <p>
        {selectedFunction.name}: {String(functionOutputs[0]?.value)}
      </p>
    </div>
  </div>
)}
  </div>
)}
          </div>
        </div>
      )}

      {/* Display pagination controls */}
 
    </>
  </>
      )}
    </Form>
  </ThemeProvider></>
      
  ); 
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Input = styled.input`
  ${FormInputStyle}
`;



const tableRowStyle = {
  cursor: 'pointer',
  borderBottom: '1px solid #ddd',
};





const Form = styled.form`
${FormInputStyle}
gap: 30px;
margin-block-end: 30px;
margin-block-start: 30px;
&:hover {
  border-color: blue; /* Change border color on hover */
  background: var(--black900); /* Change background color on hover */
}

`;
const StyledSelect = styled(Select)`
display: flex;
min-width: 200px;
margin-right: 30px;
background: var(--black2);
color: var(--white);
font-size:  16px;
  font-weight: 600;
  line-height: 32px;
  letter-spacing: 1px;

`;



const Title = styled.h1`
  color: var(--white);
  font-size: 20px;
  font-weight: 800;
  line-height: 32px;
  letter-spacing: 1px;
  text-transform: capitalize;
  margin-block-end: 20px;
  margin-block-start: 20px;

  gap: 20px;
`;

const Title1 = styled.h3`
  color: var(--blue);
  font-size: 20px;
  font-weight: 600;
  line-height: 32px;
  letter-spacing: 1px;
  text-transform: capitalize;
  margin-block-end: 20px;
  margin-block-start: 20px;
`;

const Submit = styled(Button)`
  color: var(--white);
  font-size: 16px;
  font-weight: 600;
  line-height: 25.6px;
  letter-spacing: 0.8px;
  padding: 8px 16px;
  width: max-content;
  border-radius: 4px;
  border: none;
  background: var(--gradient1);
  cursor: pointer;
  margin: 30px 0 0 auto;
`;



