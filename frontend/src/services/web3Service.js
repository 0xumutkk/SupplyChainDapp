import { ethers } from "ethers";
import SupplyChainABI from "../contracts/SupplyChain.json";
import { CONTRACT_ADDRESS } from "../constants/contractAddress";


async function getContract() {
  if (!window.ethereum) throw new Error("Metamask is not found.");

  await window.ethereum.request({ method: "eth_requestAccounts" });

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  return new ethers.Contract(CONTRACT_ADDRESS, SupplyChainABI.abi, signer);
}


export async function createProduct(locationInfo, productionDate, expirationDate) {
  const contract = await getContract();
  const tx = await contract.createProduct(locationInfo, productionDate, expirationDate);
  return await tx.wait();
}


export async function updateProduct(productId, newLocationInfo, newProductionDate, newExpirationDate, newState) {
  const contract = await getContract();
  const tx = await contract.updateProduct(productId, newLocationInfo, newProductionDate, newExpirationDate, newState);
  return await tx.wait();
}

// Ürünü depoya al
export async function inWarehouse(productId, newLocation) {
  const contract = await getContract();
  const tx = await contract.inWarehouse(productId, newLocation);
  return await tx.wait();
}


export async function delivered(productId) {
  const contract = await getContract();
  const tx = await contract.delivered(productId);
  return await tx.wait();
}


export async function viewProductInfo(productId) {
  const contract = await getContract();
  const data = await contract.viewProductInfo(productId);
  return {
    id: data[0].toNumber(),
    locationInfo: data[1],
    productionDate: data[2].toNumber(),
    backupProductionDate: data[3].toNumber(),
    expirationDate: data[4].toNumber(),
    state: data[5],
  };
}


export async function deleteProduct(productId) {
  const contract = await getContract();
  const tx = await contract.deleteProduct(productId);
  return await tx.wait();
}
