import { accountModel } from '@/models';

export class AccountService {
  static findByEmail = async ({
    email,
    select = { email: 1, password: 1, name: 1, status: 1, roles: 1 },
  }) => {
    try {
      const token = await accountModel
        .findOne({
          email,
        })
        .select(select)
        .lean();
      return token;
    } catch (error) {
      return error;
    }
  };
}
