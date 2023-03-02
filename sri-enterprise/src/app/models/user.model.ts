export interface User {
    id: number;
    searchTerm:string;
    errorMessage?:string | null;
    avatar_url?: string;
    name?: string;
  }
  