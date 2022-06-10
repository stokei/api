import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { Mutation, Resolver } from '@nestjs/graphql';
import {
  AuthenticationWithoutExpiresValidationGuard,
  CurrentAccount,
  CurrentRefreshToken,
  IAuthenticatedAccount,
  IRefreshTokenPayload
} from '@stokei/nestjs';

import { Access } from '@/controllers/graphql/types/access';
import { AuthResponse } from '@/controllers/graphql/types/auth-response';
import { RefreshAccessService } from '@/services/accesses/refresh-access';

@Resolver(() => Access)
export class RefreshAccessResolver {
  constructor(private readonly refreshAccessService: RefreshAccessService) {}

  @UseGuards(AuthenticationWithoutExpiresValidationGuard)
  @Mutation(() => AuthResponse)
  async refreshAccess(
    @CurrentAccount() currentAccount: IAuthenticatedAccount,
    @CurrentRefreshToken() refreshToken: IRefreshTokenPayload
  ) {
    if (currentAccount.id !== refreshToken.accountId) {
      throw new UnauthorizedException();
    }
    const response = await this.refreshAccessService.execute({
      where: {
        accessId: refreshToken.code,
        accountId: currentAccount.id
      }
    });
    return response;
  }
}
