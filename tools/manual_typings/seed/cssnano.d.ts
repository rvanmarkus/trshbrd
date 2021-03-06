declare module 'cssnano' {

  interface IOptions {
    discardComments: {
      removeAll: boolean;
    };
    discardUnused: {
      removeAll: boolean;
    };
  }

  interface ICssnano {
    (opts?: IOptions): NodeJS.ReadWriteStream;
  }

  const cssnano: ICssnano;
  export = cssnano;
}
