import { IAMService } from "./iam.service.ts";

export async function IamSanbox() {
  const service = new IAMService({ region: "us-east-1" });

  // Crear un usuario
  await service.createUser("new-user");

  // Listar usuarios
  await service.listUsers();

  // Adjuntar una política a un usuario
  await service.attachUserPolicy("new-user", "arn:aws:iam::aws:policy/ReadOnlyAccess");

  // Crear un rol (sustituye con tu documento de política)
  const assumeRolePolicy = JSON.stringify({
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
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

  // Adjuntar una política a un rol
  await service.attachRolePolicy("new-role", "arn:aws:iam::aws:policy/ReadOnlyAccess");

  // Desvincular una política de un rol
  await service.detachRolePolicy("new-role", "arn:aws:iam::aws:policy/ReadOnlyAccess");

  // Eliminar el rol
  await service.deleteRole("new-role");

  // Desvincular una política de un usuario
  await service.detachUserPolicy("new-user", "arn:aws:iam::aws:policy/ReadOnlyAccess");

  // Eliminar el usuario
  await service.deleteUser("new-user");

  //
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
  await service.attachUserPolicy("arn:aws:iam::123456789012:policy/MyS3FullAccessPolicy", "username");

  // Adjuntar la política a un rol (sustituye "rolename" por el nombre real del rol)
  await service.attachRolePolicy("arn:aws:iam::123456789012:policy/MyS3FullAccessPolicy", "rolename");

  // Desvincular la política de un usuario
  await service.detachUserPolicy("arn:aws:iam::123456789012:policy/MyS3FullAccessPolicy", "username");

  // Desvincular la política de un rol
  await service.detachRolePolicy("arn:aws:iam::123456789012:policy/MyS3FullAccessPolicy", "rolename");

  // Eliminar la política
  await service.deletePolicy("arn:aws:iam::123456789012:policy/MyS3FullAccessPolicy");
}
