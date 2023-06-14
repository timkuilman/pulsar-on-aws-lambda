
const Pulsar = require("pulsar-client");

const pulsarAuth = new Pulsar.AuthenticationToken({
  token: process.env.PULSAR_TOKEN,
}),
pulsarClient = new Pulsar.Client({
  serviceUrl: process.env.PULSAR_URI,
  authentication: pulsarAuth,
  // tlsTrustCertsFilePath: trustStore,
  operationTimeoutSeconds: 30,
});
Pulsar.Client.setLogHandler((level, file, line, message) => {
console.log(
  "[%s][%s:%d] %s",
  Pulsar.LogLevel.toString(level),
  file,
  line,
  message
);
});

module.exports.app = async (event, context, callback) => {

    // Create a producer
    const dataStorageProducer = await pulsarClient.createProducer({
      topic: "persistent://staging-connect/enode/sink-data",
    });
  
    // 1. Send to data sink
    dataStorageProducer.send({
      data: Buffer.from({
        provider: "Enode",
        client_id: "6012c570c7b4221480ba1aa2",
        external_id: "e2c0ae35-03fb-4cd6-86da-232c36d2d00d",
        id: "01H2TJDGWK149VCX7Z4YKQN4KW",
        battery_capacity: 82,
        battery_date: "2023-06-13T14:26:28.000Z",
        battery_estimated_range: 172,
        battery_percentage: 31,
        charge_date: "2023-06-13T14:26:28.000Z",
        charge_estimated_charge_time: null,
        charge_estimated_completion_time: "2023-06-13T14:26:36.563Z",
        charge_is_charging: false,
        charge_is_fully_charged: false,
        charge_is_plugged_in: false,
        charge_limit: 80,
        charge_speed: null,
        location_longitude: null,
        location_latitude: null,
        location_date: null,
        make: "SKODA",
        model: "Enyaq 80 iV",
        odometer_date: "2023-06-13T14:20:52.000Z",
        odometer_distance: 8984,
        vin_anonymous: "TMBJC9NY8NF",
        year: 2022,
        created_at: "2023-06-13T14:26:36.563Z",
      }),
    });

  return {
    message: `Hello ${event}, welcome to the exciting Serverless world!`,
    event,
  };
};
