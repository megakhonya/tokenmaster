const hre = require("hardhat")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

async function main() {
  // Setup accounts & variables
  const [deployer] = await ethers.getSigners()
  const NAME = "TokenMaster"
  const SYMBOL = "TM"

  // Deploy contract
  const TokenMaster = await ethers.getContractFactory("TokenMaster")
  const tokenMaster = await TokenMaster.deploy(NAME, SYMBOL)
  await tokenMaster.deployed()

  console.log(`Deployed TokenMaster Contract at: ${tokenMaster.address}\n`)

  // List 6 events
  const occasions = [
    {
      name: "Cyberweek 2024",
      cost: tokens(3),
      tickets: 0,
      date: "Aug 5",
      time: "9:00aM EAT",
      location: "UON Nairobi, University of Nairobi, Nairobi, Kenya"
    },
    {
      name: "Africa Technology Show Kenya",
      cost: tokens(1),
      tickets: 125,
      date: "Jun 2",
      time: "1:00PM EAT",
      location: "Kenyatta International Convention Centre, City Square, along, Harambee Ave, Nairobi, Kenya"
    },
    {
      name: "IDC East Africa CIO Summit",
      cost: tokens(0.25),
      tickets: 200,
      date: "Jun 9",
      time: "10:00AM EAT",
      location: "Radisson Blu Hotel, Nairobi Upper Hill, Elgon Road,Nairobi, Kenya"
    },
    {
      name: "Climate Change Adaptation, Mitigation and Resilience",
      cost: tokens(5),
      tickets: 0,
      date: "Jun 11",
      time: "2:30PM EAT",
      location: "Best Western Meridian Plus Hotel Nairobi"
    },
    {
      name: "Kingdom Tour 2024 with Maverick City Music and Kirk Franklin",
      cost: tokens(1.5),
      tickets: 125,
      date: "Aug 17",
      time: "6:00PM EAT",
      location: "Uhuru Gardens 05 Nairobi, Kenya"
    }
  ]

  for (var i = 0; i < 5; i++) {
    const transaction = await tokenMaster.connect(deployer).list(
      occasions[i].name,
      occasions[i].cost,
      occasions[i].tickets,
      occasions[i].date,
      occasions[i].time,
      occasions[i].location,
    )

    await transaction.wait()

    console.log(`Listed Event ${i + 1}: ${occasions[i].name}`)
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});