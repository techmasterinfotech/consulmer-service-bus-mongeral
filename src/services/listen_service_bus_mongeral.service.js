"use strict";

const {delay, ServiceBusClient} = require("@azure/service-bus");
const {EventsMagRepository} = require("../repositories/EventsMagRepository");
const {LogUtils} = require("../utils/LogUtils");

// connection string to your Service Bus namespace
const connectionString = "Endpoint=sb://mongeral-develop.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=hHsfkQ2Qtv7c2+fntOiXlPr3B2/av0+TXI2DM1U2Kys="

// name of the queue
const queueName = "StatusAlteracao"

exports.ListenServiceBusMongeral = async function () {
  // create a Service Bus client using the connection string to the Service Bus namespace
  const sbClient = new ServiceBusClient(connectionString);

  // createReceiver() can also be used to create a receiver for a subscription.
  const receiver = sbClient.createReceiver(queueName);

  // function to handle messages
  const statusProposalMessageHandler = async (messageReceived) => {
    LogUtils.logInfo("Mensagem recebida do service bus", messageReceived)
    await proccessMessage(messageReceived);
  };

  // function to handle any errors
  const statusProposalErrorHandler = async (error) => {
    LogUtils.logError(error)
  };

  // subscribe and specify the message and error handlers
  receiver.subscribe({
    processMessage: statusProposalMessageHandler,
    processError: statusProposalErrorHandler
  });

  // Waiting long enough before closing the sender to send messages
  await delay(20000);

  // await receiver.close();
  // await sbClient.close();
}

async function proccessMessage(messageReceived) {
  await EventsMagRepository.sendMessageToSNS(messageReceived);
}
