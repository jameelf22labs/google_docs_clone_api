import Redis, { RedisOptions } from "ioredis";
import EnvConfig from "./env-config";

const isProd = process.env.NODE_ENV === "production";

const redisOptions: RedisOptions = {
  host: EnvConfig.Redis.Host,
  username: EnvConfig.Redis.User,
  password: EnvConfig.Redis.Password,
};

if (!isProd) {
  redisOptions.host = "127.0.0.1";
  delete redisOptions.username;
  delete redisOptions.password;
}

const redis = new Redis(redisOptions);

export default redis;
