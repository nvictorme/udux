import { AppDataSource } from "../data-source";

import { Usuario } from "../entity/Usuario";

async function run(): Promise<void> {
  await AppDataSource.initialize();

  const user = new Usuario();

  user.email = "example@email.com"; // add your email here
  user.nombre = "John Doe"; // add your name here
  user.password = "my_password"; // add your password here

  await AppDataSource.getRepository(Usuario).save(user);
}

run()
  .then(() => {
    console.log("First user created");
    process.exit(0);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
