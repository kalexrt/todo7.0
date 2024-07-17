import bcrypt from "bcrypt";

import { User } from "../interfaces/user.interface";

import { getUserByEmail } from "./user.service";
import { sign, verify } from "jsonwebtoken";
import config from "../config";
import loggerWithNameSpace from "../utils/logger";
import { ClientError } from "../error/ClientError";
import { ServerError } from "../error/ServerError";

const logger = loggerWithNameSpace ("AuthService");

export async function login(body: Pick<User, "email" | "password">) {

  logger.info("Called login")
  const existingUser = await getUserByEmail(body.email);
  if (!existingUser) {
    throw new ClientError("Invalid email or password");
  }
  const isValidPassword = await bcrypt.compare(
    body.password,
    existingUser.password
  );

  if (!isValidPassword) {
    throw new ClientError("Invalid email or password");
  }

  const payload = {
    id: existingUser.id,
    name: existingUser.name,
    email: existingUser.email,
    permissions: existingUser.permissions,
  };

  const accessToken = await sign(payload, config.jwt.secret!, {
    expiresIn: config.jwt.accessTokenExpiryMS,
  });

  const refreshToken = await sign(payload, config.jwt.secret!, {
    expiresIn: config.jwt.refreshTokenExpiryMS,
  });

  return {
    accessToken,
    refreshToken,
  };
}

export async function refresh(refreshToken: string) {
  logger.info("Called refresh")
  const decoded = await verify(refreshToken, config.jwt.secret!);

  if(!decoded){
    throw new ClientError("refreshToken incorrect")
  }
  const { id, name, email } = decoded as User;
  const payload = { id, name, email };
  const newAccessToken = await sign(payload, config.jwt.secret!, {
    expiresIn: config.jwt.accessTokenExpiryMS,
  });
  if(!newAccessToken){
    new ServerError("could not generate access token")
  }
  return {
    accessToken: newAccessToken,
  };
}