const {ListenServiceBusMongeral} = require('./src/services/listen_service_bus_mongeral.service')

async function main() {
  await ListenServiceBusMongeral();
}

// call the main function
main().catch((err) => {
  console.error("Error occurred: ", err);
  process.exit(1);
}).then(() => {
  console.log("Start Listener Service Bus MAG");
});
