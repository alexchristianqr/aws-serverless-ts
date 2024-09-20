import { IAMService } from "./iam.service.ts";

export async function IamSandbox() {
  const service = new IAMService({ region: "us-east-1" });

  /** Gestionar usuarios */
  // Crear un usuario
  await service.createUser("new-user");

  // Listar usuarios
  await service.listUsers();

  // Eliminar el usuario
  await service.deleteUser("new-user");

  /** Gestionar roles */
  // Crear un rol (sustituye con tu documento de política)
  const assumeRolePolicy = JSON.stringify({
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow", // Allow,Deny
        Principal: {
          Service: "ec2.amazonaws.com"
        },
        Action: "sts:AssumeRole"
      }
    ]
  });
  await service.createRole("new-role", assumeRolePolicy);

  // Listar roles
  await service.listRoles();

  /** Gestionar políticas */
  // Crear una política (sustituye con tu documento de política JSON)
  const policyDocument = JSON.stringify({
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: "s3:*",
        Resource: "*"
      }
    ]
  });
  await service.createPolicy("MyS3FullAccessPolicy", policyDocument);

  // Listar políticas
  await service.listPolicies();

  // Adjuntar la política a un usuario (sustituye "username" por el nombre real del usuario)
  await service.attachUserPolicy("username", "arn:aws:iam::123456789012:policy/MyS3FullAccessPolicy");

  // Adjuntar la política a un rol (sustituye "rolename" por el nombre real del rol)
  await service.attachRolePolicy("rolename", "arn:aws:iam::123456789012:policy/MyS3FullAccessPolicy");

  // Desvincular la política de un usuario
  await service.detachUserPolicy("username", "arn:aws:iam::123456789012:policy/MyS3FullAccessPolicy");

  // Desvincular la política de un rol
  await service.detachRolePolicy("rolename", "arn:aws:iam::123456789012:policy/MyS3FullAccessPolicy");

  // Eliminar la política
  await service.deletePolicy("arn:aws:iam::123456789012:policy/MyS3FullAccessPolicy");
}
