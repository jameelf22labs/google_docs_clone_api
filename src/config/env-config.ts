import dotenv from "dotenv";

type PostgressType = {
  Host: string;
  Port: number;
  Username: string;
  Password: string;
  Db: string;
};

type EnvConfiqType = {
  Port: Number;
  Postgress: PostgressType;
  Redis: {
    Host: string;
    Password: string;
    User: string;
  };
  UiHostUrl: string;
};

const EnvConfig: EnvConfiqType = {
  Port: Number(process.env.PORT) || 9090,
  Postgress: {
    Host: process.env.POSTGRESS_HOST || "localhost",
    Port: Number(process.env.POSTGRESS_PORT) || 5432,
    Username: process.env.POSTGRESS_USERNAME || "root",
    Password: process.env.POSTGRESS_PASSWORD || "root",
    Db: process.env.POSTGRESS_DB || "postgres",
  },
  Redis: {
    Host: process.env.REDIS_HOST || "localhost",
    Password: process.env.REDIS_PASSWORD || "root",
    User: process.env.REDIS_USER || "root",
  },
  UiHostUrl: process.env.UI_HOST_URL || "http://localhost:5173/",
};

export default EnvConfig;
