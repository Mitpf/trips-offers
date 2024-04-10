export interface InputDataOffer {
    date: string ;
    description: string;
    destination: string;
    imglink: string;
    maxpeople: number;
    minpeople: number;
    name: string;
    price: number;
    durationDays:number,
    owner?:{};
    usersLikes?:{};
  }


  export interface OfferDB {
    objectId: string;
    name: string;
    destination: string;
    imglink: string;
    description: string;
    minpeople: number;
    maxpeople: number;
    price: number;
    date: {
      __type: string;
      iso: string;
    };
    owner: {
      __type: string;
      className: string;
      objectId: string;
    };
    createdAt: string;
    updatedAt: string;
    durationDays: 4;
    usersLikes: {
      __type: string;
      className: string;
    };
  }