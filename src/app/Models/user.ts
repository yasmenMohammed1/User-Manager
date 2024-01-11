export interface ProfileUser {
  uid: string;
  email?: string | undefined;
  firstName?: string | undefined;
  lastName?: string | undefined;
  displayName: string;
  phone?: string | undefined;
  address?: string | undefined;
  photoURL?: string | undefined;
}
