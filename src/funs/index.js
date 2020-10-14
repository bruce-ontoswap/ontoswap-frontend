import Web3 from 'web3'
import store from '../store/index'
import detectEthereumProvider from '@metamask/detect-provider'
import { YFO_HASH, YFODIST_HASH, MAX_NUMBER } from '../config/constant'
import yfoABI from './yfo.json'
import yfodistABI from './yfodist.json'
import BigNumber from 'bignumber.js'

export const init = async () => {
  const provider = await detectEthereumProvider()

  if (provider) {
    let web3 = new Web3(provider)

    const netVersion = await provider.request({ method: 'net_version' })
    // console.log('netVersion', netVersion)
    store.commit('update:wallet', {
      name: 'MetaMask',
      netVersion
    })

    const accounts = await provider.request({ method: 'eth_accounts' })
    // console.log('accounts', accounts)
    const address = accounts[0] || ''
    const checksumAddress = address && web3.utils.toChecksumAddress(address)
    // console.log('checksumAddress', checksumAddress)

    const walletInfo = {
      name: 'MetaMask',
      installed: true,
    }

    // if (process.env.NODE_ENV == 'development') {
      walletInfo.address = checksumAddress
    // } else {
    //   walletInfo.address = netVersion == '1' ? checksumAddress : ''
    // }
    store.commit('update:wallet', walletInfo)


    provider.on('accountsChanged', accounts => {
      const address = accounts[0] || ''
      const checksumAddress = address && web3.utils.toChecksumAddress(address)

      store.commit('update:wallet', {
        name: 'MetaMask',
        address: '',
      })
    })

    provider.on('chainChanged', network => {
      store.commit('update:wallet', {
        name: 'MetaMask',
        netVersion: parseInt(network,16).toString(),
        address: '',
      })
    })

  } else {
    console.log('Please install MetaMask!')
  }
}

export const connect = async () => {
  try {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  } catch(e) {
    console.log(e);
  }
}

export const getContract = ({ provider, abi, contractHash }) => {
  const web3 = new Web3(provider)
  return new web3.eth.Contract(abi, contractHash)
}

export const putHarvest = async (pid, callback) => {
  try {
    var web3 = new Web3(window.ethereum);
    const assetContract = new web3.eth.Contract(chaplinABI, YFODIST_HASH)
    await assetContract.methods
      .claimAllRewards(pid)
      .send({
        from: store.state.wallet.address
      }, callback)
  } catch (e) {
    return '0'
  }
}

export const putApprove = async (pid, callback) => {
  try {
    console.log(store.state.wallet.address);
    var web3 = new Web3(window.ethereum);
    const assetContract = new web3.eth.Contract(yfoABI, pid)
    await assetContract.methods
      .approve(YFO_HASH, MAX_NUMBER)
      .send({
        from: store.state.wallet.address
      })
  } catch (e) {
    console.log(e);
    return '0'
  }
}

export const getAvaliableLP = async (pid) => {
  const contract = getContract({
    provider: CONTRACT_PROVIDER,
    contractHash: pid,
    abi,
  })

  try {
    return await contract.methods.balanceOf(store.state.wallet.address).call()
  } catch (e) {
    return '0'
  }
}

export const getStakedLP = async (pid) => {
  const contract = getContract({
    provider: CONTRACT_PROVIDER,
    contractHash: YFODIST_HASH,
    abi: chaplinABI,
  })

  try {
    return await contract.methods.lpInfo(pid, store.state.wallet.address).call()
  } catch (e) {
    return '0'
  }
}

export const getRewardLP = async () => {
  const contract = getContract({
    provider: CONTRACT_PROVIDER,
    contractHash: YFODIST_HASH,
    abi: chaplinABI,
  })

  try {
    return await contract.methods.getRewards(store.state.wallet.address).call()
  } catch (e) {
    return '0'
  }
}

export const getAllowance = async (contractHash, spendHash) => {
  const contract = getContract({
    provider: CONTRACT_PROVIDER,
    contractHash,
    abi,
  })

  try {
    return await contract.methods.allowance(store.state.wallet.address, spendHash).call()
  } catch (e) {
    return '0'
  }
}

export const putDeposit = async (pid, amount, inviterAddress, callback) => {
  try {
    const x = new BigNumber(10).pow(18)
    const _amount = x.multipliedBy(amount).toString()
    var web3 = new Web3(window.ethereum);
    const assetContract = new web3.eth.Contract(chaplinABI, YFODIST_HASH)
    await assetContract.methods
      .deposit(pid, _amount, inviterAddress)
      .send({
        from: store.state.wallet.address
      }, callback)
  } catch (e) {
    return '0'
  }
}

export const putWithdrawAll = async (pid, callback) => {
  try {
    var web3 = new Web3(window.ethereum);
    const assetContract = new web3.eth.Contract(chaplinABI, YFODIST_HASH)
    await assetContract.methods
      .withdrawAll(pid)
      .send({
        from: store.state.wallet.address
      }, callback)
  } catch (e) {
    return '0'
  }
}