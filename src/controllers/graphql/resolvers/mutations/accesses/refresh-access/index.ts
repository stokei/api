import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { Mutation, Resolver } from '@nestjs/graphql';
import {
  AuthenticatedGuard,
  AuthenticationConfig,
  CurrentAccount,
  CurrentRefreshToken,
  IAuthenticatedAccount,
  IRefreshTokenPayload
} from '@stokei/nestjs';

import { AppGuard } from '@/common/guards/app';
import { Access } from '@/controllers/graphql/types/access';
import { AuthResponse } from '@/controllers/graphql/types/auth-response';
import { RefreshAccessService } from '@/services/accesses/refresh-access';

@Resolver(() => Access)
export class RefreshAccessResolver {
  constructor(private readonly refreshAccessService: RefreshAccessService) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @AuthenticationConfig({ hasExpiresValidation: false })
  @Mutation(() => AuthResponse)
  async refreshAccess(
    @CurrentAccount() currentAccount: IAuthenticatedAccount,
    @CurrentRefreshToken() refreshToken: IRefreshTokenPayload
  ) {
    if (
      currentAccount.id !== refreshToken.accountId ||
      currentAccount.code !== refreshToken.code
    ) {
      throw new UnauthorizedException();
    }
    const response = await this.refreshAccessService.execute({
      where: {
        access: refreshToken.code,
        account: currentAccount.id
      }
    });
    return response;
  }
}
