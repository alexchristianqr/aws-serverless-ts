import { CognitoUserPool, CognitoUser, AuthenticationDetails, CognitoUserAttribute, CognitoUserSession, CognitoRefreshToken } from "amazon-cognito-identity-js";

export class CognitoService {
  private readonly userPool: CognitoUserPool;

  constructor(private userPoolId: string, private clientId: string) {
    this.userPool = new CognitoUserPool({
      UserPoolId: this.userPoolId,
      ClientId: this.clientId
    });
  }

  // Registro de un nuevo usuario
  registerUser(email: string, password: string, attributes: { [key: string]: string }): Promise<any> {
    return new Promise((resolve, reject) => {
      const attributeList: CognitoUserAttribute[] = [];
      for (let key in attributes) {
        attributeList.push(new CognitoUserAttribute({ Name: key, Value: attributes[key] }));
      }

      this.userPool.signUp(email, password, attributeList, [], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result?.user);
        }
      });
    });
  }

  // Confirmar el registro del usuario con código
  confirmUser(email: string, code: string): Promise<any> {
    const user = this.getCognitoUser(email);
    return new Promise((resolve, reject) => {
      user.confirmRegistration(code, true, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  // Iniciar sesión de usuario
  loginUser(email: string, password: string): Promise<CognitoUserSession> {
    const user = this.getCognitoUser(email);
    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password
    });

    return new Promise((resolve, reject) => {
      user.authenticateUser(authDetails, {
        onSuccess: (session) => {
          resolve(session);
        },
        onFailure: (err) => {
          reject(err);
        }
      });
    });
  }

  // Actualizar atributos del usuario
  updateAttributes(email: string, attributes: { [key: string]: string }): Promise<any> {
    const user = this.getCognitoUser(email);
    const attributeList: CognitoUserAttribute[] = [];

    for (let key in attributes) {
      attributeList.push(new CognitoUserAttribute({ Name: key, Value: attributes[key] }));
    }

    return new Promise((resolve, reject) => {
      user.updateAttributes(attributeList, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  // Refrescar tokens
  refreshSession(email: string, refreshToken: string): Promise<CognitoUserSession> {
    const user = this.getCognitoUser(email);

    return new Promise((resolve, reject) => {
      const token = new CognitoRefreshToken({ RefreshToken: refreshToken });
      user.refreshSession(token, (err, session) => {
        if (err) {
          reject(err);
        } else {
          resolve(session);
        }
      });
    });
  }

  // Cerrar sesión de usuario
  logoutUser(email: string): void {
    const user = this.getCognitoUser(email);
    user.signOut();
  }

  // Obtener el usuario de Cognito
  private getCognitoUser(email: string): CognitoUser {
    return new CognitoUser({
      Username: email,
      Pool: this.userPool
    });
  }
}
