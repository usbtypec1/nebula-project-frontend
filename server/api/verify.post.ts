import crypto from "crypto";
import querystring from "querystring";

function validateTelegramData(initData: string, botToken: string) {
  const params = querystring.parse(initData);
  const receivedHash = params["hash"];
  if (!receivedHash) return false;
  delete params["hash"];

  const dataCheckString = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join("\n");

  const secretKey = crypto
    .createHmac("sha256", "WebAppData")
    .update(botToken)
    .digest();

  const computedHash = crypto
    .createHmac("sha256", secretKey)
    .update(dataCheckString)
    .digest("hex");

  return computedHash === receivedHash;
}

const botToken = "8162052132:AAFVICE_whkmRRluQdDzRJX4rizwFR5hEbo"; // Replace with your actual bot token

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (!body.initData) {
    setResponseStatus(event, 404);
    return { ok: false, error: "initData not found" };
  }
  const isValid = validateTelegramData(body.initData, botToken);

  if (!isValid) {
    setResponseStatus(event, 401);
  } else {
    setResponseStatus(event, 200);
  }
  return { ok: true };
});
