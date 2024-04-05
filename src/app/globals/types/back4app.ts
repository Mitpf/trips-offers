export interface UserB4app {
    createdAt: string;
    email: string;
    liked: { __type: string; className: string };
    sessionToken: string;
    updatedAt: string;
    objectId: string;
    username: string;
  }

  export interface Offer{
    name: string,
    destination: string,
    imglink: string,
    description: string,
    minpeople: number,
    maxpeople: number,
    price: number,
    date: Date,
    objectId:string
  }