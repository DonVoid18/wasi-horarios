import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";
import { useLoginMutation } from "../features/auth/authApiSlice";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Logo from "/logo.svg";
import BannerPerson from "../assets/bannerPerson.jpg";
import { useState } from "react";
const Login = () => {
  const [login, { isLoading, isError, error }] = useLoginMutation();
  const [viewPassword, setViewPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    login({ username: data.user, password: data.password })
      .unwrap()
      .then((result) => {
        const { accessToken } = result;
        dispatch(setCredentials({ accessToken }));
        navigate("/", { replace: true });
      });
    reset();
  };

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>¡Hubo un error al iniciar sesión!</div>;

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="grid h-full w-full xl:grid-cols-2">
        <div className="flex h-full w-full flex-col justify-between p-5">
          <div className="flex w-full items-center justify-center">
            <div className="w-full flex justify-start items-center">
              <Link to="/login" className="flex select-none items-center gap-3">
                <img className="w-14" src={Logo} alt="Logo page" />
                <h1 className="text-2xl font-bold sm:text-3xl">UNILIX</h1>
              </Link>
            </div>
          </div>
          <div className="flex w-full justify-center">
            <div className="flex w-full max-w-sm flex-col gap-8">
              <div>
                <h2 className="text-center text-4xl font-bold xl:text-left">
                  ¡Bienvenido! <br />
                  <span className="text-violet-800">
                    Prototipo Incuval Ventures
                  </span>
                </h2>
              </div>
              <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex flex-col gap-4">
                    <div className="relative">
                      <label
                        htmlFor="user"
                        className="flex justify-between items-center text-base font-semibold"
                      >
                        <span>Usuario</span>
                        {errors.user && (
                          <span className="text-xs text-error">
                            {errors.user?.message}
                          </span>
                        )}
                      </label>
                      <div className="relative mt-1">
                        <input
                          id="user"
                          {...register("user", {
                            required: "Este campo es requerido",
                            minLength: {
                              value: 5,
                              message: "Como minimo 5 caracteres",
                            },
                          })}
                          placeholder="Ingresa tu usuario"
                          className="input"
                          type="text"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="passw"
                        className="text-base font-semibold flex justify-between items-center"
                      >
                        <span>Contraseña</span>
                        {errors.password && (
                          <span className="text-xs text-error">
                            {errors.password?.message}
                          </span>
                        )}
                      </label>
                      <div className="relative mt-1">
                        <input
                          id="password"
                          {...register("password", {
                            required: "Este campo es requerido",
                            minLength: {
                              value: 5,
                              message: "Mínimo 5 caracteres",
                            },
                          })}
                          placeholder="Ingresa tu contraseña"
                          type={viewPassword ? "text" : "password"}
                          className="input"
                        />
                        <div
                          onClick={() => setViewPassword(!viewPassword)}
                          className="absolute inset-y-0 right-2.5 flex items-center"
                        >
                          {viewPassword ? (
                            <FontAwesomeIcon
                              icon={faEye}
                              className="cursor-pointer"
                            />
                          ) : (
                            <FontAwesomeIcon
                              icon={faEyeSlash}
                              className="cursor-pointer"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <button type="submit" className="btn w-full bg-primary">
                        Iniciar sesión
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="text-center text-base text-colorTextSecundary">
            Copyright © 2023 UNILIX todos los derechos reservados.
          </div>
        </div>
        <div className="hidden h-full w-full xl:block">
          <img
            className="h-full w-full object-cover"
            src={BannerPerson}
            alt="Imagen Login"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
