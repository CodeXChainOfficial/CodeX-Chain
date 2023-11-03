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
import MyTokenContractABI from "./ABIerc20SignatureMintVote.json";
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
  const abi = MyTokenContractABI;
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
    const category = "ERC20SignatureMintVote"; // Replace with the desired category
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
    const category = "SignatureMintVote"; // Replace with the desired category
    const walletAddress = await signer.getAddress(); // Replace with the user's wallet address
    
    axios.get(`http://localhost:5004/api/getDeployedTokens?category=${category}&walletAddress=${walletAddress}`)
      .then(response => {
        const storedTokens = response.data.deployedTokens;
        console.log("list",storedTokens);
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


    if (!name || !symbol) {
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
    "6101c06040527f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c960e0523480156200003657600080fd5b5060405162003e1938038062003e1983398101604081905262000059916200048a565b6040518060400160405280601281526020017105369676e61747572654d696e7445524332360741b815250604051806040016040528060018152602001603160f81b815250858585818181818160059081620000b69190620005a9565b506006620000c58282620005a9565b50504660a052503060c052620000da6200019d565b60805250620000eb90508362000223565b50508251602080850191909120835191840191909120610160829052610180819052466101205290915060008051602062003df9833981519152620001758184846040805160208101859052908101839052606081018290524660808201523060a082015260009060c0016040516020818303038152906040528051906020012090509392505050565b6101005230610140526101a052506200019392508391505062000275565b5050505062000675565b600060008051602062003df9833981519152620001b96200030e565b80516020918201206040805192830193909352918101919091527fc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc660608201524660808201523060a082015260c00160405160208183030381529060405280519060200120905090565b600180546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8292fce18fa69edf4db7b94ea2e58241df0ae57f97e0a6c9b29067028bf92d7690600090a35050565b6001600160a01b038116620002c45760405162461bcd60e51b8152602060048201526011602482015270125b9d985b1a59081c9958da5c1a595b9d607a1b604482015260640160405180910390fd5b600b80546001600160a01b0319166001600160a01b0383169081179091556040517f299d17e95023f496e0ffc4909cff1a61f74bb5eb18de6f900f4155bfa1b3b33390600090a250565b6060600580546200031f906200051a565b80601f01602080910402602001604051908101604052809291908181526020018280546200034d906200051a565b80156200039e5780601f1062000372576101008083540402835291602001916200039e565b820191906000526020600020905b8154815290600101906020018083116200038057829003601f168201915b5050505050905090565b80516001600160a01b0381168114620003c057600080fd5b919050565b634e487b7160e01b600052604160045260246000fd5b600082601f830112620003ed57600080fd5b81516001600160401b03808211156200040a576200040a620003c5565b604051601f8301601f19908116603f01168101908282118183101715620004355762000435620003c5565b816040528381526020925086838588010111156200045257600080fd5b600091505b8382101562000476578582018301518183018401529082019062000457565b600093810190920192909252949350505050565b60008060008060808587031215620004a157600080fd5b620004ac85620003a8565b60208601519094506001600160401b0380821115620004ca57600080fd5b620004d888838901620003db565b94506040870151915080821115620004ef57600080fd5b50620004fe87828801620003db565b9250506200050f60608601620003a8565b905092959194509250565b600181811c908216806200052f57607f821691505b6020821081036200055057634e487b7160e01b600052602260045260246000fd5b50919050565b601f821115620005a457600081815260208120601f850160051c810160208610156200057f5750805b601f850160051c820191505b81811015620005a0578281556001016200058b565b5050505b505050565b81516001600160401b03811115620005c557620005c5620003c5565b620005dd81620005d684546200051a565b8462000556565b602080601f831160018114620006155760008415620005fc5750858301515b600019600386901b1c1916600185901b178555620005a0565b600085815260208120601f198616915b82811015620006465788860151825594840194600190910190840162000625565b5085821015620006655787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b60805160a05160c05160e05161010051610120516101405161016051610180516101a051613708620006f16000396000612b6f01526000612bbe01526000612b9901526000612af201526000612b1c01526000612b460152600061115f015260006107ea015260006108140152600061083e01526137086000f3fe6080604052600436106101f95760003560e01c806379cc67901161010d578063a457c2d7116100a0578063c3cda5201161006f578063c3cda52014610613578063d505accf14610633578063dd62ed3e14610653578063e8a3d48514610673578063f1127ed81461068857600080fd5b8063a457c2d714610567578063a9059cbb14610587578063ac9650d8146105a7578063c1b606e2146105d457600080fd5b80638f0fefbb116100dc5780638f0fefbb146104ff578063938e3d7b1461051257806395d89b41146105325780639ab24eb01461054757600080fd5b806379cc6790146104815780637ecebe00146104a15780638da5cb5b146104c15780638e539e8c146104df57600080fd5b80633950935111610190578063587cde1e1161015f578063587cde1e1461039d5780635c19a95c146103d65780636f4f2837146103f65780636fcfff451461041657806370a082311461044b57600080fd5b8063395093511461031d5780633a46b1a81461033d57806342966c681461035d578063449a52f81461037d57600080fd5b806318160ddd116101cc57806318160ddd146102ad57806323b872dd146102cc578063313ce567146102ec5780633644e5151461030857600080fd5b806306fdde03146101fe578063079fe40e14610229578063095ea7b31461025b57806313af40351461028b575b600080fd5b34801561020a57600080fd5b506102136106d2565b6040516102209190612ee9565b60405180910390f35b34801561023557600080fd5b50600b546001600160a01b03165b6040516001600160a01b039091168152602001610220565b34801561026757600080fd5b5061027b610276366004612f18565b610764565b6040519015158152602001610220565b34801561029757600080fd5b506102ab6102a6366004612f42565b61077e565b005b3480156102b957600080fd5b506004545b604051908152602001610220565b3480156102d857600080fd5b5061027b6102e7366004612f5d565b6107b7565b3480156102f857600080fd5b5060405160128152602001610220565b34801561031457600080fd5b506102be6107dd565b34801561032957600080fd5b5061027b610338366004612f18565b61086d565b34801561034957600080fd5b506102be610358366004612f18565b6108ac565b34801561036957600080fd5b506102ab610378366004612f99565b61091f565b34801561038957600080fd5b506102ab610398366004612f18565b610976565b3480156103a957600080fd5b506102436103b8366004612f42565b6001600160a01b039081166000908152600860205260409020541690565b3480156103e257600080fd5b506102ab6103f1366004612f42565b610a1f565b34801561040257600080fd5b506102ab610411366004612f42565b610a29565b34801561042257600080fd5b50610436610431366004612f42565b610a56565b60405163ffffffff9091168152602001610220565b34801561045757600080fd5b506102be610466366004612f42565b6001600160a01b031660009081526002602052604090205490565b34801561048d57600080fd5b506102ab61049c366004612f18565b610a78565b3480156104ad57600080fd5b506102be6104bc366004612f42565b610b6e565b3480156104cd57600080fd5b506001546001600160a01b0316610243565b3480156104eb57600080fd5b506102be6104fa366004612f99565b610b8c565b61024361050d366004612fb2565b610be8565b34801561051e57600080fd5b506102ab61052d366004613055565b610d03565b34801561053e57600080fd5b50610213610d30565b34801561055357600080fd5b506102be610562366004612f42565b610d3f565b34801561057357600080fd5b5061027b610582366004612f18565b610dc6565b34801561059357600080fd5b5061027b6105a2366004612f18565b610e63565b3480156105b357600080fd5b506105c76105c2366004613106565b610e71565b604051610220919061317b565b3480156105e057600080fd5b506105f46105ef366004612fb2565b610f66565b6040805192151583526001600160a01b03909116602083015201610220565b34801561061f57600080fd5b506102ab61062e3660046131ee565b610fa9565b34801561063f57600080fd5b506102ab61064e366004613246565b61110b565b34801561065f57600080fd5b506102be61066e3660046132b0565b611271565b34801561067f57600080fd5b5061021361129c565b34801561069457600080fd5b506106a86106a33660046132e3565b61132a565b60408051825163ffffffff1681526020928301516001600160e01b03169281019290925201610220565b6060600580546106e190613323565b80601f016020809104026020016040519081016040528092919081815260200182805461070d90613323565b801561075a5780601f1061072f5761010080835404028352916020019161075a565b820191906000526020600020905b81548152906001019060200180831161073d57829003601f168201915b5050505050905090565b6000336107728185856113ae565b60019150505b92915050565b6107866114d2565b6107ab5760405162461bcd60e51b81526004016107a290613357565b60405180910390fd5b6107b4816114ff565b50565b6000336107c5858285611551565b6107d08585856115cb565b60019150505b9392505050565b6000306001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001614801561083657507f000000000000000000000000000000000000000000000000000000000000000046145b1561086057507f000000000000000000000000000000000000000000000000000000000000000090565b61086861179f565b905090565b3360008181526003602090815260408083206001600160a01b038716845290915281205490919061077290829086906108a7908790613395565b6113ae565b60004382106108fd5760405162461bcd60e51b815260206004820152601f60248201527f4552433230566f7465733a20626c6f636b206e6f7420796574206d696e65640060448201526064016107a2565b6001600160a01b03831660009081526009602052604090206107d69083611834565b8061092933610466565b101561096c5760405162461bcd60e51b81526020600482015260126024820152716e6f7420656e6f7567682062616c616e636560701b60448201526064016107a2565b6107b433826118f1565b61097e6114d2565b6109ca5760405162461bcd60e51b815260206004820152601760248201527f4e6f7420617574686f72697a656420746f206d696e742e00000000000000000060448201526064016107a2565b80600003610a115760405162461bcd60e51b815260206004820152601460248201527326b4b73a34b733903d32b937903a37b5b2b7399760611b60448201526064016107a2565b610a1b8282611909565b5050565b6107b43382611993565b610a316114d2565b610a4d5760405162461bcd60e51b81526004016107a290613357565b6107b481611a0d565b6001600160a01b03811660009081526009602052604081205461077890611aa1565b610a806114d2565b610acc5760405162461bcd60e51b815260206004820152601760248201527f4e6f7420617574686f72697a656420746f206275726e2e00000000000000000060448201526064016107a2565b80610aec836001600160a01b031660009081526002602052604090205490565b1015610b2f5760405162461bcd60e51b81526020600482015260126024820152716e6f7420656e6f7567682062616c616e636560701b60448201526064016107a2565b600081610b3c8433611271565b610b4691906133a8565b9050610b54833360006113ae565b610b5f8333836113ae565b610b6983836118f1565b505050565b6001600160a01b038116600090815260076020526040812054610778565b6000438210610bdd5760405162461bcd60e51b815260206004820152601f60248201527f4552433230566f7465733a20626c6f636b206e6f7420796574206d696e65640060448201526064016107a2565b610778600a83611834565b600080846040013511610c345760405162461bcd60e51b815260206004820152601460248201527326b4b73a34b733903d32b937903a37b5b2b7399760611b60448201526064016107a2565b610c3f848484611b0a565b9050600080610c516020870187612f42565b6001600160a01b031614610c7157610c6c6020860186612f42565b610c73565b335b9050610ca2610c886040870160208801612f42565b610c9860a0880160808901612f42565b8760600135611c97565b610cb0818660400135611909565b806001600160a01b0316826001600160a01b03167fc4d88b1adde72eb5acf63f3e219ef5b223262233acf507c3b171277c91973c6787604051610cf391906133d2565b60405180910390a3509392505050565b610d0b6114d2565b610d275760405162461bcd60e51b81526004016107a290613357565b6107b481611dbd565b6060600680546106e190613323565b6001600160a01b0381166000908152600960205260408120548015610db3576001600160a01b0383166000908152600960205260409020610d816001836133a8565b81548110610d9157610d91613468565b60009182526020909120015464010000000090046001600160e01b0316610db6565b60005b6001600160e01b03169392505050565b3360008181526003602090815260408083206001600160a01b038716845290915281205490919083811015610e4b5760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b60648201526084016107a2565b610e5882868684036113ae565b506001949350505050565b6000336107728185856115cb565b60608167ffffffffffffffff811115610e8c57610e8c61303f565b604051908082528060200260200182016040528015610ebf57816020015b6060815260200190600190039081610eaa5790505b50905060005b82811015610f5f57610f2f30858584818110610ee357610ee3613468565b9050602002810190610ef5919061347e565b8080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250611e9892505050565b828281518110610f4157610f41613468565b60200260200101819052508080610f57906134c5565b915050610ec5565b5092915050565b600080610f74858585611ebd565b60e08601356000908152600c602052604090205490915060ff16158015610f9f5750610f9f81611f21565b9150935093915050565b83421115610ff95760405162461bcd60e51b815260206004820152601d60248201527f4552433230566f7465733a207369676e6174757265206578706972656400000060448201526064016107a2565b604080517fe48329057bfd03d55e49b547132e39cffd9c1820ad7b9d4c5307691425d15adf60208201526001600160a01b03881691810191909152606081018690526080810185905260009060a001604051602081830303815290604052805190602001209050600061108d61106d6107dd565b8360405161190160f01b8152600281019290925260228201526042902090565b9050600061109d82878787611f50565b90506110a881611f78565b88146110f65760405162461bcd60e51b815260206004820152601960248201527f4552433230566f7465733a20696e76616c6964206e6f6e63650000000000000060448201526064016107a2565b611100818a611993565b505050505050505050565b8342111561115b5760405162461bcd60e51b815260206004820152601d60248201527f45524332305065726d69743a206578706972656420646561646c696e6500000060448201526064016107a2565b60007f000000000000000000000000000000000000000000000000000000000000000088888861118a8c611f78565b6040805160208101969096526001600160a01b0394851690860152929091166060840152608083015260a082015260c0810186905260e00160405160208183030381529060405280519060200120905060006111e761106d6107dd565b905060006111f782878787611f50565b9050896001600160a01b0316816001600160a01b03161461125a5760405162461bcd60e51b815260206004820152601e60248201527f45524332305065726d69743a20696e76616c6964207369676e6174757265000060448201526064016107a2565b6112658a8a8a6113ae565b50505050505050505050565b6001600160a01b03918216600090815260036020908152604080832093909416825291909152205490565b600080546112a990613323565b80601f01602080910402602001604051908101604052809291908181526020018280546112d590613323565b80156113225780601f106112f757610100808354040283529160200191611322565b820191906000526020600020905b81548152906001019060200180831161130557829003601f168201915b505050505081565b60408051808201909152600080825260208201526001600160a01b0383166000908152600960205260409020805463ffffffff841690811061136e5761136e613468565b60009182526020918290206040805180820190915291015463ffffffff8116825264010000000090046001600160e01b0316918101919091529392505050565b6001600160a01b0383166114105760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b60648201526084016107a2565b6001600160a01b0382166114715760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b60648201526084016107a2565b6001600160a01b0383811660008181526003602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b60006114e66001546001600160a01b031690565b6001600160a01b0316336001600160a01b031614905090565b600180546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8292fce18fa69edf4db7b94ea2e58241df0ae57f97e0a6c9b29067028bf92d7690600090a35050565b600061155d8484611271565b905060001981146115c557818110156115b85760405162461bcd60e51b815260206004820152601d60248201527f45524332303a20696e73756666696369656e7420616c6c6f77616e636500000060448201526064016107a2565b6115c584848484036113ae565b50505050565b6001600160a01b03831661162f5760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b60648201526084016107a2565b6001600160a01b0382166116915760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b60648201526084016107a2565b6001600160a01b038316600090815260026020526040902054818110156117095760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b60648201526084016107a2565b6001600160a01b03808516600090815260026020526040808220858503905591851681529081208054849290611740908490613395565b92505081905550826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8460405161178c91815260200190565b60405180910390a36115c5848484611fa0565b60007f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f6117ca6106d2565b80516020918201206040805192830193909352918101919091527fc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc660608201524660808201523060a082015260c00160405160208183030381529060405280519060200120905090565b8154600090815b8181101561189857600061184f8284611fd2565b90508486828154811061186457611864613468565b60009182526020909120015463ffffffff16111561188457809250611892565b61188f816001613395565b91505b5061183b565b81156118dc57846118aa6001846133a8565b815481106118ba576118ba613468565b60009182526020909120015464010000000090046001600160e01b03166118df565b60005b6001600160e01b031695945050505050565b6118fb8282611fed565b6115c5600a6121428361214e565b61191382826122c7565b6004546001600160e01b0310156119855760405162461bcd60e51b815260206004820152603060248201527f4552433230566f7465733a20746f74616c20737570706c79207269736b73206f60448201526f766572666c6f77696e6720766f74657360801b60648201526084016107a2565b6115c5600a6123ae8361214e565b6001600160a01b03828116600081815260086020818152604080842080546002845282862054949093528787166001600160a01b03198416811790915590519190951694919391928592917f3134e8a2e6d97e929a7e54011ea5485d7d196dd5f0ba4d4ef95803e8e3fc257f9190a46115c58284836123ba565b6001600160a01b038116611a575760405162461bcd60e51b8152602060048201526011602482015270125b9d985b1a59081c9958da5c1a595b9d607a1b60448201526064016107a2565b600b80546001600160a01b0319166001600160a01b0383169081179091556040517f299d17e95023f496e0ffc4909cff1a61f74bb5eb18de6f900f4155bfa1b3b33390600090a250565b600063ffffffff821115611b065760405162461bcd60e51b815260206004820152602660248201527f53616665436173743a2076616c756520646f65736e27742066697420696e203360448201526532206269747360d01b60648201526084016107a2565b5090565b600080611b18858585610f66565b9250905080611b5b5760405162461bcd60e51b815260206004820152600f60248201526e125b9d985b1a59081c995c5d595cdd608a1b60448201526064016107a2565b42611b6c60c0870160a088016134de565b6001600160801b031611158015611b9b5750611b8e60e0860160c087016134de565b6001600160801b03164211155b611bd95760405162461bcd60e51b815260206004820152600f60248201526e14995c5d595cdd08195e1c1a5c9959608a1b60448201526064016107a2565b6000611be86020870187612f42565b6001600160a01b031603611c345760405162461bcd60e51b81526020600482015260136024820152721c9958da5c1a595b9d081d5b9919599a5b9959606a1b60448201526064016107a2565b6000856040013511611c705760405162461bcd60e51b8152602060048201526005602482015264302071747960d81b60448201526064016107a2565b5060e0909301356000908152600c60205260409020805460ff191660011790555090919050565b80600003611cd6573415610b695760405162461bcd60e51b81526020600482015260066024820152652156616c756560d01b60448201526064016107a2565b73eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeed196001600160a01b03831601611d4857803414611d435760405162461bcd60e51b815260206004820152601660248201527526bab9ba1039b2b732103a37ba30b610383934b1b29760511b60448201526064016107a2565b611d8b565b3415611d8b5760405162461bcd60e51b81526020600482015260126024820152716d73672076616c7565206e6f74207a65726f60701b60448201526064016107a2565b60006001600160a01b03841615611da25783611daf565b600b546001600160a01b03165b90506115c5833383856124f7565b6000808054611dcb90613323565b80601f0160208091040260200160405190810160405280929190818152602001828054611df790613323565b8015611e445780601f10611e1957610100808354040283529160200191611e44565b820191906000526020600020905b815481529060010190602001808311611e2757829003601f168201915b505050505090508160009081611e5a9190613547565b507fc9c7c3fe08b88b4df9d4d47ef47d2c43d55c025a0ba88ca442580ed9e7348a168183604051611e8c929190613607565b60405180910390a15050565b60606107d683836040518060600160405280602781526020016136ac6027913961253d565b6000611f1983838080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250611f139250611f07915088905061261a565b8051906020012061270e565b9061271b565b949350505050565b6000611f356001546001600160a01b031690565b6001600160a01b0316826001600160a01b0316149050919050565b6000806000611f618787878761273f565b91509150611f6e81612803565b5095945050505050565b6001600160a01b03811660009081526007602052604090208054600181018255905b50919050565b6001600160a01b03838116600090815260086020526040808220548584168352912054610b69929182169116836123ba565b6000611fe16002848418613635565b6107d690848416613395565b6001600160a01b03821661204d5760405162461bcd60e51b815260206004820152602160248201527f45524332303a206275726e2066726f6d20746865207a65726f206164647265736044820152607360f81b60648201526084016107a2565b6001600160a01b038216600090815260026020526040902054818110156120c15760405162461bcd60e51b815260206004820152602260248201527f45524332303a206275726e20616d6f756e7420657863656564732062616c616e604482015261636560f01b60648201526084016107a2565b6001600160a01b03831660009081526002602052604081208383039055600480548492906120f09084906133a8565b90915550506040518281526000906001600160a01b038516907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a3610b6983600084611fa0565b60006107d682846133a8565b82546000908190801561219957856121676001836133a8565b8154811061217757612177613468565b60009182526020909120015464010000000090046001600160e01b031661219c565b60005b6001600160e01b031692506121b583858763ffffffff16565b91506000811180156121f3575043866121cf6001846133a8565b815481106121df576121df613468565b60009182526020909120015463ffffffff16145b15612253576122018261294d565b8661220d6001846133a8565b8154811061221d5761221d613468565b9060005260206000200160000160046101000a8154816001600160e01b0302191690836001600160e01b031602179055506122be565b85604051806040016040528061226843611aa1565b63ffffffff16815260200161227c8561294d565b6001600160e01b0390811690915282546001810184556000938452602093849020835194909301519091166401000000000263ffffffff909316929092179101555b50935093915050565b6001600160a01b03821661231d5760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f20616464726573730060448201526064016107a2565b806004600082825461232f9190613395565b90915550506001600160a01b0382166000908152600260205260408120805483929061235c908490613395565b90915550506040518181526001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a3610a1b60008383611fa0565b60006107d68284613395565b816001600160a01b0316836001600160a01b0316141580156123dc5750600081115b15610b69576001600160a01b0383161561246a576001600160a01b03831660009081526009602052604081208190612417906121428561214e565b91509150846001600160a01b03167fdec2bacdd2f05b59de34da9b523dff8be42e5e38e818c82fdb0bae774387a724838360405161245f929190918252602082015260400190565b60405180910390a250505b6001600160a01b03821615610b69576001600160a01b038216600090815260096020526040812081906124a0906123ae8561214e565b91509150836001600160a01b03167fdec2bacdd2f05b59de34da9b523dff8be42e5e38e818c82fdb0bae774387a72483836040516124e8929190918252602082015260400190565b60405180910390a25050505050565b80156115c55773eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeed196001600160a01b038516016125315761252c82826129b6565b6115c5565b6115c584848484612a59565b60606001600160a01b0384163b6125a55760405162461bcd60e51b815260206004820152602660248201527f416464726573733a2064656c65676174652063616c6c20746f206e6f6e2d636f6044820152651b9d1c9858dd60d21b60648201526084016107a2565b600080856001600160a01b0316856040516125c09190613657565b600060405180830381855af49150503d80600081146125fb576040519150601f19603f3d011682016040523d82523d6000602084013e612600565b606091505b5091509150612610828286612aac565b9695505050505050565b60607fbac245dbd9b8b2bb334c0675db20a7a7a8506de563990c4ce3207f4c3c5b75e161264a6020840184612f42565b61265a6040850160208601612f42565b6040850135606086013561267460a0880160808901612f42565b61268460c0890160a08a016134de565b61269460e08a0160c08b016134de565b6040805160208101999099526001600160a01b03978816908901529486166060880152608087019390935260a086019190915290921660c08401526001600160801b0391821660e0808501919091529116610100830152830135610120820152610140016040516020818303038152906040529050919050565b600061077861106d612ae5565b600080600061272a8585612c0c565b9150915061273781612803565b509392505050565b6000807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a083111561277657506000905060036127fa565b6040805160008082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa1580156127ca573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b0381166127f3576000600192509250506127fa565b9150600090505b94509492505050565b600081600481111561281757612817613673565b0361281f5750565b600181600481111561283357612833613673565b036128805760405162461bcd60e51b815260206004820152601860248201527f45434453413a20696e76616c6964207369676e6174757265000000000000000060448201526064016107a2565b600281600481111561289457612894613673565b036128e15760405162461bcd60e51b815260206004820152601f60248201527f45434453413a20696e76616c6964207369676e6174757265206c656e6774680060448201526064016107a2565b60038160048111156128f5576128f5613673565b036107b45760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202773272076616c604482015261756560f01b60648201526084016107a2565b60006001600160e01b03821115611b065760405162461bcd60e51b815260206004820152602760248201527f53616665436173743a2076616c756520646f65736e27742066697420696e20326044820152663234206269747360c81b60648201526084016107a2565b6000826001600160a01b03168260405160006040518083038185875af1925050503d8060008114612a03576040519150601f19603f3d011682016040523d82523d6000602084013e612a08565b606091505b5050905080610b695760405162461bcd60e51b815260206004820152601c60248201527f6e617469766520746f6b656e207472616e73666572206661696c65640000000060448201526064016107a2565b816001600160a01b0316836001600160a01b031603156115c557306001600160a01b03841603612a975761252c6001600160a01b0385168383612c51565b6115c56001600160a01b038516848484612cb4565b60608315612abb5750816107d6565b825115612acb5782518084602001fd5b8160405162461bcd60e51b81526004016107a29190612ee9565b6000306001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016148015612b3e57507f000000000000000000000000000000000000000000000000000000000000000046145b15612b6857507f000000000000000000000000000000000000000000000000000000000000000090565b50604080517f00000000000000000000000000000000000000000000000000000000000000006020808301919091527f0000000000000000000000000000000000000000000000000000000000000000828401527f000000000000000000000000000000000000000000000000000000000000000060608301524660808301523060a0808401919091528351808403909101815260c0909201909252805191012090565b6000808251604103612c425760208301516040840151606085015160001a612c368782858561273f565b94509450505050612c4a565b506000905060025b9250929050565b6040516001600160a01b038316602482015260448101829052610b6990849063a9059cbb60e01b906064015b60408051601f198184030181529190526020810180516001600160e01b03166001600160e01b031990931692909217909152612cec565b6040516001600160a01b03808516602483015283166044820152606481018290526115c59085906323b872dd60e01b90608401612c7d565b6000612d41826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c6564815250856001600160a01b0316612dbe9092919063ffffffff16565b805190915015610b695780806020019051810190612d5f9190613689565b610b695760405162461bcd60e51b815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e6044820152691bdd081cdd58d8d9595960b21b60648201526084016107a2565b6060611f198484600085856001600160a01b0385163b612e205760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e747261637400000060448201526064016107a2565b600080866001600160a01b03168587604051612e3c9190613657565b60006040518083038185875af1925050503d8060008114612e79576040519150601f19603f3d011682016040523d82523d6000602084013e612e7e565b606091505b5091509150612e8e828286612aac565b979650505050505050565b60005b83811015612eb4578181015183820152602001612e9c565b50506000910152565b60008151808452612ed5816020860160208601612e99565b601f01601f19169290920160200192915050565b6020815260006107d66020830184612ebd565b80356001600160a01b0381168114612f1357600080fd5b919050565b60008060408385031215612f2b57600080fd5b612f3483612efc565b946020939093013593505050565b600060208284031215612f5457600080fd5b6107d682612efc565b600080600060608486031215612f7257600080fd5b612f7b84612efc565b9250612f8960208501612efc565b9150604084013590509250925092565b600060208284031215612fab57600080fd5b5035919050565b6000806000838503610120811215612fc957600080fd5b61010080821215612fd957600080fd5b859450840135905067ffffffffffffffff80821115612ff757600080fd5b818601915086601f83011261300b57600080fd5b81358181111561301a57600080fd5b87602082850101111561302c57600080fd5b6020830194508093505050509250925092565b634e487b7160e01b600052604160045260246000fd5b60006020828403121561306757600080fd5b813567ffffffffffffffff8082111561307f57600080fd5b818401915084601f83011261309357600080fd5b8135818111156130a5576130a561303f565b604051601f8201601f19908116603f011681019083821181831017156130cd576130cd61303f565b816040528281528760208487010111156130e657600080fd5b826020860160208301376000928101602001929092525095945050505050565b6000806020838503121561311957600080fd5b823567ffffffffffffffff8082111561313157600080fd5b818501915085601f83011261314557600080fd5b81358181111561315457600080fd5b8660208260051b850101111561316957600080fd5b60209290920196919550909350505050565b6000602080830181845280855180835260408601915060408160051b870101925083870160005b828110156131d057603f198886030184526131be858351612ebd565b945092850192908501906001016131a2565b5092979650505050505050565b803560ff81168114612f1357600080fd5b60008060008060008060c0878903121561320757600080fd5b61321087612efc565b9550602087013594506040870135935061322c606088016131dd565b92506080870135915060a087013590509295509295509295565b600080600080600080600060e0888a03121561326157600080fd5b61326a88612efc565b965061327860208901612efc565b95506040880135945060608801359350613294608089016131dd565b925060a0880135915060c0880135905092959891949750929550565b600080604083850312156132c357600080fd5b6132cc83612efc565b91506132da60208401612efc565b90509250929050565b600080604083850312156132f657600080fd5b6132ff83612efc565b9150602083013563ffffffff8116811461331857600080fd5b809150509250929050565b600181811c9082168061333757607f821691505b602082108103611f9a57634e487b7160e01b600052602260045260246000fd5b6020808252600e908201526d139bdd08185d5d1a1bdc9a5e995960921b604082015260600190565b634e487b7160e01b600052601160045260246000fd5b808201808211156107785761077861337f565b818103818111156107785761077861337f565b80356001600160801b0381168114612f1357600080fd5b61010081016001600160a01b03806133e985612efc565b168352806133f960208601612efc565b16602084015260408401356040840152606084013560608401528061342060808601612efc565b1660808401525061343360a084016133bb565b6001600160801b0380821660a08501528061345060c087016133bb565b1660c0850152505060e083013560e083015292915050565b634e487b7160e01b600052603260045260246000fd5b6000808335601e1984360301811261349557600080fd5b83018035915067ffffffffffffffff8211156134b057600080fd5b602001915036819003821315612c4a57600080fd5b6000600182016134d7576134d761337f565b5060010190565b6000602082840312156134f057600080fd5b6107d6826133bb565b601f821115610b6957600081815260208120601f850160051c810160208610156135205750805b601f850160051c820191505b8181101561353f5782815560010161352c565b505050505050565b815167ffffffffffffffff8111156135615761356161303f565b6135758161356f8454613323565b846134f9565b602080601f8311600181146135aa57600084156135925750858301515b600019600386901b1c1916600185901b17855561353f565b600085815260208120601f198616915b828110156135d9578886015182559484019460019091019084016135ba565b50858210156135f75787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b60408152600061361a6040830185612ebd565b828103602084015261362c8185612ebd565b95945050505050565b60008261365257634e487b7160e01b600052601260045260246000fd5b500490565b60008251613669818460208701612e99565b9190910192915050565b634e487b7160e01b600052602160045260246000fd5b60006020828403121561369b57600080fd5b815180151581146107d657600080fdfe416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564a26469706673582212209e24c254712deee95f6ef71690f4203aab9658d8b12c95bb58513e0d0c1adb1c64736f6c634300081200338b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f";
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
  signer,
];
// Set up the contract
const factory = new ethers.ContractFactory(MyTokenContractABI, MyTokenContractData, signer);

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
      category : "ERC20SignatureMintVote",
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

    const category = "ERC20SignatureMintVote"; // Replace with the desired category
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
          <Title>ERC20 SignatureMintVote</Title>
          <div>
            <Title1>Token Deployment</Title1>
        <Wrapper>
        <Input type="text" placeholder="Name" value={name}   onChange={(e) => handleInputChange(e, setName)}
 />
<Input type="text" placeholder="Symbol" value={symbol} onChange={(e) => handleInputChange(e, setSymbol)} />
</Wrapper>
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



