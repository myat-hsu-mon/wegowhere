const bcrypt = require("bcrypt");

export const verifyPassword = async (
  candidatePassword: string,
  password: string
): Promise<boolean> => await bcrypt.compare(candidatePassword, password);
