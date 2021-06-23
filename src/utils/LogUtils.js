class LogUtils {

  static logInfo(message, json) {
    console.info("---------------------------------------------------------------------");
    console.info(`${message}`);
    if (typeof json === "object") {
      console.info("############");
      console.info(JSON.stringify(json));
      console.info("############");
    }
    console.info("---------------------------------------------------------------------");
  }

  static logWarn(message, json) {
    console.warn("---------------------------------------------------------------------");
    console.warn(`${message}`);
    if (typeof json === "object") {
      console.warn("############");
      console.warn(JSON.stringify(json));
      console.warn("############");
    }
    console.warn("---------------------------------------------------------------------");
  }

  static logError(err) {
    console.error("---------------------------------------------------------------------");
    console.error(`${err.message}`);
    if (typeof err === "object") {
      console.error("############");
      console.error(err, err.stack);
      console.error("############");
    }
    console.error("---------------------------------------------------------------------");
  }

}

module.exports = {
  LogUtils
}
