import * as React from 'react';
import CategoryProvider from "./categoryProvider";


type Props = {
  children?: React.ReactNode;
};

export const ContextProvider = ({children}: Props) => {

  // <LocaleProvider lang="ja">
  // </LocaleProvider>

  return (
          <CategoryProvider>
              {children}
          </CategoryProvider>
    );
}
