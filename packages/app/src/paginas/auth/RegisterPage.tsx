import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/auth.store";
import { useNavigate } from "react-router-dom";

type RegisterForm = {
  nombre: string;
  email: string;
  password: string;
};

export const RegisterPage: React.FC = () => {
  const { register: crearUsuario } = useAuthStore();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>();

  const onSubmit = handleSubmit(async ({ nombre, email, password }) => {
    await crearUsuario({ nombre, email, password });
    navigate("/");
  });

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-3xl font-bold mb-4">Crear Usuario</h1>
      <form onSubmit={onSubmit} className="flex flex-col space-y-4">
        <Input
          type="text"
          placeholder="Nombre"
          {...register("nombre", { required: "Este campo es requerido" })}
        />
        {errors.nombre && (
          <span className="text-red-600">{errors.nombre.message}</span>
        )}
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
        <Button type="submit">Crear Usuario</Button>
      </form>
    </div>
  );
};
