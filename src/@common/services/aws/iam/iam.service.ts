import {
  IAMClient,
  CreateUserCommand,
  DeleteUserCommand,
  ListUsersCommand,
  AttachUserPolicyCommand,
  DetachUserPolicyCommand,
  CreateRoleCommand,
  DeleteRoleCommand,
  ListRolesCommand,
  AttachRolePolicyCommand,
  DetachRolePolicyCommand,
  CreatePolicyCommand,
  DeletePolicyCommand,
  ListPoliciesCommand
} from "@aws-sdk/client-iam";

interface ConfigDefault {
  region?: string;
}
const configDefault: ConfigDefault = {
  region: "us-east-1"
};

export class IAMService {
  private readonly client: IAMClient;

  constructor({ region }: ConfigDefault) {
    this.client = new IAMClient({ region: region ?? configDefault.region });
  }

  // Gestión de usuarios
  async createUser(username: string): Promise<void> {
    const command = new CreateUserCommand({ UserName: username });
    await this.client.send(command);
    console.log(`User ${username} created successfully.`);
  }

  async deleteUser(username: string): Promise<void> {
    const command = new DeleteUserCommand({ UserName: username });
    await this.client.send(command);
    console.log(`User ${username} deleted successfully.`);
  }

  async listUsers(): Promise<void> {
    const command = new ListUsersCommand({});
    const response = await this.client.send(command);
    console.log("Users:");
    response.Users?.forEach((user) => {
      console.log(user.UserName);
    });
  }

  async attachUserPolicy(username: string, policyArn: string): Promise<void> {
    const command = new AttachUserPolicyCommand({ UserName: username, PolicyArn: policyArn });
    await this.client.send(command);
    console.log(`Policy ${policyArn} attached to user ${username}.`);
  }

  async detachUserPolicy(username: string, policyArn: string): Promise<void> {
    const command = new DetachUserPolicyCommand({ UserName: username, PolicyArn: policyArn });
    await this.client.send(command);
    console.log(`Policy ${policyArn} detached from user ${username}.`);
  }

  // Gestión de roles
  async createRole(roleName: string, assumeRolePolicyDocument: string): Promise<void> {
    const command = new CreateRoleCommand({
      RoleName: roleName,
      AssumeRolePolicyDocument: assumeRolePolicyDocument
    });
    await this.client.send(command);
    console.log(`Role ${roleName} created successfully.`);
  }

  async deleteRole(roleName: string): Promise<void> {
    const command = new DeleteRoleCommand({ RoleName: roleName });
    await this.client.send(command);
    console.log(`Role ${roleName} deleted successfully.`);
  }

  async listRoles(): Promise<void> {
    const command = new ListRolesCommand({});
    const response = await this.client.send(command);
    console.log("Roles:");
    response.Roles?.forEach((role) => {
      console.log(role.RoleName);
    });
  }

  // Gestión de políticas
  async createPolicy(policyName: string, policyDocument: string): Promise<void> {
    const command = new CreatePolicyCommand({
      PolicyName: policyName,
      PolicyDocument: policyDocument
    });
    await this.client.send(command);
    console.log(`Policy ${policyName} created successfully.`);
  }

  async deletePolicy(policyArn: string): Promise<void> {
    const command = new DeletePolicyCommand({ PolicyArn: policyArn });
    await this.client.send(command);
    console.log(`Policy ${policyArn} deleted successfully.`);
  }

  async listPolicies(): Promise<void> {
    const command = new ListPoliciesCommand({});
    const response = await this.client.send(command);
    console.log("Policies:");
    response.Policies?.forEach((policy) => {
      console.log(`${policy.PolicyName}: ${policy.Arn}`);
    });
  }

  async attachRolePolicy(roleName: string, policyArn: string): Promise<void> {
    const command = new AttachRolePolicyCommand({ RoleName: roleName, PolicyArn: policyArn });
    await this.client.send(command);
    console.log(`Policy ${policyArn} attached to role ${roleName}.`);
  }

  async detachRolePolicy(roleName: string, policyArn: string): Promise<void> {
    const command = new DetachRolePolicyCommand({ RoleName: roleName, PolicyArn: policyArn });
    await this.client.send(command);
    console.log(`Policy ${policyArn} detached from role ${roleName}.`);
  }
}
