"use strict";


const AWS = require('aws-sdk');
const SESConfig = {
  apiVersion: "2010-12-01",
  // accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  // accessSecretKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "ca-central-1"
}
AWS.config.update(SESConfig);
const {LogUtils} = require("../utils/LogUtils");

class EventsMagRepository {

  static async sendMessageToSNS(message) {

    var params = {
      Message: JSON.stringify(message.body), /* required */
      TopicArn: 'arn:aws:sns:ca-central-1:288077811749:status_proposal.fifo',
      MessageGroupId: message.body.Namespace,
    };

    // Create promise and SNS service object
    var publishTextPromise = new AWS.SNS({apiVersion: '2010-03-31'}).publish(params).promise();

    publishTextPromise.then(
      function (data) {
        console.log("--------------------------------------------------------------");
        LogUtils.logInfo(`Message ${params.Message} sent to the topic ${params.TopicArn}`, data);
      }).catch(
      function (err) {
        LogUtils.logError(err);
      });
  }

}

module.exports = {
  EventsMagRepository: EventsMagRepository
};
