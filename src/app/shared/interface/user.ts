 
export interface Roles {
  reader: boolean,
  author?: boolean,
  admin?:  boolean,
}

export interface User {  
  displayName?: string, 
  email: string, 
  photoURL?: string,
  roles : Roles,
  uid: string,
  favoriteColor?: string,
}