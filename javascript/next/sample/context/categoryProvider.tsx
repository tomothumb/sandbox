import * as React from 'react';

interface CategoryProviderProps {
    // category: any;
}

type Props = {
    children?: React.ReactNode;
};

interface ContextProps {
    category: number;
    setCategory: (data:any) => void;
}

// Contextを生成
export const CategoryContext = React.createContext<ContextProps>({
    category: 1,
    setCategory: (data) => null,
});

/**
 * CategoryProvider
 */
const CategoryProvider: React.FC<CategoryProviderProps> = ({ children }:Props) => {
    const [category, setCategory] = React.useState<number>(1);
    // 言語データを更新
    React.useEffect(() => {
        // setCategory(getLocaleData(category));
    }, [category]);

    return (
        <CategoryContext.Provider value={{
            category, setCategory
        }}>
            {children}
        </CategoryContext.Provider>
    );
};
export default CategoryProvider;