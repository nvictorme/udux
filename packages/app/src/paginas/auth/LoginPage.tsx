import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/auth.store";

type LoginForm = {
  email: string;
  password: string;
};

export const LoginPage: React.FC = () => {
  const { login } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const onSubmit = handleSubmit(async ({ email, password }) => {
    await login({ email, password });
  });

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-3xl font-bold mb-4">Iniciar Sesión</h1>
      <form onSubmit={onSubmit} className="flex flex-col space-y-4">
        <Input
          type="email"
          placeholder="Correo Electrónico"
          {...register("email", { required: "Este campo es requerido" })}
        />
        {errors.email && (
          <span className="text-red-600">{errors.email.message}</span>
        )}
        <Input
          type="password"
          placeholder="Contraseña"
          {...register("password", { required: "Este campo es requerido" })}
        />
        {errors.password && (
          <span className="text-red-600">{errors.password.message}</span>
        )}
        <Button type="submit">Iniciar Sesión</Button>
      </form>
    </div>
  );
};
