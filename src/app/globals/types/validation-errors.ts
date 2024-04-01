export interface ValidationError {
    name: string;
    message: string;
  }
  
  export interface ErrorDefinition {
    [controlName: string]: {
      [validatorName: string]: string;
    };
  }

export  interface Message {
    [key: string]: string;
  }
 