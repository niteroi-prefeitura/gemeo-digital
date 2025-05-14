import crypto from "crypto";

const generateHashId = (item: string): string => {
  return crypto.createHash("sha256").update(item).digest("hex");
};

export default generateHashId;
