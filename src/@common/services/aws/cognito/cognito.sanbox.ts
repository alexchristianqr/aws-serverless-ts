import { CognitoService } from "./cognito.service.ts";

export async function CognitoSanbox() {
  const service = new CognitoService({ userPoolId: "us-east-1_XXXXXXXXX", clientId: "XXXXXXXXXXXXX" });

  // Registro de un usuario
  const user = await service.registerUser("test@example.com", "Password123!", { name: "Test User" });
  console.log("Usuario registrado:", user);

  // Confirmación de usuario
  const confirmationResult = await service.confirmUser("test@example.com", "123456");
  console.log("Usuario confirmado:", confirmationResult);

  // Iniciar sesión
  const session = await service.loginUser("test@example.com", "Password123!");
  console.log("Sesión iniciada:", session);
  /*
    const idToken = session.getIdToken().getJwtToken();
    const accessToken = session.getAccessToken().getJwtToken();
    const refreshToken = session.getRefreshToken().getToken();

    console.log("ID Token:", idToken);
    console.log("Access Token:", accessToken);
    console.log("Refresh Token:", refreshToken);
  */

  // Actualizar atributos
  const updateResult = await service.updateAttributes("test@example.com", { name: "Updated Name" });
  console.log("Atributos actualizados:", updateResult);

  // Refrescar tokens
  const refreshedSession = await service.refreshSession("test@example.com", "REFRESH_TOKEN");
  console.log("Token refrescado:", refreshedSession);
  /*
    const idToken = refreshedSession.getIdToken().getJwtToken();
    const accessToken = refreshedSession.getAccessToken().getJwtToken();
    const newRefreshToken = refreshedSession.getRefreshToken().getToken();

    console.log("ID Token:", idToken);
    console.log("Access Token:", accessToken);
    console.log("New Refresh Token:", newRefreshToken);
  */

  // Cerrar sesión
  service.logoutUser("test@example.com");
  console.log("Sesión cerrada.");
}
