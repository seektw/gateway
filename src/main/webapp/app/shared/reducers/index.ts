import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */
// prettier-ignore
import rental, {
  RentalState
} from 'app/entities/rental/rental/rental.reducer';
// prettier-ignore
import rentedItem, {
  RentedItemState
} from 'app/entities/rental/rented-item/rented-item.reducer';
// prettier-ignore
import overdueItem, {
  OverdueItemState
} from 'app/entities/rental/overdue-item/overdue-item.reducer';
// prettier-ignore
import returnedItem, {
  ReturnedItemState
} from 'app/entities/rental/returned-item/returned-item.reducer';
// prettier-ignore
import book, {
  BookState
} from 'app/entities/book/book/book.reducer';
// prettier-ignore
import user, {
  UserState
} from 'app/entities/user/user/user.reducer';
export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly rental: RentalState;
  readonly rentedItem: RentedItemState;
  readonly overdueItem: OverdueItemState;
  readonly returnedItem: ReturnedItemState;
  readonly book: BookState;
  readonly user: UserState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  rental,
  rentedItem,
  overdueItem,
  returnedItem,
  book,
  user,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar
});

export default rootReducer;