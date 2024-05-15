export enum PermissionEnum {
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
  WRITE = 'write',
}

export const PERMISSIONS = Object.values(PermissionEnum);
