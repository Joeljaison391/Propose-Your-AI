export const encode = (text: string): number[] => {

  

    const tokens = text
      .replace(/[.,!?;:()]/g, '') 
      .split(/\s+/) 
      .filter(token => token.length > 0);
  
    
    return tokens.map(token => token.length);
  };
  
  
  export const countTokens = (text: string): number => {
    return encode(text).length;
  };
  